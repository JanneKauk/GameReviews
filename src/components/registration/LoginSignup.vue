<template>
  <div>
    <div v-if="open" class="mask" @click="$emit('close')"></div>
    <transition name="modal">
        <dialog open v-if="open">
            <div v-if="!loggedIn">
              <button class="mode-button" @click="loginOrSignup">Login/signup</button>
              <h3 class="login-header">{{headerText}}</h3>
            </div>
            <div v-if="isLogin && !loggedIn">
              <form @submit.prevent="login">
                  <div class="form-div">
                      <label for="email">Email</label>
                      <input type="email" name="email" id="email" v-model.trim="email" />
                  </div>
                  <div class="form-div">
                      <label for="password">Password</label>
                      <input type="password" name="password" id="password" v-model.trim="password" />
                  </div>
                  <button type="submit">Login</button>
                  <slot></slot>
              </form>
              </div>
            <div v-if="!isLogin && !loggedIn">
              <form @submit.prevent="signup">
                  <div class="form-div">
                      <label for="email">Email</label>
                      <input type="email" name="email" id="email" v-model.trim="email" />
                  </div>
                  <div class="form-div">
                      <label for="username">Username</label>
                      <input type="text" name="username" id="username" v-model.trim="username" />
                  </div>
                  <div class="form-div">
                      <label for="password">Password</label>
                      <input type="password" name="password" id="password" v-model.trim="password" />
                  </div>
                  <button type="submit">Signup</button>
              </form>
            </div>
            <div v-if="loggedIn"> 
              <p>You are logged in as: {{ user }}</p>
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
        isLogin: true,
        isLoggedIn: false,
        user: 'test'
      };
    },
    computed: {
      headerText() {
        if(this.isLogin) {
          return 'Login';
        } else {
          return 'Signup';
        }
      },
      loggedIn() {
        // return this.isLoggedIn;
        return this.$store.getters.getIsLoggedIn;
      }
    },
    methods: {
      async login() {
        this.validForm = true;
        if(this.email === '' || !this.email.includes('@') || this.password.length < 5) {
          this.validForm = false;
          return;
        }
        console.log(this.email);
        console.log(this.password);

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
          const tempUser = this.$store.getters.getUser;
          this.isLoggedIn = tempUser.success;
          this.user = tempUser.user;
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
          const tempUser = this.$store.getters.getUser;
          this.isLoggedIn = tempUser.success;
          this.user = tempUser.user;
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

.login-header {
  margin: 0.5rem 0 2rem 0;
}

button {
  border: 2px solid #DE004A;
  background-color: #DE004A;
  color: white;
  border-radius: 15px;
  font-family: inherit;
  /* padding: 0; */
  margin: 2rem 0 1rem 0;
  cursor: pointer;
  display: inline-block;

  @media screen and (-ms-high-contrast: active) {
    border: 2px solid currentcolor;
  }
}

.mode-button {
  border-radius: 5px;
}

dialog {
  box-sizing: border-box;
}

label {
  margin: 1rem 0 1rem 0;
}

input {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

.form-div {
  margin: auto;
}

form {
  max-width: 11rem;
  margin: auto;
  box-sizing: border-box;
}

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