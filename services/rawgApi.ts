const API_KEY = "36cea21ff3204e468e5f07538178ba86";
const API_URL = "https://api.rawg.io/api";

export const getGames = async () => {
  try {
    const response = await fetch(`${API_URL}/games?key=${API_KEY}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results; 
  } catch (error) {
    console.error("Error fetching games:", error);
    return [];
  }
};


export const getGameDetails = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/games/${id}?key=${API_KEY}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching game details for ID ${id}:`, error);
    return null;
  }
}; 