const createNewFolder = require('./createNewFolder');
const path = require('path');

const createFoldersForAvatar = async () => {
  createNewFolder(path.join(process.cwd(), 'temp'));
  createNewFolder(path.join(process.cwd(), 'public'));
  createNewFolder(path.join(process.cwd(), 'public', 'avatars'));
};

module.exports = createFoldersForAvatar;
