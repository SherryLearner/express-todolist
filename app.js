const express = require("express");
const bodyParser = require('body-parser');

const app = express()
const port = process.env.PORT || 3000

tasks = {
    "Root": []
}

app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    const new_date = new Date()
    date = new_date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    res.render('list', { title: date, tasks: tasks["Root"] })
})

app.post('/', (req, res) => {
    const task = req.body.task
    tasks["Root"].push({title: task, description: task, completed: false})
    res.redirect('/')
})

app.post('/delete', (req, res) => {
    const index = req.body.id;
    if (index !== undefined) {
        tasks["Root"].splice(index, 1);
        res.sendStatus(200); // send success response
    } else {
        // Handle the case when 'index' is undefined
        res.status(400).send('Invalid request');
    }
});

app.post('/update', (req, res) => {
    const index = req.body.id;
    if (index !== undefined) {
        tasks["Root"][index].completed = !tasks["Root"][index].completed;
        res.sendStatus(200); // send success response
    } else {
        // Handle the case when 'index' is undefined
        res.status(400).send('Invalid request');
    }
})

app.listen(port, () =>
    console.log(`Todo app listening on port ${port}`)
)