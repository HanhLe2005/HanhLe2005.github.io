/* IMPORTANT VALUES

This section contains a list of all variables predefined for you to use (that you will need)

The CSS ids you will work with are:

1. bubbleCounter -- the container for the counter text for bubble sort
2. quickCounter  -- the container for the counter text for quick sort

*/

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES BELOW HERE /////////////////////
///////////////////////////////////////////////////////////////////////

// TODO 2: Implement bubbleSort

//function to create bubblesort

async function bubbleSort(array) {
    for (i = 0; i <= array.length - 1; i++) {
        for (j = array.length - 1; j >= i + 1; j--) {
            if (array[j].value < array[j - 1].value) { //comparing to values of an array next to each other
                swap(array, j, j - 1); //function used to swap
                updateCounter(bubbleCounter);
                await sleep();
            }

        }
    }

}

// TODO 3: Implement quickSort
//function used to create quicksort
async function quickSort(array, left, right) {
    if ((right - left) > 0) {
        var index = await partition(array, left, right); //comapring left and right values
    }
    if (left < (index - 1)) { //index is a changed value that is being compared to left
        await quickSort(array, left, index - 1);
    }
    if (right > index) { //vice versa with the right side
        await quickSort(array, index, right);
    }
}



// TODOs 4 & 5: Implement partition

//partition function to create the pivot point
//this is used to create what the right and left are comparing to
async function partition(array, left, right) {
    var pivot = array[Math.floor((right + left) / 2)].value;
    while (left < right) {
        while (array[left].value < pivot) { left++ }; //if the left is less than the pivot, left will increase
        while (array[right].value > pivot) { right-- }; //if the rigth is greater than pivot, it will decrease
        if (left < right) {
            swap(array, left, right);
            updateCounter(quickCounter);
            await sleep();

        }

    }

    return left + 1; //this adds 1 to the left

}




// TODO 1: Implement swap

//this function swaps to items in an array
function swap(array, i, j) {

    var switchThese = array[i];
    array[i] = array[j];
    array[j] = switchThese;

    drawSwap(array, i, j);

}

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES ABOVE HERE /////////////////////
///////////////////////////////////////////////////////////////////////

//////////////////////////// HELPER FUNCTIONS /////////////////////////

// this function makes the program pause by SLEEP_AMOUNT milliseconds whenever it is called
function sleep() {
    return new Promise(resolve => setTimeout(resolve, SLEEP_AMOUNT));
}

// This function draws the swap on the screen
function drawSwap(array, i, j) {
    let element1 = array[i];
    let element2 = array[j];

    let temp = parseFloat($(element1.id).css("top")) + "px";

    $(element1.id).css("top", parseFloat($(element2.id).css("top")) + "px");
    $(element2.id).css("top", temp);
}

// This function updates the specified counter
function updateCounter(counter) {
    $(counter).text("Move Count: " + (parseFloat($(counter).text().replace(/^\D+/g, '')) + 1));
}