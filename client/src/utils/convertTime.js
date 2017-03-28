export default function(isoDate){
    let date = new Date(isoDate).toLocaleString();
    let time = date.substring(date.indexOf(",") + 2, date.length)

    return time;
}
