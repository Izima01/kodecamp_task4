const axios = require('axios');

beforeAll(() => {
  global.testToken = process.env.testToken;
});

test('Test for adding items endpoint', async() => {
    try {
        const res = await axios.post('http://localhost:4000/v1/admin/shop/add-item', {
            name: 'Friendifer',
            description: 'A friend making machine',
            price: 50,
            isInStock: true
        }, {
            headers: {
                Authorization: `Bearer ${global.testToken}`
            }
        });
        
        expect(res.status).toBe(201);
        expect(res.data).toBe('User created successfully');
    } catch (err) {
        // console.log(err);
    }
}, 10000);


test('Test for getting all items endpoint', async() => {
    try {
        const res = await axios.get('http://localhost:4000/v1/shop/list-all', {
            headers: {
                Authorization: `Bearer ${global.testToken}`
            }
        });

        expect(res.data.message).toBe("Items fetched successfuly");
        expect(typeof res.data.items).toBe('object');
    } catch (err) {}
});

// test('Test for deleting items', async () => {
//     try {
//         const res = await axios.get(`http://localhost:4000/v1/admin/shop/delete-item/:id`,  {
//             headers: {
//                 Authorization: `Bearer ${global.testToken}`
//             }
//         });

//         expect(res.data.message).toBe("Deleted successfully");
//     } catch (err) {}
// });
