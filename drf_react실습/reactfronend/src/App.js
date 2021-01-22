import React from 'react';
import './App.css';
import api from './api';
import PostView from './Components/PostView'
//ui
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



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
    this.setState({title:'',content:''}) // 
    this.getPost()
  }

  handlingDelete = async(event) => {
    await api.deletePost(event.target.value)
    this.getPost()
  }

  render(){
    return (
      <div className="App">
        <Container maxWidth="lg">
          <div className="PostingSection">
          <Paper className="Postingpaper">
            <h2>대나무 숲 글 작성하기</h2>
            <form className="Postingform" onSubmit = {this.handlingSubmit}>
            <TextField id="outlined-textarea" variant="outlined" name = "title" value = {this.state.title} label="Title" onChange={this.handlingChange}/>
            <TextField id="outlined-multiline-static" variant="outlined" rows={3} multiline name = "content" value = {this.state.content} label="Content" onChange={this.handlingChange}/>
            
            <Button variant="contained">제출하기</Button>
            </form>
          </Paper>
          </div>
          <div className="ViewSection">
            {
              this.state.results.map((post)=>
              <div>
                <PostView key={post.id} id={post.id} title={post.title} content={post.content}/>
                <Button variant="contained" color="primary" value={post.id} onClick={this.handlingDelete}>지우기</Button>
                
              </div>
              )
            }
            <PostView/>
          </div>
        
      </Container>
      </div>
    );
  }
}


export default App;
