const express = require('express');
const router = express.Router();
const { contacts: ctrl } = require('../../controlers');

const {
  contactsAddSchema,
  contactsUpdateSchema,
} = require('../../middlewares');

const {
  contactValidation: validation,
  controlerWrapper,
} = require('../../middlewares');

router.get('/', controlerWrapper(ctrl.getAll));

router.get('/:contactId', controlerWrapper(ctrl.getById));

router.post('/', validation(contactsAddSchema), controlerWrapper(ctrl.add));

router.delete('/:contactId', controlerWrapper(ctrl.removeById));

router.put(
  '/:contactId',
  validation(contactsUpdateSchema),
  controlerWrapper(ctrl.updateById)
);

router.patch(
  '/:contactId',
  validation(contactsUpdateSchema),
  controlerWrapper(ctrl.updateStatusContact)
);

module.exports = router;
