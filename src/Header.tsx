import Button from "./Button";
import {EventHandler} from "react";

export const Header = ({title, onAdd}: {title: string, onAdd: EventHandler<any>}) => {

    // TODO: create missing add form
    const addTask = () => {
        onAdd({
            id: 0,
            text: 'New Task',
            day: 'Today',
            reminder: false,
        })
    }

    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button text='Add' onClick={addTask}/>
        </header>
    );
}
