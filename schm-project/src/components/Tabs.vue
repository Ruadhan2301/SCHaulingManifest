<template>
  <div class="tabs">
    <!--<nav>
      <router-link to="/" exact>Contracts</router-link> |
      <router-link to="/destinations">Destinations</router-link> |
      <router-link to="/cargohold">Cargo</router-link>
    </nav>-->
    <div class="d-flex">
      <div class="tab-btn" :class="[route.path == '/' ? 'selected' : '']" @click="navToRoute('/')">
        Contracts
      </div>
      <div
        class="tab-btn"
        :class="[route.path == '/destinations' ? 'selected' : '']"
        @click="navToRoute('/destinations')"
      >
        Locations
      </div>

      <div
        class="tab-btn"
        :class="[route.path == '/history' ? 'selected' : '']"
        @click="navToRoute('/history')"
      >
        History
      </div>
      <!--<div
        class="tab-btn"
        :class="[route.path == '/cargohold' ? 'selected' : '']"
        @click="navToRoute('/cargohold')"
      >
        Cargo
      </div>-->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

function navToRoute(route: string) {
  router.push(route)
}
</script>

<style scoped>
.tabs {
  border-bottom: 3px solid #0087bd;
}
.tab-btn {
  padding: 10px;
  border: 3px solid #0087bd;
  border-bottom: none;
  cursor: pointer;
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: large;
  color: #0087bd;
}
.tab-btn:first-child {
  border-right: none;
}
.tab-btn:last-child {
  border-left: none;
}
.tab-btn.selected {
  background-color: #0087bd;
  color: white;
}

@media (min-width: 1024px) {
  .tab-btn {
    border: 3px solid #0087bd;
    border-bottom: none;
    max-width: 8rem;
  }
  .tab-btn:first-child {
    border-top-left-radius: 0.5rem;
    border-right: none;
  }
  .tab-btn:last-child {
    border-top-right-radius: 0.5rem;
    border-left: none;
  }
}
</style>
