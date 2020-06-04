var array = [5, 3, 12, 10, 27, 9, 15]

var max = array[0]

console.log(max);

array.forEach(element => {
   if(max < element){
       max = element
   }
});

console.log(max);