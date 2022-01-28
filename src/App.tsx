import './App.css'
import {Header} from "./Header";
import {useEffect, useState} from "react";
import {TaskModel} from "./models";
import Tasks from "./Tasks";
import axios from "axios";

const API_URL = 'http://localhost:5000';

const App = () => {
    const title = 'Task Tracker';

    const [tasks, setTasks] = useState<TaskModel[]>([]);

    useEffect(() => {
        if (tasks.length === 0) fetchTasksAsync().then();
    }, [tasks])

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

    const fetchTasksAsync = async () => {
        try {
            const url = new URL(API_URL + '/tasks');
            const resp = await axios.get(url.toString());
            setTasks(resp.data);
        } catch (ex) {
            console.error(ex);
        }
    }

    return (
        <div className="container">
            <Header title={title} onAdd={add}/>
            <Tasks tasks={tasks} onDelete={deleteTask} onToggleReminder={toggleReminder}/>
        </div>
    )
}

export default App;