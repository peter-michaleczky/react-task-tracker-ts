import {FaTimes} from "react-icons/all";
import {TaskModel} from "./models";

const Task = ({task}: {task: TaskModel}) => {
    return (
        <div className='task'>
            <h3 key={task.id}>{task.text} <FaTimes style={{color: 'red', cursor: 'pointer'}}/></h3>
            <p>{task.day}</p>
        </div>
    )
}

export default Task;