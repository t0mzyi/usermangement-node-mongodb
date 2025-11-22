import express from 'express'
const router = express.Router()

import { loginValidator, registerValidator } from '../middleware/userValidator.js'
import controller from '../controller/userController.js'
import { ensureLoggedIn, loggedInCheck } from '../middleware/sessionMiddleware.js'

router.get('/', (req,res) => res.redirect('/loginPage'))
router.get('/loginPage', loggedInCheck,controller.loginGet)
router.get('/registerPage',loggedInCheck, controller.registerGet)
router.get('/logout', controller.logout)

router.get('/home',ensureLoggedIn,(req,res) => res.render('user/home', {user : req.session.user}))

router.post('/register',registerValidator,controller.registerPost)
router.post('/login',loginValidator,controller.loginPost)
router.post('/logout', controller.logout)

console.log("user.js router loaded");




export default router