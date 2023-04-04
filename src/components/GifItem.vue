<template>
  <div class="content__item">
    <button @click="share(shareUrl, title)" style="color: #fff">
      Web Share API
    </button>

    <router-link :to="`/gif/${link}`">
      <img
        :src="images.fixed_height.url"
        :height="images.fixed_height.height"
        :width="images.fixed_height.width"
        alt=""
      />
    </router-link>
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";
import { IImage } from "../types/Giphy";

export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    shareUrl: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
    images: {
      type: Object as PropType<IImage>,
      default: () => {},
    },
  },
  methods: {
    async share(link: string, title: string) {
      try {
        if (navigator.share) {
          await navigator.share({
            title: title,
            url: link,
          });
        } else {
          console.log("Sorry! Your browser does not support Web Share API");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.content__item {
  display: inline-block;
  position: relative;
}

.content__item button {
  position: absolute;
  right: 0px;
  top: 0px;
  background: #000;
  padding: 10px;
}

.content__item svg {
  width: 50px;
  height: 50px;
}
</style>
