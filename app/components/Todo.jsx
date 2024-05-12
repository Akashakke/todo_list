// pages/todos.js
"use client"
import Image from 'next/image';
import { useState } from 'react';

const initialTodos = [
  { id: 1, text: 'Add your tasks', completed: false },
  { id: 2, text: 'Mark the completed tasks', completed: false },
  { id: 3, text: 'Clear the selected tasks', completed: false },
];

export default function Todos() {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTodoText, setEditingTodoText] = useState('');
  const [selectedTodos, setSelectedTodos] = useState([]);

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = (e) => {

   
    if (newTodo.trim() !== '') {
      const newTodoItem = {
        id: todos.length + 1,
        text: newTodo,
        completed: false,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    }
  };

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleRemoveTodo = (e,id) => {
    e.stopPropagation();

    setTodos(todos.filter((todo) => todo.id !== id));
  };
  



  const handleEditTodo = (e,id, text) => {
    e.stopPropagation()
    setEditingTodoId(id);
    setEditingTodoText(text);
  };

  const handleSaveTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editingTodoText } : todo
      )
    );
    setEditingTodoId(null);
  };

  const handleCancelEdit = () => {
    setEditingTodoId(null);
    setEditingTodoText('');
  };

  const handleClearAll = () => {
    setTodos([]);
    setSelectedTodos([]);
  };

  const handleTodoClick = (id) => {
    console.log('click')
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);

    if (selectedTodos.includes(id)) {
      setSelectedTodos(selectedTodos.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedTodos([...selectedTodos, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedTodos.length === todos.length) {
      setSelectedTodos([]);
    } else {
      setSelectedTodos(todos.map((todo) => todo.id));
    }
  };

  const handleClearSelected = () => {
    setTodos(todos.filter((todo) => !selectedTodos.includes(todo.id)));
    setSelectedTodos([]);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="lg:max-w-md mx-auto p-4 mt-8  bg-white rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-8 text-center">Todo List</h1>

      <div className="flex mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          onKeyDown={(e) =>{
            if (e.key === 'Enter') {
              handleAddTodo();
            }
          }}
          placeholder="Enter a new todo"
          className="flex-1 rounded-l-md px-4 py-2 focus:outline-none "
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md focus:outline-none "
        >
          Add Todo
        </button>
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search todos"
        className="w-full mb-4 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex items-center mb-2">
        {/* <button
          onClick={handleSelectAll}
          className="mr-2 bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Select All
        </button> */}
        {todos.length > 0 && (
        <button
          onClick={handleClearAll}
          className="bg-red-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"

        >
          Clear All
        </button>

        
      )}
      {selectedTodos.length > 0 && (

        <button
        onClick={handleClearSelected}
        className="mr-2 bg-[#20bb75] text-white ml-3 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        
        >
          Clear Completed
        </button>
        )}
      </div>
      
      <ul>
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className={`flex items-center mb-2 cursor-pointer ease-in-out duration-300 ${
              todo.completed ? 'bg-[#20bb75] text-white' : ''
            }`}
            onClick={() => handleTodoClick(todo.id)}
          >
            {editingTodoId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editingTodoText}
                  onChange={(e) => setEditingTodoText(e.target.value)}
                  className="flex-1 rounded-md px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => handleSaveTodo(todo.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md ml-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md ml-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              </>
            ) : (
              <div className='flex justify-between w-full py-2'>
                <span className='flex items-center pl-2 overflow-hidden' title={todo.text}>{todo.text}</span>
                {!selectedTodos.includes(todo.id) && (

                  <div className='flex'>
                <button
                  onClick={(e) => handleEditTodo(e,todo.id, todo.text)}
                  className="bg-white text-white rounded-md ml-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                  <Image src='/images/pen.png' alt='edit' width={25} height={25}/>
                </button>
                <button
                  onClick={(e) => handleRemoveTodo(e,todo.id)}
                  className="bg-white text-white  rounded-md ml-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                  <Image src='/images/bin.png' alt='delete' width={25} height={25}/>
                </button>
                </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
      
      {filteredTodos.length === 0 && todos.length === 0 && (
        <p className="mt-4">No todos found.</p>
      )}
    </div>
  );
}
