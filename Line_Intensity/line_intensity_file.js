var LI_lineContainer = [];
var LI_pointContainer = [];

var LI_state = "neutral";

var LI_currentStart = -1;
var LI_currentLine = -1;

var LI_drawing = false;
var LI_cancel = false;

var LI_boundary_tlx = 0;
var LI_boundary_tly = 0;

const LI_mainText = new PIXI.Text("Hello", LI_style);
const LI_backgroundImage = new PIXI.Sprite.from("Images/Picture1.png");

var LI_buttonCommands = [];
const LI_draw_button = new PIXI.Sprite.
    from("Images/line_tool_icon.png");
LI_draw_button.width = 50;
LI_draw_button.height = 50;
LI_draw_button.x = 0;
LI_draw_button.y = 0;
LI_draw_button.interactive = true;
LI_draw_button.on("pointerdown", LI_buttonDown);
LI_draw_button.on("pointerup", LI_activateUp);
LI_draw_button.on("pointerupoutside", LI_buttonUpOutside);
LI_buttonCommands.push(LI_draw_button);


const LI_edit_button = new PIXI.Sprite
    .from("Images/edit_tool_icon.png");
LI_edit_button.width = 50;
LI_edit_button.height = 50;
LI_edit_button.x = 50;
LI_edit_button.y = 0;
LI_edit_button.interactive = true;
LI_edit_button.on("pointerdown", LI_buttonDown);
LI_edit_button.on("pointerup", LI_editUp);
LI_edit_button.on("pointerupoutside", LI_buttonUpOutside);
LI_buttonCommands.push(LI_edit_button);

const LI_eraser_button = new PIXI.Sprite
    .from("Images/eraser_icon.png");
LI_eraser_button.width = 50;
LI_eraser_button.height = 50;
LI_eraser_button.x = 100;
LI_eraser_button.y = 0;
LI_eraser_button.interactive = true;
LI_eraser_button.on("pointerdown", LI_buttonDown);
LI_eraser_button.on("pointerup", LI_eraseUp);
LI_eraser_button.on("pointerupoutside", LI_buttonUpOutside);
LI_buttonCommands.push(LI_eraser_button);

const LI_clear_button = new PIXI.Sprite
    .from("Images/clear_all_icon.png");
LI_clear_button.width = 50;
LI_clear_button.height = 50;
LI_clear_button.x = 150;
LI_clear_button.y = 0;
LI_clear_button.interactive = true;
LI_clear_button.on("pointerdown", LI_buttonDown);
LI_clear_button.on("pointerup", LI_clearUp);
LI_clear_button.on("pointerupoutside", LI_buttonUpOutside);
LI_buttonCommands.push(LI_clear_button);

const LI_cancel_button = new PIXI.Sprite
    .from("Images/cancel_icon.png");
LI_cancel_button.width = 50;
LI_cancel_button.height = 50;
LI_cancel_button.x = 0;
LI_cancel_button.y = 0;
LI_cancel_button.alpha = 0;
LI_cancel_button.interactive = true;
LI_cancel_button.buttonMode = true;
LI_cancel_button.on("pointerdown", LI_cancelDown);
LI_cancel_button.on("pointerup", LI_cancelUp);
LI_cancel_button.on("pointerupoutside", LI_cancelOutSide);

const LI_graphics = new PIXI.Graphics();
//LI_graphs deals with the actual graph drawn as a result
//to the line data
const LI_graphs = new PIXI.Graphics();
LI_graphs.buttonMode = true;
LI_graphs.interactive = true;
LI_graphs
    .on("pointerdown", LI_onDragGraphStart)
    .on("pointerup", LI_onDragGraphEnd)
    .on("pointerupoutside", LI_onDragGraphEnd)
    .on("pointermove", LI_onDragGraphMove);
/**
 * Show All allows use of the line intensity application by 
 * implementing all UI elements into the current window. This includes
 * the background image, main text, commands buttons and cancel button.
 * Each of these UI elements have functions tied to specific 
 * interactions.
 */
