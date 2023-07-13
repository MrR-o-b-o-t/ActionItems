import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [todos, setTodos] = useState([

    ]);

    const [newTodo, setNewTodo] = useState('');

    const createTodo = async (todoData) => {
        try {
            const response = await axios.post('/Todo', todoData);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            const response = await axios.delete('/Todo', id)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const handleAddTodo = async () => {
        if (newTodo.trim() !== '') {
            const todo = {
                id: Math.floor(Math.random() * 1000),
                title: newTodo,
                completed: false
            };
            setTodos([...todos, todo]);
            setNewTodo('');
            await createTodo(todo);
        }
    };

    const handleToggleComplete = (id) => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const handleRemoveTodo = async (id) => {
        setTodos(prevTodos =>
            prevTodos.filter(todo => todo.id !== id)
        );
        await deleteTodo(id);
    };

    return (
        <div className="container">
            <h1 className="mt-4 mb-3">Todo List</h1>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter a new todo"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <button className="btn btn-primary" type="button" onClick={handleAddTodo}>
                    Add Todo
                </button>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Completed</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.id}>
                            <td>{todo.title}</td>
                            <td>{todo.completed ? 'Yes' : 'No'}</td>
                            <td>
                                <button className="btn btn-primary btn-sm me-3" onClick={() => handleToggleComplete(todo.id)}>
                                    {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
                                </button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleRemoveTodo(todo.id)}>
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
