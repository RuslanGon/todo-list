import { useState } from "react";
import axios from 'axios'

const Create = ({ setTodos }) => {
    const [task, setTask] = useState("");
  
    const handleAdd = async () => {
      try {
        const res = await axios.post("http://localhost:3001/add", { task });
        setTodos(res.data.todos);
        setTask("");
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