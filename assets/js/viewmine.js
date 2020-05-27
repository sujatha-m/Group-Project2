
// eslint-disable-next-line no-undef
$(document).ready(function () {
  // Our new reports will go inside the viewContainer
  // eslint-disable-next-line no-undef
  var $viewContainer = $('.view-container')
  // Adding event listeners for deleting, editing, and adding todos
  // eslint-disable-next-line no-undef
  $(document).on('click', 'button.delete', deleteReport)

  // Our initial reports array
  var reports = []

  // Getting reports from database when page loads
  getUserReports()

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
  function getUserReports () {
    // eslint-disable-next-line no-undef
    $.get('/api/viewmine', function ({ data }) {
      reports = data
      // console.log(data)
      initializeRows()
    })
  }

  // This function deletes a todo when the user clicks the delete button
  function deleteReport (event) {
    event.stopPropagation()
    // eslint-disable-next-line no-undef
    var id = $(this).data('id')
    // eslint-disable-next-line no-undef
    $.ajax({
      method: 'DELETE',
      url: '/api/viewmine/' + id
    }).then(getUserReports)
  }

  // This function constructs a report-item row
  function createNewRow (report) {
    // eslint-disable-next-line no-undef
    var $newInputRow = $(
      [
        '<card>',
        "<li class='list-group-item report-item'>",
        report.phoneNumber,
        '<br>',
        report.cityName,
        '<br>',
        report.message,
        "<button class='delete btn btn-danger'>Delete</button>",
        '<hr>',
        // "<input type='text' class='edit' style='display: none;'>",
        '</li>',
        '</card>'
      ].join('')
    )

    $newInputRow.find('button.delete').data('id', report.id)
    $newInputRow.data('report', report)
    return $newInputRow
  }
})