function LI_showAll() {
    app.stage.addChild(LI_backgroundImage);
    LI_backgroundImage.width = app.screen.width;
    LI_backgroundImage.height = app.screen.height;

    app.stage.addChild(LI_cancel_button);

    var bcLength = LI_buttonCommands.length;
    for (var i = 0; i < bcLength; i++) {
        app.stage.addChild(LI_buttonCommands[i]);
        LI_buttonCommands[i].alpha = 1;
        LI_buttonCommands[i].interactive = true;
        LI_buttonCommands[i].buttonMode = true;
    }

    app.stage.addChild(LI_mainText);
    LI_mainText.alpha = 1;
    LI_mainText.x = app.screen.width / 2 - 250;
    LI_mainText.y = 0;

    app.stage.addChild(LI_graphics);
    app.stage.addChild(LI_graphs);

    LI_boundary_tlx = app.screen.width / 2;
    LI_boundary_tly = app.screen.height / 2;
    LI_backgroundImage.interactive = true;
    LI_backgroundImage.on("pointerdown", LI_drawPoint);

}
/**
 * Hide All acts as the opposite of show all by removing all the 
 * currently used UI elements.
 */
function LI_hideAll() {
    LI_state = "nuetral";

    LI_clearUp();

    var bcLength = LI_buttonCommands.length;
    for (var i = 0; i < bcLength; i++) {
        LI_buttonCommands[i].alpha = 0;
        LI_buttonCommands[i].interactive = false;
        LI_buttonCommands[i].buttonMode = false;
        app.stage.removeChild(LI_buttonCommands[i]);
    }

    app.stage.removeChild(LI_mainText);
    app.stage.removeChild(LI_cancel_button);

    app.stage.removeChild(LI_backgroundImage);
    app.stage.removeListener("pointerdown", LI_drawPoint);
}

/**
 * Once activating one of the command buttons they will all be hidden
 * to reveal the LI_cancel button. This function provides that process
 * but setting all the command buttons alpha values to zero and
 * bringing the cancel button to the front to allow users to click on
 * it.
 */
function LI_hideButtons() {
    var bcLength = LI_buttonCommands.length;
    for (var i = 0; i < bcLength; i++) {
        LI_buttonCommands[i].alpha = 0;
        LI_buttonCommands[i].interactive = false;
        LI_buttonCommands[i].buttonMode = false;
    }
    LI_cancel_button.alpha = 1;
    LI_cancel_button.interactive = true;
    LI_cancel_button.buttonMode = true;
    bringToFront(LI_cancel_button);
}

/**
 * This simply does the opposite of hideButtons by revealing and 
 * bringing all command buttons to the front
 * while hiding the cancel button.
 */
function LI_showButtons() {
    var bcLength = LI_buttonCommands.length;
    for (var i = 0; i < bcLength; i++) {
        LI_buttonCommands[i].alpha = 1;
        LI_buttonCommands[i].interactive = true;
        LI_buttonCommands[i].buttonMode = true;
        bringToFront(LI_buttonCommands[i]);
    }
    LI_cancel_button.alpha = 0;
    LI_cancel_button.interactive = false;
    LI_cancel_button.buttonMode = false;
    console.log('make cancel disappear ' + LI_cancel_button.alpha);

}

/**
 * Draw point allows the user to place a point on the image
 * The first time the user does this the line LI_drawing process will 
 * begin and LI_drawing switches to true. The starting point will be 
 * displayed by a small square and the app will wait for the user to
 * click on the screen again. Once activated again the app will denonte
 * the end point of the user"s line and create a straight line 
 * inbetween both points. This will then create a new line object which
 * will have its details displayed and a graph will be created with its 
 * information.
 */
