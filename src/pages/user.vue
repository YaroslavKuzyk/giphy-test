<template>
  <div class="main-wrapper">
    <div class="container">
      <div class="single-page">
        <div class="logo"><img src="../assets/logo.svg" alt="" /></div>
        <router-link class="back-link" :to="`/gif/${item.id}`"
          >Back</router-link
        >

        <div class="user-single">
          <div class="user-single__wraper">
            <img :src="item.user?.avatar_url" alt="" />
            <div class="user-single__info">
              <span>{{ item.username }}</span>
              <a :href="item.user?.profile_url" target="_blank"
                >Giphy Account</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IItem, IResponse } from "../types/Giphy";
export default {
  data() {
    return {
      item: {} as IItem,
    };
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
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.logo img {
  max-width: 200px;
}

.user-single {
  display: flex;
  justify-content: center;
}

.user-single__wraper {
  display: flex;
  align-items: center;
}

.user-single__wraper img {
  width: 150px;
  margin-right: 20px;
}

.user-single__info {
  display: flex;
  flex-direction: column;
  font-size: 30px;
}
</style>
