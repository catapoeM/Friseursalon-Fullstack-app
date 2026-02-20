

const minutesToHours = (minutes) => {
    let hours = Math.floor(minutes / 60);
    let mins = minutes % 60;
    if (mins >= 15) {
        hours++
    }
    return hours
}

const extractHourFromDate = (array, key) => {
    return array
        .filter(obj => typeof obj[key] === "string")
        .map(obj => {
            const date = new Date(obj[key]);
            return date.toISOString().slice(11, 13);
        }).toSorted((a, b) => a - b)
    
}

const getYearMonthDayOutOfFullyDate = (date) => {
    const dateObj = new Date(date);

    // Get HH (YYYY-MM-DD)
    const yyyyMmDd = dateObj.toISOString().split("T")[0];
    return yyyyMmDd;
}

const filterByDateKey = (array, key, targetDate) => {
    return array.filter(obj => {
        if (!obj[key]) {
            return false;
        }
        const dateOnly = obj[key].split("T")[0];
        return dateOnly === targetDate;
    });
}

export { minutesToHours, extractHourFromDate, getYearMonthDayOutOfFullyDate, filterByDateKey}