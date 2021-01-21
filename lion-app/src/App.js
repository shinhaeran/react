import logo from './logo.svg';
import './App.css';
import React from "react";
// 컴포넌트
//{{}} 첫번째 중괄호: js코드가 들어갈 거여 두번째 중괄호 : js오브젝트가 들어갈거여

/*
jsx ->html 태그
jsx ->style을 통해 css(jsx)
jsx ->className을 통해 css (css->A.css)
*/
const myStyle = {
  color:'red',
  fontWeight:700,}

// function WorldClock(props){
//   return( //무조건 return() 안에 div하나만 있어야함, 👇"" 스트링 하나일때는 {}생략해도 됨
//     <div className={"worldClock"}>  
//       <h2>🌈도시:{props.city}</h2>
//       <p>🥳시간:{props.time}시</p>
//     </div>
//   )
// }

class WorldClock extends React.Component{
  constructor(props){
    super(props) //react.component의 input
    this.state = { //worldclock의 어떨때 state를 씀? -> 1.시간과 분이 변화하는 걸 보고 싶어 ! 2.그걸 동적으로 보고싶어!
      hour : this.props.time,
      minute:0,
      stop:false,
    }
    console.log("  child 시작")
  }
  componentDidMount(){
    this.a() // 이거를 constructor에 놓지말고 여기에 놓음
    console.log("  child 마운트됨")
  }

  componentDidUpdate(){
    console.log("  child 업데이트됨")
  }

  componentWillUnmount(){
    console.log("  child 언마운트됨")
    clearInterval(this.timer)
  }
  a(){
    this.timer = setInterval(() => {
      this.setState((state)=>(
        
        state.minute === 59
        ?{hour : state.hour+1,minute:0}
        :{minute:state.minute+1}
      ))
    }, 5000)
  }

  handlingClick = (event) => { //handlingClick은 왠만하면 arrow func으로 작성해주는게 좋다
    console.log(event.target, event.target.value,this.state.stop) //<button>​멈추기​</button>​   "true"
    // this.setState({stop: event.target.value})
    this.setState({stop:!this.state.stop})
    if (!this.state.stop){
      clearInterval(this.timer)
    }
    else{
      console.log(this.timer) //-> interval 횟수라는디..
      this.a()
    }
    // console.log(tr)
  }

  render(){ //미리 약속된 함수-> 여기있는걸 recat.componenet가 보내줄거야
   return(
    <div className={"worldClock"}>  
    <h2>🌈도시:{this.props.city}</h2>
    <p>🥳시간:{this.state.hour}시 {this.state.minute}</p>
    <button value={true} onClick={this.handlingClick}>멈추기</button>
  </div>
   )
  }
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.cityTimeData = [
      ['서울',24],
      ['베이징',9],
      ['시드니',12],
    ]
    this.state = {
      content:'',
      donottouch:true
    }
    console.log("parent 시작")
  }
  componentDidMount(){
    console.log("parent 마운트됨")
  }
  componentDidUpdate(){
    console.log("parent 업데이트됨")
  }

  handlingChange = (event)=>{
    this.setState({content:event.target.value})
  }
  handlingClick = (event)=>{
    this.setState((prevState)=>({donottouch:!prevState.donottouch}))
  }
  

  render(){
    console.log("parent 렌더링 시작")
    return (
      <div className="App">
        <h1 className={'myStyle'}>gkdlfn</h1> 
        <div className={'post'}>
          첫 게시글입니다.
          <textarea value={this.state.content} onChange={this.handlingChange}></textarea>
        </div>
        <button onClick={this.handlingClick}>누르지 마세요</button>
        {this.state.donottouch&&  //donottouch state가 true일때만 child 컴포넌트가 보인다! 짱신기
        this.cityTimeData.map((citytime,index)=>
          <WorldClock city={citytime[0]} time={citytime[1]} key={index}/>  
        )}
      </div>
    );
  }
  
}
// function App() {
//   const cityTimeData = [
//     ['서울',24],
//     ['베이징',9],
//     ['시드니',12],
//   ]

