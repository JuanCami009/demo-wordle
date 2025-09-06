import { axiosInstance } from './axiosService';

export async function listWords(params = {}) {
  const { q, limit, offset } = params;
  const { data } = await axiosInstance.get('/api/v1/words', {
    params: { q, limit, offset },
  });
  return data;
}

export async function randomWord() {
  const { data } = await axiosInstance.get('/api/v1/words/random');
  return data;
}

export async function wordExists(text) {
  const { data } = await axiosInstance.get('/api/v1/words/exists', {
    params: { text },
  });
  return data;
}

export async function bulkWords(words) {
  const { data } = await axiosInstance.post('/api/v1/words/bulk', { words });
  return data;
}

export default { listWords, randomWord, wordExists, bulkWords };
