import express from 'express'
import MedicineDomain from '../../domain/medicine/medicine'
import db_constatns from '../../db/constants'
import logger from '../../util/logger'
import validate from '../../util/medicineValidator'

class MedicineService {
    async get(res: express.Response, req?: express.Request, id?: number) {
        if (id) {
            try {
                let med = new MedicineDomain()
                let results = await med.get(id)
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
                let med = new MedicineDomain()
                let results = await med.get()
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
            validate(req,res);
            let med = new MedicineDomain()
            let results = await med.post(req)
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
            logger.info("This is from catch block")
            logger.error(e)
            res.status(404).send(e)
        }
    }
    async put(res: express.Response, req: express.Request) {
        try {
            validate(req,res);
            let med = new MedicineDomain()
            let results = await med.put(req)
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
            let med = new MedicineDomain()
            let results = await med.delete(req)
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
}

export = MedicineService