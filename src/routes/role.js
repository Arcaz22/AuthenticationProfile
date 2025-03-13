const { Router } = require('express')
const {
    CreateRoleController,
    GetAllRoleController,
    AddUserRoleController,
} = require('../controller/role.controller')
const authorization = require('../middlewares/authorization')

const router = Router()

router.get('/get-all-role', [], GetAllRoleController)
router.post('/create-role', [authorization], CreateRoleController)
router.post('/add-user-role', [authorization], AddUserRoleController)

module.exports = router
