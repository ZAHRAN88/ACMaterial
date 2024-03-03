const savedCourse = localStorage.getItem("selectedCourse");
const course_Title = document.getElementById("courseTitle");
const course_Name = document.getElementById("courseName");
const drive_Link =document.getElementById("drive_Link");
const playlist=document.getElementById("playlist");
const section_playlist=document.getElementById("playlist2");
if (savedCourse) {
  
  fetch("../assets/data/weeks.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((jsonData) => {
  
      const selectedCourseData = jsonData.find(
        (course) => course.courseName === savedCourse
      );
     
    

      if (selectedCourseData) {
       
        course_Title.innerText =
          selectedCourseData.courseName;
        course_Name.innerText =
          selectedCourseData.courseName;
          drive_Link.href=selectedCourseData.drive;
         selectedCourseData.playlist?playlist.href=selectedCourseData.playlist:comingSoon(playlist);
          selectedCourseData.playlist2?section_playlist.href=selectedCourseData.playlist2:section_playlist.style.display="none";
      function comingSoon(playlist) {
      
        
        playlist.innerText="PlayList Coming Soon...";
        playlist.style.cursor="not-allowed";
        playlist.href="#";
   

      
      }
        selectedCourseData.weeks.forEach((week) => {
          addWeek(week.weekName, week.resources);
        });
        accordion();
        check();    
      } else {
        console.log("Course data not found for:", savedCourse);
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
} else {
  console.log("No course selected.");
}

function addWeek(weekName, resources) {
  var button = document.createElement("button");
  button.className = "accordion";
  button.innerText = weekName;
  document.getElementById("materialcontainer").appendChild(button);

  var panel = document.createElement("div");
  panel.className = "panel";

  resources.forEach(function (resource) {
    var p = document.createElement("p");
    var icon = document.createElement("i");
    icon.className = resource.icon;

    var link = document.createElement("a");
    if (resource.link) {
      link.href = resource.link;
    } else {
      link.classList.add("disabled");
      link.classList.add("disabled");
    }
    link.target = "_blank";
    link.className = "addCheck";
    link.innerText = resource.text;

    p.appendChild(icon);
    p.appendChild(link);
    panel.appendChild(p);
  });

  document.getElementById("materialcontainer").appendChild(panel);
}

function accordion() {
  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("activeBut");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }
}


