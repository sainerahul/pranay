// Importing modules
import express from 'express';
import AdminService from '../../service/admin/adminService';
import logger from '../../util/logger'

const router = express.Router();

// THERE WILL BE NO UI(USER INTERFACE) FOR THE ADMIN ROUTE, USE POSTMAN

// ADMIN-PREVILIGED
router.get('/', (req, res, next) => {
    logger.info("request hit at "+req.originalUrl+ ":"+req.method)
    let admin = new AdminService()
    admin.get(res, req)
})

// ADMIN-PREVILIGED
router.get('/:id', (req, res, next) => {
    logger.info("request hit at "+req.originalUrl+ ":"+req.method)
    let admin = new AdminService()
    admin.get(res, req, parseInt(req.params.id))
})

// ADMIN-PREVILIGED
router.post('/', (req, res, next) => {
    logger.info("request hit at "+req.originalUrl+ ":"+req.method)
    let admin = new AdminService()
    admin.post(res, req)
})

// ADMIN-PREVILIGED
router.put('/', (req, res, next) => {
    logger.info("request hit at "+req.originalUrl+ ":"+req.method)
    let admin = new AdminService()
    admin.put(res, req)
})

// ADMIN-PREVILIGED
router.delete('/', (req, res, next) => {
    logger.info("request hit at "+req.originalUrl+ ":"+req.method)
    let admin = new AdminService()
    admin.delete(res, req)
})

// ADMIN-PREVILIGED
router.post('/access', (req, res, next) => {
    logger.info("request hit at "+req.originalUrl+ ":"+req.method)
    let admin = new AdminService()
    admin.post_access(req, res)
})

// ADMIN-PREVILIGED
router.post('/login', async (req: express.Request, res: express.Response) => {
    try {
        let admin = new AdminService()
        admin.loginAdmin(req, res)
    }
    catch (error) {
        logger.error("" + error)
        res.status(400).json({ error });
    }
})
export = router
