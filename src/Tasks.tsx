import {TaskModel} from "./models";
import Task from "./Task";

const Tasks = ({tasks}: {tasks: TaskModel[]}) => {
    return (
        <>
            {tasks.map((task) => (
                <Task key={task.id} task={task}/>
            ))}
        </>
    );
}

export default Tasks;