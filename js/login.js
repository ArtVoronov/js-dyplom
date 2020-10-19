import { users,INVALID_CLASS, Template, errorMessage, regObject } from './constants.js'

export const checkLogin = (email, password) => {
    users.forEach(user => {
        if (email.value === user.email && password.value === user.password) { return sayHi(user) }
    });
    return fault(errorMessage.wLogin)
}

const sayHi = (user) => {
    container.innerText = `Hello, ${user.name}`
}