<!--<script setup lang="ts">-->
<!--import { RouterLink, RouterView } from 'vue-router'-->
<!--</script>-->

<template>
<div class="container">
  <div class="row py-4 d-flex flex-column align-items-center justify-content-center middle-content">
    <div class="col-md-8">
      <h3 class="text-muted text-monospace">Login</h3>
      <hr>
    </div>
    <div class="col-md-8">
      <form @submit.prevent="submitForm">
        <div v-if="errors.wrong_cred" class="form-group my-1">
          <small class="text-danger">{{errors.wrong_cred}}</small>
        </div>

        <div class="form-group my-1">
          <input type="username" placeholder="Login" name="username" v-model="username">
          <small v-if="errors.username" class="text-danger">{{errors.username}}</small>
        </div>

        <div class="form-group my-1">
          <input type="password" placeholder="Password" name="password" v-model="password">
          <small v-if="errors.password" class="text-danger">{{errors.password}}</small>
        </div>

        <div class="form-group my-1 d-grid gap-2">
          <button class="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return{
      username: "",
      password: "",
      errors: {
        username: "",
        password: "",
        wrong_cred: ""
      }
    }
  },
  methods:{
    isValid(){
      let valid = true;
      if(!this.username){
        this.errors.username = "The field can't be blank";
      }
      if(!this.password){
        this.errors.password = "The field can't be blank";
      }
      if(this.errors.username || this.errors.password){
        valid = false;
      }
      return valid
    },
    submitForm(){
      this.errors.username = "";
      this.errors.password = "";
      if(this.isValid()){
        const url = '/login/';
        axios.post(url, {username: this.username, password: this.password})
            .then(response =>{
              console.log(response.data)
              this.$store.commit('setToken', response.data.token, response.data.user_id);
            })
            .catch(error =>{
              if(error.response.data.non_filed_errors){
                this.errors.wrong_cred = error.response.data.non_field_errors.join('');
              }
              else{
                this.errors.wrong_cred = "";
              }
            })
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .middle-content{
    height: 100vh;
  }
</style>