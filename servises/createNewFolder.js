const checkExistance = require('./checkExistance');
const fs = require('fs/promises');

const createNewFolder = async folderPath => {
  if (!(await checkExistance(folderPath))) {
    await fs.mkdir(folderPath);
  }
};

module.exports = createNewFolder;
