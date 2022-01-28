import {FaTimes} from "react-icons/all";
import {TaskModel} from "./models";
import {EventHandler, SyntheticEvent} from "react";

const Task = ({
                  task,
                  onDelete,
                  onToggleReminder
              }: { task: TaskModel, onDelete: EventHandler<any>, onToggleReminder: EventHandler<any> }) => {

    const toggleReminder = (e: SyntheticEvent) => {
        e.preventDefault();
        onToggleReminder(task.id);
    };

    const deleteTask = () => {
        onDelete(task.id);
    }

    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`}>
            <h3 key={task.id} onDoubleClick={toggleReminder}>{task.text}
                <FaTimes style={{color: 'red', cursor: 'pointer'}} onClick={deleteTask}/></h3>
            <p>{task.day}</p>
        </div>
    )
}

export default Task;