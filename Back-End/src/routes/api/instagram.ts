// src/routes/instagram.ts
import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

//Get trending Instagram Reels
router.get('/trends', async (_req, res) => {
    try {
        dotenv.config();
        console.log("API Key:", process.env.RAPIDAPI_KEY);
        // Move options definition inside the route handler
        const options = {
            method: 'GET',
            url: 'https://instagram-looter2.p.rapidapi.com/sections',
            headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY, // Now fetched at request time
                'X-RapidAPI-Host': 'instagram-looter2.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);
        console.log('RapidAPI Response:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching Instagram Reels:", error);
        res.status(500).json({error: 'Failed to fetch Instagram Reels'});
    }
});

export default router;