// const sizePicker = document.querySelector('.size-picker');
const pixelCanvas = document.querySelector('.pixel-canvas');
// const quickFill = document.querySelector('.quick-fill');
// const eraseMode = document.querySelector('.erase-mode');
// const drawMode = document.querySelector('.draw-mode');

/*function makeGrid(profile) {
    let gridHeight = profile.gridHeight; // document.querySelector('.input-height').value;
    let gridWidth = profile.gridWidth; // document.querySelector('.input-width').value;
    // If grid already present, clears any cells that have been filled in
    while (pixelCanvas.firstChild) {
        pixelCanvas.removeChild(pixelCanvas.firstChild);
    }
    // Creates rows and cells
    for (let i = 1; i <= gridHeight; i++) {
        let gridRow = document.createElement('tr');
        gridRow.setAttribute("id", 'y_' + i);
        pixelCanvas.appendChild(gridRow);
        for (let j = 1; j <= gridWidth; j++) {
            let gridCell = document.createElement('td');
            gridCell.setAttribute("id", 'y_' + i + '_x_' + j);
            gridRow.appendChild(gridCell);
            // Fills in cell with selected color upon mouse press ('mousedown', unlike 'click', doesn't also require release of mouse button)
            gridCell.addEventListener('mousedown', function() {
             //   const color = profile.color; // document.querySelector('.color-picker').value;
                this.style.backgroundColor = profile.color;
                console.log(this.id);
               // getBorder(this.id); // Границы 1 страны
              //  getBody(this.id); // Пиксели 1 страны
            });
        }
    }
}*/

// makeGrid(profile);

// Upon user's submitting height and width selections, callback function (inside method) calls makeGrid function. But event method preventDefault() first intercepts the 'submit' event, which would normally submit the form and refresh the page, preventing makeGrid() from being processed
/*sizePicker.addEventListener('submit', function(e) {
    e.preventDefault();
    makeGrid();
});*/

// Enables color dragging with selected color (code for filling in single cell is above). (No click on 'draw' mode needed; this is default mode)
let down = false; // Tracks whether or not mouse pointer is pressed

// Listens for mouse pointer press and release on grid. Changes value to true when pressed, but sets it back to false as soon as released
/*pixelCanvas.addEventListener('mousedown', function(e) {
    down = true;
    pixelCanvas.addEventListener('mouseup', function() {
        down = false;
    });
    // Ensures cells won't be colored if grid is left while pointer is held down
    pixelCanvas.addEventListener('mouseleave', function() {
        down = false;
    });

    pixelCanvas.addEventListener('mouseover', function(e) {
        // 'color' defined here rather than globally so JS checks whether user has changed color with each new mouse press on cell
        const color = document.querySelector('.color-picker').value;
        // While mouse pointer is pressed and within grid boundaries, fills cell with selected color. Inner if statement fixes bug that fills in entire grid
        if (down) {
            // 'TD' capitalized because element.tagName returns upper case for DOM trees that represent HTML elements
            if (e.target.tagName === 'TD') {
                e.target.style.backgroundColor = color;
            }
        }
    });
});*/

// Adds color-fill functionality. e.preventDefault(); intercepts page refresh on button click
/*quickFill.addEventListener('click', function(e) {
    e.preventDefault();
    const color = document.querySelector('.color-picker').value;
    pixelCanvas.querySelectorAll('td').forEach(td => td.style.backgroundColor = color);
});*/

// Removes color from cell upon double-click
/*pixelCanvas.addEventListener('dblclick', e => {
    e.target.style.backgroundColor = null;
});*/

// NONDEFAULT DRAW AND ERASE MODES:

// Allows for drag and single-cell erasing upon clicking 'erase' button. Code for double-click erase functionality (Without entering erase mode) is above. Also note 'down' was set to false in variable above
/*eraseMode.addEventListener('click', function() {
    // Enables drag erasing while in erase mode
    pixelCanvas.addEventListener('mousedown', function(e) {
        down = true;
        pixelCanvas.addEventListener('mouseup', function() {
            down = false;
        });
        // Ensures cells won't be erased if grid is left while pointer is held down
        pixelCanvas.addEventListener('mouseleave', function() {
            down = false;
        });
        pixelCanvas.addEventListener('mouseover', function(e) {
            // While mouse pointer is pressed and within grid boundaries, empties cell contents. Inner if statement fixes bug that fills in entire grid
            if (down) {
                if (e.target.tagName === 'TD') {
                    e.target.style.backgroundColor = null;
                }
            }
        });
    });
    // Enables single-cell erase while in erase mode
    pixelCanvas.addEventListener('mousedown', function(e) {
        e.target.style.backgroundColor = null;
    });
});*/

// Allows user to return to (default) draw mode after using 'erase' button. Note 'down' was set to false in variable above
/*drawMode.addEventListener('click', function() {
    pixelCanvas.addEventListener('mousedown', function(e) {
        down = true;
        pixelCanvas.addEventListener('mouseup', function() {
            down = false;
        });
        // Ensures cells won't be colored if grid is left while pointer is held down
        pixelCanvas.addEventListener('mouseleave', function() {
            down = false;
        });
        pixelCanvas.addEventListener('mouseover', function(e) {
            const color = document.querySelector('.color-picker').value;
            // While mouse pointer is pressed and within grid boundaries, fills cell with selected color. Inner if statement fixes bug that fills in entire grid
            if (down) {
                if (e.target.tagName === 'TD') {
                    e.target.style.backgroundColor = color;
                }
            }
        });
    });
    // Enables single-cell coloring while in draw mode
    pixelCanvas.addEventListener('mousedown', function(e) {
        if (e.target.tagName !== 'TD') return;
        const color = document.querySelector('.color-picker').value;
        e.target.style.backgroundColor = color;
    });
});*/

document.addEventListener("DOMContentLoaded", function(event) {
    getMap();
});
