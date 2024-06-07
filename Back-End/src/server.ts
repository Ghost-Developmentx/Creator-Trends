// server.ts
import express from 'express';

const app = express();
const port = 3000; // You can choose any port you prefer

app.get('/', (req, res) => {
    res.send('Creator Trends Backend is running!');
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
