import { Converter } from './converter';
import { json2csvAsync } from 'json-2-csv';

const fs = require("fs");
const inquirer = require("inquirer");

inquirer.prompt([{
    name: 'filePath',
    message: 'Where is the Dashlane Export (JSON) located?',
}]).then(async answers => {
    const dashlaneJSON = JSON.parse(fs.readFileSync(answers.filePath, "utf-8"));
    const lastpassJSON = new Converter().convert(dashlaneJSON);
    const csv = await json2csvAsync(lastpassJSON, {
        prependHeader: true,
        emptyFieldValue: "",
        delimiter: {
            wrap: '"'
        }
    });

    const convertedFilePath = answers.filePath + '.csv';
    fs.writeFileSync(convertedFilePath, csv);
    console.log(`Created converted file at [${convertedFilePath}]`);
});