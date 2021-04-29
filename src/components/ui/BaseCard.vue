<template>
    <div class="card">
        <slot></slot>
    </div>
</template>

<style scoped>

.card {
    display: flex;
    flex-direction: row;
    width: 80%;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 1rem;
    margin: 2rem auto;
    max-width: 70rem;
}


@media only screen and (max-width: 1090px) {
    .card {
        flex-direction: column;
    }
}

</style>