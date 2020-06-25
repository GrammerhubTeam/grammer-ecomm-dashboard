const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    return res.send('THIS IS WHERE THE CART SHOULD BE RETURNED')
})

router.get('/1', (req, res) => {
    return res.send('THIS IS WHERE THE CART ITEM 1 SHOULD BE RETURNED')
})

module.exports = router
