import axios from 'axios';

const BING_API_URL = 'https://bing.biturl.top/?resolution=1920&format=json&index=0&mkt=en-US';

export const getBingWallpaper = async () => {
  try {
    const response = await axios.get(BING_API_URL);
    return response.data.url;
  } catch (error) {
    console.error('Error fetching Bing wallpaper:', error);
    return null;
  }
};
