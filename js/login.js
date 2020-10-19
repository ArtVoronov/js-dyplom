import { INVALID_CLASS, Template, errorMessage, regObject } from './constants.js'

export const sayHi = (User) => {
    container.innerText = `Hello, ${User.name}`
}