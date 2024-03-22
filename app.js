const express = require("express");
const bodyParser = require('body-parser');

const app = express()
const port = 3000

tasks = []

app.use(bodyParser.urlencoded({ extended: true }))
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
app.listen(port, () =>
    console.log(`Example app listening on port http://localhost:${port}`)
)