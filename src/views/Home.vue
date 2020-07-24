<template>
    <div class="home">
        <v-progress-circular class="spinner" v-if="!isLoaded" indeterminate size="64"></v-progress-circular>
        <MovieGrid v-if="isLoaded" :cards="moviesList" />
    </div>
</template>

<script>
import MovieGrid from '@/components/MovieGrid.vue';
import { searchMovies } from '@/services/movieService';
import Chance from 'chance';

const chance = new Chance();

export default {
  name: 'Home',
  components: {
    MovieGrid,
  },
  data() {
    return {
      moviesList: [],
      isLoaded: false,
    };
  },
  async created() {
    const pool = [
      'captain', 'iron', 'avengers', 'dark', 'kill',
      'happy', 'crazy', 'john', 'mission', 'big', 'invisible',
      'sad', 'once', 'black', 'red', 'guardians', 'bay',
      'fast', 'speed', 'gun', 'movie', 'meet',
    ];

    this.moviesList = (await searchMovies(chance.pickone(pool), 2019)).data.Search;
    this.isLoaded = true;
  },
};
</script>

<style lang="scss" scoped>
.spinner {
    margin: 25rem 56rem;
}
</style>
