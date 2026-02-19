const calculateTotals = (services, selectedServicesIds) => {
    const selected = services.filter(service =>
        selectedServicesIds.includes(service._id)
    )
    
    const totalDuration = selected.reduce(
        (sum, service) => sum + service.duration,
        0
    );

    const totalPrice = selected.reduce(
        (sum, service) => sum + service.price,
        0
    );
    return {totalDuration, totalPrice}
}

const minutesToHours = (minutes) => {
    let hours = Math.floor(minutes / 60);
    let mins = minutes % 60;
    if (mins >= 15) {
        hours++
    }
    return hours
}

const getHourOutOfFullyDate = (date) => {
    const dateObj = new Date(date);

    // Get HH (24h format)
    const hh = dateObj.toISOString().split("T")[1].slice(0,2);
    return hh;
}

const getYearMonthDayOutOfFullyDate = (date) => {
    const dateObj = new Date(date);

    // Get HH (YYYY-MM-DD)
    const yyyyMmDd = dateObj.toISOString().split("T")[0];
    return yyyyMmDd;
}

export {calculateTotals, minutesToHours, getHourOutOfFullyDate, getYearMonthDayOutOfFullyDate}