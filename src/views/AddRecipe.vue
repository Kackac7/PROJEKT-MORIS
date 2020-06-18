<template>
  <v-container>
    <v-card color="white" class="ma-10 py-5 px-10">
      <v-row justify="center">
        <v-form>
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Název receptu*"
            required
          ></v-text-field>
        </v-form>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      nameRules: [
        v => !!v || "Name is required",
      ]
    };
  }
};
</script>

<style>
</style>