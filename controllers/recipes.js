const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipe')
const Ingredient = require('../models/ingredient')

router.get('/', async (req, res) => {
  try {
    const populatedRecipes = await Recipe.find({}).populate('owner')
    //console.log('Populated Recipe: ', populatedRecipes)
    res.render('recipes/index.ejs', { recipes: populatedRecipes })
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
})
router.get('/new', async (req, res) => {
  try {
    const ingredients = await Ingredient.find()
    //console.log('Populated Recipe: ', populatedRecipes)
    res.render('recipes/new.ejs', { ingredients: ingredients })
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
})
router.post('/', async (req, res) => {
  req.body.owner = req.session.user._id
  await Recipe.create(req.body)
  res.redirect('/recipes')
})

module.exports = router