function LI_drawPoint(event) {
     if (LI_state == "drawing") { //Checks if in desired LI_state
    //    if (!cancel) {  //Checks if user clicked on LI_cancel button
         if (!LI_drawing) { //Checks what phase of line create user is in
             LI_graphics.clear(); //Clears current LI_graphics on screen
             //Changes LI_drawing value
             LI_drawing = true;
             //Updates starting point
             //  points = [event.data.global.x, event.data.global.y];
             //Creates the starting point for the line
             LI_currentStart = new Point(event.data.global.x, event.data.global.y);
             LI_currentStart.image.name = LI_pointContainer.length;

             LI_pointContainer.push(LI_currentStart);
             //Updates text and LI_cancel button

             setMainText(LI_mainText, 2, LI_lineContainer);
         }//end LI_drawing if
    else {
        //Creates the end point of the line
        var endPoint = new Point(event.data.global.x, event.data.global.y);
        endPoint.image.name = LI_pointContainer.length;
        LI_pointContainer.push(endPoint);
        //Contructs the line graphic to be place inside the line object
        var lineImage = new PIXI.Graphics();
             lineImage.lineStyle(1, 0x000070)
            .moveTo(LI_currentStart.x, LI_currentStart.y)
            .lineTo(endPoint.x, endPoint.y);
        lineImage.name = LI_lineContainer.length;
        lineImage.interactive = true;
        lineImage.buttonMode = true;
        lineImage
            .on("pointerdown", LI_lineSelect)
            .on("pointerup", LI_onDragLineEnd)
            .on("pointerupoutside", LI_onDragLineEnd)
            .on("pointermove", LI_onDragLineMove);
        //Creates the hit area of said line graphic
        var polyPts;
        if (LI_currentStart.x > endPoint.x) {
            polyPts = [LI_currentStart.x - 5, LI_currentStart.y - 5, LI_currentStart.x + 5, LI_currentStart.y + 5, endPoint.x + 5, endPoint.y + 5, endPoint.x - 5, endPoint.y - 5];
        }
        else if (LI_currentStart.x < endPoint.x) {
            polyPts = [LI_currentStart.x - 5, LI_currentStart.y + 5, LI_currentStart.x + 5, LI_currentStart.y - 5, endPoint.x + 5, endPoint.y - 5, endPoint.x - 5, endPoint.y + 5];
        }
        else if (LI_currentStart.x == endPoint.x) {
            polyPts = [LI_currentStart.x - 5, LI_currentStart.y, LI_currentStart.x + 5, LI_currentStart.y, endPoint.x + 5, endPoint.y, endPoint.x - 5, endPoint.y];
        }
        //Used to show hitarea for testing purposes
        // var pGraphic = new PIXI.LI_graphics();
        //       pGraphic.beginFill(0x1C2833);
        //     pGraphic.drawPolygon(polyPts);
        //   app.stage.addChild(pGraphic);
        lineImage.hitArea = new PIXI.Polygon(polyPts);
        app.stage.addChild(lineImage);
        //contructs line object
        LI_currentStart.image
            .on("pointerdown", LI_onDragPointStart)
            .on("pointerup", LI_onDragPointEnd)
            .on("pointerupoutside", LI_onDragPointEnd)
            .on("pointermove", LI_onDragPointMove);
        endPoint.image
            .on("pointerdown", LI_onDragPointStart)
            .on("pointerup", LI_onDragPointEnd)
            .on("pointerupoutside", LI_onDragPointEnd)
            .on("pointermove", LI_onDragPointMove);
        LI_currentLine = new Line(LI_currentStart, endPoint, LI_backgroundImage, LI_lineContainer.length, lineImage);
        //Calls data functions to show user the results on the line they drew
        LI_currentLine.displayDetails();   //Displays the details of the line by fetching its information

        createGraph(LI_graphs, LI_currentLine, LI_boundary_tlx, LI_boundary_tly);  //Creates a graph from said line
        app.stage.addChild(LI_graphs);
        LI_lineContainer.push(LI_currentLine);    //Adds this line to the area of lines
        LI_drawing = false;    //Ends the LI_drawing LI_state
        LI_endDraw();

    }//end else
    //    }//end LI_cancel if
    }// end active if

}// end draw point

/**
 * Button down is used to show that the user is currently pressing said button
 * */
function LI_buttonDown() {
    this.alpha = 0.5;
}

/**
 *This function makes it so that the current button returns to an alpha of 1
 *
 */
function LI_buttonUpOutside() {
    this.alpha = 1;
}

/**
 * This function actually starts the LI_drawing LI_state by changing
 * the main text, hidding the command buttons
 * and setting active to true and LI_state to LI_drawing.
 * @param event
 */
function LI_activateUp(event) {
    this.alpha = 1;
    setMainText(LI_mainText, 1, LI_lineContainer);
    LI_hideButtons();
    LI_state = "drawing";
    app.stage.interactive = true;

}

/**
 * End Draw is used to move from the LI_drawing LI_state to the neutral
 * LI_state whether by actually making a line or
 * by LI_canceling the LI_state prematurely.
 */
function LI_endDraw() {
    LI_drawing = false;
    LI_state = "neutral";
    LI_showButtons();
    //  points = [0, 0];
    LI_currentStart = -1;
    setMainText(LI_mainText, 0, LI_lineContainer);
    app.stage.interactive = false;
}

/**
 * This function is called when the user clicks on the LI_cancel button
 * The contents of this function won't run unless the button is clearly
 * visible to the user. Pressing down on the button will prevent the 
 * user from creating/doing anything for the current LI_state like 
 * erase or draw. However this doesn't activate the transfer of 
 * LI_states. This is to allow the user to change their mind by 
 * releasing outside the button.
 * @param event the action of clicking on the LI_cancel button sprite
 */