//   const WorldClockList = cityTimeData.map((citytime,index)=>
//     <WorldClock city={citytime[0]} time={citytime[1]} key={index}/>  
//   )
//   return (
//     <div className="App">
//       {/* <h1 style={{color:'red'}}>gkdlfn</h1>  */}
//       {/* <h1 style={myStyle}>gkdlfn</h1>  */}
//       <h1 className="myStyle">gkdlfn</h1> 
//       <div className={'post'}>
//         첫 게시글입니다.
//       </div>
//       {/* <WorldClock city={'서울'} time={10}/>
//       <WorldClock city={'서울'} time={10}/> */}
//       {WorldClockList}
//     </div>
//   );
// }
//컴포넌트를 export 해줌(index.js에서 Import함), default:이 파일(app.js)은 기본적으로 이거 하나만 export하겠다~ , 다른 컴포넌트는 export x
//여기서 App이라는 이름으로 export해줘도 import aa라고 해도 잘 되긴 된당. 어차피 똑같은거여
export default App;


/*
props: 역과 역 사이에 데이터를 이동하는 수단 ->데이터를 key:value형태로 전달해줌 -> ReadOnly이다!
Warning: Each child in a list should have a unique "key" prop.
-> workldClock의 props : city, time들의 unique key prop을 추가하란 뜻->보통 index로하지만 유니크하기만 하면 되므로 걍 city로 해도 오류는 나지 않는다
map : iterator한 어떤거의 인덱스 -> index
-> react는 최고의 가성비를 위해 변화가 일어난 최소 부분만 빨리 감지하기 위해 각 element의 unique key가 필요하다
참고 : https://reactjs.org/docs/lists-and-keys.html#keys
*/

/*
state : 컴포넌트의 상태를 나타냄 -> 이것만으로 폼이 많이 드므로 최소한 가성비 있게 써야 한다
1.Props만으로 표현할 수 있는가 2. render로 표시되지 않는 값인가 -> 2개가 해당되지 않는다면 state로!
fucntion component : state를 사용 못함 -> 쓰려면 class componenet로 써야함(class가 더 코드가 많고 큼) =>이었는데 hook으로 function컴포넌트로 state 사용 가능하다!!


props나 state의 값이 바뀌면 그 컴포넌트의 render함수가 다시 호출된다.
render함수가 가지고 있는 하위의 컴포넌트들의 각 render함수도 다시 호출된다.
즉 props나 state의 값이 바뀌면 화면이 다시 그려진다. 오잉 뭐지
*/

/*event handling 맹글기
1. 필요한 state를 만든다
2. 핸들링 함수를 만들어 준다
3. 만든거 태그 안에 On[이벤트] = {'[함수이름]'}

/*
lifecycle 순서: constructor->render->mount->re-render->update->unmount
parent 시작 -> parent :constructor
parent 렌더링 시작 -> parent :render
  child 시작 -> child : constructor,render
  child 마운트됨 ->child : mount -> componentDidMount()
  parent 마운트됨 -> parent : mount -> componentDidMount()
  
update는 언제 되느냐? -> state와 prop이 변할 때

parent 시작
parent 렌더링 시작
   child 시작
   child 마운트됨
parent 마운트됨
   child 업데이트됨 -> re-render하고 update -> componentDidUpdate
parent 렌더링 시작 -> 부모의 update 시, 모든 자식들 컴포넌트들 re-render, update해줌
   child 업데이트됨
parent 업데이트됨

->부모 업데이트마다 모든 자식들 렌더,업데이트 다 해줘야 하는게 너무 비효율적이다
부모 업데이트 해도 자식들 업데이트x->shouldComponent(모든 업데이트 마다 커스텀 가능), pureComponent(미리 알아서 제공해주는 기능들이 많당)
*/


/*
constructor
1. state 구조 설정
2. 컴포넌트가 mount하기 전에 할 설정
3. setState x -> 권장

componentDidMount
1.필요한 데이터 요청
2. 각종 비동기 요청

componentDidUpdate
1. 업데이트 이후 수정할 때
2. if() {setState()} -> 왠만하면 if로 달아주자 -> 무한으로 setstate될까봐 -> 그럼 또 업데이트 판정

componentWillUnmount
1. 데이터 요청, 비동기함수, 타이머 종료할 때 
2. setstate x
*/

/* hook
function component에 state를 사용할 수 있다 -> hook으로!
참고: https://ko.reactjs.org/docs/hooks-intro.html
*/
