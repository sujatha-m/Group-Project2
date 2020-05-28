const form = document.querySelector('.signon')

// This signon file support both the login and register page
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

// Login route
function login () {
  const email = document.querySelector('#email')
  const password = document.querySelector('#password')

  // Watching the form
  form.addEventListener('submit', function (event) {
    event.preventDefault()

    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        email: email.value,
        password: password.value
      }),
      redirect: 'follow'
    }

    fetch('/api/login', requestOptions)
      .then(function (response) {
        window.location.replace('/report')
      })
      .catch(error => console.log('error', error))
  })
}

// Register Route
function register () {
  const username = document.querySelector('#username')
  const email = document.querySelector('#email')
  const password = document.querySelector('#password')
  const confirmPassword = document.querySelector('#password-confirm')

  // Make sure the user password are the same in both
  // the password field and the confirm password field.
  function validatePassword () {
    if (password.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity('Password Don\'t Match')
    } else {
      confirmPassword.setCustomValidity('')
    }
  }

  password.onchange = validatePassword
  confirmPassword.onchange = validatePassword

  // Watching the form
  form.addEventListener('submit', function (event) {
    event.preventDefault()

    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        username: username.value,
        email: email.value,
        password: password.value
      }),
      redirect: 'follow'
    }

    fetch('/api/register', requestOptions)
      .then(function (response) {
        window.location.replace('/report')
      })
      .catch(error => console.log('error', error))
  })
}
