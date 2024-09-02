import axios from "axios";

const UNSPLASH_ACCESS_KEY = '2HmflLmylNDS-4joX8B0yrV1L1VBTgyxUT9GpRO6-vk';
const UNSPLASH_URL = 'https://api.unsplash.com/search/photos';

export const GetPlaces = async (location) => {
    try {
        const response = await axios.get(UNSPLASH_URL, {
            params: {
                query: location,
                client_id: UNSPLASH_ACCESS_KEY,
                per_page: 5,
            },
        });
        return response.data.results;
    } catch (error) {
        console.error('Error fetching place photos:', error);
        throw error;
    }
};