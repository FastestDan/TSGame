import {createStore} from 'vuex'

export default createStore({
    state: {
        token: "",
        user_id: "",
        isAuthenticated: false
    },
    getters:{
    },
    mutations: {
        initializeStore(state) {
            if(localStorage.getItem('token')){
                state.token = localStorage.getItem('token');
                state.user_id = localStorage.getItem('user_id');
                state.isAuthenticated = true;
            }
            else{
                state.isAuthenticated = false;
            }
        },
        setToken(state, token, user_id){
            console.log("Set Up!", user_id)
            state.token = token;
            state.user_id = user_id;
            localStorage.setItem('token', token);
            localStorage.setItem('user_id', user_id);
            state.isAuthenticated = true;
        },
        removeToken(state){
            state.token = "";
            state.user_id = "";
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
        }
    },
    actions: {
    },
    modules: {
    }
})