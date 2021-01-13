/*
promise : 비동기적인 함수를 가져다가 이거 이후에 어떤걸 실행하고 싶다! 할 때 씀 
new Promise((resolve,reject)=>{})
resolve -> 해결, 성공 -> then
reject -> 거절, 실패 -> catch
*/

function sayHello(name, byeCallback){
    setTimeout(()=>{
        console.log(name+"님 안녕하세요")
        byeCallback()
    },2000);
}

sayHello("mike",function(){
    console.log("안녕히가세요")
})

//이거를 아래처럼 바꿀 수 있다고 한다~
function sayHello2(name){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log(name+"님 안녕하세요")
            // throw "aaa"
            resolve("ㅁㅁ") //resolve안에도 Input을 할 수 있다
        },3000) // sayHello2:promise : 이거 잘 되면 resolve하도록 할게 
    }
    )
}
// sayHello2("Frank")
//     .then((input)=>console.log(input+"안녕히가세요")) //해결이 잘 되면 "안녕히가세요를 할게"
    // .catch((error)=>{console.log(error)})

/*
then을 좀 더 직관적으로 사용하고 싶다 -> async func
async function func_name(p){
    const result = await get_result() //여기서 get_result는 비동기로 실행되는 함수(오래걸리는 함수)일떄, 결과가 나올 때 까지 기다려 주겠다~할 때 쓴다고 함
}
-> 최종 return은 반드시 promise객체여야 한다
 */
async function sayHelloBye(name){
    input = await sayHello2(name)
    console.log(input+"안녕히가세요")
}
sayHelloBye("haeran")

/*
1. 비동기의 문제를 해결하기 위한 callback
2. 작업이 완료되면 알려주는 callback은 가독성이 좋지 않음
3. 그래서 나온게 완료를 약속하는 promise
4. then과 cath로 편리한 사용이 가능하다 
5. 더 편리하게 만드는게 async/await <- es7꺼라고 한다
*/
