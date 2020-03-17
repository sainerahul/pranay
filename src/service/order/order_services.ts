import OrderDomain from '../../domain/order/orderDomain';
import {Request, Response} from 'express';
import validate from '../../util/storeValidator';
import orderDomain from '../../domain/order/orderDomain';
import logger from '../../util/logger';
class StoreServices{
    constructor(){
    }
    async bookOrder(req: Request, res: Response){
        try{
            let result = await OrderDomain.post(req, res);
            logger.info("Results ::"+JSON.stringify(result))
            res.status(200).json(result);
        }catch(error){
            logger.error("Error ::"+JSON.stringify(error))
            res.status(400).json({error});
        }
    }
    async getOrder(req: Request, res: Response){
        try{
            let result: any = await OrderDomain.get(req, res);
            res.status(200).json(result);
        }catch(error){
            res.status(400).json({error});
        }
    }
    async getAllOrders(req: Request, res: Response){
        try{
            let result: any = await OrderDomain.getAll(req, res);
            res.status(200).json(result);
        }catch(error){
            res.status(400).json({error});
        }
    }
    async deleteOrder(req: Request, res: Response){
        try{
            let result: any = await OrderDomain.delete(req, res);
            res.send((result>0)?result +" row deleted successfully":"Invalid order ID!!!");
        }catch(error){
            res.status(400).json({error});
        }
    }
}
export = new StoreServices();