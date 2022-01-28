import './App.css'
import {Header} from "./Header";
import {useState} from "react";
import {TaskModel} from "./models";
import Tasks from "./Tasks";

const App = () => {
    const [tasks, setTasks] = useState<TaskModel[]>([
        {
            id: 1,
            text: 'Task 1',
            day: '2022-01-27',
            reminder: false,
        },
        {
            id: 2,
            text: 'Task 2',
            day: '2022-01-29',
            reminder: true,
        },
    ]);

    const title = 'Task Tracker';

    const deleteTask = (id: number) => {
        setTasks(tasks.filter((task) => task.id !== id));
    }

    const toggleReminder = (id: number) => {
        setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder} : task))
    }

    const add = (task: TaskModel) => {
        const id = Math.floor(Math.random() * 10000 + 1);
        const newTask = {...task, id};
        setTasks([...tasks, newTask]);
    }

    return (
        <div className="container">
            <Header title={title} onAdd={add}/>
            <Tasks tasks={tasks} onDelete={deleteTask} onToggleReminder={toggleReminder}/>
        </div>
    )
}

export default App;