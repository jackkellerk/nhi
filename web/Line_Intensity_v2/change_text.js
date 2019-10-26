/**
* Used to simplify the process of changing the main text but taking in a number which will
* dictate what will be shown as a result. This helps in changing states from neutral to drawing for example
* @param pixiText Pixi text object to be changed 
* @param flag the integer parameter that dicates what text will be shown
* @param lines array of lines to use as information
*/
function setMainText(pixiText, flag, lines) {
    if (flag == 0) {
        if (lines.length == 0) {
            
            pixiText.text = 'You currently have 0 lines.';
        }
        else {
            //pixiText.text = 'You currently have ' + lines.length + ' Line(s) and the current entry is line ' + text + '.';
            pixiText.text = 'You currently have ' + lines.length + ' line(s).';
        }
        
    }
    else if (flag == 1) {
        pixiText.text = 'Make a starting point for your line by clicking on the screen';
    }
    else if (flag == 2) {
        pixiText.text = 'Create an end point by clicking somewhere else.';
    }
    else if (flag == 3) {
        pixiText.text = 'Choose a line to delete.';
    }
    else if (flag == 4) {
        pixiText.text = 'Pick a point or line to move.';
    }
}