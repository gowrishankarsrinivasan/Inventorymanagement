const express = require('express');
const router = express.Router();
const Inventory = require('../models/inventorySchema');

router.post('/add', async (req, res) => {
  try {
    const newItem = new Inventory(req.body);
    await newItem.save();
    res.status(201).send(newItem);
  } catch (error) {
    res.status(400).send(error);
  }
});


router.get('/', async (req, res) => {
  try {
    const items = await Inventory.find({});
    res.status(200).send(items);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.patch('/:id', async (req, res) => {
  try {
    const updatedItem = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send(updatedItem);
  } catch (error) {
    res.status(400).send(error);
  }
});


router.delete('/:id', async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.status(200).send('Item deleted');
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
