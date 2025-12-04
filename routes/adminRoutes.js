import express from 'express'
import { loggedInCheck, isAdmin } from '../middleware/sessionMiddleware.js'
import controller from '../controller/adminController.js'
const router = express.Router()
import {adminAddUserValidator} from '../middleware/userValidator.js'

router.get('/',loggedInCheck,controller.getLogin)
router.post('/verify',controller.postLogin)

router.get('/home',isAdmin,controller.getHome)
router.post('/logout',controller.logout)


router.get('/EditUser/:userid',isAdmin,controller.editUserPage)
router.post('/EditUser/:userid',isAdmin,controller.editUserPost)
router.get('/DeleteUser/:userid',isAdmin,controller.deleteUser)

router.get('/addUser',isAdmin,controller.adduserget)
router.post('/addUser',isAdmin,adminAddUserValidator,controller.addUserpost)


export default router