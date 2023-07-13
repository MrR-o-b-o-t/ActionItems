import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home/home.css'

const Home = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos();
    }, [])

    const [newTodo, setNewTodo] = useState('');

    const createTodo = async (todoData) => {
        try {
            const response = await axios.post('/Todo', todoData);
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            const response = await axios.delete(`Todo/${id}`)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const updateCompleted = async (id) => {
        try {
            const response = await axios.patch(`Todo/${id}`)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchTodos = async () => {
        try {
            const response = await axios.get('/Todo');
            console.log(response)
            const todos = response.data;

            setTodos(todos);
            console.log(todos);
        } catch (error) {
            console.log(error);
        }
    };


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

    const handleToggleComplete = async (id) => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
        await updateCompleted(id);
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
                    {todos.length > 0 ? (
                        todos.map(todo => (
                            <tr key={todo.id}>
                                <td className={`${todo.completed ? "notCompleted" : ""}`}>{todo.title}</td>
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
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">
                                <p>No todos</p>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
