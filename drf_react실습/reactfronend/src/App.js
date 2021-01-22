import React from 'react';
import './App.css';
import api from './api';
import PostView from './Components/PostView'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      title : '',
      content : '',
      results: [],
    }
  }
  componentDidMount(){
    this.getPost()
    
  }

  async getPost(){
    const _results = await api.getAllPosts()
    console.log(_results)
    this.setState({results:_results.data})//axios는 .data에 넣고 있다
    
  }

  // handlingChange = (event) => {
  //   this.setState({title:event.target.value})
  // }
  handlingChange = (event) => {
    this.setState({[event.target.name]:event.target.value})
  }
  
  handlingSubmit = async (event) => { //api를 통해서 drf로 보내는 함수
    event.preventDefault() //event의 새로고침,페이지 맨 위로 올리는 등의 디폴트 기능 -> 막는 기능
    let result = await api.createPost({title:this.state.title, content:this.state.content})
    console.log("완료됨",result) 
  }

  render(){
    return (
      <div className="App">
        <div className="PostingSection">
        <h2>대나무 숲 글 작성하기</h2>
        <form onSubmit = {this.handlingSubmit}>
        <input 
          name = "title"
          value = {this.state.title}
          onChange={this.handlingChange}
        />
        <textarea 
          name = "content"
          value = {this.state.content}
          onChange={this.handlingChange}
        />
        <button type="submit">제출하기</button>
        </form>
        </div>
        <div className="ViewSection">
          {
            this.state.results.map((post)=>
            <PostView key={post.id} id={post.id} title={post.title} content={post.content}/>)
          }
          <PostView/>
        </div>
        
        
      </div>
    );
  }
}


export default App;
