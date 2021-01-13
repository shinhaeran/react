// function plusTwo(s){
//     return s+2
// }

//allow function1
// plusTwo = (s) => {
//     return s+2
// }

//allow func 2
plusTwo = s => s+2 //파라미터 한개면 소괄호 없애도 됨


console.log(plusTwo(10))

/*
allow func 을 왜 쓰냐? map과 filter 때문에!
*/

arr = [1,2,3,4,5,6,7,8,13,432,25,567] //이 리스트를 더 잘 조작하고 싶어! -> 리스트 컴프리헨션 js 가능
// arr_map = arr.map(function(v) {return v*2})
// arr_map = arr.map(v => {return v*2})
arr_map = arr.map(v => v*2)
console.log(arr_map)

arr_filter = arr.filter(v => v>10)
console.log(arr_filter)