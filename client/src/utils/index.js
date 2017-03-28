export function convertDate(isoDate) {
    let date = new Date(isoDate);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let dt = date.getDate();

    // if (dt < 10) {
    //   dt = '0' + dt;
    // }
    // if (month < 10) {
    //   month = '0' + month;
    // }

    return `${month}/${dt}/${year}`
}


export function convertTime(isoDate){
    let date = new Date(isoDate).toLocaleString();
    let time = date.substring(date.indexOf(",") + 2, date.length)

    return time;
}
