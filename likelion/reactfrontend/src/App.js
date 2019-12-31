import React from 'react';
import logo from './logo.svg';
import './App.css';
import api from './api'
import PostView from './Components/PostView'
//같은 위치에있으므로...

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      title: '',
      content: '',
      results: [], //요거추가
    }
  }
  componentDidMount(){ //요거랑 밑에거 추가됨
    this.getPosts()

  }

  async getPosts()
  { //비동기식이라서 기다리라는 의미로 await, async 넣어줌
    const _results=await api.getAllPosts()
    this.setState({results: _results.data})
    console.log(_results)
  }
  handlingDelete=async(event) =>{    
    await api.deletePost(event.target.value)
     this.getPosts() 
   } 




  handlingChange=(event) =>{
    this.setState({[event.target.name]: event.target.value})

  }
    //input 의 this.state.title -> event.target.value 로 들어감
     //정보를 보낼때는 form 필수
  handlingSubmit= async (event) =>{
      event.preventDefault()
      //매우중요. 새로고침안되게함. 리액트짱
      let result =await api.createPost({title:this.state.title, content:this.state.content})
      console.log("완료", result.data)
      //json형식
        this.setState({title:'',content:''})  //여기다 두줄추가!! ->input 들어올때 초기화해줌
      this.getPosts()

  }

  render(){
  return (
    <div className="App">
        <div className="PostingSection">
          <h2>-- 대나무 숲 글 작성하기 --</h2>
         
          <form onSubmit={this.handlingSubmit}>
           
          <input
            name="title"
            value={this.state.title}
            onChange={this.handlingChange}
          />
          <textarea 
            name="content"
            value={this.state.content}
            onChange={this.handlingChange}
          />
          <button type="submit"> 제출하기</button>
          </form>

        </div>
        <div className="ViewSection">
        {
          this.state.results.map((post)=>
          <div>
          <PostView key={post.id} id={post.id} title={post.title} content={post.content}/>
          <button value={post.id} onClick={this.handlingDelete}>삭제하기</button>
          </div>
          )
        }
        </div>

    </div>
  );
  }
}

export default App;
