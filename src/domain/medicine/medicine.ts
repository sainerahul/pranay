import db from '../../db/connect';
import db_constants from '../../db/constants'
import express from 'express'

class MedicineDomain {

    async get(id?: number) {
        if (id) {
            try {
                var results = await db.queryClient(db_constants.GET_MEDICINE_WITH_ID, [id])
                return (results)
            }
            catch (e) {
                throw e;
            }
        }
        else {
            try {
                var results = await db.queryClient(db_constants.GET_MEDICINE)
                return (results)
            }
            catch (e) {
                throw e
            }
        }
    }
    async post(req: express.Request) {

        try {
            let results = await db.queryClient(
                db_constants.POST_MEDICINE,
                [req.body.medicine_name,
                req.body.medicine_manufacturer,
                parseInt(req.body.medicine_price)]
            )

            return (results)
        }
        catch (e) {
            throw e
        }
    }

    async put(req: express.Request) {
        try {
            let results = await db.queryClient(
                db_constants.PUT_MEDICINE,
                [parseInt(req.body.medicine_id),
                req.body.medicine_name,
                req.body.medicine_manufacturer,
                parseInt(req.body.medicine_price)]
            )

            return (results)
        }
        catch (e) {
            throw e
        }
    }
    async delete(req: express.Request) {
        try {
            let results = await db.queryClient(
                db_constants.DELETE_MEDICINE,
                [parseInt(req.body.medicine_id)]
            )
            return (results)
        }
        catch (e) {
            throw e
        }
    }
}

export = MedicineDomain