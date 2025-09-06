import { axiosInstance } from './axiosService';

export async function submitGuess(gameId, text) {
  const { data } = await axiosInstance.post(`/api/v1/guesses/${gameId}`, { text });
  return data;
}

export default { submitGuess };
