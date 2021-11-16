const getTodosByFilter = require('../services/getTodosByFilter');

homePage = async (data) => {
  for (let p in data) {if (data.hasOwnProperty(p)) {eval("var " + p + " = data[p];");}} data = null;
  data = await getTodosByFilter('Active');
  return data;
};

module.exports = {
  homePage,
};
