import './App.css';
import {useState} from "react";

function App() {
    const {json, addTodo} = useState()



    return (
        <div>
            <div>
                <input type="text" placeholder="Title" id="title"/>
                <br/><br/>
                <input type="text" placeholder="Description" id="description"/>
            </div>

            <button onClick={addTodo}>Add Todo</button>

            <div id="todos">{json}</div>
        </div>
    )
}

export default App
