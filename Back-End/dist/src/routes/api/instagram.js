var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// src/routes/instagram.ts
import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const router = express.Router();
//Get trending Instagram Reels
router.get('/trends', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const options = {
            method: 'GET',
            url: 'https://instagram-looter2.p.rapidapi.com/sections',
            headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'instagram-looter2.p.rapidapi.com'
            }
        };
        const response = yield axios.request(options);
        console.log('RapidAPI Response:', response.data);
        res.json(response.data);
    }
    catch (error) {
        console.error("Error fetching Instagram Reels:", error);
        res.status(500).json({ error: 'Failed to fetch Instagram Reels' });
    }
}));
export default router;
