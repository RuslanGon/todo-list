import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  task: { type: String }
});

const TodoModel = mongoose.model("Todos", todoSchema);

export default TodoModel;