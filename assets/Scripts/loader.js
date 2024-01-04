  // Get the spinner element
  const spinner = document.getElementById('spinner');
    
  // Show the spinner
  
  spinner.style.visibility="visible";
  spinner.style.opacity="1";
  
  
  // Set a timeout to hide the spinner after 5 seconds
  setTimeout(() => {
    spinner.style.visibility = 'hidden';
    spinner.style.opacity = "0";
  }, 2000);