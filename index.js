#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import chalkAnimation from 'chalk-animation';

let playerName;

const sleep = (ms = 2000) => new Promise(resolve => setTimeout(resolve, ms));

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        'Who Wants To Be A Millionaire? (JavaScript Edition) \n',
    );

    await sleep();
    rainbowTitle.stop();

    console.log(`
        ${chalk.bgBlue('HOW TO PLAY')}
        I am a process on your computer. I will ask you a series of questions.
        You will be given a set of choices to choose from.
        If you choose the correct answer, you will move forward.
        If you choose a wrong answer, I will be ${chalk.bgRed('killed')}.
        The game ends when you answer all questions correctly.
        Good luck!        
    `)
}

async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default () {
            return 'Player';
        }
    });

    playerName = answers.player_name;
}

async function question1() {
    const answers = await inquirer.prompt({
        name: 'question1',
        type: 'list',
        message: 'Inside which HTML element do we put the JavaScript?',
        choices: [
            '<js>',
            '<scripting>',
            '<javascript>',
            '<script>'
        ],
    });

    return handleAnswer(answers.question1 == '<script>');
}

async function question2() {
    const answers = await inquirer.prompt({
        name: 'question2',
        type: 'list',
        message: 'Which operator is used to assign a value to a variable?',
        choices: [
            '-',
            '=',
            'x',
            '*'
        ],
    });

    return handleAnswer(answers.question2 == '=');
}

async function question3() {
    const answers = await inquirer.prompt({
        name: 'question3',
        type: 'list',
        message: 'Which event occurs when the user clicks on an HTML element?',
        choices: [
            'onchange',
            'onmouseclick',
            'onclick',
            'onmouseover'
        ],
    });

    return handleAnswer(answers.question3 == 'onclick');
}

async function question4() {
    const answers = await inquirer.prompt({
        name: 'question4',
        type: 'list',
        message: 'How do you find the number with the highest value of x and y?',
        choices: [
            'Math.max(x, y)',
            'Math.ceil(x, y)',
            'ceil(x, y)',
            'top(x, y)'
        ],
    });

    return handleAnswer(answers.question4 == 'Math.max(x, y)');
}

async function question5() {
    const answers = await inquirer.prompt({
        name: 'question5',
        type: 'list',
        message: 'What is the correct way to write a JavaScript array?',
        choices: [
            'var colors = "red", "green", "blue"',
            'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")',
            'var colors = ["red", "green", "blue"]',
            'var colors = (1:"red", 2:"green", 3:"blue")'
        ],
    });

    return handleAnswer(answers.question5 == 'var colors = ["red", "green", "blue"]');
}

async function question6() {
    const answers = await inquirer.prompt({
        name: 'question6',
        type: 'list',
        message: 'How do you round the number 7.25, to the nearest integer?',
        choices: [
            'round(7.25)',
            'Math.rnd(7.25)',
            'Math.round(7.25)',
            'rnd(7.25)'
        ],
    });

    return handleAnswer(answers.question6 == 'Math.round(7.25)');
}

async function question7() {
    const answers = await inquirer.prompt({
        name: 'question7',
        type: 'list',
        message: 'Is JavaScript case-sensitive?',
        choices: [
            'Yes',
            'No',
        ],
    });

    return handleAnswer(answers.question7 == 'Yes');
}

async function question8() {
    const answers = await inquirer.prompt({
        name: 'question8',
        type: 'list',
        message: 'How can you detect the client"s browser name?',
        choices: [
            'navigator.appName',
            'browser.name',
            'client.navName'
        ],
    });

    return handleAnswer(answers.question8 == 'navigator.appName');
}

async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();

    if (isCorrect) {
        spinner.success({ text: `Nice work ${playerName}. Correct answer `, symbol: '✔' });
    } else {
        spinner.error({ text: `💀💀💀 Oh no ${playerName}! Wrong answer. You lose.`, symbol: '✖' });
        process.exit(1);
    }
}

function winner() {
    console.clear();
    const msg = `Congratulations, ${playerName}!\n You just won  $ 1 , 0 0 0 , 0 0 0`;

    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
    });
}

await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
await question6();
await question7();
await question8();
await winner();