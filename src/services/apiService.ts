import axios from 'axios';
import { getImageUrl } from '../utils/getImageUrl';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

export const getPokemonList = async (page: number) => {
  const response = await api.get(`/pokemon?limit=20&offset=${(page - 1) * 20}`);
  return response.data;
};

export const getPokemonDetails = async (id: number) => {
  const response = await api.get(`/pokemon/${id}`);
  const speciesData = await api.get(response.data.species.url);
  const evolutionChainUrl = speciesData.data.evolution_chain.url;

  const evolutionChainResponse = await api.get(evolutionChainUrl);
  const evolutions = extractEvolutions(evolutionChainResponse.data.chain);
  response.data.evolutions = evolutions;

  const pokemonId = response.data.id;
  response.data.image = getImageUrl(pokemonId);
  
  return response.data;
};

// Função para extrair a cadeia de evolução e incluir imagens
const extractEvolutions = (chain: any) => {
  const evolutions = [];

  let currentStage = chain;
  while (currentStage) {
    const pokemonName = currentStage.species.name;

    const speciesUrl = currentStage.species.url;
    const pokemonId = extractIdFromUrl(speciesUrl);

    const imageUrl = getImageUrl(pokemonId);
    console.log(imageUrl)
    evolutions.push({
      name: pokemonName,
      imageUrl,
    });

    currentStage = currentStage.evolves_to[0]; // Move para o próximo estágio da evolução
  }

  return evolutions;
};

// Função auxiliar para extrair o ID do Pokémon da URL da espécie
const extractIdFromUrl = (url: string) => {
  const urlParts = url.split('/').filter(Boolean);
  return urlParts[urlParts.length - 1]; // O último elemento é o ID
};