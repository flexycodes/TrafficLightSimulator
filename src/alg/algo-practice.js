var array = [99, 22, 11, 1500, 2020, 13, 5]

var min = array[0]
var max = array[0]

console.log(min);
console.log(max);

// min
array.forEach(element => {
    if(element < min){
        min = element
    }
});

console.log('The min number in array is : ' + min);


// max
array.forEach(element => {
    if(element > max){
        max = element
    }
 });

 console.log('The max number in array is : ' + max);