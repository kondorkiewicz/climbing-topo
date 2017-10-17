// document.addEventListener("DOMContentLoaded", function(event) {
//   var canvas = document.getElementById("canvas");
//   var context = document.getElementById("canvas").getContext("2d");
//
//   var points = [];
//
//   function getCursorPosition(e) {
//     var mx, my;
//     if (e.pageX || e.pageY) {
//       mx = e.pageX;
//       my = e.pageY;
//     } else {
//       mx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
//       my = e.clientY + document.body.scrollLeft + document.documentElement.scrollLeft;
//     }
//     mx -= canvas.offsetLeft;
//     my -= canvas.offsetTop;
//     return { x: mx, y: my }
//   }
//
//   function drawPath() {
//     context.beginPath();
//     for(var i = 0; i < points.length - 1; i++) {
//       context.moveTo(points[i]['x'], points[i]['y']);
//       context.lineTo(points[i+1]['x'], points[i+1]['y']);
//       context.stroke();
//     }
//     context.closePath();
//   }
//
//   function initPointCollection() {
//     canvas.onclick = function(e) {
//       var point = getCursorPosition(e);
//       points.push(point);
//
//       if(points.length > 1) {
//         drawPath();
//       }
//     }
//   }
//
//   function init() {
//     img = document.getElementById("rock_image");
//     context.drawImage(img, 0, 0);
//     initPointCollection();
//   }
//
//   init();
// });
