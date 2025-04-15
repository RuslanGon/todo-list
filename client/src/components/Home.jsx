import { useEffect, useState } from "react";
import Create from "./Create.jsx";
import  '../App.css'
import axios from "axios";

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

  return (
    <div className="home">
      <h2>Todo List</h2>
      <Create />
      { todos.length === 0 ? 
      <div>
        <h2>No Record</h2>
      </div> 
      :
      todos.map((todo) => (
        <div className="task">{todo.task}</div>
      ))}
    </div>
  );
};

export default Home;
