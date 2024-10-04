// src/stores/store.ts
import { defineStore } from 'pinia';
import axios from 'axios';
import { getImageUrl } from '../utils/getImageUrl';
import { Pokemon } from '../interfaces/Pokemon.interface';

export const usePokemonStore = defineStore('pokemonStore', {
  state: () => ({
    pokemonList: [] as Pokemon[],
    pokemonSet: new Set<number>(), // Usando um Set apenas para IDs para evitar duplicatas
    currentPage: 1,
    loading: false,
    isFetched: false, 
  }),
  actions: {
    async fetchPokemons() {
      this.loading = true;
      if (this.isFetched) return; // Evita novas chamadas se já tiver buscado
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=${(this.currentPage - 1) * 12}`);
        
        const pokemons = response.data.results.map((pokemon: any, index: number) => ({
          id: (this.currentPage - 1) * 12 + index + 1,
          name: pokemon.name,
          url: pokemon.url,
          image: `${getImageUrl((this.currentPage - 1) * 12 + index + 1)}`
        }));

        // Adiciona os Pokémon ao array apenas se não estiverem no Set
        pokemons.forEach((pokemon: Pokemon) => {
          if (!this.pokemonSet.has(pokemon.id)) {
            this.pokemonList.push(pokemon);
            this.pokemonSet.add(pokemon.id); // Adiciona o ID ao Set para rastrear duplicatas
          }
        });

        this.isFetched = true;
      } catch (error) {
        console.error('Failed to fetch pokemons', error);
      } finally {
        this.loading = false;
        this.isFetched = false;
      }
    },
    setCurrentPage(page: number) {
      this.currentPage = page;
      //this.pokemonList = []; // Limpa a lista antes de buscar os novos Pokémon
      this.fetchPokemons();
    },
  },
});

