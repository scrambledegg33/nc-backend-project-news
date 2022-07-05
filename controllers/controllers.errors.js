

exports.handleInvalidPaths = (req, res) => {
    res.status(404).send({msg: 'path not found'});
}



exports.handlePsqlErrors = (err, req, res, next) => {
    if (err.code === '22P02') {
        res.status(400).send({ msg: 'Invalid input' });
    } else next(err);
  };

  
exports.handleCustomErrors = (err, req, res, next) => {
    console.log(err, 'handle custom error');
    if (err.status && err.msg){
        res.status(err.status).send({ msg: err.msg});
    } else {
        next(err);
    }
}

exports.handle500s = (err, req, res, next) => {
    console.log(err, 'error 500');
    res.status(500).send({msg: 'Server Error'});
};