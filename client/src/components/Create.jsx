import { useState } from "react";
import axios from 'axios';

const Create = ({ setTodos }) => {
  const [task, setTask] = useState("");

  const handleAdd = async () => {
    try {
      const res = await axios.post("https://todo-list-7f6v.onrender.com/add", { task });
      // http://localhost:3001/add
      if (res.data && res.data.todo) {
        setTodos((prev) => [...prev, res.data.todo]);
        setTask("");
      } else {
        console.error("Неверный формат данных от сервера:", res.data);
      }

    } catch (error) {
      console.error("Ошибка при добавлении задачи:", error);
    }
  };

  return (
    <div className="create_form">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="enter your task"
      />
      <button type="button" onClick={handleAdd}>Add</button>
    </div>
  );
};

export default Create;
