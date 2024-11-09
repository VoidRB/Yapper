import type { NextFunction, Request, Response } from "express";

const Logger = (req: Request, _res: Response, next: NextFunction) => {
  req.time = new Date(Date.now()).toLocaleTimeString();
  console.log(
    `----Request INFO----\nMethod : ${req.method} \nHostname : ${req.hostname} \nRequest Path : ${req.path} \nRequest Time : ${req.time} \n--------------------`,
  );

  next();
};

export default Logger;
