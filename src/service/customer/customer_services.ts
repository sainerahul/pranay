import CustomerDb from '../../domain/customer/customer_db';
import { Request, Response } from 'express';
import constants from '../../domain/customer/constants';
import validate from '../../util/customerValidator';
import db_constant from '../../db/constants'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import logger from '../../util/logger';
import global_constants from '../../db/constants'
import { CustomRequest } from '../../customRequest';

class StoreServices {
    constructor() {
    }
    async getAllCustomers(req: Request, res: Response) {
        try {
            let result: any = await CustomerDb.runQuery(constants.select, []);
            res.status(200).send(result.rows);
        }
        catch (error) {
            res.status(400).json({ error });
        }
    }
    async insertCustomer(req: Request, res: Response) {
        try {
            let name: string = req.body.customer_name;
            let email: string = req.body.customer_email;
            let phone: number = req.body.customer_phone;
            let address: string = req.body.customer_address;
            let password: string = req.body.customer_password;
            let find_results: any = await CustomerDb.runQuery(constants.FIND_USER, [email])
            if (find_results.rowCount >= 1) {
                // user with same email exists in db
                logger.info("User with same email already exits.")
                res.status(201).json(
                    {
                        "status_code": global_constants.USER_ALREADY_EXITS,
                        "error": {
                            "message": "User with same email already exists"
                        },
                    }
                )
            }
            else {
                logger.info("Inserting a new user")
                let hash: string = await bcrypt.hash(password, db_constant.SALT_COUNT)
                let result = await CustomerDb.runQuery(constants.insert, [name, email, phone, address, hash]);
                logger.info(result)
                res.status(201).
                    json({
                        "status_code": global_constants.USER_CREATED,
                        "error": {
                            "message": "User with same email already exists"
                        },
                    })
                // send(JSON.parse(JSON.stringify(result)).rowCount + " rows inserted sucessfully");
            }
        }
        catch (error) {
            logger.error(error)
            res.status(400).json({ error });
        }
    }
    async updateCustomer(req: Request, res: Response) {
        try {
            validate(req, res);
            let name: string = req.body.customer_name;
            let email: string = req.body.customer_email
            let phone: number = req.body.customer_phone;
            let address: string = req.body.customer_address;
            let password: string = req.body.customer_password;
            let id: number = parseInt(req.body.customer_id);
            let find_results: any = await CustomerDb.runQuery(constants.FIND_USER, [email])

            let result = await CustomerDb.runQuery(constants.update, [name, email, phone, address, password, id]);
            let rows: number = JSON.parse(JSON.stringify(result)).rowCount;
            res.status(201).send((rows > 0) ? rows + " rows updated successfully" : "Invalid ID...!!!");
        }
        catch (error) {
            console.log("service error");
            res.status(400).json({ error });
        }
    }
    async deleteCustomer(req: Request, res: Response) {
        try {
            let id: number = parseInt(req.params.id);
            let result = await CustomerDb.runQuery(constants.delete, [id]);
            console.log(result)
            let rows: number = JSON.parse(JSON.stringify(result)).rowCount;
            res.status(201).send((rows > 0) ? rows + " rows deleted successfully" : "Invalid ID...!!!");
        }
        catch (error) {
            res.status(400).json({ error });
        }
    }
    async loginCustomer(req: Request, res: Response) {
        try {
            let results: any = await CustomerDb.runQuery(constants.FIND_USER, [req.body.customer_email]) //TODO:Validation
            // entered email is a valid user email
            if (results.rowCount >= 1) {
                logger.info("User Found")
                let user: any = await CustomerDb.runQuery(constants.selectById, [results.rows[0].customer_id])
                bcrypt.compare(req.body.password, user.rows[0].customer_password)
                    .then(isAuth => { //isAuth is bool value
                        if (isAuth) {
                            const loginToken = jwt.sign(
                                {
                                    id: user.rows[0].customer_id,
                                    role: "customer"
                                },
                                global_constants.JWT_SECRET_TOKEN,
                                {
                                    expiresIn: "1h"
                                }
                            )
                            logger.info(({
                                "status": global_constants.LOGIN_SUCCESSFUL,
                                "message": "Auth successfull",
                                "Token": loginToken
                            }))
                            res.send({
                                "status": global_constants.LOGIN_SUCCESSFUL,
                                "message": "Auth successfull",
                                "Token": loginToken
                            })
                        }
                        else {
                            logger.info("Auth failed")
                            res.json({
                                "status": global_constants.LOGIN_FAILED,
                                "message": "Auth failed"
                            })
                        }
                    })
                    .catch(e => {
                        //TODO : ADD a status key corresponding to encryption error
                        logger.error("{message : 'Internal Server Error', error : " + e)
                        res.send({
                            "status": global_constants.LOGIN_FAILED,
                            "error":
                                { "message": e.message }
                        })
                    })
            }
            else {
                logger.info("User Not Found")
                res.json({
                    "status": global_constants.LOGIN_FAILED,
                    "error": { "status": "Auth Failed", "message": "No user found" }
                })
            }
        }
        catch (e) {
            //TODO : ADD a status key corresponding to request error
            logger.error("{message : 'Unkown error occurred by request', error : " + e)
            res.status(404).send({
                "status": global_constants.LOGIN_FAILED,
                "error":
                {
                    "message": e.message
                }
            })
        }
    }
    async getCustomer(req: Request, res: Response) {
        try {
            let result: any = await CustomerDb.runQuery(constants.selectById, [req.params.id]);
            res.status(200).send(result.rows);
        }
        catch (error) {
            res.status(400).json({ error });
        }
    }

