import EmployeeDb from '../../domain/employee/employee_db';
import { Request, Response } from 'express';
import constants from '../../domain/employee/constants';
import validate from '../../util/employeeValidator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import logger from '../../util/logger';
import global_constants from '../../db/constants'
class EmployeeServices {
    constructor() {
    }
    async loginEmployee(req: Request, res: Response) {
        try {
            let results: any = await EmployeeDb.runQuery(constants.FIND_EMPLOYEE, [req.body.employee_email]) //TODO:Validation
            // entered email is a valid user email
            if (results.rowCount >= 1) {
                logger.info("User Found")
                let user: any = await EmployeeDb.runQuery(constants.SELECT_EMPLOYEE_BY_ID, [results.rows[0].employee_id])
                bcrypt.compare(req.body.password, user.rows[0].employee_password)
                    .then(isAuth => { //isAuth is bool value
                        if (isAuth) {
                            const loginToken = jwt.sign(
                                {
                                    id: user.rows[0].employee_id,
                                    role: "employee"
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
                        logger.error("{status: global_constants.LOGIN_SUCCESSFUL, message : 'Internal Server Error', error : " + e)
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
                    { "message": e.message }
            })
        }
    }
    async getAllEmployees(req: Request, res: Response) {
        try {
            let result: any = await EmployeeDb.runQuery(constants.SELECT_EMPLOYEE, []);
            res.status(200).send(result.rows);
        }
        catch (error) {
            res.status(400).json({ error });
        }
    }
    async getEmployee(req: Request, res: Response) {
        try {
            console.log(req.params.id);
            let result: any = await EmployeeDb.runQuery(constants.SELECT_EMPLOYEE_WITHID, [req.params.id]);
            res.status(200).send(result.rows);
        }
        catch (error) {
            res.status(400).json({ error });
        }
    }
    async insertEmployee(req: Request, res: Response) {
        try {
            validate(req, res);
            let name: string = req.body.employee_name;
            let email: string = req.body.employee_email;
            let phone: number = req.body.employee_phone;
            let address: string = req.body.employee_address;
            let password: string = req.body.employee_password;
            let employee_name: string = req.body.store_employee_name;
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, async function (err, hash) {
                    let result = await EmployeeDb.runQuery(constants.INSERT_EMPLOYEE, [name, email, phone, address, hash, employee_name]);
                    console.log(result);
                    res.status(201).send(JSON.parse(JSON.stringify(result)).rowCount + " rows inserted sucessfully");
                })
            })
        }
        catch (error) {
            console.log(error);
            res.status(400).json({ error });
        }
    }
    async updateEmployee(req: Request, res: Response) {
        try {
            validate(req, res);
            let name: string = req.body.employee_name;
            let email: string = req.body.employee_email
            let phone: number = req.body.employee_phone;
            let address: string = req.body.employee_address;
            let password: string = req.body.employee_password;
            let id: number = parseInt(req.body.employee_id);
            let employee_name: string = req.body.store_employee_name
            let result = await EmployeeDb.runQuery(constants.UPDATE_EMPLOYEE, [name, email, phone, address, password, employee_name, id]);
            let rows: number = JSON.parse(JSON.stringify(result)).rowCount;
            res.status(201).send((rows > 0) ? rows + " rows updated successfully" : "Invalid ID...!!!");
        }
        catch (error) {
            console.log("service error");
            res.status(400).json({ error });
        }
    }
    async deleteEmployee(req: Request, res: Response) {
        try {
            let id: number = parseInt(req.params.id);
            let result = await EmployeeDb.runQuery(constants.DELETE_EMPLOYEE, [id]);
            console.log(result)
            let rows: number = JSON.parse(JSON.stringify(result)).rowCount;
            res.status(201).send((rows > 0) ? rows + " rows deleted successfully" : "Invalid ID...!!!");
        }
        catch (error) {
            res.status(400).json({ error });
        }
    }

    async getOrdersByEmployee(req: Request, res: Response) {

        // FUNC :SHOW ALL ORDERS OF THE EMPLOYEE WORKING STORE
        try {
            // GET THE EMPLOYEE INFO USING THE EMP_ID.
            // let employee_results: any = await EmployeeDb.runQuery(
            //     global_constants.GET_EMPLOYEE_STORE_ID,
            //     [parseInt(req.params.id)])

            // logger.info("employee_results ::" + JSON.stringify(employee_results))

            // GET ALL ORDERS USING THE STORE_ID (FROM EMP INFO) FROM ORDERS TABLE.
            let results: any = await EmployeeDb.runQuery(
                global_constants.GET_ORDER_DETAILS_BY_EMPLOYEE_ID,
                [parseInt(req.params.id)])

            logger.info("EMPLOYEE_ORDERS ::" + JSON.stringify(results))

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
            res.status(400).json({ error });
        }
    }

    async getOrderDetailsByEmployee(req: Request, res: Response) {
        // FUNC :TO SHOW THE ORDER_ID SPECIFIC DETAILS IF THE ORDER PRESENT IN THE CORRESPONDING EMP_STORE

        //order_id is present, Response needs to contain order_details also
        // TODO: CHECK WHEATEHR THE ORDER IS PRESENT IN THE CORRESPONDING STORE OF THE EMP
        // SEND THE ORDER DETAILS
        try {
            // GET THE EMP STORE ID
            let employee_results: any = await EmployeeDb.runQuery(
                global_constants.GET_EMPLOYEE_STORE_ID,
                [parseInt(req.params.id)])

            console.log("employee_results :: "+JSON.stringify(employee_results.rows[0].employee_store_id))

            // logger.info("employee_results ::" + JSON.stringify(employee_results))

            // GET THE ORDER DETAILS FOR ORDER_ID
            let results_orders_table: any = await EmployeeDb.runQuery(
                global_constants.GET_ORDER_BY_ID,
                [parseInt(req.params.order_id)])

            logger.info("ORDER TABLE :" + JSON.stringify(results_orders_table))

            logger.info("results_orders_table.rows.employee_id ::" + JSON.stringify(results_orders_table.rows.employee_id))

            logger.info("results_orders_table.rows.employee_id ::" + JSON.stringify(results_orders_table.rows[0].employee_id))
            //  Given order_id is present in the orders table && the order corresponds to the given employee
            if ((results_orders_table.rowCount != 0)
                && (results_orders_table.rows[0].store_id == parseInt(employee_results.rows[0].employee_store_id))) { //Order is corresponding to the employee present store

                //FETCH DETAILS FROM ORDER_DETAILS TABLE  
                let results_order_details = await EmployeeDb.runQuery(
                    global_constants.GET_ORDER_DETAILS, [parseInt(req.params.order_id)])

                logger.info("ORDER_DETAILS :" + JSON.stringify(results_order_details))

                res.status(200).json(
                    {
                        "message": "Successful",
                        "status_code": global_constants.DB_SUCCESS,
                        // "data": {
                        //     "order": results_orders_table,
                        //     "order_details": results_order_details
                        // }
                        "data":results_order_details
                    }
                )
            }
            else { //Order is not corresponding to the employee present store
                res.status(200).json(
                    {
                        "message": "Auauthorized Request",
                        "status_code": global_constants.UNAUTHORIZED_STATUS,
                    }
                )

            }

        }
        catch (error) {
            res.status(400).json({ error });
        }
    }
}
export = new EmployeeServices();