import { Link, useNavigate } from "react-router-dom";
import {
  FaCheckDouble,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

export default function Header() {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <FaCheckDouble />
          <span className="ms-1">MERN Todos</span>
        </Link>
        <div>
          {user ? (
            <button
              onClick={onLogout}
              className="btn btn-outline-primary d-flex align-items-center">
              <FaSignOutAlt />
              <span className="ms-1">Выйти</span>
            </button>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-primary me-2">
                <FaSignInAlt />
                <span className="ms-1">Войти</span>
              </Link>
              <Link to="/register" className="btn btn-primary">
                <FaUser />
                <span className="ms-1">Регистрация</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
