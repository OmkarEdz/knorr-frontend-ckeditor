<template>
  <div class="pagination-container d-block w-100">
    <button class="pagination-link mr-2 text-center" @click="showPreviousPage()" :disabled="currentPage <= 1"><div><img class="pagination-arrow-left clickable" src="../../assets/img/arrow_right_blue.svg" height="18px"></div></button>
    <div class="pagination-number mx-2">{{ currentPage }}</div>
    <button class="pagination-link ml-2" @click="showNextPage()" :disabled="currentPage >= totalPages"><div><img class="pagination-arrow-right clickable" src="../../assets/img/arrow_right_blue.svg" height="18px"></div></button>
  </div>
</template>

<script>
export default {
  name: "pagination",

  props: {
    showPreviousPage: Function,
    showNextPage: Function,
    currentPage: Number,
    totalPages: Number
  },

  data() {
    return {
      dots: 6
    }
  }
}
</script>

<style scoped>
  .pagination-container {
    content: "";
    text-align: center;
  }
  .pagination-container * {
    position: relative;
    display: inline-block;
    font-size: 24px;
    text-align: center;
  }

  .pagination-link {
    font-weight: bold;
    color: black;
  }
  .pagination-link:hover {
    text-decoration: none;
  }
  .pagination-link:disabled {
    color: #888888;
  }
</style>