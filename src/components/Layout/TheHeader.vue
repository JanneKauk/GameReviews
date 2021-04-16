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
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 0;
  padding: 0;
}

header h1 {
  color: black;
  padding-right: 2rem;

}
</style>