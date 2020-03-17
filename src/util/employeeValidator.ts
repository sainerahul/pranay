import * as Joi from 'joi';
import {Request,Response} from 'express';
const schema = Joi.object().keys({
    employee_id: Joi.number().integer().positive().min(1),
    employee_name: Joi.string().required(),
    employee_email: Joi.string().min(6).required(),
    employee_phone: Joi.number().min(6000000000).max(9999999999).required(),
    employee_address: Joi.string().min(5).required(),
    employee_password: Joi.string().required(),
    store_employee_name: Joi.string().required()
});
const validate=(req: Request,res: Response)=>{
    const { error } = Joi.validate(req.body,schema,{abortEarly:false});
    let errors: any={};
    if(error!=null){
        for(let i:number =0; i<error.details.length; i++){
            errors["Error"+i]=error.details[i].message;
        }
        throw errors;
    }
}
export = validate;