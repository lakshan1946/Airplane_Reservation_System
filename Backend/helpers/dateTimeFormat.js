const ymd = (dateobj) => {
    const year = dateobj.getFullYear();
    const month = (`0${dateobj.getMonth() + 1}`).slice(-2);
    const date = (`0${dateobj.getDate()}`).slice(-2);

    const ymd = `${year}-${month}-${date}`;
    return ymd;
}

const hms = (dateobj) => {
    const hour = (`0${dateobj.getHours()}`).slice(-2);
    const minute = (`0${dateobj.getMinutes()}`).slice(-2);
    const second = (`0${dateobj.getSeconds()}`).slice(-2);

    const hms = `${hour}:${minute}:${second}`;
    return hms;
}

const ymdhms = (dateobj) => {
    const ymd1 = ymd(dateobj);
    const hms1 = hms(dateobj);

    return `${ymd1} ${hms1}`;
}

const utc_time = (dateobj) => {
    const year = dateobj.getUTCFullYear();
    const month = (`0${dateobj.getUTCMonth() + 1}`).slice(-2);
    const date = (`0${dateobj.getUTCDate()}`).slice(-2);
    const hour = (`0${dateobj.getUTCHours()}`).slice(-2);
    const minute = (`0${dateobj.getUTCMinutes()}`).slice(-2);
    
    const format = `${year}-${month}-${date} ${hour}:${minute}`;
    return format;
}

export { ymd, hms, ymdhms, utc_time};