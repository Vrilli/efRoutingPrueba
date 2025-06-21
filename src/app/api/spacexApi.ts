import axios from "axios";
export const spacexApi = axios.create({
  baseURL: "https://api.spacexdata.com/v4",
});
