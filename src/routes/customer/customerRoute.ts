import express from 'express';
import CustomerServices from '../../service/customer/customer_services';
import logger from '../../util/logger';
import authentication from '../../util/authentication';
import authorization from '../../util/authorization'
const router: express.Router = express.Router();

// GLOBAL-PREVILIGED
router.post('/login', async (req: express.Request, res: express.Response) => {
    try {
        await CustomerServices.loginCustomer(req, res)
    }
    catch (error) {
        logger.error("" + error)
        res.status(400).json({ error });
    }
})

// ADIMIN-PREVILIGED
router.get('/', authentication, authorization, async (req: express.Request, res: express.Response) => {
    try {
        await CustomerServices.getAllCustomers(req, res);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});

//GLOBAL-PREVILIGED
router.post('/', async (req: express.Request, res: express.Response) => {
    // TODO ::
    //No authorization or authentication , EVERY ONE CAN REGISTER AS CUSTOMER
    try {
        await CustomerServices.insertCustomer(req, res);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});

//USER-PREVILIGED
router.put('/', authentication, authorization, async (req, res) => {
    try {
        await CustomerServices.updateCustomer(req, res);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});

//USER-PREVILIGED
router.delete('/:id', authentication, authorization, async (req, res) => {
    try {
        await CustomerServices.deleteCustomer(req, res);
    }
    catch (error) {
        res.status(400).json({ error });
    }

});

//USER-PREVILIGED
router.get("/:id", authentication, authorization, async (req: express.Request, res: express.Response) => {
    try {
        await CustomerServices.getCustomer(req, res);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});

// CUTOMER-PRIVILIGED 
// customer/customer_id/order - returns all orders corresponding to that customer
router.get('/:id/orders/', authentication, authorization, async (req, res) => {
    logger.info("ewwww")
    logger.info("we got a hit a :customer/:id/orders/")
    try {
        await CustomerServices.getOrdersByCustomer(req, res);
    }
    catch (error) {
        logger.error(error)
        res.status(400).json({
            "error": {
                "message": "Route Error",
                "error": JSON.stringify(error)
            }
        });
    }
});

// CUSTOMER-PRIVILIGED (PENDING)
router.get('/:id/orders/:order_id', authentication, authorization, async (req, res) => {
    try {
        logger.info("we got a hit a :/customer:id/orders/:order_id")
        await CustomerServices.getOrderDetailsByCustomer(req, res);
    }
    catch (error) {
        logger.error(error)
        res.status(400).json({
            "error": {
                "message": "Route Error",
                "error": JSON.stringify(error)
            }
        });
    }
});

export = router;