if (current_page === 'index.html') {
  if (localStorage.getItem("login_status") === 'logged-in') {
    document.getElementById("user_info").innerHTML = 'Zarządzaj kontem'
  } else {
    document.getElementById("user_info").innerHTML = 'Zaloguj się'
  }
} else if (current_page === 'info.html') {
  if (localStorage.getItem("login_status") === 'logged-in') {
    document.getElementById("user_info").innerHTML = 'Zarządzaj kontem'
  } else {
    document.getElementById("user_info").innerHTML = 'Zaloguj się'
  }
} else if (current_page === 'account.html') {
  const login = document.getElementById('login');
  const register = document.getElementById('register');
  const logout = document.getElementById('logout');

  if (localStorage.getItem("login_status") === "logged-in") {
    document.getElementById("form_register").style.display = "none";
    document.getElementById("form_login").style.display = "none";
    document.getElementById("form_logout").style.display = "block";

    let current_user = JSON.parse(localStorage.getItem('current_user_info'));
    console.log(current_user);
    document.getElementById("user_information").innerHTML = 
      'Imię: ' + current_user.firstname + '<br>' +
      'Nazwisko: ' + current_user.lastname + '<br>' +
      'Adres e-mail: ' + current_user.email + '<br>' +
      'Nazwa użytkownika:' + current_user.username + '<br>';
  } else {
    document.getElementById("form_register").style.display = "block";
    document.getElementById("form_login").style.display = "block";
    document.getElementById("form_logout").style.display = "none";
  }
  register.onclick = (e) => {
    let user = {
      "firstname" : document.getElementById("register_firstname").value,
      "lastname" : document.getElementById("register_lastname").value,
      "email" : document.getElementById("register_email").value,
      "username" : document.getElementById("register_username").value,
      "password" : document.getElementById("register_password").value
    }

    msg = '';
    let valid = true;
    if (!/^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*$/.test(user.firstname)) {
      valid = false;
      msg += 'Niepoprawne imie!<br>';
    }
    if (!/^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*$/.test(user.lastname)) {
      valid = false;
      msg += 'Niepoprawne nazwisko!<br>';
    }
    if (!/^[A-ZĄĆĘŁŃÓŚŹŻa-ząćęłńóśźż0-9]+@[A-ZĄĆĘŁŃÓŚŹŻa-ząćęłńóśźż0-9]+$/.test(user.email)) {
      valid = false;
      msg += 'Niepoprawny adres e-mail!<br>';
    }
    if (!/^[A-ZĄĆĘŁŃÓŚŹŻa-ząćęłńóśźż0-9]{3,}$/.test(user.username)) {
      valid = false;
      msg += 'Niepoprawna nazwa użytkownika! (min 3 znaki)<br>';
    }
    if (user.password.length < 3) {
      valid = false;
      msg += 'Zbyt krótkie hasło!<br>'
    }
    document.getElementById('form_error').innerHTML = msg;
    
    if (!valid) {
      e.preventDefault();
      return false;
    }

    let users = JSON.parse(localStorage.getItem('users'));
    if (users === null) {
      users = []
    }

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    localStorage.setItem("login_status", "logged-in");
    localStorage.setItem("current_user_info", JSON.stringify(user));
  }
  login.onclick = (e) => {
    let users = JSON.parse(localStorage.getItem('users'));
    if (users === null) {
      document.getElementById('login_error').innerHTML = 'Hasło lub nazwa użytkownika<br>są niepoprawne!';
      e.preventDefault();
      return false;
    }

    let user = {
      "username" : document.getElementById("login_username").value,
      "password" : document.getElementById("login_password").value
    }
  
    let user_exists = false;
    let user_index = 0;
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === user.username && users[i].password === user.password) {
        user_exists = true;
        user_index = i;
        break;
      }
    }

    if (user_exists) {
      localStorage.setItem("login_status", 'logged-in');
      localStorage.setItem("current_user_info", JSON.stringify(users[user_index]));
    } else {
      document.getElementById('login_error').innerHTML = 'Hasło lub nazwa użytkownika<br>są niepoprawne!';
      e.preventDefault();
      return false;
    }
  }
  logout.onclick = (e) => {
    localStorage.setItem("login_status", "");
    localStorage.setItem("current_user_info", "");
    let users = JSON.parse(localStorage.getItem('users'));
    console.log(users)
  }
}