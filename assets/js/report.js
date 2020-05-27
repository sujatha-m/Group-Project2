const form = document.querySelector('#report-form')

// Form
const phoneNumber = document.querySelector('#spamnumber')
const cityName = document.querySelector('#cityname')
const message = document.querySelector('#message')

// Header
const headerPhone = document.querySelector('#phoneNumber')
const headerCity = document.querySelector('#city')
const headerUser = document.querySelector('#user')

form.addEventListener('submit', function (event) {
  event.preventDefault()

  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({
      phoneNumber: phoneNumber.value,
      cityName: cityName.value,
      message: message.value
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

function updateHeader (el, text, defaultText) {
  if (text) {
    el.textContent = text
  } else {
    el.textContent = defaultText
  }
}

phoneNumber.addEventListener('input', (event) => {
  updateHeader(headerPhone, phoneNumber.value, 'No Phone Number')
})
phoneNumber.addEventListener('propertychange', (event) => {
  updateHeader(headerPhone, phoneNumber.value, 'No Phone Number')
})

cityName.addEventListener('input', (event) => {
  updateHeader(headerCity, cityName.value, 'No City')
})

cityName.addEventListener('propertychange', (event) => {
  updateHeader(headerCity, cityName.value, 'No City')
})
