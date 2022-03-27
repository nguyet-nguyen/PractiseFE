import additionFn from "./additionFn"

const add = a => {
    let d = a;
    let result = d + additionFn.getNumber();
    return result;
}
const getName = name => name + additionFn.getFirstName()

export {add, getName}