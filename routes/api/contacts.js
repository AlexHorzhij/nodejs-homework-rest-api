const express = require('express');
const router = express.Router();
const { contacts: ctrl } = require('../../controlers');

const {
  contactsAddSchema,
  contactsUpdateSchema,
  auth,
} = require('../../middlewares');

const {
  schemaVlidation: validation,
  controlerWrapper,
} = require('../../middlewares');

router.get('/', auth, controlerWrapper(ctrl.getAll));

router.get('/:contactId', auth, controlerWrapper(ctrl.getById));

router.post(
  '/',
  auth,
  validation(contactsAddSchema),
  controlerWrapper(ctrl.add)
);

router.delete('/:contactId', auth, controlerWrapper(ctrl.removeById));

router.put(
  '/:contactId',
  auth,
  validation(contactsUpdateSchema),
  controlerWrapper(ctrl.updateById)
);

router.patch(
  '/:contactId',
  validation(contactsUpdateSchema),
  controlerWrapper(ctrl.updateStatusContact)
);

module.exports = router;
