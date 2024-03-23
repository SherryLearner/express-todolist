const express = require("express");
const bodyParser = require('body-parser');

const app = express()
const port = process.env.PORT || 3000

tasks = []

app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    const new_date = new Date()
    date = new_date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    res.render('list', { date: date, tasks: tasks })
})

app.post('/', (req, res) => {
    const item = req.body.task
    tasks.push(item)
    res.redirect('/')
})

app.post('/delete', (req, res) => {
    const index = req.body && req.body.index;
    if (index !== undefined) {
        tasks.splice(index, 1);
        res.sendStatus(200); // send success response
    } else {
        // Handle the case when 'index' is undefined
        res.status(400).send('Invalid request');
        res.sendStatus(400); // send error response
        res.send('Invalid request');
    }
});

app.listen(port, () =>
    console.log(`Example app listening on port ${port}`)
)