function LI_cancelDown(event) {
    LI_cancel = true;
   // app.stage.interactive = false;
    LI_buttonDown(); 

}// end LI_cancel draw

/**
 * This is to undo the contents of LI_cancel down without actually 
 * changing LI_states
 * @param event
 */
function LI_cancelOutSide(event) {
    LI_cancel = false;
    LI_buttonUpOutside();
}

/**
 * When releasing click/press/etc ontop of the LI_cancel button this
 * will prematurely exit the current LI_state back into neutral. So if
 * the current user is LI_drawing the line they were working on will
 * get destroyed and so on.
 */
function LI_cancelUp(event) {
    //Resets LI_cancel value
    LI_showButtons();
    LI_cancel = false;
    LI_state = "neutral";
    setMainText(LI_mainText, 0, LI_lineContainer);

    if (LI_cancel) {
        if (LI_state == "drawing") {
            LI_graphics.clear();
            LI_graphs.clear();
            LI_graphs.removeChildren();

            LI_drawing = false;

            if (LI_currentStart != -1) {
                LI_erasePoint(LI_currentStart);
            }
            LI_currentStart = -1;

            LI_endDraw();
        }
        else if (LI_state == "erase") {
        }
        else if (LI_state == "edit") {
        }
    }
}//end LI_cancel up

/**
 * When releasing this actually changes the LI_state to erase and
 * changes the main text and hides the command buttons. This only
 * occurs if the erase icon is visible.
 */
function LI_eraseUp() {
    //if (this.alpha == 1) {
    this.alpha = 1;
    setMainText(LI_mainText, 3, LI_lineContainer);
    LI_hideButtons();
    LI_state = "erase";
}

/**
 * This is the process to actually remove a line from the screen. We
 * first take the line's index to allow us to remove said line from our
 * list of lines. We must then reset all the names/indices held within
 * the line objects themselves to prevent future confusion. If the
 * current line being displayed by the graph is the one being deleted
 * then the graph must also be removed. Then we used the line object
 * function of removeLine to get clear off all the images associated
 * with this line object.
 *
 * @param line the line object to be removed
 */
function LI_eraseLine(line) {
    var index = line.name;
    LI_lineContainer.splice(index, 1);
    for (var i = 0; i < LI_lineContainer.length; i++) {
        LI_lineContainer[i].name = i;
        LI_lineContainer[i].image.name = i;
    }
    if (line == LI_currentLine) {
        LI_graphics.clear();
        LI_graphs.clear();
        LI_graphs.removeChildren();
        LI_currentLine = -1;
    }
    line.removeLine();
    LI_erasePoint(this.startPoint);
    LI_erasePoint(this.endPoint);
}

function LI_erasePoint(point) {
    var index = point.image.name;
    LI_pointContainer.splice(index, 1);
    for (var i = 0; i < LI_pointContainer.length; i++) {
        //LI_pointContainer[i].name = i;
        LI_pointContainer[i].image.name = i;
    }
    point.clearImage();
}

/**
 * When releasing this actually changes the LI_state to erase and
 * changes the main text and hides the command buttons. This only
 * occurs if the erase icon is visible.
 */
function LI_editUp() {
   // if (this.alpha == 1) {
    this.alpha = 1;
    setMainText(LI_mainText, 4, LI_lineContainer);
    LI_hideButtons();
    LI_state = "edit";
   // }
}

//Drag point functions
function LI_onDragPointStart(event) {
    if (LI_state == "edit") {
        // store a reference to the data
        // the reason for this is because of multitouch
        // we want to track the movement of this particular touch
        this.data = event.data;
        this.alpha = 0.5;
        //   LI_mainText.text = this.name;
        LI_pointContainer[this.name].owner.image.alpha = 0.5;
        LI_pointContainer[this.name].owner.data.alpha = 0.5;
        LI_pointContainer[this.name].owner.clearImage();
        LI_pointContainer[this.name].owner.resetImage();
        LI_pointContainer[this.name].resetImage();
        this.dragging = true;
        if (LI_currentLine != LI_pointContainer[this.name].owner) {
            LI_currentLine = LI_pointContainer[this.name].owner;
            createGraph(LI_graphs, LI_currentLine, LI_boundary_tlx, LI_boundary_tly);
            app.stage.addChild(LI_graphs);

        }
    }
}

