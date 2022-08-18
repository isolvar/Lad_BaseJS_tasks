// Компьютер загадывает число из нескольких различающихся цифр (от 3 до 6).
// Игроку дается несколько попыток на то, чтобы угадать это число.
// После каждой попытки компьютер сообщает
// количество совпавших цифр стоящих не на своих местах, а также количество правильных цифр на своих местах.
// Например загаданное число: 56478 предположение игрока: 52976
// ответ: совпавших цифр не на своих местах - 1 (6), цифр на своих местах - 2 (5 и 7)
// игра ведется до окончания количества ходов либо до отгадывания

import readlineSync from "readline-sync";
import {
    createRandomNumber,
    isCorrectNumber,
    compareNumbers,
} from "./task_03_utils.mjs";

const attempts = {
    3: 7,
    4: 12,
    5: 20,
    6: 25,
};

let numAmount = 0;
while (true) {
    numAmount = readlineSync.question(
        "How many numbers to create? (from 3 up to 6 digits)> "
    );

    if (isCorrectNumber(numAmount, 3, 6)) break;

    console.log(
        "Inserted value doesn't match requirements(digit from 3 up to 6). Please, try one more time.\n"
    );
}

const generatedNumber = createRandomNumber(numAmount);

console.log(`\nCreated random number, ${numAmount} digits long.`);
console.log(
    `You have ${attempts[numAmount]} attemps to find correct number! Good Luck!\n`
);

let numberFromUser = null;
let matchedNum = 0;
let numbersInPlace = 0;
let strAttempts = "";
let strMatched = "";
for (let attempt = 0; attempt < attempts[numAmount]; attempt++) {
    numberFromUser = readlineSync.question("Insert your number > ");

    if (
        !isCorrectNumber(
            numberFromUser,
            0,
            Math.pow(10, numAmount) - 1,
            numAmount
        )
    ) {
        console.log(`Error! Please, insert number ${numAmount} digits long.`);
        attempt -= 1;
        continue;
    }

    [matchedNum, numbersInPlace] = compareNumbers(
        generatedNumber.join(""),
        numberFromUser
    );

    strAttempts = `Attempt ${attempt + 1} / ${attempts[numAmount]}: `;
    strMatched = `${numberFromUser} - has ${matchedNum} matched numbers and ${numbersInPlace} numbers in place.`;

    console.log(strAttempts + strMatched);

    if (generatedNumber.join("") === numberFromUser) {
        console.log("========================================");
        console.log("YEAAA...You WON!!! It is correct number!");
        console.log("========================================");
        break;
    }
    if (attempt + 1 === attempts[numAmount]) {
        console.log("========================================");
        console.log("Oh no..It was last attemps!!!\n");
        break;
    }
}
