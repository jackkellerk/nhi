class LineApplication{
    constructor(parent) {
        //this.parent = parent;
       // this.windowContainer = new PIXI.Container();
       this.windowContainer = parent;
    
        this.LI_lineContainer = [];
        this.LI_pointContainer = [];

        this.LI_state = "neutral";

        this.LI_currentStart = -1;
        this.LI_currentLine = -1;

        this.LI_drawing = false;
        this.LI_cancel = false;

        this.LI_boundary_tlx = 0;
        this.LI_boundary_tly = 0;

        
        this.LI_mainText = new PIXI.Text("Hello", LI_style);
        this.LI_backgroundImage = new PIXI.Sprite.from(" ../Images/Picture1.png");

        this.LI_buttonCommands = [];
        this.LI_draw_button = new PIXI.Sprite.
            from(" ../Images/line_tool_icon.png");
        this.LI_draw_button.width = 50;
        this.LI_draw_button.height = 50;
        this.LI_draw_button.x = 0;
        this.LI_draw_button.y = 0;
        this.LI_draw_button.interactive = true;
        this.LI_draw_button.on("pointerdown", this.LI_buttonDown);
        //this.LI_draw_button.on("pointerdown", this.doHideAll);
        this.LI_draw_button.on("pointerup", this.doActivateUp);
        this.LI_draw_button.on("pointerupoutside",  this.LI_buttonUpOutside);
        this.LI_draw_button.name = this;
        this.LI_buttonCommands.push(this.LI_draw_button);


        this.LI_edit_button = new PIXI.Sprite
            .from(" ../Images/edit_tool_icon.png");
        this.LI_edit_button.width = 50;
        this.LI_edit_button.height = 50;
        this.LI_edit_button.x = 50;
        this.LI_edit_button.y = 0;
        this.LI_edit_button.interactive = true;
        this.LI_edit_button.on("pointerdown", this.LI_buttonDown);
        this.LI_edit_button.on("pointerup", this.doEditUp);
        this.LI_edit_button.on("pointerupoutside",  this.LI_buttonUpOutside);
        this.LI_edit_button.name = this;
        this.LI_buttonCommands.push(this.LI_edit_button);

        this.LI_eraser_button = new PIXI.Sprite
            .from(" ../Images/eraser_icon.png");
        this.LI_eraser_button.width = 50;
        this.LI_eraser_button.height = 50;
        this.LI_eraser_button.x = 100;
        this.LI_eraser_button.y = 0;
        this.LI_eraser_button.interactive = true;
        this.LI_eraser_button.on("pointerdown", this.LI_buttonDown);
        this.LI_eraser_button.on("pointerup", this.doEraseUp);
        this.LI_eraser_button.on("pointerupoutside",  this.LI_buttonUpOutside);
        this.LI_eraser_button.name = this;
        this.LI_buttonCommands.push(this.LI_eraser_button);

        this.LI_clear_button = new PIXI.Sprite
            .from(" ../Images/clear_all_icon.png");
        this.LI_clear_button.width = 50;
        this.LI_clear_button.height = 50;
        this.LI_clear_button.x = 150;
        this.LI_clear_button.y = 0;
        this.LI_clear_button.interactive = true;
        this.LI_clear_button.on("pointerdown", this.LI_buttonDown);
        this.LI_clear_button.on("pointerup", this.doClearUp);
        this.LI_clear_button.on("pointerupoutside",  this.LI_buttonUpOutside);
        this.LI_clear_button.name = this;
        this.LI_buttonCommands.push(this.LI_clear_button);

        this.LI_cancel_button = new PIXI.Sprite
            .from(" ../Images/cancel_icon.png");
        this.LI_cancel_button.width = 50;
        this.LI_cancel_button.height = 50;
        this.LI_cancel_button.x = 0;
        this.LI_cancel_button.y = 0;
        this.LI_cancel_button.alpha = 0;
        this.LI_cancel_button.interactive = true;
        this.LI_cancel_button.buttonMode = true;
        this.LI_cancel_button.on("pointerdown", this.LI_cancelDown);
        this.LI_cancel_button.on("pointerup", this.doCancelUp);
        this.LI_cancel_button.on("pointerupoutside", this.LI_cancelOutSide);
        this.LI_cancel_button.name = this;

        this.LI_graphics = new PIXI.Graphics();
        //LI_graphs deals with the actual graph drawn as a result
        //to the line data
        this.LI_graphs = new PIXI.Graphics();
        this.LI_graphs.buttonMode = true;
        this.LI_graphs.interactive = true;
        /*this.LI_graphs
            .on("pointerdown", LI_onDragGraphStart)
            .on("pointerup", LI_onDragGraphEnd)
            .on("pointerupoutside", LI_onDragGraphEnd)
            .on("pointermove", LI_onDragGraphMove);*/

        this.endPoint;
        this.lineImage;
        this.polyPts;
     //   this.parnet.container.addChild(this.windowContainer);
}
/**
 * Show All allows use of the line intensity application by 
 * implementing all UI elements into the current window. This includes
 * the background image, main text, commands buttons and cancel button.
 * Each of these UI elements have functions tied to specific 
 * interactions.
 */
LI_showAll() {
    this.windowContainer.addChild(this.LI_backgroundImage);
    console.log("Container width2: " + this.windowContainer.screen_width);
    console.log("Container height2: " + this.windowContainer.screen_height);
    this.LI_backgroundImage.width = this.windowContainer.screen_width;
    this.LI_backgroundImage.height = this.windowContainer.screen_height;

    this.windowContainer.addChild(this.LI_cancel_button);

    var bcLength = this.LI_buttonCommands.length;
    console.log("buttons: " + bcLength);
    for (var i = 0; i < bcLength; i++) {
        this.windowContainer.addChild(this.LI_buttonCommands[i]);
        this.LI_buttonCommands[i].alpha = 1;
        this.LI_buttonCommands[i].interactive = true;
        this.LI_buttonCommands[i].buttonMode = true;
    }

    this.windowContainer.addChild(this.LI_mainText);
    this.LI_mainText.alpha = 1;
    this.LI_mainText.x = this.windowContainer.screen_width / 2;
    this.LI_mainText.y = 0;
    console.log("Main text: " + this.LI_mainText.text);

    this.windowContainer.addChild(this.LI_graphics);
    this.windowContainer.addChild(this.LI_graphs);

    this.LI_boundary_tlx = this.windowContainer.screen_width / 2;
    this.LI_boundary_tly = this.windowContainer.screen_height / 2;
    this.LI_backgroundImage.interactive = true;
    this.LI_backgroundImage.on("pointerdown", this.doDrawPoint);
    this.LI_backgroundImage.name = this;
    console.log("show all");

}

/**
 * Hide All acts as the opposite of show all by removing all the 
 * currently used UI elements.
 */
LI_hideAll() {
    this.LI_state = "neutral";

    this.LI_clearUp();

    var bcLength = this.LI_buttonCommands.length;
    for (var i = 0; i < bcLength; i++) {
        this.LI_buttonCommands[i].alpha = 0;
        this.LI_buttonCommands[i].interactive = false;
        this.LI_buttonCommands[i].buttonMode = false;
        this.windowContainer.removeChild(this.LI_buttonCommands[i]);
    }

    this.windowContainer.removeChild(this.LI_mainText);
    this.windowContainer.removeChild(this.LI_cancel_button);

    this.windowContainer.removeChild(this.LI_backgroundImage);
    this.windowContainer.removeListener("pointerdown", this.doDrawPoint);
    this.windowContainer.name = this;
}

LI_hideButtons() {
    var bcLength = this.LI_buttonCommands.length;
    for (var i = 0; i < bcLength; i++) {
        this.LI_buttonCommands[i].alpha = 0;
        this.LI_buttonCommands[i].interactive = false;
        this.LI_buttonCommands[i].buttonMode = false;
        console.log("Hide button: " + i);
    }
    this.LI_cancel_button.alpha = 1;
    this.LI_cancel_button.interactive = true;
    this.LI_cancel_button.buttonMode = true;
    bringToFront(this.LI_cancel_button);
}

LI_showButtons() {
    var bcLength = this.LI_buttonCommands.length;
    for (var i = 0; i < bcLength; i++) {
        this.LI_buttonCommands[i].alpha = 1;
        this.LI_buttonCommands[i].interactive = true;
        this.LI_buttonCommands[i].buttonMode = true;
        bringToFront(this.LI_buttonCommands[i]);
    }
    this.LI_cancel_button.alpha = 0;
    this.LI_cancel_button.interactive = false;
    this.LI_cancel_button.buttonMode = false;
    console.log('make cancel disappear ' + this.LI_cancel_button.alpha);

}

doDrawPoint(event){
    this.name.LI_drawPoint(event);
}
LI_drawPoint(event) {
    if (this.LI_state == "drawing") { //Checks if in desired this.LI_state
   //    if (!cancel) {  //Checks if user clicked on LI_cancel button
        if (!this.LI_drawing) { //Checks what phase of line create user is in
            this.LI_graphics.clear(); //Clears current LI_graphics on screen
            //Changes LI_drawing value
            this.LI_drawing = true;
            //Updates starting point
            //  points = [event.data.global.x, event.data.global.y];
            //Creates the starting point for the line
            this.LI_currentStart = new Point((event.data.global.x - this.windowContainer.x)/this.windowContainer.scale.x , (event.data.global.y - this.windowContainer.y)/this.windowContainer.scale.x, this.windowContainer);
            this.LI_currentStart.image.name = this.LI_pointContainer.length;
            this.LI_currentStart.image.flag = this;

            this.LI_pointContainer.push(this.LI_currentStart);
            //Updates text and this.LI_cancel button

            setMainText(this.LI_mainText, 2, this.LI_lineContainer);
        }//end this.LI_drawing if
   else {
       //Creates the end point of the line
       this.endPoint = new Point((event.data.global.x - this.windowContainer.x)/this.windowContainer.scale.x, (event.data.global.y - this.windowContainer.y)/this.windowContainer.scale.x, this.windowContainer);
       this.endPoint.image.name = this.LI_pointContainer.length;
       this.endPoint.image.flag = this;
       this.LI_pointContainer.push(this.endPoint);
       //Contructs the line graphic to be place inside the line object
       var lineImage = new PIXI.Graphics();
            lineImage.lineStyle(1, 0x000070)
           .moveTo(this.LI_currentStart.x, this.LI_currentStart.y)
           .lineTo(this.endPoint.x, this.endPoint.y);
       lineImage.name = this.LI_lineContainer.length;
       lineImage.interactive = true;
       lineImage.buttonMode = true;
       lineImage.data = this;
       lineImage
           .on("pointerdown", this.doLineSelect)
           .on("pointerup", this.doDragLineEnd)
           .on("pointerupoutside", this.doDragLineEnd)
           .on("pointermove", this.doDragLineMove);
       //Creates the hit area of said line graphic
       if (this.LI_currentStart.x > this.endPoint.x) {
           this.polyPts = [this.LI_currentStart.x - 5, this.LI_currentStart.y - 5, this.LI_currentStart.x + 5, this.LI_currentStart.y + 5, this.endPoint.x + 5, this.endPoint.y + 5, this.endPoint.x - 5, this.endPoint.y - 5];
       }
       else if (this.LI_currentStart.x < this.endPoint.x) {
           this.polyPts = [this.LI_currentStart.x - 5, this.LI_currentStart.y + 5, this.LI_currentStart.x + 5, this.LI_currentStart.y - 5, this.endPoint.x + 5, this.endPoint.y - 5, this.endPoint.x - 5, this.endPoint.y + 5];
       }
       else if (this.LI_currentStart.x == this.endPoint.x) {
           this.polyPts = [this.LI_currentStart.x - 5, this.LI_currentStart.y, this.LI_currentStart.x + 5, this.LI_currentStart.y, this.endPoint.x + 5, this.endPoint.y, this.endPoint.x - 5, this.endPoint.y];
       }
       //Used to show hitarea for testing purposes
       // var pGraphic = new PIXI.this.LI_graphics();
       //       pGraphic.beginFill(0x1C2833);
       //     pGraphic.drawPolygon(this.polyPts);
       //   app.stage.addChild(pGraphic);
       lineImage.hitArea = new PIXI.Polygon(this.polyPts);
       this.windowContainer.addChild(lineImage);
       //contructs line object
       this.LI_currentStart.image
           .on("pointerdown", this.doDragPointStart)
           .on("pointerup", this.doDragPointEnd)
           .on("pointerupoutside", this.doDragPointEnd)
           .on("pointermove", this.doDragPointMove);
       this.endPoint.image
            .on("pointerdown", this.doDragPointStart)
            .on("pointerup", this.doDragPointEnd)
            .on("pointerupoutside", this.doDragPointEnd)
            .on("pointermove", this.doDragPointMove);
       this.LI_currentLine = new Line(this.LI_currentStart, this.endPoint, this.LI_backgroundImage, this.LI_lineContainer.length, lineImage);
       //Calls data functions to show user the results on the line they drew
      this.LI_currentLine.displayDetails(this.windowContainer);   //Displays the details of the line by fetching its information

       createGraph(this.LI_graphs, this.LI_currentLine, this.LI_boundary_tlx, this.LI_boundary_tly);  //Creates a graph from said line*/
       this.windowContainer.addChild(this.LI_graphs);
       this.LI_lineContainer.push(this.LI_currentLine);    //Adds this line to the array of lines
       this.LI_drawing = false;    //Ends the LI_drawing LI_state
       this.LI_endDraw();

   }//end else
   //    }//end LI_cancel if
   }// end active if

}// end draw point


LI_buttonDown() {
    this.alpha = 0.5;
}

LI_buttonUpOutside() {
    this.alpha = 1;
}

doActivateUp(){
    this.alpha = 1;
    this.name.LI_activateUp();
}
LI_activateUp() {
    setMainText(this.LI_mainText, 1, this.LI_lineContainer);
    this.LI_hideButtons();
    console.log("Hide buttons");
    this.LI_state = "drawing";
    this.windowContainer.interactive = true;

}

LI_endDraw() {
    this.LI_drawing = false;
    this.LI_state = "neutral";
    this.LI_showButtons();
    //  points = [0, 0];
    this.LI_currentStart = -1;
    setMainText(this.LI_mainText, 0, this.LI_lineContainer);
    this.windowContainer.interactive = false;
}

LI_cancelDown(event) {
    this.name.LI_cancel = true;
   // app.stage.interactive = false;
   this.alpha = 0.5;

}// end LI_cancel draw

 LI_cancelOutSide() {
    this.name.LI_cancel = false;
    this.alpha = 1;
}

doCancelUp(){
    this.name.LI_cancelUp();    
}
LI_cancelUp() {
    //Resets LI_cancel value
    this.LI_showButtons();
    this.LI_cancel = false;
    this.LI_state = "neutral";
    setMainText(this.LI_mainText, 0,  this.LI_lineContainer);

    if (this.LI_cancel) {
        if (this.LI_state == "drawing") {
            this.LI_graphics.clear();
            this.LI_graphs.clear();
            this.LI_graphs.removeChildren();

            this.LI_drawing = false;

            if (this.LI_currentStart != -1) {
                this.LI_erasePoint(this.LI_currentStart);
            }
            this.LI_currentStart = -1;

            this.LI_endDraw();
        }
        else if (this.LI_state == "erase") {
        }
        else if (this.LI_state == "edit") {
        }
    }
}//end LI_cancel up

doClearUp(){
    this.alpha = 1
    this.name.LI_clearUp();
}
LI_clearUp() {
   // 
   var lcLength = this.LI_lineContainer.length;
   console.log("Length of Line Container Before: " + this.LI_lineContainer.length);
    for (var i = 0; i < lcLength; i++) {
        var line = this.LI_lineContainer[i];
        if (line == this.LI_currentLine) {
            this.LI_graphs.clear();
            this.LI_graphs.removeChildren();

           this.LI_graphics.clear();
            // hTextContainer.removeChildren();
            // vTextContainer.removeChildren();
            this.LI_currentLine = -1;
        }
        line.removeLine();
        this.LI_erasePoint(line.startPoint);
        this.LI_erasePoint(line.endPoint);
    }
    this.LI_lineContainer = [];
    console.log("Length of Line Container After: " + this.LI_lineContainer.length);
    setMainText(this.LI_mainText, 0, this.LI_lineContainer);
    //  }
}

doEraseUp(){
    this.alpha = 1;
    this.name.LI_eraseUp();
}

LI_eraseUp() {
    setMainText(this.LI_mainText, 3, this.LI_lineContainer);
    this.LI_hideButtons();
    this.LI_state = "erase";
}

LI_eraseLine(line) {
    var index = line.name;
    console.log("Deleted Line: " + index);
    this.LI_lineContainer.splice(index, 1);
    for (var i = 0; i < this.LI_lineContainer.length; i++) {
        this.LI_lineContainer[i].name = i;
        this.LI_lineContainer[i].image.name = i;
    }
    if (line == this.LI_currentLine) {
        this.LI_graphics.clear();
        this.LI_graphs.clear();
        this.LI_graphs.removeChildren();
        this.LI_currentLine = -1;
    }
    line.removeLine();
    this.LI_erasePoint(this.startPoint);
    this.LI_erasePoint(this.endPoint);
}

LI_erasePoint(point) {
    var index = point.image.name;
    this.LI_pointContainer.splice(index, 1);
    for (var i = 0; i < this.LI_pointContainer.length; i++) {
        //LI_pointContainer[i].name = i;
        this.LI_pointContainer[i].image.name = i;
    }
    point.clearImage();
}

doEditUp(){
    this.alpha = 1;
    this.name.LI_editUp();
}

LI_editUp() {
     setMainText(this.LI_mainText, 4, this.LI_lineContainer);
     this.LI_hideButtons();
     this.LI_state = "edit";
 }

doDragPointStart(event){
    this.flag.LI_onDragPointStart(event,this);
}
//Drag point functions
LI_onDragPointStart(event,image) {
    if (this.LI_state == "edit") {
        // store a reference to the data
        // the reason for this is because of multitouch
        // we want to track the movement of this particular touch
        image.data = event.data;
        image.alpha = 0.5;
        //   this.LI_mainText.text = image.name;
        this.LI_pointContainer[image.name].owner.image.alpha = 0.5;
        this.LI_pointContainer[image.name].owner.data.alpha = 0.5;
        this.LI_pointContainer[image.name].owner.clearImage();
        this.LI_pointContainer[image.name].owner.resetImage(this.windowContainer);
        this.LI_pointContainer[image.name].resetImage(this.windowContainer);
        image.dragging = true;
        if (this.LI_currentLine != this.LI_pointContainer[image.name].owner) {
            this.LI_currentLine = this.LI_pointContainer[image.name].owner;
            createGraph(this.LI_graphs, this.LI_currentLine, this.LI_boundary_tlx, this.LI_boundary_tly);
            this.windowContainer.addChild(LI_graphs);

        }
    }
}

doDragPointEnd(event){
    this.flag.LI_onDragPointEnd(this);
}
LI_onDragPointEnd(image) {
    if (this.LI_state == "edit") {
        image.alpha = 1;
        this.LI_pointContainer[image.name].owner.image.alpha = 1;
        this.LI_pointContainer[image.name].owner.data.alpha = 1;
        this.LI_pointContainer[image.name].owner.displayDetails(this.windowContainer);

        image.dragging = false;
        // set the interaction data to null
        image.data = null;
        createGraph(this.LI_graphs, this.LI_currentLine, this.LI_boundary_tlx, this.LI_boundary_tly);
        this.windowContainer.addChild(this.LI_graphs);
    }
}

doDragPointMove(event){
    this.flag.LI_onDragPointMove(this);
}
LI_onDragPointMove(image) {
    if (this.LI_state == "edit") {
        if (image.dragging) {
            const newPosition = image.data.getLocalPosition(image.parent);
            var changeX = newPosition.x;
            var changeY = newPosition.y;
            var changeY = newPosition.y;

            if (newPosition.x < 0) {
                changeX = 0;
            }
            else if (newPosition.x >= this.windowContainer.screen_width) {
                changeX = this.windowContainer.screen_width;
            }

            if (newPosition.y < 0) {
                changeY = 0;
            }
            else if (newPosition.y >= this.windowContainer.screen_height) {
                changeY = this.windowContainer.screen_height;
            }
            this.LI_pointContainer[image.name].changeLocation(changeX, changeY, this.windowContainer);
            this.LI_pointContainer[image.name].owner.clearImage();
            this.LI_pointContainer[image.name].owner.resetImage(this.windowContainer);
            this.LI_pointContainer[image.name].resetImage(this.windowContainer);
            this.LI_pointContainer[image.name].owner.fetchInformation();
            updateGraph(this.LI_graphs, this.LI_currentLine, this.LI_boundary_tlx, this.LI_boundary_tly);

        }
    }
}






doLineSelect(event){
    console.log("Do Line Select");
    this.data.LI_lineSelect(event,this);
}

LI_lineSelect(event,lineImage) {
    console.log("LI Line Select");
    if (this.LI_state == "neutral") {   //Will display the information of said line
        this.LI_currentLine = this.LI_lineContainer[lineImage.name];
        createGraph(this.LI_graphs, this.LI_currentLine, this.LI_boundary_tlx,
            this.LI_boundary_tly);
        this.windowContainer.addChild(this.LI_graphs);

        setMainText(this.LI_mainText, 0, this.LI_lineContainer);
    }
    else if (this.LI_state == "erase") {    //Will delete said line
        this.LI_eraseLine(this.LI_lineContainer[lineImage.name]);
    }
    else if (this.LI_state == "edit") {    //Will delete said line
        lineImage.alpha = 0.5;
        this.LI_lineContainer[lineImage.name].clearImage();
        this.LI_lineContainer[lineImage.name].resetImage(this.windowContainer);
        this.LI_lineContainer[lineImage.name].startPoint.image.alpha = 0.5;
        this.LI_lineContainer[lineImage.name].endPoint.image.alpha = 0.5;
        if (this.LI_currentLine != this.LI_lineContainer[lineImage.name]) {
            this.LI_currentLine = this.LI_lineContainer[lineImage.name];
            createGraph(this.LI_graphs, this.LI_currentLine, this.LI_boundary_tlx,
                this.LI_boundary_tly);
            this.windowContainer.addChild(this.LI_graphs);

        }
        lineImage.dragging = true;
        lineImage.eventData = event.data;
        lineImage.dragx = (event.data.global.x - this.windowContainer.x)/this.windowContainer.scale.x;
        lineImage.dragy = (event.data.global.y - this.windowContainer.y)/this.windowContainer.scale.y;
    }
}

doDragLineEnd(event){
    console.log("Do Drag Line End");
    this.data.LI_onDragLineEnd(event,this);
}
//Drag line
LI_onDragLineEnd(event, lineImage) {
    if (this.LI_state == "edit") {
        lineImage.alpha = 1;
        this.LI_lineContainer[lineImage.name].clearImage();
        this.LI_lineContainer[lineImage.name].resetImage(this.windowContainer);
        this.LI_lineContainer[lineImage.name].startPoint.image.alpha = 1;
        this.LI_lineContainer[lineImage.name].startPoint.resetImage(this.windowContainer);
        this.LI_lineContainer[lineImage.name].endPoint.image.alpha = 1;
        this.LI_lineContainer[lineImage.name].endPoint.resetImage(this.windowContainer);
        this.LI_lineContainer[lineImage.name].displayDetails(this.windowContainer);
        lineImage.dragging = false;
        updateGraph(this.LI_graphs, this.LI_currentLine, this.LI_boundary_tlx, this.LI_boundary_tly);
        this.windowContainer.addChild(this.LI_graphs);

        lineImage.eventData = null;
    }
}

doDragLineMove(event){
    console.log("Do Drag Line Move");
    this.data.LI_onDragLineMove(event,this);
}
LI_onDragLineMove(event, lineImage) {
    if (this.LI_state == "edit") {
        if (lineImage.dragging) {
            const newPosition = lineImage.eventData.getLocalPosition(lineImage.parent);
            var move = true;
            var changeX = newPosition.x - lineImage.dragx;
            var changeY = newPosition.y - lineImage.dragy;

            if (this.LI_lineContainer[lineImage.name].startPoint.x + changeX < 0) {
                changeX = 0 - this.LI_lineContainer[lineImage.name].startPoint.x;
            }
            else if (this.LI_lineContainer[lineImage.name].endPoint.x + changeX < 0) {
                changeX = 0 - this.LI_lineContainer[lineImage.name].endPoint.x;
            }
            else if (this.LI_lineContainer[lineImage.name].startPoint.x + changeX >= app.screen.width) {
                changeX = app.screen.width - (this.LI_lineContainer[lineImage.name].startPoint.x);
            }
            else if (this.LI_lineContainer[lineImage.name].endPoint.x + changeX >= app.screen.width) {
                changeX = app.screen.width - (this.LI_lineContainer[lineImage.name].endPoint.x);
            }

            if (this.LI_lineContainer[lineImage.name].startPoint.y + changeY < 0) {
                changeY = 0 - this.LI_lineContainer[lineImage.name].startPoint.y;
            }
            else if (this.LI_lineContainer[lineImage.name].endPoint.Y + changeY < 0) {
                changeY = 0 - this.LI_lineContainer[lineImage.name].endPoint.Y;

            }
            else if (this.LI_lineContainer[lineImage.name].startPoint.y + changeY >= app.screen.height) {
                changeY = app.screen.height - (this.LI_lineContainer[lineImage.name].startPoint.y);

            }
            else if (this.LI_lineContainer[lineImage.name].endPoint.y + changeY >= app.screen.height) {
                changeY = app.screen.height - (this.LI_lineContainer[lineImage.name].endPoint.y);
            }

            if (move) {
                this.LI_lineContainer[lineImage.name].startPoint.changeLocation(this.LI_lineContainer[lineImage.name].startPoint.x + changeX, this.LI_lineContainer[lineImage.name].startPoint.y + changeY, this.windowContainer);
                this.LI_lineContainer[lineImage.name].endPoint.changeLocation(this.LI_lineContainer[lineImage.name].endPoint.x + changeX, this.LI_lineContainer[lineImage.name].endPoint.y + changeY, this.windowContainer);
                lineImage.dragx = newPosition.x;
                lineImage.dragy = newPosition.y;
                this.LI_lineContainer[lineImage.name].clearImage();
                this.LI_lineContainer[lineImage.name].resetImage(this.windowContainer);
                this.LI_lineContainer[lineImage.name].fetchInformation();
                updateGraph(this.LI_graphs, this.LI_currentLine, this.LI_boundary_tlx, this.LI_boundary_tly);
            }
        }
    }
}


setMainText(pixiText, flag, lines) {
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
bringToFront(image) {
    if (image.parent) {
        var parent = image.parent;
        parent.removeChild(image);
        parent.addChild(image);
    }
}

UIBool(bool)
{
    this.windowContainer.visible = bool;
}
}