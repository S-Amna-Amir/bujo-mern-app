const express = require('express');
const physicalHealthData = require('../models/physicalHealthdata');
const router = express.Router();

router.post('/', async (req, res) => 
{
  try {
    const newEntry = new physicalHealthData(req.body); 
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get('/today', async (req, res) => 
{
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const data = await physicalHealthData.findOne({
      date: { 
        $gte: today,
        $lt: tomorrow
      }
    });
    
    res.send(data || {});
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/monthly', async (req, res) => 
{
  try {
    const { month } = req.query;
    const year = new Date().getFullYear();
    
    const startDate = new Date(`${month} 1, ${year}`);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1);
    
    const data = await physicalHealthData.find({
      date: {
        $gte: startDate,
        $lt: endDate
      }
    });
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => 
{
  try {
    const updated = await physicalHealthData.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;