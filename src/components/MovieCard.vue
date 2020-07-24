<template>
<div>
    <v-card class="mx-auto" max-width="344">
        <v-img :src="cardDetails.Poster !== 'N/A' ? cardDetails.Poster : 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'" height="440px" />

        <v-card-title>
            {{cardDetails.Title || ''}}
        </v-card-title>

        <v-card-subtitle>
            {{cardDetails.Year || ''}}
        </v-card-subtitle>

        <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn icon @click="showPlot(cardDetails.imdbID)">
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
        </v-card-actions>

        <v-expand-transition>
            <div v-show="show">
                <v-divider></v-divider>

                <v-progress-circular class="spinner" v-if="!movie" indeterminate />
                <v-card-text v-if="movie">
                    {{movie.Plot}}
                </v-card-text>
                <v-card-subtitle v-if="movie">
                    {{movie.Actors !== 'N/A' ? 'Cast: ' + movie.Actors : ''}}
                </v-card-subtitle>
            </div>
        </v-expand-transition>
    </v-card>
</div>
</template>

<script>
import { getMovieById } from '@/services/movieService';

export default {
  name: 'MovieCard',
  props: ['cardDetails'],
  data: () => ({
    show: false,
    movie: null,
  }),
  methods: {
    async showPlot(imdbID) {
      this.show = !this.show;

      if (!this.movie) {
        this.movie = (await getMovieById(imdbID)).data;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.spinner {
    margin: 2rem 9rem;
}
</style>
