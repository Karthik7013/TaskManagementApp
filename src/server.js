const express = require("express");
const bodyparser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");
const app = express();

const port = 5000;
app.use(bodyparser.json());
app.use(morgan("dev"));
app.use(cors())

app.get('/', (req, res) => {
    res.status(200)
        .send({
            message: 'server is running'
        })
})


const WriteTextToFileAsync = async (contentToWrite) => {
    fs.writeFile('./src/data.json', contentToWrite, (err) => {
        console.log(contentToWrite);
        if (err) {
            console.log(err)
        } else {
            console.log("done writen to file")
        }
    })
}

app.post('/write', async (req, res, next) => {
    const requestContent = JSON.stringify(req.body);
    await WriteTextToFileAsync(requestContent);
})



app.use((req, res, next) => {
    res.status(404)
        .send({
            message: 'could not find route'
        })
})
app.listen(port, () => { console.log(`server started on port ${port}`) })