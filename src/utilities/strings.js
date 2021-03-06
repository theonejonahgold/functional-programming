export {
  splitStringOnRegex,
  splitStringOnString,
  replaceStringThroughRegex,
  mapCapitaliseString,
  stringEqualsString,
  stringMatchesRegEx,
  stringIsNumber,
  filterStringLength,
  filterStringIsNaN,
  filterStringIncludedInArray,
  replaceStringForObjectValue,
  stringContainsString,
  removeStringFromString,
  removeRegExFromString,
}

/**
 * Splits string on parts that match provided RegEx
 * @param regex RegEx to split string on
 */
function splitStringOnRegex(regex) {
  return str => str.slice().split(regex)
}

/**
 * Splits string on the value of provided split string
 * @param splitStr String containing value to split string on
 */
function splitStringOnString(splitStr) {
  return str => str.slice().split(splitStr)
}

/**
 * Replaces certain parts of string where provided RegEx matches with provided replacement value
 * @param regex RegEx to test on
 * @param replacementVal Value replacing matching parts of string
 */
function replaceStringThroughRegex(regex, replacementVal) {
  return str => str.slice().replace(regex, replacementVal)
}

/**
 * Capitalises first character of string
 * @param str String to capitalise
 */
function mapCapitaliseString(str) {
  return `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`
}

/**
 * Checks if string equals provided filterString
 * @param filterStr String to filter string on
 */
function stringEqualsString(filterStr) {
  return str => !(str.slice().toLowerCase() === filterStr.slice().toLowerCase())
}

/**
 * Checks if string matches provided RegEx
 * @param filterRegex RegEx to match string on
 */
function stringMatchesRegEx(filterRegex) {
  return str => !str.slice().toLowerCase().match(filterRegex)
}

/**
 * Check if string is a number
 * @param str String to check
 */
function stringIsNumber(str) {
  return !Number.isNaN(Number(str))
}

/**
 * Checks if string is not an empty string
 * @param str String to check
 */
function filterStringLength(str) {
  return !!str.length
}

/**
 * Checks if provided string is not a number
 * @param str String to check
 */
function filterStringIsNaN(str) {
  return Number.isNaN(Number(str))
}

/**
 * Returns a function that checks if provided string is included in array provided
 * @param arr Array to map over
 */
function filterStringIncludedInArray(arr) {
  return str =>
    [...arr].map(val => val.toLowerCase()).includes(str.toLowerCase())
}

/**
 * Replaces string to object value based on if the string is a key inside the object
 * @param obj Look-up table containing key-pair values resembling old and new string values
 */
function replaceStringForObjectValue(obj) {
  return str => obj[str] ?? str
}

/**
 * Checks if provided string includes the compareStr provided
 * @param compareStr String to compare string in curried function to
 */
function stringContainsString(compareStr) {
  return str => str.includes(compareStr)
}

function removeStringFromString(strPartial) {
  return str => str.replace(strPartial, '')
}

function removeRegExFromString(regex) {
  return str => str.replace(regex, '')
}
