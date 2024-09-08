export const API_URL = "https://opentdb.com/";

export function createUrl(settings) {
  let apiUrl = `${API_URL}api.php?amount=${settings.questionQuantity}`;

  if (settings.category.id !== "anyCategory") {
    apiUrl = apiUrl.concat(`&category=${settings.category.id}`);
  }

  if (settings.difficulty.id !== "anyDifficulty") {
    apiUrl = apiUrl.concat(`&difficulty=${settings.difficulty.id}`);
  }

  return apiUrl;
}
