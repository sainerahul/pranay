// Importing modules
import { Request, Response, NextFunction, Router } from 'express';
import MedicineService from '../../service/medicine/medicine';
import logger from '../../util/logger'
import authentication from '../../util/authentication';
import authorization from '../../util/authorization';

const router = Router();

//GLOBAL-PREVILIGED
router.get('/', (req: Request, res: Response, next: NextFunction) => {
    logger.info("request hit at " + req.originalUrl + ":" + req.method)
    let med = new MedicineService()
    med.get(res, req)
})

//GLOBAL-PREVILIGED
router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    console.log("From medicine/:id :get")
    logger.info("request hit at " + req.originalUrl + ":" + req.method)
    let med = new MedicineService()
    med.get(res, req, parseInt(req.params.id))
})

// ADMIN-PREVILIGED
router.post('/', authentication, authorization, (req: Request, res: Response, next: NextFunction) => {
    logger.info("request hit at " + req.originalUrl + ":" + req.method)
    let med = new MedicineService()
    med.post(res, req)
})

//ADMIN-PREVILIGED
router.put('/', authentication, authorization, (req: Request, res: Response, next: NextFunction) => {
    logger.info("request hit at " + req.originalUrl + ":" + req.method)
    let med = new MedicineService()
    med.put(res, req)
})

//ADMIN-PREVILIGED
router.delete('/', authentication, authorization, (req: Request, res: Response, next: NextFunction) => {
    logger.info("request hit at " + req.originalUrl + ":" + req.method)
    let med = new MedicineService()
    med.delete(res, req)
})
export = router