function LI_onDragPointEnd() {
    if (LI_state == "edit") {
        this.alpha = 1;
        LI_pointContainer[this.name].owner.image.alpha = 1;
        LI_pointContainer[this.name].owner.data.alpha = 1;
        LI_pointContainer[this.name].owner.displayDetails();

        this.dragging = false;
        // set the interaction data to null
        this.data = null;
        createGraph(LI_graphs, LI_currentLine, LI_boundary_tlx, LI_boundary_tly);
        app.stage.addChild(LI_graphs);
    }
}

function LI_onDragPointMove() {
    if (LI_state == "edit") {
        if (this.dragging) {
            const newPosition = this.data.getLocalPosition(this.parent);
            var changeX = newPosition.x;
            var changeY = newPosition.y;
            var changeY = newPosition.y;

            if (newPosition.x < 0) {
                changeX = 0;
            }
            else if (newPosition.x >= app.screen.width) {
                changeX = app.screen.width;
            }

            if (newPosition.y < 0) {
                changeY = 0;
            }
            else if (newPosition.y >= app.screen.height) {
                changeY = app.screen.height;
            }
            LI_pointContainer[this.name].changeLocation(changeX, changeY);
            LI_pointContainer[this.name].owner.clearImage();
            LI_pointContainer[this.name].owner.resetImage();
            LI_pointContainer[this.name].resetImage();
            LI_pointContainer[this.name].owner.fetchInformation();
            updateGraph(LI_graphs, LI_currentLine, LI_boundary_tlx, LI_boundary_tly);

        }
    }
}

//Drag line
function LI_onDragLineEnd() {
    if (LI_state == "edit") {
        this.alpha = 1;
        LI_lineContainer[this.name].clearImage();
        LI_lineContainer[this.name].resetImage();
        LI_lineContainer[this.name].startPoint.image.alpha = 1;
        LI_lineContainer[this.name].startPoint.resetImage();
        LI_lineContainer[this.name].endPoint.image.alpha = 1;
        LI_lineContainer[this.name].endPoint.resetImage();
        LI_lineContainer[this.name].displayDetails();
        this.dragging = false;
        updateGraph(LI_graphs, LI_currentLine, LI_boundary_tlx, LI_boundary_tly);
        app.stage.addChild(LI_graphs);

        this.eventData = null;
    }
}

function LI_onDragLineMove() {
    if (LI_state == "edit") {
        if (this.dragging) {
            const newPosition = this.eventData.getLocalPosition(this.parent);
            var move = true;
            var changeX = newPosition.x - this.dragx;
            var changeY = newPosition.y - this.dragy;

            if (LI_lineContainer[this.name].startPoint.x + changeX < 0) {
                changeX = 0 - LI_lineContainer[this.name].startPoint.x;
            }
            else if (LI_lineContainer[this.name].endPoint.x + changeX < 0) {
                changeX = 0 - LI_lineContainer[this.name].endPoint.x;
            }
            else if (LI_lineContainer[this.name].startPoint.x + changeX >= app.screen.width) {
                changeX = app.screen.width - (LI_lineContainer[this.name].startPoint.x);
            }
            else if (LI_lineContainer[this.name].endPoint.x + changeX >= app.screen.width) {
                changeX = app.screen.width - (LI_lineContainer[this.name].endPoint.x);
            }

            if (LI_lineContainer[this.name].startPoint.y + changeY < 0) {
                changeY = 0 - LI_lineContainer[this.name].startPoint.y;
            }
            else if (LI_lineContainer[this.name].endPoint.Y + changeY < 0) {
                changeY = 0 - LI_lineContainer[this.name].endPoint.Y;

            }
            else if (LI_lineContainer[this.name].startPoint.y + changeY >= app.screen.height) {
                changeY = app.screen.height - (LI_lineContainer[this.name].startPoint.y);

            }
            else if (LI_lineContainer[this.name].endPoint.y + changeY >= app.screen.height) {
                changeY = app.screen.height - (LI_lineContainer[this.name].endPoint.y);
            }

            if (move) {
                LI_lineContainer[this.name].startPoint.changeLocation(LI_lineContainer[this.name].startPoint.x + changeX, LI_lineContainer[this.name].startPoint.y + changeY);
                LI_lineContainer[this.name].endPoint.changeLocation(LI_lineContainer[this.name].endPoint.x + changeX, LI_lineContainer[this.name].endPoint.y + changeY);
                this.dragx = newPosition.x;
                this.dragy = newPosition.y;
                LI_lineContainer[this.name].clearImage();
                LI_lineContainer[this.name].resetImage();
                LI_lineContainer[this.name].fetchInformation();
                updateGraph(LI_graphs, LI_currentLine, LI_boundary_tlx, LI_boundary_tly);
            }
        }
    }
}

