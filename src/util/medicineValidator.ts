import * as Joi from 'joi';
import {Request,Response} from 'express';
const schema = Joi.object().keys({
    medicine_id: Joi.number().integer().positive().min(1),
    medicine_name: Joi.string().min(5).required(),
    medicine_manufacturer: Joi.string().min(5).required(),
    medicine_price: Joi.number().required(),
    token: Joi.string().required()
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