import additionFn from './additionFn';

const add = (a) => a + additionFn.getNumber()
const getNumber = () => Math.floor(Math.random() * 10) + 1
const callApis = () => additionFn.fetchExternal()

export {add, getNumber, callApis}