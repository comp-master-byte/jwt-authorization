const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const UserDto = require('../dtos/user-dto');
const tokenService = require('./token-service');
const ApiError = require('../exceptions/api-error');

class UserService {
  async generateTokensAndGetUser(user) {
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({...userDto});
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {...tokens, user: userDto};
  }

  async registration(email, password) {
    const candidate = await UserModel.findOne({email}); // Все операции с БД асинхронные
    if(candidate) {
      throw ApiError.NotFoundException(`Пользователь с таким почтовым адресом ${email} уже существует`);
    }
    // Генерируется зашифрованный пароль - создается хэш их пароля
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4(); // Пример сгенерированной линки 550e8400-e29b-41d4-a716-446655440000j
    // Запись в БД. Все операции с БД асинхронные
    const user = await UserModel.create({email, password: hashPassword, activationLink});
    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
    const tokensAndUser = await this.generateTokensAndGetUser(user);
    return tokensAndUser;
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({activationLink});
    if(!user) {
      throw ApiError.NotFoundException('Некорректная ссылка активации');
    }
    user.isActivated = true;
    return user.save();
  }

  async login(email, password) {
    const user = await UserModel.findOne({email});
    if(!user) {
      throw ApiError.NotFoundException('Пользователь с таким email не найден');
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect) {
      throw ApiError.NotFoundException('Неверный пароль');
    }

    const tokensAndUser = await this.generateTokensAndGetUser(user);
    return tokensAndUser;
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if(!refreshToken) {
      throw ApiError.UnauthorizedException()
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await tokenService.findToken(refreshToken);
    if(!userData || !tokenFromDB) {
      throw ApiError.UnauthorizedException()
    }

    const user = await UserModel.findById(userData.id);
    const tokensAndUser = await this.generateTokensAndGetUser(user);
    return tokensAndUser;
  }

  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }
}

module.exports = new UserService();