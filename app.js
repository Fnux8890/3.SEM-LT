const Express = require("express");
const app = Express();

const gate = 3000;

app.listen(gate, console.log(`server listening at gate ${gate}}...`))