import { axiosInstance } from './axiosService';


export async function createGame() {
  const { data } = await axiosInstance.post('/api/v1/games', {});
  return data;
}

export async function getGame(id) {
  const { data } = await axiosInstance.get(`/api/v1/games/${id}`);
  return data;
}

export default { createGame, getGame };
