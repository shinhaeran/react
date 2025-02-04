//axios를 사용하는 곳이다.
import axios from "axios" //const axios = require('axios')랑 똑같다

axios.defaults.baseURL = "http://127.0.0.1:8000/api"

export default{
    //모든 글 불러오기
    getAllPosts(){
        return axios.get('/posts/')
    },

    //글 작성하기 
    createPost(data){
        return axios.post('/posts/',data)
    },

    deletePost(id){
        return axios.delete('/posts/'+String(id))
    },
}

