import Express from 'express';
export interface CustomRequest extends Express.Request {
    decodedToken: string | object;
}