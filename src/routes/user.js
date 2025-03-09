const { Router } = require('express')
const {
    AddProfileController,
    GetCurrentUserController,
    UpdateProfileController
} = require('../controller/user.controller')
const authorization = require('../middlewares/authorization')

const router = Router()

router.get('/current-user', [authorization], GetCurrentUserController)
router.post('/add-profile', [authorization], AddProfileController)
router.put('/update-profile', [authorization], UpdateProfileController)

module.exports = router
