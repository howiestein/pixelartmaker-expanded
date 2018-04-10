// Functions for drawing on the canvas.
// These are attached to the body so dynamically-created elements will get the listeners.

// Drawing state is true if the mouse has been pressed but not released, and is dragging across cells
var drawingState = false;

// When a cell is clicked, change its color to the currently-selected color
$("body").on("click", "td", function clickChangeColor(event) {
    var currentColor = $("#colorPicker").val();

    $(this).css("background-color", currentColor);

    event.preventDefault();
});

// When the mouse is depressed in a cell, change its color to the currently-selected color
// and change the drawing state to true
$("body").on("mousedown", "td", function downChangeColor(event) {
    var currentColor = $("#colorPicker").val();

    $(this).css("background-color", currentColor);

    drawingState = true;

    event.preventDefault();
});

// When the pointer enters a cell, change the color if the drawing state is true
$("body").on("mouseover", "td", function dragChangeColor(event) {
    var currentColor = $("#colorPicker").val();

    if (drawingState) {
        $(this).css("background-color", currentColor);
    }

    event.preventDefault();
});

// When the mouse is released change the drawing state to false
$("body").on("mouseup", "td", function resetDrawingState(event) {
    drawingState = false;

    event.preventDefault();
});
<!-- Add draw/erase, shapes, reset -->
