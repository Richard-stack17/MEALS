const { Router } = require('express');
const { signup, updateUser, getUserOrders, getUserOrder, login, deleteUser } = require('../controllers/user.controller');
const { protect, protectAccountOwner } = require('../middlewares/auth.middleware');
const { validUserById, validUserByEmail, validPassword } = require('../middlewares/user.middleware');
const {
  signupValidations,
  validateFields,
  loginValidation,
  updateUserValidation,
} = require('../middlewares/validations.middleware');

const router = Router();

router.post('/signup', signupValidations, validateFields, signup);

router.post(
  '/login',
  loginValidation,
  validateFields,
  validUserByEmail,
  validPassword,
  login
);

router.use(protect);

router.patch('/:id', updateUserValidation, validateFields, validUserById,protectAccountOwner, updateUser )

router.delete('/:id', validUserById, protectAccountOwner, deleteUser);

router.get('/orders',  getUserOrders);

router.get('/orders/:id', validUserById,getUserOrder)


module.exports = {
  userRouter: router,
};
