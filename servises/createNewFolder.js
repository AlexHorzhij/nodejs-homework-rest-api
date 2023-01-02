const checkExistance = require('./checkFolderExistance');
const fs = require('fs/promises');

const createNewFolder = async folderPath => {
  if (!(await checkExistance(folderPath))) {
    await fs.mkdir(folderPath);
  }
};

module.exports = createNewFolder;
