const form = document.querySelector('.signon')

const phoneNumber = document.querySelector('#spamnumber')
const cityName = document.querySelector('#cityname')
// const button = document.querySelector('.button')

form.addEventListener('submit', function (event) {
  event.preventDefault()

  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({
      phoneNumber: phoneNumber.value,
      cityName: cityName.value
    }),
    redirect: 'follow'
  }
  fetch('/api/report', requestOptions)
    .then(function (response) {
      window.location.reload('/report')
    })
    // .then(response => response.text())
    // .then(result => console.log(result))
    .catch(error => console.log('error', error))
})
