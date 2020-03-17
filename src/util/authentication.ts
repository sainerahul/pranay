import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import global_constatns from '../db/constants';
import logger from './logger';
import { CustomRequest } from '../customRequest';


const authentication =
    (req: Request, res: Response, next: NextFunction) => {
        try {
            // Fetching token either from body or hearders
            const token: string = req.body.token ? req.body.token : req.headers.authorization?.split(" ")[1]
            logger.info("Token ::" + token)

            // Verifing the token is it valid or not
            let decode: any;
            jwt.verify(token, global_constatns.JWT_SECRET_TOKEN, (err, decoded) => {
                if (!err) {
                    logger.info("Verified Successfully :: !!" + JSON.stringify(decoded))
                    decode = decoded
                }
                else {
                    logger.info("Error encountered !! ::" + JSON.stringify(err))
                    throw err.message
                }
            })
            // console.log(""+jwt.verify(token, global_constatns.JWT_SECRET_TOKEN))

            let custom_req = req as CustomRequest;
            // Reading the data
            custom_req.decodedToken = decode;
            logger.info("Decode ::" + JSON.stringify(custom_req.decodedToken))
            //********The following code is only meant to make logging more meaningful only************* 
            // Checking whether it is a regular or 
            logger.info("originalUrl ::" + req.originalUrl)
            logger.info("baseUrl ::" + req.baseUrl)
            if (req.baseUrl == req.originalUrl) {
                logger.info("Authentication Successfull for :"
                    + (req.method) + "_" + (req.baseUrl.slice(1, req.baseUrl.length)).toUpperCase())
            }
            // Checking whether it is a specific url 
            else {
                let values = req.originalUrl.split('/')
                logger.info("values length ::" + values.length)
                logger.info("values are " + values)
                if ((values.length == 5) || (values.length == 4)) {
                    logger.info("Authentication Successfull for :"
                        + (req.method) + "_" + (values[1]).toUpperCase() + "/" + (values[3]).toUpperCase());
                }
                if (values.length == 3) {
                    // verify the url and every other thing
                    logger.info("Authentication Successfull for :"
                        + (req.method) + "_" + (values[1]).toUpperCase());
                }
            }
            next()
        }
        catch (error) {
            logger.error(({
                status: 'Authentication failed',
                message: 'Invalid Token',
                error: JSON.stringify(error.message)

            }))
            return res.status(401).send({
                status: 'Authentication failed',
                message: 'Invalid Token',
                error: JSON.stringify(error.message)
            })
        }
    }

export =  authentication; 