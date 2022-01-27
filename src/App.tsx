import './App.css'
import {Header} from "./Header";
import {useState} from "react";
import {Task} from "./models";
import Tasks from "./Tasks";

const App = () => {
    const [tasks, setTasks] = useState<Task[]>([
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

    return (
        <div className="container">
            <Header title={title}/>
            <Tasks tasks={tasks}/>
        </div>
    )
}

export default App;