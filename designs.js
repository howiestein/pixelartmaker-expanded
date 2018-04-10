// Functions for implementing the toolbar

// Set the cells to the desired size, but force cells to remain square if the grid is
// too big relative to the display area.
// Highlight the cell size selector if the cells are forced to a smaller size.
function setCellSize(desiredSize) {
    var actualHeight, actualWidth, actualSize;

    $("#cellSize").css("background-color", "white");

    // Set the size of the cells to the selected size
    $("tr").css("height", desiredSize);
    $("td").css("width", desiredSize);

    // Calculate the actual height and width of the cells. There is 3px of horizontal padding per cell.
    actualHeight = Math.floor($("#pixelCanvas").height() / $("#inputHeight").val());
    actualWidth = Math.floor(($("#pixelCanvas").width() / $("#inputWidth").val()) - 3);

    // If the actual dimensions are not the desired dimensions, set the cell height and Width
    // to the lesser of the actual height and actual width.
    if ((actualHeight != desiredSize) || (actualWidth != desiredSize)) {
        if (actualHeight < actualWidth) {
            $("tr").css("height", actualHeight);
            $("td").css("width", actualHeight);
        } else {
            $("tr").css("height", actualWidth);
            $("td").css("width", actualWidth);
        }

        // Highlight the cell size selector if the cells are forced to a smaller size.
        $("#cellSize").css("background-color", "red");
    }
};

// Move the toolbar to the other side
function moveToolbar(event) {
    panel1 = $("#main").children().first();
    panel2 = $("#main").children().last();

    // Swap the locations of the panels
    panel1.insertAfter(panel2);

    // Change the button label
    if ($("#toolbarLocation").attr("value")=="Right-->") {
        $("#toolbarLocation").attr("value", "<--Left");
    } else {
        $("#toolbarLocation").attr("value", "Right-->");
    }
};

// When size is submitted by the user, display a new blank grid
$("#sizePicker").submit(function makeGrid(event) {
    var canvas = $("#pixelCanvas");
    var numRows = $("#inputHeight").val();
    var numCols = $("#inputWidth").val();
    var cellSize = $("#cellSize").val();
    var table = "";

    // Clear the current canvas
    canvas.empty();

    // Loop over the height and width adding rows and elements. "Blank" background color is in CSS.
    for (var row=1; row<=numRows; row++) {
        table += "<tr>";
        for (var column=1; column<=numCols; column++) {
          table += "<td></td>";
        }
        table += "</tr>";
    }

    // Insert the new table into the DOM
    canvas.append(table);

    setCellSize(cellSize);

    // Prevent the original HTML from reloading
    event.preventDefault();
});

// When the reset button is pressed, restore all settings to the default
$("#resetAll").click(function clearGrid(event) {
    // Delete the canvas
    $("#pixelCanvas").empty();

    // Reset the canvas dimensions
    $("#inputHeight").val(1);
    $("#inputWidth").val(1);

    //  Reset cell size
    $("#cellSize").val(20);

    // Reset selected color
    $("#colorPicker").val("#000000");

    // Reset toolbar to right
    if ($("#toolbarLocation").attr("value")=="<--Left") {
        moveToolbar(event);
    }

//  <later, reset drawing tool to draw>

    event.preventDefault();
});

// When the clear button is pressed, clear the canvas
$("#resetCanvas").click(function clearGrid(event) {
    $("td").css("background-color", "#dddddd");

    event.preventDefault();
});

// When a pixel size is submitted, change the size of the cells on the canvas
// Attached to the body so dynamically-created elements will get the listener
$("#cellSizePicker").submit(function setSize(event) {
    var size = $("#cellSize").val();

    setCellSize(size);

    event.preventDefault();
});

// Allow the user to move the toolbar to the left or right of the canvas
$("#toolbarLocation").on("click", moveToolbar);
