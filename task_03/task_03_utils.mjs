export const createRandomNumber = (amountOfNumbers) => {
    const result = [];
    let num;
    do {
        num = Math.floor(Math.random() * 10);
        if (result.includes(num)) continue;
        result.push(num);
    } while (result.length < amountOfNumbers);

    return result;
};

const isUnique = (numStr) => {
    for (let i = 0; i < numStr.length; i++) {
        if (numStr.lastIndexOf(numStr[i]) !== i) return false;
    }

    return true;
};

export const isCorrectNumber = (numStr, min, max, numLength = 1) => {
    const num = Number(numStr);
    if (
        !num ||
        num < min ||
        num > max ||
        !isUnique(numStr) ||
        numStr.length !== +numLength
    ) {
        return false;
    }
    return true;
};

export const compareNumbers = (correctNumber, comparedNumber) => {
    const correctNumberArr = correctNumber.split("");
    const comparedNumberArr = comparedNumber.split("");

    let matchedNum = 0;
    let numbersInPlace = 0;

    for (let i = 0; i < correctNumberArr.length; i++) {
        if (correctNumberArr.includes(comparedNumberArr[i])) matchedNum += 1;
        if (correctNumberArr[i] === comparedNumberArr[i]) numbersInPlace += 1;
    }

    return [matchedNum, numbersInPlace];
};
