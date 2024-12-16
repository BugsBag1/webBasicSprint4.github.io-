let users = [
    {email: "user", password: "123456", fullName: "user", country: "Kazakhstan", birthdate: "01.01.2024"},
    {email: "admin", password: "123456", fullName: "admin", country: "Kazakhstan", birthdate: "01.01.2024"},
];



document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user')); // Парсим пользователя из localStorage
    console.log("USER = ", user);

    if (!user) {
        // Пользователь не авторизован
        const menuUserName = document.getElementById('menuUserName');
        const menuLogout = document.getElementById('menuLogout');
        const userData = document.getElementById('userData');
        const loginForm = document.getElementById('login_form');
        console.log("Скрытие элементов для неавторизованного пользователя");
        menuUserName?.classList.add('hidden');
        menuLogout?.classList.add('hidden');
        userData?.classList.add('hidden');
        loginForm?.classList.add('hidden');
    } else {
        // Пользователь авторизован
        const menuLogin = document.getElementById('menuLogin');
        const menuRegister = document.getElementById('menuRegister');
        const registerForm = document.getElementById('register_form');
        const loginForm = document.getElementById('login_form');

        console.log("Скрытие элементов для авторизованного пользователя");
        menuLogin?.classList.add('hidden');
        menuRegister?.classList.add('hidden');
        registerForm?.classList.add('hidden');
        loginForm?.classList.add('hidden');

        // // Заполнение данных пользователя
        document.getElementById('userEmail').innerHTML = user.email;
        document.getElementById('userFullName').innerHTML = user.fullName;
        document.getElementById('userCountry').innerHTML = user.country;
        document.getElementById('birthdateCurrUser').innerHTML = user.birthdate;
        document.getElementById('welcomeUser').innerHTML = "Welcome " + user.fullName;
    }
});


function clickRegister(){
    const registerForm = document.getElementById('register_form');
    const loginForm = document.getElementById('login_form');
    loginForm?.classList.add('hidden');
    registerForm?.classList.remove('hidden');
}

function clickLogin(){
    const registerForm = document.getElementById('register_form');
    const loginForm = document.getElementById('login_form');
    registerForm?.classList.add('hidden');
    loginForm?.classList.remove('hidden');
}

function createUser(event){
    const registerForm = document.getElementById('register_form');
    const loginForm = document.getElementById('login_form');
    isNewUser = false;
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const fullname = document.getElementById('fullname').value;
    const country = document.getElementById('country').value;
    const birthdate = document.getElementById('birthdate').value;
    for(let i = 0; i < users.length; i++){
        if(users[i].email == email){
            isNewUser = true
        }
    }
    if(!isNewUser){
        let newUser = {}
        newUser.email = email
        newUser.password = password
        newUser.fullName = fullname
        newUser.country = country
        newUser.birthdate = birthdate
        users.push(newUser)
        registerForm?.classList.add('hidden');
        loginForm?.classList.remove('hidden');
    } else {
        alert("Пользователь с email: " + email + " уже существует")
    }
}

function login(event) {
    let currUser = {};  
    event.preventDefault();
    const email = document.getElementById('emailLogin').value;
    const password = document.getElementById('passwordLogin').value;
    console.log("LOGIN PASSS = " + email + " " + password)
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email && users[i].password == password) {  
            currUser = users[i];
            break;
        }
    }

    if (currUser.email) { 
        localStorage.setItem('user', JSON.stringify(currUser));  

        const menuUserName = document.getElementById('menuUserName');
        const menuLogout = document.getElementById('menuLogout');
        const userData = document.getElementById('userData');
        menuUserName?.classList.remove('hidden');
        menuLogout?.classList.remove('hidden');
        userData?.classList.remove('hidden');

        const loginForm = document.getElementById('login_form');
        loginForm?.classList.add('hidden');

       
        const localUser = JSON.parse(localStorage.getItem('user')); 

        menuUserName.innerHTML = localUser.fullName;

        const userEmail = document.getElementById('userEmail');
        const userFullName = document.getElementById('userFullName');
        const userCountry = document.getElementById('userCountry');
        const birthdate = document.getElementById('birthdateCurrUser');

        userEmail.innerHTML = localUser.email;
        userFullName.innerHTML = localUser.fullName;
        userCountry.innerHTML = localUser.country;
        birthdate.innerHTML = localUser.birthdate;
        document.getElementById('welcomeUser').innerHTML = "Welcome " + localUser.fullName;

        const menuLogin = document.getElementById('menuLogin');
        const menuRegister = document.getElementById('menuRegister');
        const registerForm = document.getElementById('register_form');

        console.log("Скрытие элементов для авторизованного пользователя");
        menuLogin?.classList.add('hidden');
        menuRegister?.classList.add('hidden');
        registerForm?.classList.add('hidden');
    } else {
        alert("Неверно логин или пароль");
    }
}

function logout(event) {
    event.preventDefault();
    localStorage.removeItem('user')
    location.reload();
}