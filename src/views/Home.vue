<template>
    <div class="home">
        <MovieGrid :cards="moviesList" />
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
  },
};
</script>
