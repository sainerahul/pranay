import express from 'express';
import StoreServices from '../../service/store/store_services';
import logger from '../../util/logger';
import authentication from '../../util/authentication';
import authorization from '../../util/authorization';
const router: express.Router = express.Router();

// GLOBAL-PREVILIGED (PENDING)
router.get('/', async (req: express.Request, res: express.Response) => {
    try {
        await StoreServices.getAllStores(req, res);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});

// ADMIN-PREVILIGED
router.post('/', authentication, authorization, async (req: express.Request, res: express.Response) => {
    logger.info("Body data is :" + JSON.stringify(req.body))
    try {
        await StoreServices.insertStore(req, res);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});

// ADMIN-PREVILIGED
router.put('/', authentication, authorization, async (req, res) => {
    try {
        await StoreServices.updateStore(req, res);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});

// ADMIN-PREVILIGED
router.delete('/:id', authentication, authorization, async (req, res) => {
    try {
        await StoreServices.deleteStore(req, res);
    }
    catch (error) {
        res.status(400).json({ error });
    }

});

// GLOBAL-PREVILIGED
router.get('/:id', async (req: express.Request, res: express.Response) => {
    // returns store with corresponding store id 
    try {
        await StoreServices.getStore(req, res);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});

// ADMIN-PRIVILIGED (PENDING)
router.get('/:id/orders', authentication, authorization, async (req: express.Request, res: express.Response) => {
    try {
        await StoreServices.getOrdersByStore(req, res);
    }
    catch (error) {
        res.status(400).json({ error });
    }
})

//GETTING MEDICINES OF A STORE
router.get('/:id/medicines', async(req: express.Request, res: express.Response) => {
    try{
        await StoreServices.getMedicines(req,res);
    }
    catch(error){
        res.status(400).json({error});
    }
})
router.post('/:id/medicines', async(req: express.Request, res: express.Response) => {
    try{
        await StoreServices.postMedicines(req,res);
    }
    catch(error){
        res.status(400).json({error});
    }
})
export = router;