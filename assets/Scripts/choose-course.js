document.addEventListener('DOMContentLoaded', function () {
    // Retrieve saved course name from local storage
    const savedCourse = localStorage.getItem('selectedCourse');

    if (savedCourse) {
        // If a course is saved, you can use it for any further processing
        console.log('Selected Course:', savedCourse);
    }

    // Add click event listeners to course links
    const courseLinks = document.querySelectorAll('.links a');
    courseLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            

            // Get the course name from the clicked link
            const courseName = link.innerText.trim();

            // Save the selected course to local storage
            localStorage.setItem('selectedCourse', courseName);

        });
    });
});