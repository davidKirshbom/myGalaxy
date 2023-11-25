import axios from "axios";
import { replaceAllStringFromObjectValues } from "../utils/parser";
const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";
export const getResources = async () => {
  const result = await axios.get(`${serverUrl}/swapi/entities`);

  return result.data;
};

export const getResourceList = async (resource) => {
  const result = await axios.get(`${serverUrl}/swapi/${resource}`);

  return result.data;
};

export const getResource = async (resource, id) => {
  const result = await axios.get(`${serverUrl}/swapi/${resource}/${id}`);

  const data = replaceAllStringFromObjectValues(
    result.data,
    `${serverUrl}/swapi/`,
    "/"
  );
  return data;
};
