
export function normalizePort(value: any): any {
    let portValue = parseInt(value, 10);

    if (isNaN(portValue)){
        console.log(portValue);
        return value;
    }

    if (portValue > 0){
        console.log(portValue);
        return portValue;
    }

    return false;

}

export function onListening(server: any, debug: any) {
    const addr = server.address();
    const bind = typeof addr === 'string' ?
        'pipe' + addr : 'port' + addr.port;
    debug('OnListening on ' + bind);
}

export function onError(error: any, port: any) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = typeof port === 'string' ?
        'Pipe' + port : 'Port' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

