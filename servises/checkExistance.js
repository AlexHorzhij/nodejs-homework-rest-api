const fs = require('fs/promises');

const checkExistance = async path => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

module.exports = checkExistance;
