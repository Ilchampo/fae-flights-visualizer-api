// Import router, controller and middleware
const { Router } = require('express');
const userController = require('../controllers/user.controller');
const roles = require('../middlewares/roles');

// Create a new router
const router = Router();

// @route   /user/create
// @descr   create a new user
// @acces   private : user
router.post('/create', roles.adminAuth, userController.CreateUser);

// @route   /user/signin
// @descr   sign in as user
// @acces   public : any


// @route   /user/admin/signin
// @descr   sign in as admin
// @acces   public : any


// Export router
module.exports = router;
