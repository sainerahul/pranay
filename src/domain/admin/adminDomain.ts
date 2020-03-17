import db from '../../db/connect';
import db_constants from '../../db/constants'
import express from 'express'
import bcrypt from 'bcryptjs'
import logger from '../../util/logger';
class AdminDomain {

    async get(id?: number) {
        if (id) {
            try {
                var results = await db.queryClient(db_constants.GET_ADMIN_WITH_ID, [id])
                return (results)
            }
            catch (e) {
                throw e;
            }
        }
        else {
            try {
                var results = await db.queryClient(db_constants.GET_ADMIN)
                return (results)
            }
            catch (e) {
                throw e
            }
        }
    }
    async post(req: express.Request) {

        try {
            let hash: string = await bcrypt.hash(req.body.admin_password, db_constants.SALT_COUNT)
            let results = await db.queryClient(
                db_constants.POST_ADMIN,
                [req.body.admin_name,
                req.body.admin_mail,
                    hash]
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
                db_constants.PUT_ADMIN,
                [parseInt(req.body.admin_id),
                req.body.admin_name,
                req.body.admin_mail,]
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
                db_constants.DELETE_ADMIN,
                [parseInt(req.body.admin_id)]
            )
            return (results)
        }
        catch (e) {
            throw e
        }
    }
    async post_access(req: express.Request) {
        try {
            let results = await db.queryClient(
                db_constants.POST_ACCESS,
                [req.body.route,
                req.body.customer,
                req.body.employee,
                req.body.admin]
            )
            return (results)
        }
        catch (e) {
            throw e
        }
    }

    async loginAdmin(req: express.Request) {
        try {
            let results = await db.queryClient(
                db_constants.FIND_USER,
                [req.body.admin_mail]
            )
            return (results)
        }
        catch (e) {
            throw e
        }
    }
}

export = AdminDomain