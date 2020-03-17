import express from 'express';
import EmployeeServices from '../../service/employee/employee_services';
import logger from '../../util/logger';
import authentication from '../../util/authentication';
import authorization from '../../util/authorization';
const router: express.Router = express.Router();

// GLOBAL-PREVILIGED
router.post('/login', async (req: express.Request, res: express.Response) => {
    logger.info("got")
    try {
        await EmployeeServices.loginEmployee(req, res)
    }
    catch (error) {
        logger.error("" + error)
        res.status(400).json({ error });
    }
})

// ADMIN-PREVILIGED
router.get('/', authentication, authorization, async (req: express.Request, res: express.Response) => {
    logger.info("got")
    try {
        await EmployeeServices.getAllEmployees(req, res);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});

// EMPLOYEE-PREVILIGED
router.get("/:id", authentication, authorization, async (req: express.Request, res: express.Response) => {
    logger.info("got")
    try {
        await EmployeeServices.getEmployee(req, res);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});

// ADMIN-PREVILIGED
router.post('/', authentication, authorization, async (req: express.Request, res: express.Response) => {
    logger.info("got")
    try {
        await EmployeeServices.insertEmployee(req, res);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});

// ADMIN-PREVILIGED
router.put('/', authentication, authorization, async (req, res) => {
    logger.info("got")
    try {
        await EmployeeServices.updateEmployee(req, res);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});

// ADMIN-PREVILIGED
router.delete('/:id', authentication, authorization, async (req, res) => {
    logger.info("got")
    try {
        await EmployeeServices.deleteEmployee(req, res);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});

// EMPLOYEE-PRIVILIGED (PENDING)
router.get('/:id/orders/', authentication, authorization, async (req, res) => {
    logger.info("geezzzz")
    logger.info("we got a hit a :employee/:id/orders/")
    try {
        await EmployeeServices.getOrdersByEmployee(req, res);
    }
    catch (error) {
        logger.error(error)
        res.status(400).json({ error });
    }
});

// EMPLOYEE-PRIVILIGED (PENDING)
router.get('/:id/orders/:order_id', authentication, authorization, async (req, res) => {
    try {
        logger.info("we got a hit a :employee/:id/orders/:order_id")
        await EmployeeServices.getOrderDetailsByEmployee(req, res);
    }
    catch (error) {
        logger.error(error)
        res.status(400).json({ error });
    }
});
export = router;