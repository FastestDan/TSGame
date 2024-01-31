<template>
  <div class="container">
    <div class="row py-4 d-flex flex-column align-items-center justify-content-center middle-content">
      <div class="col-md-12">
        <h2>Leaderboard</h2>
      </div>
      <div class="col-md-12">
        <table class="table">
          <tbody>
          <tr v-for="item in scores" v-bind:key="item.id">
            <td>{{item.user}}</td>
            <td>{{item.score}}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <form @load="getResults"></form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Leaderboard",
  data() {
    return {
      scores: [],
      // nicks: [],
      // ids: []
    }
  },
  methods:{
    // fetchUserList(){
    //   const url = '/api/auth/users'
    //   axios.get(url).then(response =>{
    //     // console.log(response.data)
    //     for(const item in response.data){
    //       this.nicks.push(response.data[item].username)
    //       this.ids.push(response.data[item].id)
    //     }
    //     console.log(this.nicks)
    //     console.log(this.ids)
    //   })
    // },

    fetchLeaderboardList(){
      axios.defaults.headers['Authorization'] = `Token ${this.$store.state.token}`;
      const url = '/gethigh';
      axios.get(url).then(response =>{
        console.log(response.data);
        // for(const item in this.scores){
        //   const temp = response.data[item].user
        //   response.data[item].user = 5
        //   console.log(response.data);
        // }
        console.log(response.data);
        this.scores = response.data
        // console.log(this.scores);
      }).catch(error =>{
        console.log(error);
      })
    }
    },
  mounted(){
    this.fetchLeaderboardList();
    // this.fetchUserList();
  }
  }
</script>

<style scoped lang="scss">
.middle-content{
  height: 100vh;
}
</style>