//drag graph
function LI_onDragGraphStart(event) {
    if (LI_state == "edit") {
        this.data = event.data;
        this.alpha = 0.5;
        this.dragging = true;
        this.dragx = event.data.global.x;
        this.dragy = event.data.global.y;
    }
}

function LI_onDragGraphEnd() {
    if (LI_state == "edit") {
        this.alpha = 1;
        this.dragging = false;
        this.data = null;
    }
}

function LI_onDragGraphMove() {
    if (LI_state == "edit") {
        if (this.dragging) {

            const newPosition = this.data.getLocalPosition(this.parent);
            var changeX = newPosition.x - this.dragx;
            var changeY = newPosition.y - this.dragy;

            if (LI_boundary_tlx + changeX < 0) {
                changeX = 0 - LI_boundary_tlx;
            }
            else if (LI_boundary_tlx + LI_boundaryWidth + changeX >=
                app.screen.width) {
                changeX = app.screen.width -
                    (LI_boundary_tlx + LI_boundaryWidth);
            }

            if (LI_boundary_tly + changeY < 0) {
                changeY = 0 - LI_boundary_tly;
            }
            else if ((LI_boundary_tly + LI_boundaryHeight + changeY) >=
                app.screen.height) {
                changeY = app.screen.height -
                    (LI_boundary_tly + LI_boundaryHeight);
            }



            LI_moveChildren(LI_graphs, changeX, changeY);

            this.dragy = newPosition.y;
            this.dragx = newPosition.x;
            LI_boundary_tlx += changeX;
            LI_boundary_tly += changeY;
        }
    }
}

function LI_moveChildren(container, changeX, changeY) {
    var length = container.children.length;
    for (var i = 0; i < length; i++) {
        var child = container.getChildAt(i);
        child.x += changeX;
        child.y += changeY;
    }
}

/**
 * When releasing this actually changes the LI_state to erase and
 * changes the main text and hides the command buttons. This only
 * occurs if the erase icon is visible.
 */
function LI_clearUp() {
    this.alpha = 1
    for (var i = 0; i < LI_lineContainer.length; i++) {
        var line = LI_lineContainer[i];
        if (line == LI_currentLine) {
            LI_graphs.clear();
            LI_graphs.removeChildren();

            LI_graphics.clear();
            // hTextContainer.removeChildren();
            // vTextContainer.removeChildren();
            LI_currentLine = -1;
        }
        line.removeLine();
        LI_erasePoint(line.startPoint);
        LI_erasePoint(line.endPoint);
    }
    LI_lineContainer = [];
    setMainText(LI_mainText, 0, LI_lineContainer);
    //  }
}

/**
 * When a user clicks on a line that line will call this function
 * which will decide on what to do depending on the current 
 * LI_state of the application.
 * @param line the line that was selected by the user
 */
function LI_lineSelect(event) {
    if (LI_state == "neutral") {   //Will display the information of said line
        LI_currentLine = LI_lineContainer[this.name];
        createGraph(LI_graphs, LI_currentLine, LI_boundary_tlx,
            LI_boundary_tly);
        app.stage.addChild(LI_graphs);

        setMainText(LI_mainText, 0, LI_lineContainer);
    }
    else if (LI_state == "erase") {    //Will delete said line
        LI_eraseLine(LI_lineContainer[this.name]);
    }
    else if (LI_state == "edit") {    //Will delete said line
        this.alpha = 0.5;
        LI_lineContainer[this.name].clearImage();
        LI_lineContainer[this.name].resetImage();
        LI_lineContainer[this.name].startPoint.image.alpha = 0.5;
        LI_lineContainer[this.name].endPoint.image.alpha = 0.5;
        if (LI_currentLine != LI_lineContainer[this.name]) {
            LI_currentLine = LI_lineContainer[this.name];
            createGraph(LI_graphs, LI_currentLine, LI_boundary_tlx,
                LI_boundary_tly);
            app.stage.addChild(LI_graphs);

        }
        this.dragging = true;
        this.eventData = event.data;
        this.dragx = event.data.global.x;
        this.dragy = event.data.global.y;
    }
}
