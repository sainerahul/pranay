import StoreDb from '../../domain/store/store_db';
import { Request, Response } from 'express';
import constants from '../../domain/store/constants';
import validate from '../../util/storeValidator';
import global_constants from '../../db/constants'
import logger from '../../util/logger';

class StoreServices {
    constructor() {
    }
    async getAllStores(req: Request, res: Response) {
        try {
            let result: any = await StoreDb.runQuery(constants.select, []);
            res.status(200).send(result.rows);
        }
        catch (error) {
            res.status(400).json({ error });
        }
    }
    async insertStore(req: Request, res: Response) {
        try {
            validate(req, res);
            let branch: string = req.body.store_branch;
            let phone: number = req.body.store_phone;
            let address: string = req.body.store_address;
            let result = await StoreDb.runQuery(constants.insert, [branch, phone, address]);
            res.status(201).send(JSON.parse(JSON.stringify(result)).rowCount + " rows inserted sucessfully");
        }
        catch (error) {
            res.status(400).json({ error });
        }
    }
    async updateStore(req: Request, res: Response) {
        try {
            validate(req, res);
            console.log("update store");
            let id: number = req.body.store_id;
            let branch: string = req.body.store_branch;
            let phone: number = req.body.store_phone;
            let address: string = req.body.store_address;
            let result = await StoreDb.runQuery(constants.update, [branch, phone, address, id]);
            let rows: number = JSON.parse(JSON.stringify(result)).rowCount;
            res.status(201).send((rows > 0) ? rows + " rows updated successfully" : "Invalid ID...!!!");
        }
        catch (error) {
            console.log("service error");
            res.status(400).json({ error });
        }
    }
    async deleteStore(req: Request, res: Response) {
        try {
            let id: number = parseInt(req.params.id);
            let result = await StoreDb.runQuery(constants.delete, [id]);
            console.log(result)
            let rows: number = JSON.parse(JSON.stringify(result)).rowCount;
            res.status(201).send((rows > 0) ? rows + " rows deleted successfully" : "Invalid ID...!!!");
        }
        catch (error) {
            res.status(400).json({ error });
        }
    }
    async getStore(req: Request, res: Response) {
        try {
            let result: any = await StoreDb.runQuery(
                constants.selectById,
                [req.params.id]);
            res.status(200).send(result.rows);
        }
        catch (error) {
            res.status(400).json({ error });
        }
    }

    async getOrdersByStore(req: Request, res: Response) {
        try {
            // let result:any = await StoreDb.runQuery(constants.selectById,[req.params.id]);
            // res.status(200).send(result.rows);
            let results: any = await StoreDb.runQuery(
                global_constants.GET_ORDERS_BY_STORE,
                [parseInt(req.params.id)])
            logger.info(results)
            res.status(200).json(
                {
                    "message": "Successfull",
                    "status_code": global_constants.DB_SUCCESS,
                    "data": results.rows
                }
            )
        }
        catch (error) {
            logger.error(error)
            res.status(400).json({ error });
        }
    }

    async getMedicines(req: Request, res: Response) {
        let results: any = await StoreDb.runQuery(
            global_constants.GET_STORE_MEDICINES,
            [parseInt(req.params.id)])
        logger.info(results)
        res.status(200).json(
            {
                "message": "Successfull",
                "status_code": global_constants.DB_SUCCESS,
                "data": results.rows
            }
        )
    }
    async postMedicines(req: Request, res: Response) {
        try{
            let results: any = await StoreDb.runQuery(
                global_constants.POST_STORE_MEDICINE, [req.body.store_id,
                req.body.medicine_id,
                req.body.medicine_quantity]
            )
            logger.info(results);
            res.status(200).json(
                {
                    "message" : "Insertion Successful",
                    "status_code": global_constants.DB_SUCCESS,
                    "data": results.rows
                }
            )
        }
        catch(error){
            logger.error(error)
            res.status(400).json({ error });
        }
    }
}
export = new StoreServices();