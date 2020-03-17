import { Request, Response, NextFunction } from "express";
import logger = require("./logger");
import { CustomRequest } from "../customRequest";
import db from '../db/connect';
import db_constants from '../db/constants'
import e = require("express");

// class Authorization {
const Authorization = async (req: Request, res: Response, next: NextFunction) => {
    try {

        let KEY;

        // Checking whether it is a regular url to prep the `KEY`
        if (req.baseUrl == req.originalUrl) {
            //No extra parsing is required
            KEY = (req.method) + "_" + (req.baseUrl.slice(1, req.baseUrl.length)).toUpperCase();
        }
        // Checking whether it is a specific url to prep the `KEY`
        else {
            //Extra parsing is required
            let values = req.originalUrl.split('/')
            if ((values.length == 5) || (values.length == 4)) {
                KEY = (req.method) + "_" + (values[1]).toUpperCase() + "/" + (values[3]).toUpperCase();
            }
            else { //values.length == 3
                KEY = (req.method) + "_" + (values[1]).toUpperCase();
            }
        }
        logger.info("KEY ::" + KEY)

        // Converting the request to CustomRequest
        let custom_req = req as CustomRequest
        let data: any = custom_req.decodedToken

        logger.info(JSON.parse(JSON.stringify(data)))

        // Quering the authorization permission
        let results = await db.queryClient(db_constants.GET_ACCESS, [KEY])
        logger.info("RESULTS ::" + JSON.stringify(results))

        //Handling the where the `KEY` is not present in the DB
        if (results.rowCount == 0) {
            logger.info("The KEY :" + KEY + " is not identified in access table")
            // throw Error("Route Not found in access list")
            res.json({
                "message": "Route not accessible",
                "data": []
            })
            return;
        }

        //Verifying the request authenticated and authorized
        //Comparing the data.id => id in token with id in the params or body 
        // (req.body.employee_id is not required since all emp ops are done by admin)
        if (JSON.parse(JSON.stringify(data)).id == (req.params.id || req.body.customer_id)
            && results.rows[0][data.role]) {
            //Now the request is authenticated and authorized to access the resource
            next()
        }
        //If the request has admin privilige then allow it 
        else if (data.role == 'admin') {
            logger.info("ADMIN: I'AM INEVITABLE")
            next()
        }
        else {
            // throw "Insuccifient permission"
            res.json({
                "message": "Insuccifient permission",
                "data": []
            })
        }
    }
    catch (error) {
        logger.error(error)
        throw error
    }
};

// }
export = Authorization