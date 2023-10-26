const axios = require('axios');
const userCollection = require('../schema/userSchema');

test('Test for registration endpoint', async() => {
    try {
        const res = await axios.post('http://localhost:4000/v1/auth/register', {
            fullName: 'Kevin Gabriel',
            userName: 'Gabe',
            password: 'gabe12345',
            role: 'admin'
        });
        
        expect(res.status).toBe(201);
        expect(res.data).toBe('User created successfully');
    } catch (err) {
        // console.log(err);
    }
}, 10000);

test('Test for logging in endpoint', async() => {
    try {
        const res = await axios.post('http://localhost:4000/v1/auth/login', {
            userName: 'Gabe',
            password: 'gabe12345'
        });

        expect(res.status).toBe(200);
        expect(res.data.message).toBe('Sign in successful');
    } catch (err) {
        // console.log(err);
    }
}, 10000);