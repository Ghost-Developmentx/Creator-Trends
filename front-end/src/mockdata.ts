// frontend/src/mockData.ts

interface MockInstagramReel {
    platform: string;
    postId: string;
    videoUrl: string;
    imageUrl: string;
    caption: string;
    likes: number;
    comments: number;
    views: number;
    username: string;
    datePosted: Date;
    audioUrl?: string;
}


const mockReels: MockInstagramReel[] = [
    {
        platform: 'Instagram',
        postId: '1234567890',
        videoUrl: 'https://example.com/video1.mp4', // Placeholder URL
        imageUrl: 'https://via.placeholder.com/300', // Placeholder image
        caption: 'This is a sample Instagram Reel caption.',
        likes: 1234,
        comments: 56,
        views: 15000,
        username: 'johndoe',
        datePosted: new Date(),
        audioUrl: 'https://example.com/audio1.mp3', // Placeholder URL
    },
    {
        platform: 'Instagram',
        postId: '9876543210',
        videoUrl: 'https://example.com/video2.mp4', // Placeholder URL
        imageUrl: 'https://via.placeholder.com/300', // Placeholder image
        caption: 'Another amazing Instagram Reel!',
        likes: 5678,
        comments: 23,
        views: 20000,
        username: 'janesmith',
        datePosted: new Date(),
        audioUrl: 'https://example.com/audio2.mp3', // Placeholder URL
    },
    // ... add more mock reels as needed ...
];

export default mockReels;
