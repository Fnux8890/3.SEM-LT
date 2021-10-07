const Express = require("express");
const app = Express();

const port = 3000;

app.get("/", (req, res) => {
    res.status(200).send( "Welcome to this EMPTY site");
})

app.listen(port, console.log(`server listening at port http://localhost:${port}`))

//require("open")(`http://localhost:${port}`)
