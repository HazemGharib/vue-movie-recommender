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
            <v-btn text>Share</v-btn>

            <v-btn color="purple" text>
                Explore
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn icon @click="show = !show">
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
        </v-card-actions>

        <v-expand-transition>
            <div v-show="show">
                <v-divider></v-divider>

                <v-card-text>
                    {{cardDetails.Title || ''}}
                </v-card-text>
            </div>
        </v-expand-transition>
    </v-card>
</div>
</template>

<script>
export default {
  name: 'MovieCard',
  props: ['cardDetails'],
  data: () => ({
    show: false,
  }),
};
</script>