    async getOrdersByCustomer(req: Request, res: Response) {

        // FUNC :SHOW ALL ORDERS OF THE CURRENT CUSTOMER (CUSTOEMR_ID IS IN DECODED DATA OF REQ OBJ)
        try {
            let custom_req = req as CustomRequest
            let authentication_data: any = custom_req.decodedToken
            logger.info(JSON.stringify(authentication_data))
            logger.info("customer id is ::" + authentication_data.id)
            // GET ALL ORDERS USING THE STORE_ID (FROM EMP INFO) FROM ORDERS TABLE.
            let results: any = await CustomerDb.runQuery(
                global_constants.GET_ORDERS_BY_CUSTOMER_ID,
                [parseInt(authentication_data.id)])

            logger.info("CUSTOMER_ORDERS ::" + JSON.stringify(results))

            // SEND RESULT
            res.status(200).json(
                {
                    "message": "Successfull",
                    "status_code": global_constants.DB_SUCCESS,
                    "data": results.rows
                }
            )
        }
        catch (error) {
            res.status(400).json({
                "error": {
                    "message": "Service Error",
                    "error": JSON.stringify(error)
                }
            });
        }
    }

    async getOrderDetailsByCustomer(req: Request, res: Response) {
        // FUNC :TO SHOW THE ORDER_ID SPECIFIC DETAILS IF THE ORDER PRESENT IN THE CORRESPONDING TO CUSTOMER

        //order_id is present, Response needs to contain order_details also
        // TODO: CHECK WHEATEHR THE ORDER IS PRESENT IN THE CORRESPONDING STORE OF THE EMP
        // SEND THE ORDER DETAILS
        try {
            // GET THE EMP STORE ID
            // let employee_results: any = await EmployeeDb.runQuery(
            //     global_constants.GET_EMPLOYEE_STORE_ID,
            //     [parseInt(req.params.id)])

            // logger.info("employee_results ::" + JSON.stringify(employee_results))

            let custom_req = req as CustomRequest
            let authentication_data: any = custom_req.decodedToken
            logger.info(JSON.stringify(authentication_data))
            logger.info("customer id is ::" + authentication_data.id)
            // GET THE ORDER DETAILS FOR ORDER_ID
            let results_orders_table: any = await CustomerDb.runQuery(
                global_constants.GET_ORDER_BY_ID,
                [parseInt(req.params.order_id)])

            logger.info("ORDER TABLE :" + JSON.stringify(results_orders_table))

            logger.info("results_orders_table.rows.customer_id ::" + JSON.stringify(results_orders_table.rows[0].customer_id))

            logger.info("results_orders_table.rows.customer_id ::" + JSON.stringify(results_orders_table.rows[0].customer_id))
            //  Given order_id is present in the orders table && the order corresponds to the given employee
            if ((results_orders_table.rowCount != 0)
                && (results_orders_table.rows[0].customer_id == parseInt(authentication_data.id))) { //Order is corresponding to the customer

                //FETCH DETAILS FROM ORDER_DETAILS TABLE  
                let results_order_details = await CustomerDb.runQuery(
                    global_constants.GET_ORDER_DETAILS, [parseInt(req.params.order_id)])

                logger.info("ORDER_DETAILS :" + JSON.stringify(results_order_details))

                res.status(200).json(
                    {
                        "message": "Successful",
                        "status_code": global_constants.DB_SUCCESS,
                        "data": {
                            "order": results_orders_table,
                            "order_details": results_order_details
                        }
                    }
                )
            }
            else { //Order is not corresponding to the customer
                res.status(200).json(
                    {
                        "message": "Auauthorized Request",
                        "status_code": global_constants.UNAUTHORIZED_STATUS,
                    }
                )

            }

        }
        catch (error) {
            logger.info(JSON.stringify(error))
            res.status(400).json({
                "error": {
                    "message": "Service Error",
                    "error": JSON.stringify(error)
                }
            });
        }
    }
}
export = new StoreServices();