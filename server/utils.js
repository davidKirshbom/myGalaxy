const replaceAllStringFromObjectValues = (
  object,
  searchString,
  replacementString
) => {
  let jsonString = JSON.stringify(object);
  let modifiedJsonString = jsonString.replace(
    new RegExp(searchString, "g"),
    replacementString
  );
  let modifiedObj = JSON.parse(modifiedJsonString);

  return modifiedObj;
};

const addToArrayIdsFromUrlInObject = (array) => {
  for (const item of array) {
    item.id = getLastNumberFromUrl(item.url);
  }
};
function getLastNumberFromUrl(url) {
  const match = url.match(/(\d+)\/?$/);

  if (match) {
    return parseInt(match[1], 10);
  } else {
    return null;
  }
}
module.exports = {
  replaceAllStringFromObjectValues,
  addToArrayIdsFromUrlInObject,
  getLastNumberFromUrl,
};
