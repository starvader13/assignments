const express = require("express")
const bodyParser = require("body-parser")
const fs = require("fs")

const app = express();

app.use(bodyParser.json());

const fileName = './files/a.txt';

function parseDataToJsonArray(data) {
    let todos = [];
    index = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i] === '\n') {
            todos.push(JSON.parse(data.slice(index, i)));
            index = i + 1;
        }
    }
    return todos;
}

app.get("/todos", (req, res) => {
    fs.readFile(fileName, "utf-8", (err, data) => {
        let todos = parseDataToJsonArray(data);
        if (todos.length == 0) {
            return res.status(404).send("You have no todos");
        }
        res.status(200).send(
            todos
        );
    })
})

app.get("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);

    fs.readFile(fileName, "utf-8", (err, data) => {
        let todos = parseDataToJsonArray(data);
        if (todos.length!=0 && id <= (todos[todos.length - 1].id)) {
            for (let i = 0; i < todos.length; i++) {
                if (todos[i].id === id) {
                    return res.status(200).json(
                        todos[i]
                    )
                }
            }
        }
        return res.status(404).send("Not Found");
    })
})

app.post("/todos", (req, res) => {
    let newTodo = req.body;
    fs.readFile(fileName, "utf-8", (err, data) => {
        let todos = parseDataToJsonArray(data);
        newTodo.id = todos.length === 0 ? 1 : (++(todos[todos.length - 1].id));

        fs.appendFile(fileName, JSON.stringify(newTodo).concat("\n"), (err) => {
            if (!err) {
                return res.status(201).json({
                    id: newTodo.id
                });
            }
            return res.status(400).send(err);
        })
    })
})

app.put("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const updatedTodo = req.body;
    let check = false;
    fs.readFile(fileName, "utf-8", (err, data) => {
        let todos = parseDataToJsonArray(data);
        if (todos.length!=0 && id <= (todos[todos.length - 1].id)) {
            for (let i = 0; i < todos.length; i++) {
                if (todos[i].id === id) {
                    updatedTodo.id = todos[i].id;
                    todos[i] = updatedTodo;
                    check = true;
                }
            }
        }

        if (check === false) {
            return res.status(404).send("Not Found");
        }

        todoString = "";
        for (let i = 0; i < todos.length; i++) {
            todoString = todoString.concat(JSON.stringify(todos[i])).concat("\n");
        }
        fs.writeFile(fileName, todoString, (err) => {
            if (!err) {
                return res.status(200).send("OK");
            }
            return res.status(404).send(err);
        })
    })
})

app.delete("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    let check = false;
    fs.readFile(fileName, "utf-8", (err, data) => {
        let todos = parseDataToJsonArray(data);
        if (todos.length!=0 && id <= (todos[todos.length - 1].id)) {
            const updatedTodos = todos.filter((todo) => {
                if (todo.id === id) {
                    return false;
                }
                return true;
            })

            if (updatedTodos.length < todos.length) {
                todos = updatedTodos;
                check = true;
            }
        }

        if (check === false) {
            return res.status(404).send("Not Found");
        }

        todoString = "";
        for (let i = 0; i < todos.length; i++) {
            todoString = todoString.concat(JSON.stringify(todos[i])).concat("\n");
        }
        fs.writeFile(fileName, todoString, (err) => {
            if (!err) {
                return res.status(200).send("OK");
            }
            return res.status(404).send(err);
        })
    })
})

app.get("/*",(req, res)=>{
    res.send("Route Not Found")
})

// app.listen(3000)
module.exports = app;
