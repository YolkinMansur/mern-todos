import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTodo } from "../features/todos/todoSlice";

export default function TodoForm() {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();
    dispatch(createTodo({ text }));
    setText("");
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          name="text"
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Добавить
      </button>
    </form>
  );
}
