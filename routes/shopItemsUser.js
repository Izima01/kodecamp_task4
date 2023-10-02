const express = require('express');
const router = express.Router();
const itemsCollection = require('../schema/shopItemsSchema');
const { isUserLoggedIn } = require('../middlewares');

router.use(isUserLoggedIn);

router.get('/list-all', async (req, res) => {
    try {
        const items = await itemsCollection.find();
        res.json({ message: "Items fetched successfuly", items });
    } catch (err) {
        console.log(err);
    }
});

router.get('/find-by-id/:id', async (req, res) => {
    try {
        const item = await itemsCollection.findById(req.params.id);
        if (!item) return res.status(404).send('Item not found');
        
        res.json(item);
    } catch (err) {
        console.log(err);
    }
});

router.get('/find-by-name/:name', async (req, res) => {
    try {
        const item = await itemsCollection.findOne({ name: req.params.name });
        if (!item) return res.status(404).send('Item not found');
    
        res.json(item);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;