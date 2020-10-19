import { users,INVALID_CLASS, Template, errorMessage, regObject } from './constants.js'

export const checkLogin = (email, password) => {
    let userHi = users.filter(user => {
        if (email.value === user.email && password.value === user.password) {
            console.log(user)
            return user
        }
    });
    
    console.log(userHi[0])
    !!userHi?sayHi(userHi[0]):fault(errorMessage.wLogin)
}

const sayHi = (user) => {
    container.innerText = `Hello, ${user.name}`
}