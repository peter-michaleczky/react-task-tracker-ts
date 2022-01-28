import {TaskModel} from "./models";
import Task from "./Task";
import {EventHandler} from "react";

const Tasks = ({
                   tasks,
                   onDelete,
                   onToggleReminder
               }: { tasks: TaskModel[], onDelete: EventHandler<any>, onToggleReminder: EventHandler<any> }) => {
    return (
        <>
            {tasks.map((task) => (
                <Task key={task.id} task={task} onDelete={onDelete} onToggleReminder={onToggleReminder}/>
            ))}
        </>
    );
}

export default Tasks;