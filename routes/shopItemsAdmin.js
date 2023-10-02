const express = require('express');
const router = express.Router();
const itemsCollection = require('../schema/shopItemsSchema');
const { isUserLoggedIn, isAdmin } = require('../middlewares');

router.use(isUserLoggedIn);
router.use(isAdmin);

router.post('/add-item', async (req, res) => {
    try {

        const { name, description, price, isInStock } = req.body;
            
        const itemExist = await itemsCollection.findOne({ name: name });

        if (itemExist) return res.status(400).send('item exists already');

        const newItem = await itemsCollection.create({
            name, description, price, isInStock
        });

        res.status(201).json({ message: 'Item added successfully', newItem });
    } catch (err) {
        console.log(err);
    }
});

router.patch('/edit-item/:id', async (req, res) => {
    try {
        const { name, description, price, isInStock } = req.body;
        
        const editedItem = await itemsCollection.findByIdAndUpdate(req.params.id, {
            name, description, price, isInStock
        }, { new: true });

        if (!editedItem) return res.status(404).send('Item not found');

        res.status(201).json({ message: 'Edited successfully', editedItem });
    } catch (err) {
        console.log(err);
    }
});

router.delete('/delete-item/:id', async (req, res) => {
    try {
        const deletedItem = await itemsCollection.findById(req.params.id);
        
        if (!deletedItem) return res.status(404).send('item not found');
        
        await itemsCollection.findByIdAndDelete(req.params.id);
        res.send('Deleted successfully');
    } catch (err) {
        console.log(err);
    }
});


module.exports = router;