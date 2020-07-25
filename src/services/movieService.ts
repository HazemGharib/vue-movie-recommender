import axios from 'axios';

const baseUrl = process.env.VUE_APP_API_URL;

export const searchMovies = async (searchText: string, year?: number) => {
  const refinedText: string[] = [];
  searchText.split(' ').forEach((str) => refinedText.push(str.replace(/\W/g, '')));

  return axios.get(`${baseUrl}/search/${refinedText.join('+')}&type=movie${year ? `&y=${Math.abs(year)}` : ''}`);
};

export const getMovieByTitle = async (movieTitle: string) => {
  const refinedText: string[] = [];
  movieTitle.split(' ').forEach((str) => refinedText.push(str.replace(/\W/g, '')));

  return axios.get(`${baseUrl}/title/${refinedText}`);
};

export const getMovieById = async (movieId: string) => axios.get(`${baseUrl}/id/${movieId}`);

export const getTopRatedMovies = async () => axios.get(`${baseUrl}/top`);

export const getMoviesByGenre = async (movieGenre: string) => axios.get(`${baseUrl}/genre/${movieGenre}`);
