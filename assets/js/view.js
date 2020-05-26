// eslint-disable-next-line no-undef
$(document).ready(function () {
  // Our new reports will go inside the viewContainer
  // eslint-disable-next-line no-undef
  var $viewContainer = $('.view-container')
  // Our initial reports array
  var reports = []
  // Getting reports from database when page loads
  getReports()
  // This function resets the reports displayed with new reports from the database
  function initializeRows () {
    $viewContainer.empty()
    var rowsToAdd = []
    for (var i = 0; i < reports.length; i++) {
      rowsToAdd.push(createNewRow(reports[i]))
    }
    $viewContainer.prepend(rowsToAdd)
  }
  // This function grabs reports from the database and updates the view
  function getReports () {
    // eslint-disable-next-line no-undef
    $.get('/api/view', function ({ data }) {
      console.log('got response from router view...')
      reports = data
      console.log(data)
      initializeRows()
    })
  }
  // This function constructs a report-item row
  function createNewRow (report) {
    // eslint-disable-next-line no-undef
    var $newInputRow = $(
      [
        "<li class='list-group-item report-item'>",
        '<span>',
        report.phoneNumber,
        '<hr>',
        report.cityName,
        '<hr>',
        '</span>',
        "<input type='text' class='edit' style='display: none;'>",
        '</li>'
      ].join('')
    )
    $newInputRow.data('report', report)
    return $newInputRow
  }
})
