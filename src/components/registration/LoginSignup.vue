<template>
    <div v-if="open" class="backdrop" @click="$emit('close')"></div>
    <transition name="modal">
        <dialog open v-if="open">
            <form @submit.prevent="submitForm">
                <div>
                    <label for="email">Email</label>
                    <input type="email" id="email" v.model.trim="email">
                </div>
                <div>
                    <label for="password">Password</label>
                    <input type="password" id="password" v.model.trim="password">
                </div>
                <slot></slot>
            </form>
        </dialog>
    </transition>
</template>

<script>
export default {
    props: ['open'],
    emits: ['close'],
};

</script>


<style scoped>

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.75);
}

dialog {
  position: fixed;
  top: 30vh;
  width: 30rem;
  left: calc(50% - 15rem);
  margin: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
  padding: 1rem;
  background-color: white;
  z-index: 100;
  border: none;
}

.modal-enter-active {
    animation: modal 0.35s ease-out;
}
.modal-leave-active {
    animation: modal 0.35s ease-in reverse;
}

@keyframes modal {
  from {
    opacity: 0;
    transform: translateY(-150px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

</style>