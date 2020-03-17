import express from 'express'
import AdminDomain from '../../domain/admin/adminDomain'
import db_constatns from '../../db/constants'
import logger from '../../util/logger'
import db from '../../db/connect'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

class AdminService {
    async get(res: express.Response, req?: express.Request, id?: number) {
        if (id) {
            try {
                let admin = new AdminDomain()
                let results = await admin.get(id)
                logger.info(results)
                res.send(results)
            }
            catch (e) {
                logger.error(e)
                res.status(404).send(e)
            }
        }
        else {
            try {
                let admin = new AdminDomain()
                let results = await admin.get()
                logger.info(results)
                res.send(results)
            }
            catch (e) {
                logger.error(e)
                res.status(404).send(e)
            }
        }
    }

    async post(res: express.Response, req: express.Request) {
        try {
            // validate(req, res);
            let admin = new AdminDomain()
            let results = await admin.post(req)
            logger.info(results)
            if (results.rowCount == 1) {
                res.json({
                    "status": "SUCCESS",
                    "status-code": db_constatns.DB_SUCCESS,
                    "data": results.rows,
                })
            }
            else {
                logger.error(results)
                res.json({
                    "status": "FAILURE",
                    "status-code": db_constatns.DB_FAILURE,
                    "message": "Unexpected error encountered",
                })
            }
        }
        catch (e) {
            logger.error(e)
            res.status(404).send(e)
        }
    }
    async put(res: express.Response, req: express.Request) {
        try {
            // validate(req, res);
            let admin = new AdminDomain()
            let results = await admin.put(req)
            logger.info(results)
            if (results.rowCount == 1) {
                res.json({
                    "status": "SUCCESS",
                    "status-code": db_constatns.DB_SUCCESS,
                    "data": results.rows,
                })
            }
            else {
                logger.error(results)
                res.json({
                    "status": "FAILURE",
                    "status-code": db_constatns.DB_FAILURE,
                    "message": "Unexpected error encountered",
                })
            }
        }
        catch (e) {
            logger.error(e)
            res.status(404).send(e)
        }
    }
    async delete(res: express.Response, req: express.Request) {
        try {
            let admin = new AdminDomain()
            let results = await admin.delete(req)
            logger.info(results)
            if (results.rowCount == 1 && results.command == "DELETE") {
                res.json({
                    "status": "SUCCESS",
                    "status-code": db_constatns.DB_SUCCESS,
                    "data": results.rows,
                })
            }
            else {
                logger.error(results)
                res.json({
                    "status": "FAILURE",
                    "status-code": db_constatns.DB_FAILURE,
                    "message": "Unexpected error encountered",
                })
            }
        }
        catch (e) {
            logger.error(e)
            res.status(404).send(e)
        }
    }

    async post_access(req: express.Request, res: express.Response) {
        try {
            let admin = new AdminDomain()
            let results = await admin.post_access(req)
            logger.info(results)
            if (results.rowCount == 1) {
                res.json({
                    "status": "SUCCESS",
                    "status-code": db_constatns.DB_SUCCESS,
                    "data": results.rows,
                })
            }
            else {
                logger.error(results)
                res.json({
                    "status": "FAILURE",
                    "status-code": db_constatns.DB_FAILURE,
                    "message": "Unexpected error encountered",
                })
            }
        }
        catch (e) {
            logger.error(e)
            res.status(404).send(e)
        }
    }

    async loginAdmin(req: express.Request, res: express.Response) {
        try {
            // let results: any = await d.runQuery(constants.FIND_USER, [req.body.customer_email]) //TODO:Validation
            let admin = new AdminDomain()
            let results:any = await admin.loginAdmin(req)
            // entered email is a valid user email
            if (results.rowCount >= 1) {
                logger.info("User Found")
                // I knew the db_constatns spelling is wrong, anyway use it coz it works!!
                let user: any = await db.queryClient(db_constatns.SELECT_ADMIN_BY_ID, [results.rows[0].admin_id])
                bcrypt.compare(req.body.password, user.rows[0].admin_password_hash)
                    .then(isAuth => { //isAuth is bool value
                        if (isAuth) {
                            const loginToken = jwt.sign(
                                {
                                    id: user.rows[0].admin_id,
                                    role: "admin"
                                },
                                db_constatns.JWT_SECRET_TOKEN,
                                {
                                    expiresIn: "1h"
                                }
                            )
                            logger.info(({
                                "message": "Auth successfull",
                                "Token": loginToken
                            }))
                            res.send({
                                "message": "Auth successfull",
                                "Token": loginToken
                            })
                        }
                        else {
                            logger.info("Auth failed")
                            res.send("Auth failed")
                        }
                    })
                    .catch(e => {
                        //TODO : ADD a status key corresponding to encryption error
                        logger.error("{message : 'Internal Server Error', error : " + e)
                        res.send({
                            "error":
                                { "message": e.message }
                        })
                    })
            }
            else {
                logger.info("User Not Found")
                res.json({ "error": { "status": "Auth Failed", "message": "No user found" } })
            }
        }
        catch (e) {
            //TODO : ADD a status key corresponding to request error
            logger.error("{message : 'Unkown error occurred by request', error : " + e)
            res.status(404).send({
                "error":
                    { "message": e.message }
            })
        }
    }
}

export = AdminService