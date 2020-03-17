import express from 'express';
import orderServices from '../../service/order/order_services';
import logger from '../../util/logger';
const router: express.Router = express.Router();

// TODO: add PUT support for the orders.

// CUSTOMER-PREVILIGED (PENDING) (PENDING)
router.post('/', async (req: express.Request, res: express.Response) => {
    try {
        await orderServices.bookOrder(req, res);
    } catch (error) {
        res.status(400).json({ error });
    }
});

// ADMIN-PRIVILIGED (PENDING) (PENDING) (Returns all the orders of all stores)
router.get('/', async (req: express.Request, res: express.Response) => {
    try {
        await orderServices.getAllOrders(req, res);
    } catch (error) {
        res.status(400).json({ error })
    }
});

//This needs to be attached with customer and emp
router.get('/order', async (req: express.Request, res: express.Response) => {
    try {
        await orderServices.getAllOrders(req, res);
    } catch (error) {

    }
});
// ADMIN-PRIVILIGED (PENDING) (PENDING) (Return specific order of order_id)
router.get('/:order_id', async (req: express.Request, res: express.Response) => {
    try {
        await orderServices.getOrder(req, res);
    } catch (error) {
        res.status(400).json({ error });
    }
});

// CUSTOMER-PRIVILIGED (PENDING) (PENDING)
router.delete('/:order_id', async (req: express.Request, res: express.Response) => {
    try {
        await orderServices.deleteOrder(req, res);
    } catch (error) {
        res.status(400).json({ error });
    }
});

export = router;