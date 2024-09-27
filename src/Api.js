const fetchCardsData = async () => {
  try {
    const response = await fetch(
      "https://api.quicksell.co/v1/internal/frontend-assignment"
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching cards:", error);
    throw error; // Rethrow the error for handling in the component
  }
};

export default fetchCardsData;
