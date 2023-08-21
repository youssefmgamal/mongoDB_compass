const person = require("express").Router();
const Person = require("../models/person.model");


person.get("/", async (req, res) => {
  try {
    const persons = await Person.find();

    res.status(200).send(persons);
  }
    catch (err) {
        (res.status(500).send('check your code'))
    }
});
person.post("/", async (req, res) => {
  try{
        let person = new Person ({
        name: req.body.name,
        age: req.body.age,
        favoritefoods: req.body.favoritefoods,
            
    });
    await person.save();
    res.status(200).send(person);
  }
    catch (err) {   
        console.log(err)
        (res.status(500).send('check your code'))
    }
        
       
});
person.put("/:id", async (req, res) => {
  try{
  await Person.findOneAndReplace({_id: req.params.id}, req.body);
  res.status(200).send({_id: req.params.id, ...req.body});
}
    catch (err) {
        (res.status(500).send('check your code'))
    }
});
person.put("/:id/add-favorite-food", async (req, res) => {
  try{
    const person = await Person.findById(req.params.id);
    
    person.favoritefoods.push(req.body.item);
    
    let result = await person.save();
    res.status(200).send(result);
  }
    catch (err) { 
        (res.status(500).send(console.log(err)))
    }
  });
person.delete("/:id/remove-doc", async (req, res) => {
  try{
  await Person.findByIdAndRemove(req.params.id);

  res.status(200).send("deleted");
}
    catch (err) { 
        (res.status(500).send("check your code"))
    }
});
person.delete("/remove-many", async (req, res) => {
  try{
    await Person.deleteMany({name: req.body.name});
    res.status(200).send("deleted");
  }
    catch (err) { 
        (res.status(500).send("check your code"))
    }
});
person.post("/create-many", async (req, res) => {
  try{
    await Person.create(req.body);
    res.status(200).send("created");
  }
    catch (err) {
        (res.status(500).send("check your code"))
    }
});
person.get("/find-by-name", async (req, res) => {
  try{
    let person = await Person.find({name: req.body.asm});
    console.log(req.body)
    res.status(200).send(person);
  }
    catch (err) {
        (res.status(500).send("check your code"))
    }
});

module.exports = person;