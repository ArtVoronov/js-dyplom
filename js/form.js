import { INVALID_CLASS, Template, errorMessage, regObject } from './constants.js'
import { checkLogin } from './login.js'

const formContainer = document.getElementById("form-container")

const ACTIVE_CLASS = "active"


let inputs
let buttonSubmit


export const initForm = (template) => {
    let form = document.createElement('form')
    form.className = "form"
    form.id = "form"
    form.innerHTML = template
    formContainer.append(form)
    inputs = form.getElementsByTagName('input')
    buttonSubmit = inputs.submit
    buttonSubmit.disabled = disabledButtonState()
    Array.from(inputs).forEach(elem => {
        elem.addEventListener("input", () => {
            eventHandler()
        }, false);
    })
    buttonSubmit.addEventListener("click", onClick)
}

const removeForm = () => {
    formContainer.innerHTML = ""
}

const switcher = document.getElementById("switcher")

const sections = switcher.getElementsByTagName('div')

for (let section of sections) {
    section.addEventListener("click", setActive)
}

setActive(sections[0])

function setActive(target) {
    if (target.target) {
        target = target.target
    }
    sections[Math.abs(Array.from(sections).indexOf(target))].classList.add(ACTIVE_CLASS)
    // target.classList.add(ACTIVE_CLASS)
    sections[Math.abs(Array.from(sections).indexOf(target) - 1)].classList.remove(ACTIVE_CLASS)
    removeForm()
    initForm(Template[Math.abs(Array.from(sections).indexOf(target))])
}

function eventHandler() {
    if (event.target.value !== undefined) {
        checkUserData(event.target)
        buttonSubmit.disabled = disabledButtonState()
        setTargetInvalidOnBlur(event.target)
        if (event.target.value.length > 0) {
            event.target.classList.remove(INVALID_CLASS)
        } else {
            event.target.classList.add(INVALID_CLASS)
        }
    }
}

function setTargetInvalidOnBlur(target) {
    Array.from(inputs).forEach(elem => {
        elem.classList.remove(INVALID_CLASS)
    })
    target.classList.add(INVALID_CLASS)
    target.onblur = () => {
        if (target.value.length > 0) { target.classList.remove(INVALID_CLASS) }
    }
}

function disabledButtonState() {
    let disabled = true
    Array.from(inputs).forEach(input => {
        if (input.type !== 'submit') {
            if (input.value.length > 0) {
                disabled = false
            } else {
                return disabled = true
            }
        }
    })
    return disabled
}
disabledButtonState()

const fault = (errorMessage) => {
    
    if (!document.getElementById("alert")){
        let alert = document.createElement("p")

        alert.innerText = errorMessage
        alert.className = "alert"
        alert.id = "alert"
        document.body.append(alert)

        setTimeout(() => {
            alert.remove()
        }, 2000)
        return null
    }    
}

const removeFault = () => {
    if (document.getElementById("alert")) {
        document.getElementById("alert").remove()
    }
}

const getData = (userInfo) => {
    Array.from(inputs).forEach(input => {
        if(input.type !== 'submit')
        userInfo[input.id] = input.value
    })
    return userInfo
}

inputs[0].focus()

const checkUserData = (target) => {
    let regExp
    switch (target.id) {
        case "login": {
            regExp = new RegExp(regObject.login)
            if (regExp.test(target.value)) {
                console.log("Nice login")
            } else fault(errorMessage.login)
            break;
        }
        case "name": {
            if (target.value.length>0) {
                console.log("Nice name")
            } else fault(errorMessage.name)
            break;
        }
        case "age": {
            regExp = new RegExp(regObject.age)

            if (regExp.test(target.value)) {
                console.log("Nice age")
            } else fault(errorMessage.age)
            break;
        }
        case "email": {
            regExp = new RegExp(regObject.email)
    
            if (regExp.test(target.value)) {
                console.log("Nice email")
            } else fault(errorMessage.email)
            break;
        }
        case "city": {
            if (target.value.length>0) {
                console.log("Nice city")
            } else fault(errorMessage.city)
            break;
        }
            case "repeat password":
        case "password": {
            if (target.value.length > 0) {
                
                if(inputs["repeat password"]){
                    if (inputs["repeat password"].value === inputs.password.value) {
                        console.log("Nice password")
                    } else if ((inputs["repeat password"].value.length > 0 && inputs.password.value.length > 0)) { fault(errorMessage.rPassword) }
                }
            }
            break;
        }
        default:
            break;
    }
}

function onClick () {
    event.preventDefault()
    switch (event.target.value) {
        case "Login": {
            checkLogin(inputs.email, inputs.password)
            break;
        }
        case "Register": {
            let user = new User()
            getData(user)
            break;
        }
    }
    
}