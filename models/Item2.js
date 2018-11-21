const mongoose = require('mongoose');


//Create Schema
const ItemSchema2 = mongoose.Schema({
  title: {
    type: String
  },

  description: {
    type: String
   
  },

  urlToImage: {
    type: String
  },

  publishedAt: {
    type: String
  },

  url: {
    type: String
  },
});
const Item2 = mongoose.model('Item2', ItemSchema2, "Saved Games News");
module.exports = Item2;