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
                  <p v-if="!validForm">{{ loginSuccess }}</p>
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
                  <p v-if="!validForm">Password has to be 5 characters or more</p>
              </form>
            </div>
            <div v-if="loggedIn"> 
              <p>You are logged in as: {{ userName }}</p>
              <button @click="logout">Logout</button>
            </div>
        </dialog>
    </transition>
  </div>
</template>

<script>
/**
 * @vue-data {String} email - current email value
 * @vue-data {String} username - current username value
 * @vue-data {String} password - current password value
 * @vue-data {Boolean} validForm - checks if form is valid
 * @vue-data {Boolean} isLogin - checks if mode is login. If it isn't then mode is sign up
 * @vue-data {Boolean} isLoggedIn - checks if user is logged in.
 * @vue-data {String} user - name of the current user, if logged in.
 * @vue-prop {String} open - 
 * @vue-emits {Event} close - emits a click event that closes dialog.
 * @vue-computed {String} headerText - if mode is login then has String Login else has String Signup
 * @vue-computed {Boolean} loggedIn - uses vuex getter to get boolean if user is logged in.
 * @vue-computed {String} userName . uses vuex getter to get users name.
 * @vue-event {} login - async method that dispatches an async action that makes a post request to login user.
 * @vue-event {} signup - async method that dispatches an async action that makes a post request to register user.
 * @vue-event {Boolean} loginOrSignup - flips isLogin Boolean value.
 * @vue-event {} logout - logs out user by setting everything back to default
 */
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
        return this.$store.getters.getIsLoggedIn;
      },
      userName() {
        return this.$store.getters.getUser.username;
      },
      loginSuccess() {
        if(!this.$store.getters.loginSuccess) {
          return 'Email or password wrong';
        } else {
          return 't';
        }
      }
    },
    methods: {
      async login() {
        this.validForm = true;
        if(this.email === '' || !this.email.includes('@') || this.password.length < 5) {
          this.validForm = false;
          return;
        }

        try {
          await this.$store.dispatch('loginUser', {
            email: this.email,
            password: this.password
          }); 
          const tempUser = this.$store.getters.getUser;
          if(tempUser !== 'Failed' && tempUser !== null) {
            this.isLoggedIn = tempUser.success;
            this.user = tempUser.user;
            
          }else {
            this.validForm = false;
          }
          } catch (error) {
            console.log(JSON.stringify(error));
          }
          this.email = '';
          this.password = '';
          
        },
        async signup() {
          this.validForm = true;
        if(this.email === '' || !this.email.includes('@') || this.password.length < 5 || this.username === '') {
          this.validForm = false;
          return;
        }
          try {
          await this.$store.dispatch('signupUser', {
            email: this.email,
            username: this.username,
            password: this.password
          }); 
          } catch (error) {
            console.log(JSON.stringify(error));
          }
          this.email = '';
          this.username = '';
          this.password = '';
        },
        loginOrSignup() {
          this.isLogin = !this.isLogin;
        },
        logout() {
          this.$store.dispatch('logoutUserAction');
          this.isLogin = !this.isLogin;
          this.isLoggedIn = false;
          this.user = '';
          this.username = '';
          this.password = '';
          this.email = '';
          this.$emit('close');
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