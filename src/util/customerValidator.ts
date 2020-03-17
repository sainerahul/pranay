import * as Joi from 'joi';
import { Request, Response } from 'express';
const schema = Joi.object().keys({
    customer_id: Joi.number().integer().positive().min(1),
    customer_name: Joi.string().min(4).required(),
    customer_address: Joi.string().min(10).required(),
    customer_phone: Joi.number().min(6000000000).max(9999999999).required(),
    customer_email: Joi.string().email().required(),
    customer_password: Joi.string().min(8).required()
});
const validate = (req: Request, res: Response) => {
    const { error } = Joi.validate(req.body,schema,{abortEarly: false});
    let errors: any = {};
    if(error!=null){
        for(let i: number = 0;i<error.details.length;i++){
            errors["error"+i] = error.details[i].message;
        }
        throw errors;
    }
}
export = validate;