const express = require('express');
const router = express.Router();
const controlerWrapper = require('../../middlewares/controlerWrapper');
const { users: ctrl } = require('../../controlers');
const {
  registerSchema,
  updateSchema,
  auth,
  upload,
} = require('../../middlewares');
const schemaVlidation = require('../../middlewares/schemaVlidation');

router.post(
  '/register',
  schemaVlidation(registerSchema),
  controlerWrapper(ctrl.register)
);

router.post(
  '/login',
  schemaVlidation(registerSchema),
  controlerWrapper(ctrl.login)
);

router.get('/current', auth, controlerWrapper(ctrl.current));

router.post('/logout', auth, controlerWrapper(ctrl.logout));

router.patch(
  '/avatar',
  auth,
  upload.single('avatar'),
  schemaVlidation(updateSchema),
  controlerWrapper(ctrl.updateAvatar)
);

router.patch(
  '/:userId',
  auth,
  schemaVlidation(updateSchema),
  controlerWrapper(ctrl.updateSubscription)
);

module.exports = router;
