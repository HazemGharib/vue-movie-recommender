<template>
<div class="genres">
    <v-progress-circular class="spinner" v-if="!isLoaded" indeterminate size="64"></v-progress-circular>
    <div v-if="isLoaded">
        <div>
            <v-chip
                v-for="genre in genresPool"
                :key="genre"
                @click="setGenre(genre)"
                class="ma-2"
                :color="(selectedGenre === genre || startingGenre === genre) ? 'orange' : 'teal'"
                :text-color="(selectedGenre === genre || startingGenre === genre) ? 'black' : 'white'">
                {{genre}}
            </v-chip>
        </div>
        <v-list class="list" subheader>
            <v-subheader class="list-header" v-if="startingGenre">Care for some {{startingGenre}} movies?</v-subheader>
            <v-subheader class="list-header" v-if="selectedGenre">Here are our recommendations for {{selectedGenre}} movies</v-subheader>

            <v-list-item v-for="movie in moviesList" :key="movie.imdbID" @click="()=>{}">
                <v-list-item-content>
                    <v-card color="#264653" dark>
                        <div class="d-flex flex-no-wrap justify-space-between">
                            <div>
                                <v-card-title class="headline">{{movie.title}} {{movie.year}}</v-card-title>
                                <span class="rating-container">
                                    <span class="rating">{{movie.rating === "N/A" ? "Unrated" : movie.rating}}</span>
                                    <v-icon v-if="movie.rating !== 'N/A'" color="orange">mdi-star-circle</v-icon>
                                </span>

                                <v-card-subtitle class="cast" v-text="movie.cast === 'N/A' ? '' : movie.cast"></v-card-subtitle>
                                <v-card-subtitle class="plot" v-text="movie.plot === 'N/A' ? 'Upcoming' : movie.plot"></v-card-subtitle>
                            </div>

                            <v-avatar v-if="showPoster" class="ma-3 poster" size="125" tile>
                                <v-img :src="movie.poster"></v-img>
                            </v-avatar>
                        </div>
                    </v-card>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </div>
</div>
</template>

<script>
import {
  getMoviesByGenre,
} from '@/services/movieService';
import Chance from 'chance';

const chance = new Chance();

export default {
  name: 'Top',
  data() {
    return {
      isLoaded: false,
      moviesList: [],
      showPoster: process.env.VUE_APP_SHOW_POSTER === 'true',
      selectedGenre: null,
      startingGenre: null,
      genresPool: [
        'action', 'adventure', 'animation', 'biography',
        'comedy', 'crime', 'documentary', 'drama',
        'family', 'fantasy', 'history', 'horror',
        'music', 'musical', 'mystery', 'romance',
        'sci-fi', 'sport', 'thriller', 'war',
        'western',
      ],
    };
  },
  async created() {
    this.startingGenre = chance.pickone(this.genresPool);
    this.moviesList = (await getMoviesByGenre(this.startingGenre)).data.movies;
    this.isLoaded = true;
  },
  methods: {
    async setGenre(genre) {
      this.isLoaded = false;
      this.startingGenre = null;
      this.selectedGenre = genre;
      this.moviesList = (await getMoviesByGenre(this.selectedGenre)).data.movies;
      this.isLoaded = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
    margin-top: 5rem;
}

.list-header {
    font-size: x-large;
}

.spinner {
    margin: 20rem 51rem;
}

.rating {
    padding: 0.4rem;
    font-weight: 900;
}

.cast {
    font-weight: 300;
}

.plot {
    font-weight: 500;
}

.poster {
    top: 1.4rem;
    right: 1.4rem;
}

.rating-container {
    margin: 1rem;
}

.genres {
    margin: 5rem 5rem;
}
</style>
