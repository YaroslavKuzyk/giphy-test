<template>
  <div class="main-wrapper">
    <div class="container">
      <div class="header">
        <img class="header__logo" src="../assets/logo.svg" alt="" />
        <v-text-field
          v-model="search"
          class="header__search"
          label="Search..."
          hide-details="auto"
        ></v-text-field>
      </div>
      <div class="content">
        <div class="content-container" style="color: #fff">
          <div v-for="item in list" :key="item.id" style="color: #fff">
            <GifItem
              :title="item.title"
              :shareUrl="item.url"
              :link="item.id"
              :images="item.images"
            />
          </div>
        </div>
        <div ref="observer" class="observer"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import GifItem from "../components/GifItem.vue";
import { IItem, IAllResponse } from "../types/Giphy";
export default {
  components: { GifItem },
  data() {
    return {
      search: "",
      list: [] as IItem[],
      count: 24,
      totalCount: 0,
      method: "trending",
    };
  },
  watch: {
    search(val) {
      this.searchData(val);
      if (!val) {
        this.method = "trending";
        this.fetchData();
      } else {
        this.method = "search";
      }
    },
  },
  methods: {
    async fetchData(): Promise<void> {
      try {
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/trending?api_key=XQJsiGIND0fn0MgbDhlEPcgKxR7DykpN&limit=${this.count}&rating=g`
        );

        const { data, pagination }: IAllResponse = await response.json();
        this.list = data;
        this.totalCount = pagination.total_count;
      } catch (error) {
        console.log(error);
      }
    },
    async searchData(val: string): Promise<void> {
      try {
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=XQJsiGIND0fn0MgbDhlEPcgKxR7DykpN&q=${val}&limit=24&offset=0&rating=g&lang=en`
        );

        const { data, pagination }: IAllResponse = await response.json();
        this.list = data;
        this.totalCount = pagination.total_count;

        if (!this.list.length && this.search != "") {
          const random = Math.ceil(Math.random() * 100);
          const response = await fetch(
            `https://api.giphy.com/v1/gifs/search?api_key=XQJsiGIND0fn0MgbDhlEPcgKxR7DykpN&q=not+found&limit=1&offset=${random}&rating=pg&lang=en`
          );
          const { data }: IAllResponse = await response.json();
          this.list = data;
          this.totalCount = 1;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async loadMoreData(): Promise<void> {
      try {
        this.count += 12;
        if (this.count > this.totalCount) this.count = this.totalCount;
        let response;
        if (this.method == "trending") {
          response = await fetch(
            `https://api.giphy.com/v1/gifs/trending?api_key=XQJsiGIND0fn0MgbDhlEPcgKxR7DykpN&limit=${this.count}&rating=g`
          );
        } else if (this.method == "search") {
          response = await fetch(
            `https://api.giphy.com/v1/gifs/search?api_key=XQJsiGIND0fn0MgbDhlEPcgKxR7DykpN&q=${this.search}&limit=${this.count}&offset=0&rating=g&lang=en`
          );
        } else {
          response = await fetch(
            `https://api.giphy.com/v1/gifs/random?api_key=XQJsiGIND0fn0MgbDhlEPcgKxR7DykpN&tag=&rating=g`
          );
        }
        const { data, pagination }: IAllResponse = await response.json();
        this.list = [...this.list, ...data];
        this.totalCount = pagination.total_count;
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.fetchData();
    const options = {
      rootMargin: "0px",
      threshold: 1.0,
    };
    const callback = (entries: any) => {
      if (entries[0].isIntersecting) {
        this.loadMoreData();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer as Element);
  },
};
</script>

<style>
.header {
  display: flex;
  padding: 24px 0;
}

.header__logo {
  max-width: 200px;
  margin-right: 30px;
}

.header__search .v-field__field {
  color: #000;
  background: #fff;
}

.content {
  min-height: 110vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.content-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.not-found {
  color: #fff;
  display: flex;
  justify-content: center;
}

.observer {
  width: 100%;
  height: 50px;
}
</style>
