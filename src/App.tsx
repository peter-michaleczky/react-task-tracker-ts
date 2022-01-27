import './App.css'
import {Header} from "./Header";

const App = () => {
    const title = 'Task Tracker';

    return (
        <div className="container">
            <Header title={title}/>
        </div>
    )
}

export default App;