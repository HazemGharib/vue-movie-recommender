<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <v-row align="start" justify="space-around" class="grey lighten-5" style="height: 300px;">
                    <v-card v-for="card in cards" :key="card.imdbID" class="ma-3 pa-6" outlined tile>
                        <MovieCard :cardDetails="card" />
                    </v-card>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue';

export default {
  name: 'MovieGrid',
  props: ['cards'],
  components: {
    MovieCard,
  },
};
</script>
