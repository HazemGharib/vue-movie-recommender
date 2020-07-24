<template>
<div class="top">
    <v-progress-circular class="spinner" v-if="!isLoaded" indeterminate size="64"></v-progress-circular>
    <div v-if="isLoaded">
        <v-list subheader>
            <v-subheader inset>Top Rated Movies</v-subheader>

            <v-list-item v-for="movie in moviesList" :key="movie.title" @click="()=>{}">
                <v-list-item-content>
                    <v-list-item-title v-text="movie.title"></v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                    <span class="rating">{{movie.rating}}</span>
                    <v-btn icon class="star">
                        <v-icon color="orange">mdi-star-circle</v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item>
        </v-list>
    </div>
</div>
</template>

<script>
import { getTopRatedMovies } from '@/services/movieService';

export default {
  name: 'Top',
  data() {
    return {
      isLoaded: false,
      moviesList: [],
    };
  },
  async created() {
    this.moviesList = (await getTopRatedMovies()).data.movies;
    this.isLoaded = true;
  },
};
</script>

<style lang="scss" scoped>
.spinner {
    margin: 20rem 36rem;
}
.rating {
    position: absolute;
    right: 4rem;
}
.top {
    margin: 5rem 20rem;
}
.star {
    position: absolute;
    right: 0.8rem;
    bottom: 0.5rem;
}
</style>
