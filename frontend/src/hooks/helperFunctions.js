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

export {areNumbersConsecutive}