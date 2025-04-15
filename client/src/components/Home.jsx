import { useEffect, useState } from "react";
import Create from "./Create.jsx";
import '../App.css';
import axios from "axios";
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';

const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('https://todo-list-sw63.onrender.com/get');
        // http://localhost:3001/get
        setTodos(res.data);
      } catch (error) {
        console.log("Ошибка при загрузке задач:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleEdit = (id) => {
    const fetchEditTasks = async () => {
      try {
        const { data } = await axios.put(`https://todo-list-sw63.onrender.com/update/${id}`);
        // http://localhost:3001/update/${id}
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? { ...todo, done: data.done } : todo 
          )
        );
      } catch (error) {
        console.log("Ошибка при редактировании задачи:", error);
      }
    };
    fetchEditTasks();
  };

  const handleDelete = (id) => {
    const fetchDelete = async () => {
      try {
        await axios.delete(`https://todo-list-sw63.onrender.com/delete/${id}`);
        // http://localhost:3001/delete/${id}
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      } catch (error) {
        console.log("Ошибка при удалении задачи:", error);
      }
    };
    fetchDelete();
  };

  return (
    <div className="home">
      <h2>Todo List</h2>
      <Create setTodos={setTodos} />
      {Array.isArray(todos) && todos.length === 0 ? (
        <div>
          <h2>No Record</h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div className="task" key={todo._id}>
            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
              {todo.done ? (
                <BsFillCheckCircleFill className="icon" />
              ) : (
                <BsCircleFill className="icon" />
              )}
              <p className={todo.done ? 'line_through' : ""}>{todo.task}</p>
            </div>
            <div>
              <span>
                <BsFillTrashFill onClick={() => handleDelete(todo._id)} className="icon" />
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
