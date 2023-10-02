const express = require('express');
const router = express.Router();
const itemsCollection = require('../schema/shopItemsSchema');
const { isUserLoggedIn } = require('../middlewares');

router.use(isUserLoggedIn);

router.get('/list-all', async (req, res) => {
    const items = await itemsCollection.find();
    res.json({ message: "Items fetched successfuly", items });
});

router.get('/find-by-id/:id', async (req, res) => {
    const item = await itemsCollection.findById(req.params.id);
    if (!item) return res.status(404).send('Item not found');
    
    res.json(item);
});

router.get('/find-by-name/:name', async (req, res) => {
    const item = await itemsCollection.findOne({ name: req.params.name });
    if (!item) return res.status(404).send('Item not found');
    
    res.json(item);
});

module.exports = router;