"use strict";

// let numbers = [];

// for (let index = 0; index < 20; index++) {
//   if (index %2 === 0 ) {
//     numbers.push(index);
//   }
// }

// for (let index = 0; index < numbers.length; index++) {
//   if (numbers[index]>10) {
//   console.log(numbers[index]);}
// }

let adalabers = [
  {
    name: "María",
    age: 29,
    job: "diseñadora",
  },
  {
    name: "Lucía",
    age: 27,
    job: "ingeniera",
  },
  {
    name: "Susana",
    age: 19,
    job: "diseñadora",
  },
  {
    name: "Rocío",
    age: 32,
    job: "actriz",
  }
];


function countAdalabers(entradaArray) {
 return entradaArray.length;
  
}
console.log(countAdalabers(adalabers));

function mediaAge(entradaArray) {
  let acc = 0;
  for (const adalaber of entradaArray) {    
    acc += adalaber.age;  
  }
  let media = acc / adalabers.length;
   return media;
}
console.log(mediaAge(adalabers));

function theYoungest(entradaArray) {
let youngest = entradaArray[0].age;
console.log(entradaArray[2].age);
 for (let index = 0; index < entradaArray.length; index++) {
   if (youngest > entradaArray[index].age) {
    youngest  = entradaArray[index].age;     
   }
   
 }
 console.log(`la menor es ${youngest}`);
}
theYoungest(adalabers);

function selectDesigner(entradaArray) {
  let designers = "";
  for (let index = 0; index < entradaArray.length; index++) {
   if (entradaArray[index].job === "diseñadora") {
     designers += `${entradaArray[index].name}, ` ;
   }
    
  }
  console.log(`Son diseñadoras: ${designers}`);
}

selectDesigner(adalabers);

