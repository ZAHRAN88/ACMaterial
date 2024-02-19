// Function to fetch JSON data
async function fetchAzkar() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/nawafalqari/azkar-api/56df51279ab6eb86dc2f6202c7de26c8948331c1/azkar.json'); // Path to your JSON file
        const data = await response.json();
        return data['أذكار الصباح'][0];
    } catch (error) {
        console.error('Error fetching Azkar:', error);
        return null;
    }
}

// Function to update toast content
function updateToastContent(content , count) {
    const toastBody = document.getElementById('toast-body');
    toastBody.textContent = content;
    const toastCount = document.getElementById('count');
    toastCount.textContent = `(${count} مرات)`;
}

// Function to display a random notification every 2 minutes
async function displayRandomNotification() {
    while (true) {
        const azkar = await fetchAzkar();
        if (azkar && azkar.length > 0) {
            const randomIndex = Math.floor(Math.random() * azkar.length);
            const randomAzkar = azkar[randomIndex];
            updateToastContent(randomAzkar.content, randomAzkar.count);
            $('.toast').addClass('animate__slideInLeft'); // Add animation class for appearing
            $('.toast').toast({ delay: 50000 }); // Set the toast duration to 10 seconds
            $('.toast').toast('show'); // Show the toast
        
            // Wait for 10 seconds
            await new Promise(resolve => setTimeout(resolve, 10000));
        
            // Remove animation class for appearing and add animation class for disappearing
            $('.toast').removeClass('animate__slideInLeft').addClass('animate__slideOutLeft');
        }
        
        // Wait for 2 minutes
        await new Promise(resolve => setTimeout(resolve, 120000));
        
        // Remove animation class for disappearing
        $('.toast').removeClass('animate__slideOutLeft');
    }
}


/* hide the toast */
function hideToast() {
    $('.toast').toast('hide');
}
const toast = document.querySelector('.toast-header');
toast.addEventListener('click', hideToast);

// Start displaying notifications
displayRandomNotification();
window.addEventListener('scroll', function() {
    const toast = document.querySelector('.toast');
    if (window.scrollY > 50) { // Adjust the scroll threshold as needed
        toast.style.position  = 'sticky';
    } else {
        toast.style.position  = 'absolute';

    }
});
