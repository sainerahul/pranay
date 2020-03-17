import express from 'express'

import storeRoute from "./store/storeRoute"

import medicine from "./medicine/medicine"

import customerRoute from './customer/customerRoute'

import employeeRoute from './employee/employeeRoute'

import orderRoute from './order/orderRoute'

import adminRoute from './admin/adminRoute'

const app = express()

const router = express.Router()

router.use('/store', storeRoute)
router.use('/medicine', medicine)
router.use('/customer', customerRoute)
router.use('/employee', employeeRoute)
router.use('/order', orderRoute)
router.use('/admin', adminRoute)

// Export the router
export = router