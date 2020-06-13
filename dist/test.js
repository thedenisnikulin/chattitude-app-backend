"use strict";
class One {
    constructor() { }
    do() {
        return ('hi from One.do');
    }
}
class Two extends One {
    constructor() {
        super();
        this.say = () => {
            return this.do();
        };
    }
}
const two = new Two();
const result = two.say();
console.log(result);
