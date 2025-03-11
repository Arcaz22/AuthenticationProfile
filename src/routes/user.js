const { Router } = require('express')
const {
    AddProfileController,
    GetCurrentUserController,
    UpdateProfileController,
    AddAvatarProfileController
} = require('../controller/user.controller')
const { multerUpload } = require('../middlewares/multer-upload')
const authorization = require('../middlewares/authorization')

const router = Router()

router.get('/current-user', [authorization], GetCurrentUserController)
router.post('/add-profile', [authorization], AddProfileController)
router.put('/update-profile', [authorization], UpdateProfileController)
router.post('/add-avatar-profile', [authorization, multerUpload], AddAvatarProfileController)

module.exports = router
