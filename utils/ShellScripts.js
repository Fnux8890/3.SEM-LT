const shell = require("shelljs");

//shell.exec(`nodemon --exec babel-node app.js`)

shell.exec("node --version",(code,output) => {
    shell.exec(`open -a iTerm`);
});

