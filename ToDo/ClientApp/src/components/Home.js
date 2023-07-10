import React, { useState } from 'react';

const Home = () => {
    const [todos, setTodos] = useState([
        { id: 1, title: 'Buy groceries', completed: false },
        { id: 2, title: 'Finish homework', completed: false },
        { id: 3, title: 'Walk the dog', completed: true },
        // Add more todos as needed
    ]);

    const [newTodo, setNewTodo] = useState('');

    const handleAddTodo = () => {
        if (newTodo.trim() !== '') {
            const todo = { id: todos.length + 1, title: newTodo, completed: false };
            setTodos([...todos, todo]);
            setNewTodo('');
        }
    };

    const handleToggleComplete = (id) => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const handleRemoveTodo = (id) => {
        setTodos(prevTodos =>
            prevTodos.filter(todo => todo.id !== id)
        );
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
                        <th>ID</th>
                        <th>Title</th>
                        <th>Completed</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.id}>
                            <td>{todo.id}</td>
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
