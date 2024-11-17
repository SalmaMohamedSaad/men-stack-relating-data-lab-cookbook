const express = require('express')
const router = express.Router()
const Ingredient = require('../models/ingredient')
let message = ''
router.get('/', async (req, res) => {
  if (req.session.user) {
    const ingredients = await Ingredient.find()
    res.render('ingredients/index.ejs', { ingredients: ingredients })
  } else {
    res.render('auth/sign-in.ejs')
  }
})
router.get('/new', async (req, res) => {
  if (req.session.user) {
    res.render('ingredients/new.ejs', { ingredientMessage: message })
  } else {
    res.render('auth/sign-in.ejs')
  }
})
router.post('/', async (req, res) => {
  if (req.session.user) {
    const newIngredient = await Ingredient.create(req.body)

    if (newIngredient) {
      message = 'Ingredient Added Successfully'
    } else {
      message = 'Please try agin latter'
    }
    res.render('ingredients/new.ejs', { ingredientMessage: message })
  } else {
    res.render('auth/sign-in.ejs')
  }
})
router.delete('/:ingredientId', async (req, res) => {
  if (req.session.user) {
    const ingredient = await Ingredient.findById(req.params.ingredientId)
    await ingredient.deleteOne()
    res.redirect('/ingredients')
  } else {
    res.render('auth/sign-in.ejs')
  }
})
module.exports = router
