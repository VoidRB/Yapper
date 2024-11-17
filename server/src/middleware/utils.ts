import type { NextFunction, Request, Response } from "express";

const Logger = (req: Request, _res: Response, next: NextFunction) => {
  req.time = new Date(Date.now()).toLocaleTimeString();
  console.log(
    `▔▔▔▔▔▔[Request INFO]▔▔▔▔▔▔
   Method    : ${req.method} 
  Hostname   : ${req.hostname} 
Request Path : ${req.path} 
Request Time : ${req.time} 
▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁`,
  );

  next();
};

export default Logger;
