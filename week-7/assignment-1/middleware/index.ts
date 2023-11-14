import * as jwt from 'jsonwebtoken';
import {Response} from 'express';
const SECRET = 'SECr3t';

const authenticateJwt = (req : any, res :  Response, next : any) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, SECRET, (err : any, user : any) => {
        if (err) {
          return res.sendStatus(403);
        }
        req.userId = user.id;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };

export default {authenticateJwt, SECRET};
