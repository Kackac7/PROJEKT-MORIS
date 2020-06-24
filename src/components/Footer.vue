<template>
  <v-footer app class="main-footer pa-3">
    <v-spacer></v-spacer>
    <div>&copy; {{ new Date().getFullYear() }}</div>
  </v-footer>
</template>

<script>
export default {};
</script>

<style>
.main-footer {
 box-shadow: 6px 55px 55px -22px rgba(0,0,0,0.75);
 font-family: 'Quicksand' !important; 
}
</style>