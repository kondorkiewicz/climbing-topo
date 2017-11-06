$(document).ready(function() {
  init();
  $('#undo').click(undo);
});
var points = [];
var objects = [];
var canvas = new fabric.Canvas("sector", { selection: false });
var canvas2 = new fabric.Canvas("sector2", { selection: false });

function init() {
  var image_url = $('#sector').data('img');
  var img = new Image;
  img.onload = function() {
    canvas.setBackgroundImage(image_url, canvas.renderAll.bind(canvas));
    showRoutes(canvas);
    canvas2.setBackgroundImage(image_url, canvas.renderAll.bind(canvas2));
    canvas2.on('mouse:down', drawRoute);
   }
   img.src = image_url;

}

function drawRoute(o) {
    var pointer = this.getPointer(o.e);
    points.push(pointer);
    console.log(points);
    console.log(objects);
    this.add(new fabric.Circle({
      radius: 5, fill: 'green', left: pointer.x, top: pointer.y,
      originX: 'center', originY: 'center', selectable: false, hoverCursor: 'auto'
    }));
    if(points.length > 1) {
      this.add(new fabric.Line([points[points.length - 2].x, points[points.length - 2].y,
         pointer.x, pointer.y], {
        stroke: 'red', selectable: false, hoverCursor: 'auto'
      }));
    }
}

function undo() {
  var canvas2_object = canvas2.toObject();
  canvas2_object.objects.pop();
  canvas2_object.objects.pop();
  points.pop();
  var canvas2_json = JSON.stringify(canvas2_object);
  canvas2.loadFromJSON(canvas2_json, canvas2.renderAll.bind(canvas2));
}

function saveRoute() {
  $.ajax({
    url: $(this).data('ajax'),
    type: 'PUT',
    data: { route: { coords: JSON.stringify(points), route_id: $(this).data('route-id') } }
  });
  window.location.reload();
}


function showRoutes(canvas) {
  var routes = $('#sector').data('routes');
  routes.forEach(function(route) {
    var points = JSON.parse(route.coords);
    console.log(points);
    if(points.length === 0) { return; }
    for(var i = 0; i < points.length - 1; i++) {
      var line = new fabric.Line([points[i].x, points[i].y, points[i+1].x, points[i+1].y], {
        stroke: 'blue',
        selectable: false,
        hoverCursor: 'auto'
      });
      objects.push(line);
      var circle = new fabric.Circle({
        radius: 5, fill: 'green', left: points[i].x, top: points[i].y,
        originX: 'center', originY: 'center', selectable: false, hoverCursor: 'auto'
      });
      objects.push(circle);
    }
    var group = new fabric.Group(objects, {
      hasControls: false,
      selectable: false,
      hoverCursor: 'auto'
    });
    canvas.add(group);
    canvas.on('mouse:over', function(e) {
      if(!e.target) return false;
      e.target.set('fill', 'red');
      e.target.set('stroke', 'red');
    });
    var circles = canvas.getObjects('circle');
    circles.forEach(function(circle) {
      canvas.bringForward(circle);
    });
    var start = points[0];
    var anchor = points[points.length - 1];
    canvas.add(new fabric.Circle({
      radius: 5, fill: 'red', left: anchor.x, top: anchor.y,
      originX: 'center', originY: 'center', selectable: false, hoverCursor: 'auto'
    }));
    canvas.add(new fabric.Rect({
      width: 15, height: 15, left: start.x, top: start.y, fill: '#000',
      originX: 'center', originY: 'center', opacity: 0.7
    }));
  });
}
