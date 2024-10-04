<template>
  <div class="pokemon-details-container">
    <!-- Detalhes do Pokémon -->
    <div v-if="pokemon" class="pokemon-detail">
      <div>
        <div class="pokemon-info">
          <p>Nº {{ pokemon.id.toString().padStart(4, '0') }}</p>
          <h2>{{ capitalizeFirstLetter(pokemon.name) }}</h2>
        </div>
        <img :src="pokemon.image" :alt="pokemon.name" class="pokemon-image" />
        
        <!-- Tipos de Pokémon -->
        <div class="pokemon-types">
          <p v-for="(type, index) in pokemon.types" :key="index" 
             :style="{ backgroundColor: getTypeColor(type.type.name) }">
            {{ capitalizeFirstLetter(type.type.name) }}
          </p>
        </div>
  
        <!-- Informações adicionais -->
        <div class="pokemon-stats">
            <h4>Altura: {{ pokemon.height }}m</h4>
            <h4>Peso: {{ pokemon.weight }}kg</h4>
        </div>
      </div>

      <!-- Gráfico de Estatísticas -->
      <div class="pokemon-stats-graph">
        <h3>Estatísticas</h3>
        <div v-for="stat in pokemonStats" :key="stat.name" class="stat-bar-container">
          <p>{{ stat.name }}</p>
         
          <div class="stat-bar">
            <div class="stat-bar-fill" :style="{ width: stat.value + '%' }"></div>
            <h5 class="stat-value">{{ stat.value }}</h5>
          </div>
        </div>
      </div>

      <!-- Evoluções -->
      <div class="pokemon-evolutions">
        <h3>Evoluções</h3>
        <div v-if="pokemon.evolutions.length > 0" class="pokemon-evolutions-container">
          <div 
            v-for="(evolution, index) in pokemon.evolutions" 
            :key="index" 
            class="pokemon-evolution-wrapper"
          >
            <div class="pokemon-evolution-image">
              <img :src="evolution.imageUrl" :alt="evolution.name" />
            </div>

            <h4>{{ capitalizeFirstLetter(evolution.name) }}</h4>

            <!-- Setinha entre as evoluções, exceto no último item -->
            <span v-if="index < pokemon.evolutions.length - 1" class="arrow">></span>
          </div>
        </div>
        <p v-else>Este Pokémon não tem evoluções.</p>
      </div>
    </div>
    <div v-else>
      <p>Carregando Pokémon...</p>
    </div>
  </div>
</template>



<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getPokemonDetails } from '../services/apiService';
import { capitalizeFirstLetter } from '../utils/stringUtils';
import { getTypeColor } from '../utils/getTypeColor';
import { Pokemon } from '../interfaces/Pokemon.interface';

interface PokemonStats {
  name: string;
  value: number;
}

export default defineComponent({
  setup() {
    const route = useRoute();
    const pokemon = ref<Pokemon | null>(null);
    const pokemonStats = ref<PokemonStats[]>([]);

    onMounted(async () => {
      const pokemonId = Number(route.params.id);
      const response = await getPokemonDetails(pokemonId);
      
      pokemon.value = {
        id: response.id,
        name: response.name,
        image: response.image,
        height: response.height.toString(),
        weight: response.weight,
        types: response.types,
        evolutions: response.evolutions
      };

      // Mapear estatísticas para serem usadas no gráfico
      pokemonStats.value = [
        { name: 'HP', value: response.stats.find((s: any) => s.stat.name === 'hp').base_stat },
        { name: 'Ataque', value: response.stats.find((s: any) => s.stat.name === 'attack').base_stat },
        { name: 'Defesa', value: response.stats.find((s: any) => s.stat.name === 'defense').base_stat },
      ];
    });

    return {
      pokemon,
      pokemonStats,
      getTypeColor,
      capitalizeFirstLetter
    };
  }
});
</script>


<style scoped>
.pokemon-evolutions-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.pokemon-evolution-wrapper {
  display: flex;
  align-items: center;
  text-align: center;
}

.pokemon-evolution-image img {
  width: 60%;
}

.arrow {
  margin: 0 1rem;
  font-size: 1.5rem;
  color: var(--secondary-text-color);;
}

.pokemon-details-container {
  width: 55vw;
  background-color: var(--secondary-color);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.pokemon-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  gap: 2rem;
}

.pokemon-info {
  text-align: center;
  margin-bottom: 20px;
}

.pokemon-image {
  width: 20vw;
  height: 20vh;
  object-fit: contain;
  margin-bottom: 20px;
}

.pokemon-types {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.pokemon-types p {
  padding: 5px 10px;
  color: #fff;
  border-radius: 5px;
  font-weight: bold;
}

.pokemon-stats {
  margin: 20px 0;
  text-align: center;
}

.pokemon-stats-graph {
  width: 100%;
}

.stat-bar-container {
  margin-bottom: 10px;
}

.stat-bar {
  background-color: #eee;
  border-radius: 10px;
  overflow: hidden;
  height: 20px;
  display: flex;
  align-items: center;
  position: relative;
}

.stat-bar-fill {
  background-color: #4caf50;
  height: 100%;
}

.stat-value {
  position: absolute;
  left: 5px;
  font-weight: bold;
  color: var(--secondary-text-color);
}

@media (max-width: 1280px) {
  .pokemon-details-container{
    width: 75vw;
  }
}

@media (max-width: 860px) {
  .pokemon-details-container{
    width: 85vw;
}
}

</style>
