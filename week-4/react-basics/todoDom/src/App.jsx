import './App.css';

let globalId = 0;

function App() {
    function addTodo(){
        globalId++;
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;

        const outerDiv = document.createElement('div');
        const titleDiv = document.createElement('div');
        const descriptionDiv = document.createElement('div');
        const button = document.createElement('button');

        button.addEventListener('click', () => markAsDone(globalId));
        outerDiv.setAttribute('id', globalId);

        titleDiv.innerHTML=`<b>Title: </b> ${title}`;
        descriptionDiv.innerHTML=`<b>Description: </b> ${description}`;
        button.innerHTML = "Mark as Done";

        outerDiv.appendChild(titleDiv);
        outerDiv.appendChild(descriptionDiv);
        outerDiv.appendChild(button);

        const parent = document.getElementById('todos');
        parent.appendChild(outerDiv);
    }

    function markAsDone(todoId){
        const parent = document.getElementById(todoId);
        parent.children[2].innerText = "Done";
    }

    return (
      <div>
          <div>
              <input type="text" placeholder="title" id="title"></input>
              <br/><br/>
              <input type="text" placeholder="description" id="description"></input>
              <br/><br/>
          </div>

          <button onClick={addTodo}>Add Todo</button>

          <div id="todos"> </div>
      </div>
    )
}

export default App
