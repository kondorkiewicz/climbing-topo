$(document).ready(function() {
  init();
  $('#undo').click(undo);
});
var points = [];
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
}

function showRoutes(canvas) {
  var routes = $('#sector').data('routes');
  console.log(routes);
  routes.forEach(function(route) {
    var objects = [];
    var coords = JSON.parse(route.coords);
    if(coords.length === 0) { return; }
    for(var i = 0; i < coords.length - 1; i++) {
      var line = new fabric.Line([coords[i].x, coords[i].y, coords[i+1].x, coords[i+1].y], {
        stroke: 'blue',
        selectable: false,
        hoverCursor: 'auto'
      });
      objects.push(line);
      var circle = new fabric.Circle({
        radius: 5, fill: 'green', left: coords[i].x, top: coords[i].y,
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
    var circles = canvas.getObjects('circle');
    circles.forEach(function(circle) {
      canvas.bringForward(circle);
    });
    var start = coords[0];
    var anchor = coords[coords.length - 1];
    canvas.add(new fabric.Circle({
      radius: 5, fill: 'red', left: anchor.x, top: anchor.y,
      originX: 'center', originY: 'center', selectable: false, hoverCursor: 'auto'
    }));
    canvas.add(new fabric.Rect({
      width: 15, height: 15, left: start.x, top: start.y, fill: '#000',
      originX: 'center', originY: 'center', opacity: 0.7, selectable: false,
      hoverCursor: 'auto'
    }));
    canvas.add(new fabric.Text('' + route.number, {
      left: start.x, top: start.y, originX: 'center', originY: 'center',
      fill: 'white', fontSize: 12, fontWeight: 'bold', selectable: false
    }));
  });
}
