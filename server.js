const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://sankalpie0903:Sankalp%4012345@cluster0.7basap5.mongodb.net/personDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    mobile: String,
});

const Person = mongoose.model('Person', personSchema);

// Get all people
app.get('/person', async (req, res) => {
    const people = await Person.find();
    res.json(people);
});

// Create a person
app.post('/person', async (req, res) => {
    const person = new Person(req.body);
    await person.save();
    res.json(person);
});

// Update a person
app.put('/person/:id', async (req, res) => {
    const updatedPerson = await Person.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.json(updatedPerson);
});

// Delete a person
app.delete('/person/:id', async (req, res) => {
    await Person.findByIdAndDelete(req.params.id);
    res.json({ message: 'Person deleted' });
});


app.listen(3000, () => console.log('Server running on port 3000'));
