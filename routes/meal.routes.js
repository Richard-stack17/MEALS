const {Router} = require('express');
const {check} = require('express-validator');
const { getMeal, createMeal, getMeals, updateMeal, deleteMeal } = require('../controllers/meals.controller');
const { protect, protectAccountOwner, restrictTo } = require('../middlewares/auth.middleware');
const { validMealExistsById, validIfRestaurantExistsById } = require('../middlewares/meals.middleware');
const { validateFields } = require('../middlewares/validations.middleware');

const router = Router();

router.get('/:id', validMealExistsById, getMeal);

router.get('/',getMeals);

router.use(protect);

router.post('/:id',[
    check('name', 'the name is required').not().isEmpty(),
    check('price', 'the price is required').not().isEmpty(),
    check('price', 'the price must be a number').isNumeric(),
    validateFields,
    validIfRestaurantExistsById,
    restrictTo('admin'),
    protectAccountOwner
], createMeal);



router.patch('/:id', 
[
    check('name', 'the name is required').not().isEmpty(),
    check('price', 'the price is required').not().isEmpty(),
    check('price', 'the price must be a number').isNumeric(),
    validateFields,
    validMealExistsById,
    restrictTo('admin'),
    protectAccountOwner
], updateMeal);

router.delete('/:id',validMealExistsById, restrictTo('admin'),protectAccountOwner,deleteMeal);

module.exports = {
    mealRouter: router,
    
}