// Боевой маг Евстафий сражается с лютым монстром. Монстр описывается таким объектом:
const monster = {
    maxHealth: 10,
    name: "Lutuy",
    moves: [
        {
            name: "Claw punch",
            physicalDmg: 3, // физический урон
            magicDmg: 0, // магический урон
            physicArmorPercents: 20, // физическая броня
            magicArmorPercents: 20, // магическая броня
            cooldown: 0, // ходов на восстановление
        },
        {
            name: "Fire breath",
            physicalDmg: 0,
            magicDmg: 4,
            physicArmorPercents: 0,
            magicArmorPercents: 0,
            cooldown: 3,
        },
        {
            name: "Tail strike",
            physicalDmg: 2,
            magicDmg: 0,
            physicArmorPercents: 50,
            magicArmorPercents: 0,
            cooldown: 2,
        },
    ],
};

// Боевой маг Евстафий способен на следующее:
const player = {
    maxHealth: null,
    name: "Evstafiy",
    moves: [
        {
            name: "Hit with a battle censer",
            physicalDmg: 2,
            magicDmg: 0,
            physicArmorPercents: 0,
            magicArmorPercents: 50,
            cooldown: 0,
        },
        {
            name: "Spinning back kick by left heel",
            physicalDmg: 4,
            magicDmg: 0,
            physicArmorPercents: 0,
            magicArmorPercents: 0,
            cooldown: 4,
        },
        {
            name: "Canonical fireball",
            physicalDmg: 0,
            magicDmg: 5,
            physicArmorPercents: 0,
            magicArmorPercents: 0,
            cooldown: 3,
        },
        {
            name: "Magical block",
            physicalDmg: 0,
            magicDmg: 0,
            physicArmorPercents: 100,
            magicArmorPercents: 100,
            cooldown: 4,
        },
    ],
};

// Бой идет по ходам. Каждый ход компьютер (Лютый) случайно выбирает одно из доступных действий и сообщает, что он собирается делать.
// В ответ на это игрок (Евстафий) должен выбрать свое действие.
// После происходит взаимное нанесение урона. Магическая броня блокирует магический урон, физическая броня блокирует физический урон.
// После совершения действия, оно не может быть повторно выбрано в течение cooldown ходов
// Бой идет до победы одного из противников.
// Перед началом боя игрок выбирает сложность (начальное здоровье Евстафия)

import readlineSync, { setDefaultOptions } from "readline-sync";

const log = console.log;

const difficulties = [
    "Very Low(15 hp)",
    "Low(12 hp)",
    "Medium(10 hp)",
    "High(8 hp)",
    "Hell(4 hp)",
];
const playerHP = [15, 12, 10, 8, 4];

log("==================================");
log(`GAME: Battle Mage ${player.name} vs ${monster.name}`);
log("==================================");

//Select difficulty level
log("\nDifficulties:");
const complexity = readlineSync.keyInSelect(
    difficulties,
    "Select difficulty level: ",
    { cancel: false }
);
//set player HP
player.maxHealth = playerHP[complexity];

log("\n*** LET'S THE BATTLE BEGIN! FIGHT! ***");
log("======================================\n");

//add additional property for skills to manage the cooldowns
player.moves.forEach((element) => {
    element.cooldownRemain = 0;
});
monster.moves.forEach((element) => {
    element.cooldownRemain = 0;
});

let availablePlayerSkills = [];
let availableMonsterSkills = [];

let indexOfRandomSkill = 0;
let monsterWillUseSkill = null;

let playerSkillIndex = 0;
let playerSkillNames = [];
let playerWillUseSkill = null;

let playerDamage = 0;
let monsterDamage = 0;

let playerCurrentHealth = player.maxHealth;
let monsterCurrentHealth = monster.maxHealth;

//game loop
while (true) {
    log(
        `${player.name}: ${playerCurrentHealth} hp | ${monster.name}: ${monsterCurrentHealth} hp\n`
    );
    //available skills
    availablePlayerSkills = player.moves.filter(
        (skill) => !skill.cooldownRemain // if cooldown is 0, we can use skill
    );
    availableMonsterSkills = monster.moves.filter(
        (skill) => !skill.cooldownRemain
    );

    //take random monster skill
    indexOfRandomSkill = Math.floor(
        Math.random() * availableMonsterSkills.length
    );
    monsterWillUseSkill = availableMonsterSkills[indexOfRandomSkill];

    log(`${monster.name} casts spell - ${monsterWillUseSkill.name}`);

    //player selection
    log("Your action:");
    playerSkillNames = availablePlayerSkills.map((skill) => skill.name);

    playerSkillIndex = readlineSync.keyInSelect(
        playerSkillNames,
        "Select your spell: ",
        { cancel: false }
    );
    playerWillUseSkill = availablePlayerSkills[playerSkillIndex];

    //calculate damage to each other
    playerDamage = calculateDamage(playerWillUseSkill, monsterWillUseSkill);
    monsterDamage = calculateDamage(monsterWillUseSkill, playerWillUseSkill);

    log(
        `${player.name} cast ${playerWillUseSkill.name} and damage ${monster.name} on ${playerDamage}hp\n` +
            `${monster.name} cast ${monsterWillUseSkill.name} and damage ${player.name} on ${monsterDamage}hp`
    );

    playerCurrentHealth -= monsterDamage;
    monsterCurrentHealth -= playerDamage;
    //update cooldowns
    for (let skill of player.moves) {
        if (skill.name === playerWillUseSkill.name) {
            skill.cooldownRemain = skill.cooldown;
            continue;
        }
        if (skill.cooldownRemain === 0) continue;
        skill.cooldownRemain -= 1;
    }
    for (let skill of monster.moves) {
        if (skill.name === monsterWillUseSkill.name) {
            skill.cooldownRemain = skill.cooldown;
            continue;
        }
        if (skill.cooldownRemain === 0) continue;
        skill.cooldownRemain -= 1;
    }
    //game finished?
    if (playerCurrentHealth <= 0 && monsterCurrentHealth <= 0) {
        showDiedBoth();
        break;
    }
    if (playerCurrentHealth <= 0 && monsterCurrentHealth > 0) {
        showGameover(player.name);
        break;
    }
    if (playerCurrentHealth > 0 && monsterCurrentHealth <= 0) {
        showWin(monster.name);
        break;
    }
    //if doesn't finished, repeat again
}

// HERE GAME STOPPED
// UTILs
function calculateDamage(attacker, defender) {
    return (
        attacker.physicalDmg * (1 - defender.physicArmorPercents / 100) +
        attacker.magicDmg * (1 - defender.magicArmorPercents / 100)
    );
}

function showStr(str) {
    console.log("=".repeat(str.length));
    console.log(str);
    console.log("=".repeat(str.length));
}

function showGameover(name) {
    const str = `= ${name} died. GAMEOVER! =`;
    showStr(str);
}

function showWin(name) {
    const str = `= Congratulations!!! ${name} DEFEAT!!! =`;
    showStr(str);
}

function showDiedBoth(name) {
    const str = `= It was good battle, but both opponents died! =`;
    showStr(str);
}
