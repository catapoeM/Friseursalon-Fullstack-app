

const minutesToHours = (minutes) => {
    let hours = Math.floor(minutes / 60);
    let mins = minutes % 60;
    if (mins >= 15) {
        hours++
    }
    return hours
}

const extractStartEndHours = (array, key) => {
    return array
        .filter(obj => typeof obj[key] === "number")
        .map(obj => {
            const number = obj[key];
            return number
        }).toSorted((a, b) => a - b)
}


const filterByDateKey = (array, key, targetDate) => {
    return array.filter(obj => {
        if (!obj[key]) {
            return false;
        }
        const date = obj[key].split("T")[0];
        return date === targetDate;
    });
}

export { minutesToHours, extractStartEndHours, filterByDateKey}