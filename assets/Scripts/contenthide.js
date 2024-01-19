var devtools = {
    isOpen: false,
    orientation: undefined,
  };
  
  // Check for changes in orientation 
  window.addEventListener('resize', function () {
    if (window.innerHeight === window.screen.height) {
      devtools.isOpen = true;
      devtools.orientation = 'vertical';
    } else {
      devtools.isOpen = true;
      devtools.orientation = 'horizontal';
    }
  });
  


  
  // Check for changes in width 
  setInterval(function () {
    devtools.isOpen = window.outerWidth - window.innerWidth > 160;
    if (devtools.isOpen) {
      console.log('Developer tools are open!');
      // Here, you could hide your content or take other actions
      document.body.innerHTML = `<div class="hidden-content alert alert-warning">
      <strong>Warning!</strong> This content is hidden.
    </div>`;
      
    }
  }, 1000);

  