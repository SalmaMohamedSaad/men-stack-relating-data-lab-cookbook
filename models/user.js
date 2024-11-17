const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: [3, 'Name Must Be More Than 3 Characters'],
      maxlength: [10, 'Too much letters']
    },
    password: { type: String, required: true },
    pantry: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FoodSchema' }]
  },
  { timestamps: true } // this line will create two fields automatically for logging the creation and the update time createdAt, updatedAt
)
const User = mongoose.model('User', userSchema)
module.exports = User
