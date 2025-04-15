import { useEffect, useState } from "react";
import Create from "./Create.jsx";
import  '../App.css'
import axios from "axios";
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';

const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('http://localhost:3001/get');
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
        const { data } = await axios.put(`http://localhost:3001/update/${id}`);
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

  return (
    <div className="home">
      <h2>Todo List</h2>
      <Create />
      {todos.length === 0 ? (
        <div>
          <h2>No Record</h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div className="task">
            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
              {todo.done ? (
                <BsFillCheckCircleFill className="icon"> </BsFillCheckCircleFill>
              ) : (
                <BsCircleFill className="icon" />
              )}
              <p className={todo.done ? 'line_through' : ""}>{todo.task}</p>
            </div>
            <div>
              <span>
                <BsFillTrashFill className="icon" />
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
