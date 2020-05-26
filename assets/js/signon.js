const form = document.querySelector('.signon')

switch (form.id) {
  case 'signon-login':
    login()
    break
  case 'signon-register':
    register()
    break
  default:
    break
}

function login () {
  const email = document.querySelector('#email')
  const password = document.querySelector('#password')

  form.addEventListener('submit', function (event) {
    event.preventDefault()

    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({ email: email.value, password: password.value }),
      redirect: 'follow'
    }

    fetch('/api/login', requestOptions)
      .then(function (response) {
        window.location.replace('/report')
      })
      // .then(response => response.text())
      // .then(result => console.log(result))
      .catch(error => console.log('error', error))
  })
}

function register () {
  const username = document.querySelector('#username')
  const email = document.querySelector('#email')
  const password = document.querySelector('#password')
  const confirmPassword = document.querySelector('#password-confirm')

  function validatePassword () {
    if (password.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity('Password Don\'t Match')
    } else {
      confirmPassword.setCustomValidity('')
    }
  }

  password.onchange = validatePassword
  confirmPassword.onchange = validatePassword

  form.addEventListener('submit', function (event) {
    event.preventDefault()

    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({ username: username.value, email: email.value, password: password.value }),
      redirect: 'follow'
    }

    fetch('/api/register', requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error))
  })
}
