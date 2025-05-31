<template>
  <div class="text-center tabs">
  <div id="tabs-inner-layer">
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
        :class="[route.path == '/routing' ? 'selected' : '']"
        @click="navToRoute('/routing')"
      >
        Routing
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
#tabs-inner-layer{
  margin-left:auto;
  margin-right:auto;
  width:100%;
  min-width:100%;
}
.tab-btn {
  padding: 10px;
  border: 3px solid #0087bd;
  border-right: none;
  border-bottom: none;
  cursor: pointer;
  width: 100%;
  min-width: 25%;
  text-align: center;
  font-weight: bold;
  font-size: large;
  color: #0087bd;
}

/* .tab-btn:last-child {
  border-right: 3px solid #0087bd;
} */
.tab-btn.selected {
  background-color: #0087bd;
  color: white;
}

@media (min-width: 1024px) {
  
#tabs-inner-layer{
  margin-left:auto;
  margin-right:auto;
  width:fit-content;
  min-width:fit-content;
}
  .tab-btn {
    border: 3px solid #0087bd;
    border-right: none;
    border-bottom: none;  
    min-width: 8.25rem;
  }
  .tab-btn:first-child {
    border-top-left-radius: 0.5rem;
  }
  .tab-btn:last-child {
    border-top-right-radius: 0.5rem;
    border-right: 3px solid #0087bd;
  }
}
</style>
