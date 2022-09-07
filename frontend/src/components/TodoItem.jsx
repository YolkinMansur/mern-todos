import { isRejectedWithValue } from '@reduxjs/toolkit';
import { useState } from 'react';
import { ImCross, ImPencil } from 'react-icons/im';
import { useDispatch } from 'react-redux';
import { deleteTodo, redactTodo } from '../features/todos/todoSlice';

function formatDate(dateString) {
  let date = new Date(dateString);
  let formatter = new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  });
  return formatter.format(date);
}

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [text, setText] = useState(todo.text);
  const [isEdit, setIsEdit] = useState(true);

  const editText = e => {
    setText(e.target.value);
    console.log(text);
  };
  async function handleEditTodo(e) {
    e.preventDefault();
    if (text !== todo.text) {
      dispatch(redactTodo({ ...todo, text }));
    }
  }
  return (
    <div>
      {isEdit ? (
        <div className="list-group-item list-group-item-action">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{todo.text}</h5>
            <div>
              <button
                className="btn"
                onClick={() => dispatch(deleteTodo(todo._id))}
              >
                <ImCross style={{ color: 'red' }} />
              </button>
              <button className="btn" onClick={() => setIsEdit(!isEdit)}>
                <ImPencil style={{ color: 'black' }} />
              </button>
            </div>
          </div>
          <small>{formatDate(new Date(todo.createdAt))}</small>
        </div>
      ) : (
        <div className="mb-5">
          <form onSubmit={handleEditTodo}>
            <div className="mb-5">
              <input
                type="text"
                className="form-control"
                name="text"
                value={text}
                onChange={editText}
              />
              <button type="submit" className="btn btn-primary">
                Редактировать
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
