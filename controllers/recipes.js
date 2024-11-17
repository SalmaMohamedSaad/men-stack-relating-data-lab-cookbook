const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipe')
const Ingredient = require('../models/ingredient')

router.get('/', async (req, res) => {
  if (req.session.user) {
    try {
      const populatedRecipes = await Recipe.find({}).populate('owner')
      //console.log('Populated Recipe: ', populatedRecipes)
      res.render('recipes/index.ejs', { recipes: populatedRecipes })
    } catch (err) {
      console.log(err)
      res.redirect('/')
    }
  } else {
    res.render('auth/sign-in.ejs')
  }
})
router.get('/new', async (req, res) => {
  if (req.session.user) {
    try {
      const ingredients = await Ingredient.find()
      //console.log('Populated Recipe: ', populatedRecipes)
      res.render('recipes/new.ejs', { ingredients: ingredients })
    } catch (err) {
      console.log(err)
      res.redirect('/')
    }
  } else {
    res.render('auth/sign-in.ejs')
  }
})
router.post('/', async (req, res) => {
  if (req.session.user) {
    try {
      // Save the recipe to the database
      req.body.owner = req.session.user._id
      await Recipe.create(req.body)
    } catch (err) {
      console.error(err)
    }
    res.redirect('/recipes')
  } else {
    res.render('auth/sign-in.ejs')
  }
})
router.get('/:recipeId', async (req, res) => {
  if (req.session.user) {
    try {
      const populatedRecipe = await Recipe.findById(req.params.recipeId)
        .populate('owner')
        .populate('ingredients')
      res.render('recipes/show.ejs', {
        recipe: populatedRecipe,
        ingredients: populatedRecipe.ingredients
      })
    } catch (err) {
      console.log(err)
      res.redirect('/')
    }
  } else {
    res.render('auth/sign-in.ejs')
  }
})
router.get('/:recipeId/edit', async (req, res) => {
  if (req.session.user) {
    const currentRecipe = await Recipe.findById(req.params.recipeId)
    const ingredients = await Ingredient.find()
    res.render('recipes/edit.ejs', {
      recipe: currentRecipe,
      ingredients: ingredients
    })
  } else {
    res.render('auth/sign-in.ejs')
  }
})
router.put('/:recipeId', async (req, res) => {
  if (req.session.user) {
    try {
      const currentRecipe = await Recipe.findById(req.params.recipeId)
      if (currentRecipe.owner.equals(req.session.user._id)) {
        await currentRecipe.updateOne(req.body)
        res.redirect('/recipes')
      } else {
        res.send("You don't have permission to do that.")
      }
    } catch (error) {
      console.log(error)
      res.redirect('/')
    }
  } else {
    res.render('auth/sign-in.ejs')
  }
})

router.delete('/:recipeId', async (req, res) => {
  if (req.session.user) {
    const recipe = await Recipe.findById(req.params.recipeId)
    if (recipe.owner.equals(req.session.user._id)) {
      await recipe.deleteOne()
      res.redirect('/recipes')
    } else {
      res.send("You don't have permission to do that.")
    }
  } else {
    res.render('auth/sign-in.ejs')
  }
})
module.exports = router
