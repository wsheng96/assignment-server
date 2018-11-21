const mongoose = require('mongoose');


//Create Schema
const ItemSchema = mongoose.Schema({
  title: {
    type: String
  },

  link: {
    type: String
   
  },

  image: {
    type: String
  },

  releaseDate: {
    type: String
  },

  originalPrice: {
    type: String
  },

  ratings: {
    type: String
  }
});
const Item = mongoose.model('Item', ItemSchema, "Saved Items");
module.exports = Item;