import React, {useState,useEffect} from 'react';
//import Todo from './components/Todo';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';


const initialTodos = [
    {
        id:2,
        title: "Titulo#2",
        desc: "Descripcion titulo #2",
        completed: false
    },
    {   
        id:1,
        title: "Titulo#1",
        desc: "Descripcion titulo #1",
        completed: false
    }
    
    
]

const localTodos = JSON.parse(localStorage.getItem('todos'))

const App = () =>{

    const [todos,setTodos] = useState(localTodos || initialTodos);
    const [todoEdit, setTodoEdit] = useState(null);

    useEffect(() => {
      localStorage.setItem('todos',JSON.stringify(todos));
    }, [todos])
    

    const todoDelete = (todoId) => {
       
        const changedTodos = todos.filter(todo => todo.id !== todoId)
        if(todoEdit &&  todoId === todoEdit.id){
            setTodoEdit(null);
        }
        setTodos(changedTodos);
    }

    const todoToggleCompleted = todoId => {

        // const changedTodos = todos.map( todo => {
        //     const todoEdit = {
        //         ...todo,
        //         completed: !todo.completed
        //     }

        //     if(todo.id === todoId){
        //         return todoEdit;
        //     }else{
        //         return todo;
        //     }
        // })

        // const changedTodos = todos.map(todo =>(
        //     todo.id === todoId 
        //     ? {...todo,completed: !todo.completed}
        //     : todo
        // ))

        const changedTodos = todos.map( todo => todo.id === todoId ? {...todo,completed: !todo.completed} : todo);

        setTodos(changedTodos);
    }

    const todoAdd = todo => {

        const newTodo = {
            id: Date.now(),
            ...todo,
            completed: false
        }

        const changedTodos = [
            newTodo,
            ...todos
           
        ]
        setTodos(changedTodos);
    }


    const todoUpdate = (todoEdit) => {
        const changedTodos = todos.map(todo => (
            todo.id === todoEdit.id
            ? todoEdit
            : todo
        ))
        setTodos(changedTodos);
    }
    
    return(
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-8'>
                    <TodoList
                        todos={todos}
                        todoDelete={todoDelete}
                        todoToggleCompleted={todoToggleCompleted}
                        setTodoEdit={setTodoEdit}
                    />
                </div>
                <div className='col-4'>
                    <TodoForm
                        todoEdit={todoEdit}
                        todoAdd={todoAdd}
                        todoUpdate={todoUpdate}
                        setTodoEdit={setTodoEdit}
                    />
                </div>
            </div>
        </div>
        
    );
}

export default App;