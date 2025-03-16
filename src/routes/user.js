const { Router } = require('express')
const {
  AddProfileController,
  GetCurrentUserController,
  UpdateProfileController,
  AddAvatarProfileController,
  GetAllUserController,
  UpdateAvatarProfileController
} = require('../controller/user.controller')
const { multerUpload } = require('../middlewares/multer-upload')
const authorization = require('../middlewares/authorization')

const router = Router()

router.get('/current-user', [authorization], GetCurrentUserController)
router.get('/get-all-user', [], GetAllUserController)
router.post('/add-profile', [authorization], AddProfileController)
router.post(
  '/add-avatar-profile',
  [authorization, multerUpload],
  AddAvatarProfileController
)
router.put('/update-profile', [authorization], UpdateProfileController)
router.put(
  '/update-avatar-profile',
  [authorization, multerUpload],
  UpdateAvatarProfileController
)

module.exports = router
