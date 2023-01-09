<template>
    <v-card
    outlined
    class="border row mx-0"
    height="200px"
    :to="'/categories'"
    >
    <v-card
        outlined
        class="col-4 pa-0 img">
            <v-img height="100%" src="https://picsum.photos/150/200?random"></v-img>
    </v-card>
    <v-card
    class="col-8 d-flex align-items-center"
        height="100%"
        width="70%">
            <v-list>
                <v-list-item class="category-name">
                    <v-list-item-title class="text-uppercase">Bremsen Triebfahrzeuge</v-list-item-title>
                </v-list-item>
            </v-list>
    </v-card>
  </v-card>
</template>

<script>
export default {
    
}
</script>