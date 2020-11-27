let R,
  C,
  r0,
  c0,
  columnIndex = 0,
  step = 0,
  index = 0,
  prevRowStep,
  prevColumnStep,
  arrWithColAndRows = [],
  ourWay = [];


function infiniteCarousel (numberOfRows, numberOfColumns, startRowIndex, startColumnIndex) {
    arrWithColAndRows = [];  //if our infiniteCarousel work more than one time we should reboot our default values
    ourWay = [];
    step = 0;
    index = 0;
    columnIndex = 0;
    if(1 <= numberOfRows && numberOfRows <= 100 &&
        1 <= numberOfColumns && numberOfColumns<= 100 &&
        0 <= startRowIndex && startRowIndex < numberOfRows &&
        0 <= startColumnIndex && startColumnIndex< numberOfColumns) {

        R = numberOfRows;
        C = numberOfColumns;
        r0 = startRowIndex;
        c0 = startColumnIndex;

        prevRowStep = r0;
        prevColumnStep = c0;
        addingRow(makingRow());
        carousel();
        return ourWay;
    } else {
        console.log('Please, check your input values:\n' +
            '1 <= R <= 100\n' +
            '1 <= C <= 100\n' +
            '0 <= r0 < R\n' +
            '0 <= c0 < C\n')
    }
}

    function makingRow () {                 //making row with
    let res = [];
    for (let i = 0; i < C; i++) {
        res[i] = [columnIndex, i]
    }
    return res;
}

function addingRow () {
    if (columnIndex < R) {
        arrWithColAndRows.push(makingRow());
        columnIndex++;
        addingRow();
    }
}

function addCellToWay () {
    try {        //if our cell is undefined, we expect error, so we use try/catch to prevent that
        if(arrWithColAndRows[prevRowStep][prevColumnStep] !== undefined) {
            ourWay.push(arrWithColAndRows[prevRowStep][prevColumnStep]);
        }
    } catch (error) {
        return false
    }
}

function stepByStep () {        // with sepByStep function we can add all steps, not only first and last
    if(r0 !== prevRowStep) {
        if (r0 > prevRowStep) {
            for (prevRowStep += 1; prevRowStep <= r0; prevRowStep++) {
                addCellToWay();
            }
        } else if (r0 < prevRowStep) {
            for (prevRowStep -= 1; prevRowStep >= r0; prevRowStep--) {
                addCellToWay();
            }
        }
    } else if (c0 !== prevColumnStep) {
       if (c0 > prevColumnStep) {
           for (prevColumnStep += 1; prevColumnStep <= c0; prevColumnStep++) {
               addCellToWay();
           }
       }
       else if (c0 < prevColumnStep) {
           for (prevColumnStep -= 1; prevColumnStep >= c0; prevColumnStep--)
               addCellToWay();
       }
   }  else {
       addCellToWay();  //if it is the first step, we just call the function addCellToWay
   }
}

function carousel () {
        r0 -= step;
        stepByStep();                //Up
        prevRowStep = r0;
        step++;
        c0 += step;
        stepByStep();                //Right
        prevColumnStep = c0;
        r0 += step;
        stepByStep();                //Down
        prevRowStep = r0;
        step++;
        c0 -= step;
        stepByStep();                //Left
        prevColumnStep = c0;

        if (step <= R*C) {
            carousel();
        }
}

infiniteCarousel(5, 6, 1, 4);

