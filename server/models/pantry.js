const mongoose = require('mongoose');

const pantrySchema = mongoose.Schema({
  name:{
    type: String,
    required: true,
    minLength: 1,
  },
  address:{
    type: String,
    required: true,
    minLength: 1
  },
  img:{
    type: String,
    required: true,
    minLength: 1
  },
  phone:{
    type: String,
    required: true,
    minLength: 1
  },
  website:{
    type: String,
    required: true,
    minLength: 1
  },
  wishlist:{
    type: Array
  },
  starthr:{
    type: String,
    require: true
  },
  endhr:{
    type: String,
    require: true
  },
  fbname:{
    type: String,
    require: true,
  },
  fblink:{
    type: String,
    require: true
  }
})

const Pantry = mongoose.model('Pantry', pantrySchema);

module.exports = {Pantry};
