<template>
  <header>
    <h1>{{ login }}</h1>
  </header>
</template>

<script>
export default {
  props: {
    login: {
      type: String,
      required: true
    }
  },
  data() {
    return {
    };
  }
}
</script>

<style scoped>
header {
  width: 100%;
  height: 7rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #0E2851;
  margin: 0;
  padding: 0;
}

header h1 {
  color: white;
  padding-right: 2rem;

}
</style>