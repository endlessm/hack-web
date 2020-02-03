const bondage = require('bondage');
const fs = require('fs');
const inquirer = require('inquirer');

function runDialogue(files) {
    const node = 'Start';
    const runner = new bondage.Runner();

    // First, load all of the files that we were given
    for (const file of files) {
        const data = JSON.parse(fs.readFileSync(file));
        runner.load(data);
    }

    const d = runner.run(node);

    const run = () => {
        const result = d.next().value;
        if (!result) {
            return;
        }

        if (result.options) {
            const options = [];
            for (const i in result.options) {
                options.push({ value: i, name: result.options[i] });
            }

            inquirer.prompt([{
                name: 'response',
                message: ' ',
                choices: options,
                type: 'list',
            }]).then((answer) => {
                result.select(answer.response);
                run();
            });
        } else {
            console.log(result.text); // eslint-disable-line
            run();
        }
    };

    run();
}

runDialogue(['./dist/conditions.json']);
