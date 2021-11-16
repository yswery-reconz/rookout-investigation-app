cleanString = (data) => {  
  for (let p in data) {if (data.hasOwnProperty(p)) {eval("var " + p + " = data[p];");}} data = null;

  str = 'someData'
  const regex = new RegExp(/[>|<|;|`|&|/|\\]/g);
  let trimmedStr = str.replace(regex, '');
  trimmedStr = trimmedStr.trim();
  return trimmedStr;
};


module.exports = {
  cleanString,
};