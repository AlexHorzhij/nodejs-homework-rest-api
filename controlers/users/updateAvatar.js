const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');
const { UnsupportedMediaType, BadRequest } = require('http-errors');
const { Users } = require('../../models');

const updateAvatar = async (req, res) => {
  if (!req.file) {
    throw new BadRequest('Request is empty');
  }
  const { _id } = req.user;
  const { originalname, path: tempPath, mimetype } = req.file;

  const avatarNewName = `${_id}_${originalname}`;
  const newPath = path.join(process.cwd(), 'public', 'avatars', avatarNewName);
  const avatarPath = path.join('avatars', avatarNewName);

  if (mimetype !== 'image/jpeg') {
    await fs.unlink(tempPath);
    throw new UnsupportedMediaType('You must download image file');
  }
  const img = await Jimp.read(tempPath);
  await img
    .autocrop()
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(tempPath);
  await fs.rename(tempPath, newPath);

  const result = await Users.findByIdAndUpdate(_id, { avatarURL: avatarPath });
  const deleteAvatar = path.join(process.cwd(), 'public', result.avatarURL);
  await fs.unlink(deleteAvatar);

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      _id: result._id,
      email: result.email,
      avatarURL: avatarPath,
    },
    message: 'Avatar updaded',
  });
};

module.exports = updateAvatar;
