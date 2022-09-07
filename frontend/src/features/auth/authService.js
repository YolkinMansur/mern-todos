import axios from "axios";

const API_URL = "/api/users/";

// Регистрируем пользователя
const register = async userData => {
  const response = await axios.post(API_URL + "register", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Вход пользователя
const login = async userData => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const logout = () => localStorage.removeItem("user");

export default {
  register,
  logout,
  login,
};
