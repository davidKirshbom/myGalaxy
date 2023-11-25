import axios from "axios";
import { replaceAllStringFromObjectValues } from "../utils/parser";

export const getResources = async () => {
  const result = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/swapi/entities`
  );

  return result.data;
};

export const getResourceList = async (resource) => {
  const result = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/swapi/${resource}`
  );

  return result.data;
};

export const getResource = async (resource, id) => {
  const result = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/swapi/${resource}/${id}`
  );

  const data = replaceAllStringFromObjectValues(
    result.data,
    `${import.meta.env.VITE_SERVER_URL}/swapi/`,
    "/"
  );
  return data;
};
