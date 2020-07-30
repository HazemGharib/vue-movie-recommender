<template>
<div class="about">
    <v-card class="mx-auto" max-width="400">
        <v-img class="white--text align-end" height="200px" src="https://i.imgur.com/UZzg0Y5.jpg">
            <v-card-title>Hazem Gharib</v-card-title>
        </v-img>

        <v-card-subtitle class="pb-0">About Me</v-card-subtitle>

        <v-card-text class="text--primary">
            <div>
                <span>Egyptian</span>
                <span><img class="flag" src="https://i.imgur.com/gZZNlfM.png"></span>
            </div>

            <div>Agile Developer</div>

            <div>@ServiceRocket <v-icon class="rocket" color="grey">mdi-rocket</v-icon>
            </div>
        </v-card-text>

        <v-card-actions>
            <v-btn color="green" text>
                <a class="hire-me" href="mailto:hazem.gharib.8@gmail.com">Hire Me</a>
            </v-btn>
        </v-card-actions>
    </v-card>

    <h3 class="desclaimer">
        This is app was made with love and a considerable amount of coffee
        <v-icon color="red">mdi-heart</v-icon>
    </h3>
</div>
</template>

<style lang="scss" scoped>
.about {
    width: fit-content;
    margin: 10rem auto;
}

.flag {
    width: 5%;
    margin: -5px 5px;
}

.hire-me {
    color: #4caf50;
    text-decoration: none;
}

.desclaimer {
    margin: 10rem 5rem;
}

.rocket {
    transform: rotate(45deg) translate(2px, -6px);
}
</style>
