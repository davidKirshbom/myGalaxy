export function replaceAllStringFromObjectValues(
  object,
  searchString,
  replacementString
) {
  let jsonString = JSON.stringify(object);
  let modifiedJsonString = jsonString.replace(
    new RegExp(searchString, "g"),
    replacementString
  );
  let modifiedObj = JSON.parse(modifiedJsonString);

  return modifiedObj;
}
