import axios from "axios";

//API для создания внешних запросов
export const api = axios.create({
  baseURL: "http://localhost:3003",
});
