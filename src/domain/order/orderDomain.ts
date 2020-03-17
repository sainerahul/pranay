import { Request, Response } from 'express';
import db from '../../db/connect';
import db_constants from '../../db/constants'
import { parse } from 'querystring';
import logger from '../../util/logger';
class OrderDomain {
    constructor() {

    }
    async post(req: Request, res: Response) {
        try {
            // let employee_id: number = parseInt(req.body.employee_id);
            let store_id: number = parseInt(req.body.store_id);
            let customer_id: number = parseInt(req.body.customer_id);
            let medicines: { medicine_id: number, quantity: number }[] = req.body.medicines;
            let amount: number = 0;
            let date: Date = new Date();
            let prices: number[] = [];
            for (let i: number = 0; i < medicines.length; i++) {
                let getPrice: any = await db.queryClient(
                    db_constants.GET_MEDICINE_PRICE,
                    [medicines[i].medicine_id]);
                let price: number = getPrice.rows[0].medicine_price;
                prices.push(price);
                amount += medicines[i].quantity * price;
            }
            let postOrders = await db.queryClient(db_constants.POST_ORDERS,
                [store_id, customer_id, amount, date]);

            let getOrderId: any = await db.queryClient(db_constants.GET_ORDER_ID, [date]);
            let order_id: number = getOrderId.rows[0].order_id;
            let postOrderDetails: any;
            for (let i: number = 0; i < medicines.length; i++) {
                amount = medicines[i].quantity * prices[i];
                postOrderDetails = await db.queryClient(db_constants.POST_ORDER_DETAILS,
                    [order_id, medicines[i].medicine_id, medicines[i].quantity, amount]);
            }
            if (postOrderDetails.rowCount == 1 && postOrders.rowCount == 1) {
                return "Order placed successfully!";
            }
        } catch (error) {
            logger.error("Error :: " + JSON.stringify(error))
            throw error;
        }
    }
    async get(req: Request, res: Response) {
        try {
            let order_id: number = parseInt(req.params.order_id);
            let getOrders: any = await db.queryClient(db_constants.GET_ORDER_DETAILS_BY_ID, [order_id]);
            let totalAmount: any = await db.queryClient(db_constants.GET_TOTAL_AMOUNT, [order_id]);
            logger.info(JSON.stringify(totalAmount.rows))
            if (totalAmount.rows.length != 0) {
                let result: any = { "Order_ID": order_id, "Medicines": getOrders.rows, "Total_Amount": totalAmount.rows[0].amount };
                return result;
            }
            else {
                throw "Invalid order ID!";
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async getAll(req: Request, res: Response) {
        try {
            let { rows }: any = await db.queryClient(db_constants.GET_ORDER_IDS);
            let orders: any[] = []
            for (let i: number = 0; i < rows.length; i++) {
                let getOrders: any = await db.queryClient(db_constants.GET_ORDER_DETAILS_BY_ID, [rows[i].order_id]);
                let totalAmount: any = await db.queryClient(db_constants.GET_TOTAL_AMOUNT, [rows[i].order_id]);
                let result: any = { "Order_ID": rows[i].order_id, "Medicines": getOrders.rows, "Total_Amount": totalAmount.rows[0].amount };
                orders.push(result);
            }
            return orders;
        } catch (error) {
            throw error;
        }
    }
    async delete(req: Request, res: Response) {
        try {
            let order_id: number = parseInt(req.params.order_id);
            let result: any = await db.queryClient(db_constants.DELETE_ORDER, [order_id]);
            return result.rowCount;
        } catch (error) {
            throw error;
        }
    }
}
export = new OrderDomain();