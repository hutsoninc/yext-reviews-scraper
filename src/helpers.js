exports.delay = function (time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}

exports.getDateString = function (config) {

    const delimiter = config.delimiter || '/';
    const format = config.format || 'mm:dd:yyyy';
    let distanceTimestamp = 0;

    if (config.distance) {
        distanceTimestamp = config.distance * 24 * 60 * 60 * 1000;
    }

    let d = new Date(Date.now() + distanceTimestamp);
    let dM = config.month || d.getMonth() + 1; // use this month if none is provided
    let dD = config.day || d.getDate(); // use today if day is not provided
    let dY = config.year || d.getFullYear(); // use this year if none is provided

    if (dM < 10) {
        dM = '0' + dM;
    }

    if (dD < 10) {
        dD = '0' + dD;
    }

    if (format.toLowerCase() === 'yyyymmdd') {
        return dY + dM + dD;
    } else if (format.toLowerCase() === 'mm:dd:yyyy') {
        return dM + delimiter + dD + delimiter + dY;
    }

}