const fs = require('fs/promises');

const PATH_TOP250 = "top250.json"

const modelValidation = {
    title: isStringValid,
    rating: isStringValid,
    year: isYearValid,
    budget: isNumberValid,
    gross: isNumberValid,
    poster: isStringValid,
    position: isNumberValid,
}

function isIdValid(id) {
    return id && (typeof id === 'string' || typeof id === 'number');
}

function isNumberValid(num) {
    return Number.isInteger(num) && num > 0;
}

function isStringValid(str) {
    return str && typeof str === 'string';
}

function isYearValid(year) {
    const thisYear = new Date().getFullYear();

    return Number.isInteger(year) && year > 1895 && year <= thisYear;
}

async function readTop250() {
    try {
        const top250String = await fs.readFile(PATH_TOP250);

        return JSON.parse(top250String);
    } catch (err) {
        throw new Error(`File reading error: ${err.message}\n${err.stack}`);
    }
}

async function writeTop250(top250) {
    const stringData = JSON.stringify(top250, null, 4);

    try {
        await fs.writeFile(PATH_TOP250, stringData);
    } catch (err) {
        throw new Error(`File writing error: ${err.message}\n${err.stack}`);
    }
}

function mapPositions(top250) {
    top250.forEach((film, i) => {
        film.position = i + 1;
    });
}

function getFilmPos(top250, id) {
    const pos = top250.findIndex((film) => {
        return film.id === id;
    })

    return pos;
}

module.exports = {
    modelValidation,
    readTop250,
    writeTop250,
    mapPositions,
    isIdValid,
    getFilmPos
}