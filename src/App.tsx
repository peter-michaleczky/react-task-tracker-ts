import './App.css'

interface HeaderProps {
    title: string;
    color: string;
}

const Header = ({title, color}: HeaderProps) => {
    return (
        <header>
            <h1 style={{color: color}}>{title}</h1>
        </header>
    );
}

const App = () => {
    const title = 'Task Tracker';
    const color = 'red';

  return (
    <div className="App">
        <Header title={title} color={color}/>
    </div>
  )
}

export default App;