/*
비동기성:인터넷 속도 의존, 유저 인터랙션 때문에 속도가 느려도 인터랙션은 되어야 한다!
동기성: 위에서 차례대로 후루룩 실행되는 것
*/

setTimeout(()=>{console.log("안녕하세요")},2000)
console.log("안녕히 가세요")
// output
// 안녕히 가세요
// 안녕하세요


/*
비동기 단점 보완 -> callback: 다 되면 알려주라
async -> callback -> other async -> callback ...
*/
function sayHello(sayGoodbye){ //sayGoodbye 라는 콜백 함수(안녕히가세요 출력하는거)를 인자로 받아서 내꺼 다 하면 saygoodbye실행해라
    setTimeout(()=>{
        console.log("안녕하세요")
        sayGoodbye()
    },2000)
}
sayHello(()=>console.log("안녕히 가세요"))
// output
// 안녕하세요
// 안녕히 가세요


function sayHello1(name,byeCallback){
    setTimeout(()=>{
        console.log(name+"안녕하세요")
        byeCallback()
    },2000)
}
sayHello1("Mike",function(){
    console.log("안녕히가세요")
})
// output
// Mike안녕하세요
// 안녕히가세요


/*
callback 한바가지면 코드 가독성이 매우 나빠짐, 콜백 내의 if문 분기와 에러 핸들링이 어려움 
-> promise,Async Func으로 해결!
*/