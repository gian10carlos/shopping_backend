const express = require('express');
const router = express.Router();

const categorieController = require('../controller/categories')
const userController = require('../controller/user')
const productController = require('../controller/product')
const cartController = require('../controller/cart')
const historyController = require('../controller/history_user')

const categories = ['pants', 'tshirt', 'jumpersshoes']

router.get('/home', categorieController.getHome);

router.get(`/categorie/${categories[0]}`, categorieController.getPants);

router.get(`/categorie/${categories[1]}`, categorieController.getTshirt);

router.get(`/categorie/${categories[2]}`, categorieController.getJumperAndShoes);

router.get('/about', categorieController.viewAbout);
router.get('/auth/logIn', categorieController.viewLogIn);
router.get('/auth/signUp', categorieController.viewSignUp);

router.get('/description/:id', productController.getProduct);

router.get('/shopping/summary', categorieController.viewCartCurrent);

router.get('/shopping/history', historyController.getShoppingHistory);

// POST
router.post('/newUser', userController.postUser);
router.post('/accessUser', userController.getUser);

router.post('/history/add', cartController.postShopping);


module.exports = router;