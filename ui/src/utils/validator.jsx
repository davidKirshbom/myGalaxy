export function isValidHttpUrl(string) {
  const urlRegex =
    /^(?:(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*|\/\S*)$/;

  return urlRegex.test(string);
}
