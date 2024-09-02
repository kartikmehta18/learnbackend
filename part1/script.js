var arr =[1,2,3,4,5];

//forEach loop
// arr.forEach(function(val){
//     console.log(val);
// })

// var newArr = arr.map(function(val){
//     // return 13;
//     return val;
//     // console.log(val);
// })

// console.log(newArr);

// var a = arr.filter(function(val){
// return val>3;
// })
// console.log(a);

// arr.find(val => console.log(val== 3));
// arr.indexOf(2)

// var obj = {
//     name: 'kartik',
//     age:21,

// }


//  var a = await fetch('https://randomuser.me/api/')
//  var res = await a.json();
//  console.log(res);

async function getData(){
    var a = await fetch('https://randomuser.me/api/')
    var res = await a.json();
    console.log(res.results[0].name);
}
getData();