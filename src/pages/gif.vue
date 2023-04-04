<template>
  <div class="main-wrapper">
    <div class="container">
      <div class="single-page">
        <router-link class="back-link" to="/">Back</router-link>
        <div class="gif-single-top">
          <img :src="item.images?.fixed_height?.url" />
          <div class="gif-single__info">
            <h1 class="gif-single__title">{{ item.title }}</h1>
            <span v-if="item.username" class="gif-single__user"
              >Creator:
              <router-link :to="`/user/${item.id}`">{{
                item.username
              }}</router-link></span
            >
          </div>
        </div>
        <div class="gif-single-bottom">
          <div class="gif-single__slider">
            <span class="gif-single__slider-title">Random Gifs</span>
            <button @click="fetchRandomData">Next</button>
          </div>
          <div class="gif-single__slider-wrapper">
            <GifItem
              v-for="item in random"
              :key="item.id"
              :title="item.title"
              :shareUrl="item.url"
              :link="item.id"
              :images="item.images"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import GifItem from "../components/GifItem.vue";
import { IItem, IResponse } from "../types/Giphy";

export default {
  components: { GifItem },
  data() {
    return {
      item: {} as IItem,
      random: [] as IItem[],
    };
  },
  watch: {
    $route() {
      this.fetchData();
      this.fetchRandomData();
    },
  },
  methods: {
    async fetchData(): Promise<void> {
      try {
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/${this.$route.params.id}?api_key=XQJsiGIND0fn0MgbDhlEPcgKxR7DykpN`
        );

        const { data }: IResponse = await response.json();
        this.item = data;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchRandomData(): Promise<void> {
      try {
        let array = [];
        for (let i = 0; i < 4; i++) {
          const response = await fetch(
            `https://api.giphy.com/v1/gifs/random?api_key=XQJsiGIND0fn0MgbDhlEPcgKxR7DykpN&tag=20&rating=pg`
          );

          const { data }: IResponse = await response.json();
          array.push(data);
        }
        this.random = array;
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.fetchData();
    this.fetchRandomData();
  },
};
</script>

<style scoped>
.gif-single-top {
  display: flex;
}

.gif-single-top img {
  margin-right: 20px;
}

.gif-single-bottom {
  margin-top: 40px;
}

.gif-single__slider {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.gif-single__slider-wrapper {
  display: flex;
  justify-content: space-between;
}
</style>
