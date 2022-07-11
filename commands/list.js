const conf = new (require("conf"))();
const chalk = require("chalk");

const todoList = conf.get("todo-list");

exports.list = () => {
    const todoList = conf.get('todo-list')
    if (todoList && todoList.length) {
        console.log(
            chalk.blue.bold('Tasks in green are done. Tasks in yellow are still not done.')
        )
        todoList.forEach((task, index) => {
            if (task.done) {
                console.log(
                    chalk.greenBright(`${index}. ${task.text}`)
                )
            } else {
                console.log(
                    chalk.yellowBright(`${index}. ${task.text}`)
                )
            }
        })
    } else {
        console.log(
            chalk.red.bold('You don\'t have any tasks yet.')
        )
    }
}

exports.add = (task) => {
    //get the current todo-list
    let todosList = conf.get('todo-list')

    if (!todosList) {
        //default value for todos-list
        todosList = []
    }

    //push the new task to the todos-list
    todosList.push({
        text: task,
        done: false
    })

    //set todos-list in conf
    conf.set('todo-list', todosList)

    //display message to user
    console.log(
        chalk.green.bold('Task has been added successfully!')
    )
}

exports.markDone = function ({tasks}) {
    let todosList = conf.get('todo-list')

    if (todosList) {
        //loop over the todo list tasks
        todosList = todosList.map((task, index) => {
            //check if the user specified the tasks to mark done
            if (tasks) {
                //check if this task is one of the tasks the user specified
                if (tasks.indexOf(index.toString()) !== -1) {
                    //mark only specified tasks by user as done
                    task.done = true
                }
            } else {
                //if the user didn't specify tasks, mark all as done
                task.done = true
            }
            return task
        });

        //set the new todo-list
        conf.set('todo-list', todosList)
    }

    //show the user a message
    console.log(
        chalk.green.bold('Tasks have been marked as done successfully')
    )
}


