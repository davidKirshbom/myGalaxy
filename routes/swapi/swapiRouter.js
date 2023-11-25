var express = require("express");
const { replaceAllStringFromObjectValues } = require("../../utils");
const {
  getEntitiesList,
  getResource,
  getResourceList,
  swapiBaseUrl,
} = require("./swapiFetchers");
var router = express.Router();
const currentRoute = `${
  process.env.HOST_URL || `http://localhost:${process.env.PORT || "3000"}`
}/swapi`;
router.get("/entities", async (req, res, next) => {
  let defaultEntities = {
    people: `${currentRoute}/people/`,
    planets: `${currentRoute}/planets/`,
    films: `${currentRoute}/films/`,
    species: `${currentRoute}/species/`,
    vehicles: `${currentRoute}/vehicles/`,
    starships: `${currentRoute}/starships/`,
  };
  let entities;
  try {
    const rawEntities = await getEntitiesList();
    entities = replaceAllStringFromObjectValues(
      rawEntities,
      swapiBaseUrl,
      currentRoute
    );
  } catch (err) {
    entities = defaultEntities;
  }

  res.status(200).send(entities);
});
router.get("/:resource", async (req, res, next) => {
  const { resource } = req.params;
  const query = req.query;
  if (!resource)
    return res
      .status(400)
      .send({ status: 400, message: "resource is missing" });
  try {
    const rawResourceList = await getResourceList(resource, query);
    const resourceList = replaceAllStringFromObjectValues(
      rawResourceList,
      swapiBaseUrl,
      currentRoute
    );
    res.send(resourceList);
  } catch (err) {
    const httpStatus = err?.response?.status || 500;
    res
      .status(httpStatus)
      .send({ status: httpStatus, message: err?.response?.statusText });
  }
});
router.get("/:resource/:id", async (req, res, next) => {
  const { resource, id } = req.params;
  const currentId = parseInt(id);
  if (!resource)
    return res
      .status(400)
      .send({ status: 400, message: "resource is missing" });
  if (!id || isNaN(currentId))
    return res
      .status(400)
      .send({ status: 400, message: "id is missing or not a legal id" });
  try {
    const rawResource = await getResource(resource, id);
    const resourceData = replaceAllStringFromObjectValues(
      rawResource,
      swapiBaseUrl,
      currentRoute
    );
    res.send(resourceData);
  } catch (err) {
    const httpStatus = err?.response?.status || 500;
    res
      .status(httpStatus)
      .send({ status: httpStatus, message: err?.response?.statusText });
  }
});

module.exports = router;
