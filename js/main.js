var nameInput = document.querySelector(".name-signup");
var emailInput = document.querySelector(".email-signup");
var passwordInput = document.querySelector(".password-signup");
var signInEmailInput = document.querySelector(".email-signin");
var signInPasswordInput = document.querySelector(".password-signin");
var signupBtn = document.querySelector("#signupBtn");
var signinBtn = document.querySelector("#signinBtn");
var logoutBtn = document.querySelector("#logoutBtn");
var userName = document.querySelector(".userName");

var alertBox = document.querySelector(".alert");

var loggedout = true;

if (localStorage.getItem("loggedOut") == "0") {
  loggedout = false;
} else {
  loggedout = true;
}
var accountsList = [];

var loggedAccount = {};

if (loggedout) {
  window.addEventListener("load", () => {
    if (window.location.href.includes("home.html")) {
      window.location.href = "../index.html";
    }
  });
}

if (localStorage.getItem("loggedAccount") === null) {
  loggedAccount = {};
} else {
  loggedAccount = JSON.parse(localStorage.getItem("loggedAccount"));
}

if (localStorage.getItem("accountsList") === null) {
  accountsList = [];
} else {
  accountsList = JSON.parse(localStorage.getItem("accountsList"));
}

if (signinBtn != null) {
  signinBtn.addEventListener("click", (e) => {
    signIn(e);
  });
}

function signIn(e) {
  e.preventDefault();
  var email = signInEmailInput.value;
  var password = signInPasswordInput.value;

  if (email != "" && password != "") {
    for (var i = 0; i < accountsList.length; i++) {
      if (
        accountsList[i].email.toUpperCase() === email.toUpperCase() &&
        accountsList[i].password === password
      ) {
        alertBox.classList.add("d-none");
        localStorage.setItem("loggedAccount", JSON.stringify(accountsList[i]));
        window.location.href += "pages/home.html";
        localStorage.setItem("loggedOut", "0");
      } else if (
        accountsList[i].email.toUpperCase() === email.toUpperCase() ||
        accountsList[i].password === password
      ) {
        alertBox.classList.remove("d-none");
        errorMsg("incorrect email or password");
      } else {
        alertBox.classList.remove("d-none");
        errorMsg("account doesn't exist");
      }
    }
  } else {
    alertBox.classList.remove("d-none");
    errorMsg("all inputs are required");
  }
}

if (signupBtn != null) {
  signupBtn.addEventListener("click", (e) => {
    signUp(e);
  });
}
function signUp(e) {
  e.preventDefault();
  var firstTime = true;
  for (var i = 0; i < accountsList.length; i++) {
    if (
      accountsList[i].email
        .toUpperCase()
        .includes(emailInput.value.toUpperCase())
    ) {
      firstTime = false;
    } else {
      firstTime = true;
    }
  }
  alertBox.classList.remove("d-none");
  if (
    emailInput.value != "" &&
    nameInput.value != "" &&
    passwordInput.value != ""
  ) {
    if (firstTime) {
      var account = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
      };

      accountsList.push(account);
      localStorage.setItem("accountsList", JSON.stringify(accountsList));
      successMsg();
      window.location.href = "../";
    } else {
      errorMsg("account already exists");
    }
  } else {
    errorMsg("all inputs are required");
  }
}

if (logoutBtn != null) {
  logoutBtn.addEventListener("click", logOut);
  if (loggedAccount.name != undefined) {
    userName.innerText = `${loggedAccount.name}`;
  } else {
    var home = document.querySelector(".home-main");
    home.classList.add("d-none");
  }
}

function logOut() {
  localStorage.setItem("loggedOut", "1");
  window.location.href = "../";
  localStorage.removeItem("loggedAccount");
}

function errorMsg(msg) {
  alertBox.innerText = `${msg}`;
  alertBox.classList.add("text-danger");
  alertBox.classList.remove("text-success");
}
function successMsg() {
  alertBox.innerText = "Success";
  alertBox.classList.add("text-success");
  alertBox.classList.remove("text-danger");
}
