const form = document.querySelector('#report-form')

// Report Card Form element
const phoneNumber = document.querySelector('#spamnumber')
const cityName = document.querySelector('#cityname')
const message = document.querySelector('#message')
const clearBtn = document.querySelector('#report-clear')

// Report Card Header Element
const headerPhone = document.querySelector('#phoneNumber')
const headerCity = document.querySelector('#city')

// Adding event listeners for creating report
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
    .catch(error => console.log('error', error))
})

// Create New Post
clearBtn.addEventListener('click', () => {
  phoneNumber.value = ''
  cityName.value = ''
  message.value = ''
  headerPhone.textContent = 'No Phone Number'
  headerCity.textContent = 'No City'
})

// This is use to update the header when the user is typing in the form
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

// Activity List
// Delete Button on the report row
document.querySelectorAll('.report-row').forEach((el) => {
  el.querySelector('.report-delete').addEventListener('click', () => {
    const dataID = el.getAttribute('data-id')
    const requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    }

    fetch(`/api/report/${dataID}`, requestOptions)
      .then(response => location.reload())
      .then(result => console.log(result))
      .catch(error => console.log('error', error))
  })
})
