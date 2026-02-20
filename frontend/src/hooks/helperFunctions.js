const areNumbersConsecutive = (numbers) => {
    if (numbers.legth <= 1) {
        return true
    }

    const sorted = [...numbers].sort((a, b) => a - b);

    for (let i = 1; i < sorted.length; i++) {
        if (sorted[i] !== sorted[i - 1] + 1) {
            return false;
        }
    }

    return true;
}

const extractKeysValuesFromArrayOfObjects = (arrayOfKeysToGet, arrayOfObjects) => {
    const extracted = arrayOfObjects.map(obj => {
        let result = {};
        arrayOfKeysToGet.forEach(key => {
            if (obj.hasOwnProperty(key)) {
            result[key] = obj[key];
            }
        });
        return result;
    });
    return extracted;
} 

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

const removeValuesInRangesFromArray = (arrayValues, starts, ends) => {
return arrayValues.filter(value => {
    // check if value is inside ANY range
    const isInAnyRange = starts.some((start, index) => {
    const end = ends[index];
        return value >= start && value <= end;
    });

    // keep only arrayValues NOT in any range
    return !isInAnyRange;
});
}



export {areNumbersConsecutive, extractKeysValuesFromArrayOfObjects, calculateTotals, removeValuesInRangesFromArray}