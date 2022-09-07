import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";
import { getTodos, reset } from "../features/todos/todoSlice";

export default function Todos() {
  const { user } = useSelector(state => state.auth);
  const { todos, isLoading, isError, message } = useSelector(
    state => state.todos
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) toast.error(message);
    if (!user) navigate("/login");
    dispatch(getTodos());
    return () => dispatch(reset());
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) return <Spinner></Spinner>;

  return (
    <>
      <section>
        <h1>Добро пожаловать, {user && user.name}!</h1>
      </section>

      <TodoForm />

      <section className="mt-3">
        {todos.length ? (
          <div className="list-group">
            {todos.map(todo => (
              <TodoItem key={todo._id} todo={todo} />
            ))}
          </div>
        ) : (
          <h3>У вас нет дел</h3>
        )}
      </section>
    </>
  );
}
