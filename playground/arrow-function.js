var square = (x) => x*x;
console.log(square(9));

var user = {
    name:'KK',
    sayHi:()=>{
        console.log(arguments);
        console.log('Hi I am ', this.name);
    },
    sayHiAlt () {
        console.log(arguments);
        console.log('Hi I am ', this.name);
    }
};

user.sayHi();
user.sayHiAlt(1,2,3);