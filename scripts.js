

// console.log("Hello");
// document.addEventListener("DOMContentLoaded", function(event) { 
//   alert('Hey')
// });
function messagebox(){
  var y = document.getElementById("Msg");
  if (y.style.display === "none") {
    y.style.display = "block";
  } else {
    y.style.display = "none";
  }
}

function addFunc() {
    var x = document.getElementById("Add");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
    messagebox();
   }


function delFunc() {
    var x = document.getElementById("Del");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
    messagebox();
   }

function editFunc() {
    var x = document.getElementById("Edit");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
    messagebox();
   }
