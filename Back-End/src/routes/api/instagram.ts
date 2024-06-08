// src/routes/instagram.ts
import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import InstagramReel from "../../models/instagramReel";

dotenv.config();

const router = express.Router();

const userCategories: { [category: string]: string[] } = {
  lifestyle: ["2011375769", "31027484"],
  beauty_and_fashion: ["14081467", "19106973"],
  health_and_fitness: ["42228698", "16009623"],
  food_and_drink: ["1937960", "3360029"],
  technology: ["30588147", "245466861"],
  education: ["497784956", "353049659"],
  entertainment: ["8010139560", "18258800993"],
  travel: ["510990121", "274570222"],
  finance_and_business: ["5384665", "2685325124"],
  diy: ["27897568", "406390572"],
  gaming: ["896278327", "1375950361"],
  personal_development_and_motivation: ["211891528", "653993028"],
  comedy: ["8443283", "26656699599"],
  pets_and_animals: ["13690821", "2053300282"],
  onlyfans: ["3951534", "2708048228"],
};

//Get trending Instagram Reels
// Get trending Instagram Reels for all categories
router.get("/trends/all", async (_req, res) => {
  try {
    const allUserIds = Object.values(userCategories).flat(); // Get all user IDs

    const options = {
      method: "GET",
      url: "https://instagram-looter2.p.rapidapi.com/reels",
      params: {
        id: allUserIds.join(","), // Combine user IDs into a comma-separated string
        count: (2 * allUserIds.length).toString(), // Adjust the count based on the number of user IDs
      },
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": "instagram-looter2.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);

    const trendingVideosData = response.data.items
      .filter((item: any) => item.media?.video_versions)
      .map(async (item: any) => {
        const media = item.media;
        const category =
          Object.keys(userCategories).find((key) =>
            userCategories[key].includes(media.user.pk),
          ) || "other"; // Find the category or use 'other' if not found

        return {
          category,
          platform: "Instagram",
          postId: media.pk,
          videoUrl: media.video_versions[0].url,
          caption: media.caption?.text || "",
          likes: media.like_count,
          comments: media.comment_count,
          views: media.view_count,
          username: media.user.username,
          datePosted: new Date(media.taken_at * 1000),
          audioUrl:
            media.music_metadata?.music_info?.music_asset_info
              ?.progressive_download_url || "",
        };
      });
    // Save to the database (before filtering) and get the saved documents
    const savedReels = await InstagramReel.insertMany(trendingVideosData);

    //Filter based on views AFTER saving to DB
    const trendingVideos = savedReels.filter((reel) => reel.views >= 10000); // Filter by views

    res.json(trendingVideos);
  } catch (error) {
    // ... (your error handling logic)
  }
});

export default router;
