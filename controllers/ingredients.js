const express = require('express')
const router = express.Router()
const Ingredient = require('../models/ingredient')
let message = ''
router.get('/new', async (req, res) => {
  res.render('ingredients/new.ejs', { ingredientMessage: message })
})
router.post('/', async (req, res) => {
  const newIngredient = await Ingredient.create(req.body)

  if (newIngredient) {
    message = 'Ingredient Added Successfully'
  } else {
    message = 'Please try agin latter'
  }
  res.render('ingredients/new.ejs', { ingredientMessage: message })
})
module.exports = router
