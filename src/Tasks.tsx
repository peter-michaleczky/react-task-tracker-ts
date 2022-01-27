import {Task} from "./models";

const Tasks = ({tasks}: {tasks: Task[]}) => {
    return (
        <>
            {tasks.map((task) => (
                <h3 key={task.id}>{task.text}</h3>
            ))}
        </>
    );
}

export default Tasks;