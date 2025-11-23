import express from 'express'
import { loggedInCheck, isAdmin } from '../middleware/sessionMiddleware.js'
import controller from '../controller/adminController.js'
const router = express.Router()

router.get('/',loggedInCheck,controller.getLogin)
router.post('/verify',controller.postLogin)
router.get('/home',isAdmin,controller.getHome)
router.get('/logout',controller.logout)


export default router