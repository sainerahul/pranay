import * as Joi from 'joi';
import {Request,Response} from 'express';
const schema = Joi.object().keys({
    store_id: Joi.number().integer().positive().min(1),
    store_branch: Joi.string().min(6).required(),
    store_phone: Joi.number().min(6000000000).max(9999999999).required(),
    store_address: Joi.string().min(10).required()
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