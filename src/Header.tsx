import Button from "./Button";

export const Header = ({title}: {title: string}) => {
    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button text='Add'/>
        </header>
    );
}
