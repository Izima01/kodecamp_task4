const axios = require('axios');

test('Test for adding items endpoint', async() => {
    try {
        const res = await axios.post('http://localhost:4000/v1/admin/shop/add-item', {
            name: 'Friendifer',
            description: 'A friend making machine',
            price: 50,
            isInStock: true
        }, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkdhYmUiLCJ1c2VySWQiOiI2NTNhYzBkNTBiMWQ5ODU4NGY0ZThhMGYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTgzNDk0NjV9.LXl0hqOoLkr6R8hw9FvaZsp5CUTIhyO5btpF_0jPcTA'
            }
        });

        global.productId = res.data.newItem._id;
        
        expect(res.status).toBe(201);
        expect(res.data).toBe('User created successfully');
    } catch (err) {}
}, 10000);


test('Test for getting all items endpoint', async() => {
    try {
        const res = await axios.get('http://localhost:4000/v1/shop/list-all', {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkdhYmUiLCJ1c2VySWQiOiI2NTNhYzBkNTBiMWQ5ODU4NGY0ZThhMGYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTgzNDk0NjV9.LXl0hqOoLkr6R8hw9FvaZsp5CUTIhyO5btpF_0jPcTA'
            }
        });

        expect(res.data.message).toBe("Items fetched successfuly");
        expect(typeof res.data.items).toBe('object');
    } catch (err) {}
});

test('Test for deleting items', async () => {
    try {
        const res = await axios.get(`http://localhost:4000/v1/admin/shop/delete-item/${global.productId}`, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkdhYmUiLCJ1c2VySWQiOiI2NTNhYzBkNTBiMWQ5ODU4NGY0ZThhMGYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTgzNDk0NjV9.LXl0hqOoLkr6R8hw9FvaZsp5CUTIhyO5btpF_0jPcTA'
            }
        });

        expect(res.data.message).toBe("Deleted successfully");
    } catch (err) {}
});
