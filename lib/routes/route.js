const express = require('express');
const router = express.Router();

const categorieController = require('../controller/categories')
const userController = require('../controller/user')
const productController = require('../controller/product')
const cartController = require('../controller/cart')
const historyController = require('../controller/history_user')
const checkAuth = require('../security/page')

const categories = ['pnats', 'tshirt', 'jumpersshoes']

router.get('/home', checkAuth, categorieController.getHome);

router.get(`/categorie/${categories[0]}`, checkAuth, categorieController.getPants);

router.get(`/categorie/${categories[1]}`, checkAuth, categorieController.getTshirt);

router.get(`/categorie/${categories[2]}`, checkAuth, categorieController.getJumperAndShoes);

router.get('/about', checkAuth, categorieController.viewAbout);
router.get('/auth/logIn', categorieController.viewLogIn);
router.get('/auth/signUp', categorieController.viewSignUp);

router.get('/description/:id', checkAuth, productController.getProduct);

router.get('/auth/logout', userController.logoutUser);

router.get('/shopping/summary', checkAuth, categorieController.viewCartCurrent);

router.get('/shopping/history', checkAuth, historyController.getShoppingHistory);

router.get('/cart', cartController.getCart);

// POST
router.post('/newUser', userController.postUser);
router.post('/accessUser', userController.getUser);

router.post('/cart/add', cartController.addProduct);
router.post('/cart/delete', cartController.deleteProduct);
router.post('/history/add', cartController.postShopping);


module.exports = router;