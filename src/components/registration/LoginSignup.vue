<template>
  <div>
    <div v-if="open" class="mask" @click="$emit('close')"></div>
    <transition name="modal">
        <dialog open v-if="open">
            <button @click="loginOrSignup">{{ buttonText }}</button>
            <div v-if="isLogin">
              <form @submit.prevent="login">
                  <div>
                      <label for="email">Email</label>
                      <input type="email" name="email" id="email" v-model.trim="email" />
                  </div>
                  <div>
                      <label for="password">Password</label>
                      <input type="password" name="password" id="password" v-model.trim="password" />
                  </div>
                  <button type="submit">Login</button>
                  <slot></slot>
              </form>
              </div>
            <div v-if="!isLogin">
              <form @submit.prevent="signup">
                  <div>
                      <label for="email">Email</label>
                      <input type="email" name="email" id="email" v-model.trim="email" />
                  </div>
                  <div>
                      <label for="username">Username</label>
                      <input type="text" name="username" id="username" v-model.trim="username" />
                  </div>
                  <div>
                      <label for="password">Password</label>
                      <input type="password" name="password" id="password" v-model.trim="password" />
                  </div>
                  <button type="submit">Signup</button>
              </form>
            </div>
        </dialog>
    </transition>
  </div>
</template>

<script>
export default {
    props: ['open'],
    emits: ['close'],
    data() {
      return {
        email: '',
        username: '',
        password: '',
        validForm: true,
        isLogin: true
      };
    },
    computed: {
      buttonText() {
        if(this.isLogin) {
          return 'Signup';
        } else {
          return 'Login';
        }
      }
    },
    methods: {
      async login() {
        // this.validForm = true;
        // if(this.email === '' || !this.email.includes('@') || this.password.length < 3) {
        //   this.validForm = false;
        //   return;
        // }
        // console.log(this.email);
        // console.log(this.password);

        try {
          await this.$store.dispatch('loginUser', {
            email: this.email,
            password: this.password
          }); 
          } catch (error) {
            console.log(JSON.stringify(error));
          }
          console.log("toimii");
          console.log(this.$store.getters.getUser)
        },
        async signup() {
          try {
          await this.$store.dispatch('signupUser', {
            email: this.email,
            username: this.username,
            password: this.password
          }); 
          } catch (error) {
            console.log(JSON.stringify(error));
          }
          console.log("toimii");
          console.log(this.$store.getters.getUser)
        },
        loginOrSignup() {
          console.log(this.isLogin);
          this.isLogin = !this.isLogin;
          console.log(this.isLogin);
        }
        
      }
      
};

</script>

<style scoped>

.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 40;
  background-color: rgba(0, 0, 0, 0.80);
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
    animation: modal 0.40s ease-out;
}
.modal-leave-active {
    animation: modal 0.40s ease-in reverse;
}

@keyframes modal {
  from {
    opacity: 0;
    transform: translateY(-200px) translateX(350px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

</style>