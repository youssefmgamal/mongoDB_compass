let mongoose = require("mongoose");
let validator = require("validator");

let personSchema = new mongoose.Schema({
    name: {
        type: String,
        validate : (value) => {
            return value.length <= 20;
        }
    },
    age: {
        type: Number,
    },
    favoritefoods: {
        type: [String],
    }

});


function timestamp(schema) {
    // Add the two fields to the schema
    schema.add({ 
      createdAt: Date,
      updatedAt: Date
    })
  
    // Create a pre-save hook
    schema.pre('save', function (next) {
      let now = Date.now()
     
      this.updatedAt = now
      // Set a value for createdAt only if it is null
      if (!this.createdAt) {
        this.createdAt = now
      }
     // Call the next function in the pre-save chain
     next()    
    })
  }


  personSchema.plugin(timestamp)

module.exports = mongoose.model("Person", personSchema);