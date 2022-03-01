import express from 'express'
import authCtrl from '../controller/auth.controller'

const router = express.Router()

router.route('/auth/signin')
    .post(authCtrl.singin)

router.route('/auth/signout')
    .get(authCtrl.signout)

export default router