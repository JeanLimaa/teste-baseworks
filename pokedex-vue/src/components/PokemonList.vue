<template>
  <section>
    <div class="filter-container">
      <input type="text" v-model="filterInput" placeholder="Filtrar por nome ou ID">
      <button>Pesquisar</button>
    </div>
      <div class="pokemon-list">
        <div v-for="pokemon in filteredPokemonList" :key="pokemon.id" class="pokemon-item">
          <RouterLink :to="`/pokemon/${pokemon.id}`">
            <div class="pokemon-image-container">
              <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-image" />
            </div>
            <div class="pokemon-info">
              <p>Nº {{ pokemon.id.toString().padStart(4, '0') }}</p>
              <h3>{{ capitalizeFirstLetter(pokemon.name) }}</h3>
            </div>
          </RouterLink>
        </div>
      </div>
      <button @click="loadMore" :disabled="loading">Carregar mais</button>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { usePokemonStore } from '../stores/store';
import { capitalizeFirstLetter } from '../utils/stringUtils';
import { Pokemon } from '../interfaces/Pokemon.interface';

export default defineComponent({
  setup() {
    const store = usePokemonStore();
    const filterInput = ref('');

    const loadMore = () => {
      store.setCurrentPage(store.currentPage + 1);
    };

    const filteredPokemonList = computed(() => {
      const filter = filterInput.value.toLowerCase();

      const filteredPokemons = store.pokemonList.filter((pokemon: Pokemon) => 
        pokemon.name.toLowerCase().includes(filter) || 
        pokemon.id.toString().includes(filter)
      );

      return filteredPokemons;
    });

/*     onMounted(() => {
      store.fetchPokemons();
    }) */

    return {
      filterInput,
      filteredPokemonList,
      loadMore,
      loading: store.loading,
      capitalizeFirstLetter
    };
  },

  mounted() {
    const store = usePokemonStore();
    store.fetchPokemons();
  },
});
</script>

<style scoped>
section{
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
}

.pokemon-list {
  display: grid;
  grid-template-columns: repeat(4, minmax(150px, 1fr));
  gap: 1.5rem; 
  justify-items: center; 
}

.pokemon-image-container {
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  overflow: hidden; 
}

.pokemon-image {
  width: 100%;
  height: 100%;
  object-fit: contain; 
}

.pokemon-item {
  border: 0.1px solid var(--thirty-color);
  border-radius: 0.8rem;
  padding: 1rem;
  background-color: #1e293b;
  transition: transform 0.2s ease-in-out;
}

.pokemon-item:hover {
  transform: scale(1.05); 
}

.pokemon-info {
  background-color: var(--secondary-color);
  border-radius: 10px;
  padding: 0.3rem;
}

.filter-container {
  display: flex;
  width: 100%;
}

.filter-container input {
  padding: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
}

@media (max-width: 860px) {
  .pokemon-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}

@media (max-width: 440px) {
  .filter-container {
    flex-direction: column;
    align-items: center;
  }

  .filter-container{
    gap: 0.3rem;
  }

  .filter-container input {
    width: 70vw;
    margin: 0;
  }

  button {
    width: 70vw;
  }

  .pokemon-list{
    padding: 0.3rem;
    gap: 1rem 0.5rem;
  }

  .pokemon-image-container{
    width: 130px;
    height: 130px;
  }

  .pokemon-item {
    padding: 0.6rem;
  }
}

</style>
