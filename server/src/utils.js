const Logger = (req, _res, next) => {
  req.time = new Date(Date.now()).toLocaleTimeString();
  console.log(
    `----Request INFO----\nMethod : ${req.method} \nHostname : ${req.hostname} \nRequest Path : ${req.path} \nRequest Time : ${req.time} \n--------------------`
  );

  next();
};

export default Logger;
