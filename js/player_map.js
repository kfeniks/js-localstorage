function makeGrid(profile) {
    profile = getLocalStorageByName('profile');
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
                if(takePixel(this.id)) {
                    this.style.backgroundColor = profile.color;
                }
                console.log(this.id);
                // getBorder(this.id); // Границы 1 страны
                //  getBody(this.id); // Пиксели 1 страны
            });
        }
    }
}