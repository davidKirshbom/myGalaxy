const axios = require("axios");
const { addToArrayIdsFromUrlInObject } = require("../../utils");
const swapiBaseUrl = `https://swapi.dev/api`;

const getEntitiesList = async () => {
  const result = await axios.get(swapiBaseUrl);

  return result.data;
};
const getResourceList = async (resource, query) => {
  let queryString = "";
  if (query && Object.keys(query).length > 0) {
    queryString = `/?${new URLSearchParams(query).toString()}`;
  }
  const result = await axios.get(`${swapiBaseUrl}/${resource}${queryString}`);
  addToArrayIdsFromUrlInObject(result.data.results);
  return result.data;
};
const getResource = async (resource, id) => {
  const result = await axios.get(`${swapiBaseUrl}/${resource}/${id}`);

  return result.data;
};

module.exports = {
  swapiBaseUrl,
  getEntitiesList,
  getResourceList,
  getResource,
};
