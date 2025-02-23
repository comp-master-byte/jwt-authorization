const Router = require('express');
const userController = require('../controllers/user-controller');
const router = new Router();
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

router.post(
    '/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout); // Внутри этого эндпоинта будет удаляться рефреш токен из базы данных
router.get('/activate/:link', userController.activate); // Активация аккаунта по ссылке, которая будет приходить на почту
router.get('/refresh', userController.refresh); // Будет перезаписывать access токен в случае если он умер
router.get('/users', authMiddleware, userController.getUsers); // Список пользователей, доступен только для авторизованных пользователей

module.exports = router;