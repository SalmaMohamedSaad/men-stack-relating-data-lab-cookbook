const mongoose = require('mongoose')
const foodSchema = new mongoose.Schema(
  {
    name: { type: String, require: true }
  },
  { timestamps: true }
)
const FoodSchema = mongoose.model('FoodSchema', foodSchema)
module.exports = FoodSchema
