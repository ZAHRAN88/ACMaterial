document.addEventListener("DOMContentLoaded", function () {
    // Load JSON data from external file
    fetch("https://raw.githubusercontent.com/ZAHRAN88/ACMaterial/ff5882debe2d8ba501fd7f4c45241e25e62afacc/assets/data/courses.json")
        .then(response => response.json())
        .then(data => {
            // Function to create accordion items
            function createAccordionItems(data) {
                var accordionHtml = '';
                data.classes.forEach(function (classItem) {
                    accordionHtml += '<div class="accordion-item">';
                    accordionHtml += '<div class="accordion-header" data-toggle="collapse" data-target="#collapse_' + classItem.id + '">';
                    accordionHtml += classItem.name;
                    accordionHtml += '</div>';
                    accordionHtml += '<div id="collapse_' + classItem.id + '" class="collapse" data-parent="#accordion">';
                    accordionHtml += '<div class="accordion-body">';
                    accordionHtml += '<div class="table-responsive table-hover">';
                    accordionHtml += '<table class="table table-bordered">';
                    accordionHtml += '<thead class="table-header">';
                    accordionHtml += '<tr>';
                    accordionHtml += '<th>Day/Time</th>';
                    accordionHtml += '<th>Subject</th>';
                    accordionHtml += '<th>Location</th>';
                    accordionHtml += '<th>Instructor</th>';
                    accordionHtml += '</tr>';
                    accordionHtml += '</thead>';
                    accordionHtml += '<tbody>';
                    for (var day in classItem.schedule) {
                        for (var time in classItem.schedule[day]) {
                            var subject = classItem.schedule[day][time][0];
                            var location = classItem.schedule[day][time][1];
                            var instructor = classItem.schedule[day][time][2];
                            accordionHtml += '<tr>';
                            accordionHtml += '<td>' + day + ' ' + time + '</td>';
                            accordionHtml += '<td>' + subject + '</td>';
                            accordionHtml += '<td>' + location + '</td>';
                            accordionHtml += '<td>' + instructor + '</td>';
                            accordionHtml += '</tr>';
                        }
                    }
                    accordionHtml += '</tbody>';
                    accordionHtml += '</table>';
                    accordionHtml += '</div>'; // table-responsive
                    accordionHtml += '</div>'; // accordion-body
                    accordionHtml += '</div>'; // collapse
                    accordionHtml += '</div>'; // accordion-item
                });
                return accordionHtml;
            }

            // Populate accordion with data
            document.getElementById('accordion').innerHTML = createAccordionItems(data);

            // Search functionality
            document.getElementById('searchInput').addEventListener('input', function () {
                var searchQuery = this.value.trim().toLowerCase();
                var headers = document.querySelectorAll('#accordion .accordion-header');

                headers.forEach(function (header) {
                    var accordionItem = header.closest('.accordion-item');
                    var rows = accordionItem.querySelectorAll('.accordion-body tbody tr');
                    var matches = false;
                    rows.forEach(function (row) {
                        var instructorCell = row.querySelector('td:nth-child(4)');
                        var instructorName = instructorCell.textContent.trim().toLowerCase();
                        if (instructorName.includes(searchQuery)) {
                            matches = true;
                            row.classList.add('highlight');
                        } else {
                            row.classList.remove('highlight');
                        }
                    });
                    if (matches) {
                        header.classList.add('highlighted-accordion');
                    } else {
                        header.classList.remove('highlighted-accordion');
                    }
                });
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
