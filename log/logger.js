var winston = require('winston');
let date = require('date-and-time');


const logError = winston.createLogger({
    level: 'error',
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: __dirname + '/error.log'})
    ]
});

const logJoin = winston.createLogger({
   level:'info',
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: __dirname + '/request.log'})
    ]
});

const logDebug = winston.createLogger({
    level:'debug',
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: __dirname + '/debug.log'})
    ]
});


function error(err){
    err += " || time: " + date.format(new Date(), 'DD/MM/YYYY HH:mm:ss');
    logError.log('error',err)
}
function join(user){
    var req = "nickname: " + user.nick + ", IP: " + user.ip + " || Time: " + date.format(new Date(), 'DD/MM/YYYY HH:mm:ss');
    logJoin.log('info',req)
}

function debug(req){
    logRequest.log('debug',req)
}

exports.error = error;
exports.join = join;
exports.debug = debug;