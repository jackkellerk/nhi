/************************************************************************************
    * This function can create an animation for moving an object to any (x,y) coordinate 
    * "xPos" and "yPos" relate to the final position that you want the object moved to
    * "element" relates to the object you're transforming
    * "rate" relates to the length of time that the transformation will occur in
    * Having a larger "rate" number will mean the object moves slower
    * ************************************************************************************/
   function positionTransform(xPos, yPos, element, rate){
    if( rate < 1){                          //Return if the rate is under 1. 1 would mean an instant position change. Entering a number below 1 would mess up the logic 
        return;
    }
    
    let xDiff = element.x - xPos;           //We are finding the differences in the (x,y) coordinates between the starting and ending positions
    let yDiff = element.y - yPos;           //We are also determining the change in (x,y) coordinates, depending on the rate 
    let xChange = xDiff/rate;
    let yChange = yDiff/rate;

    let count = 0;                          //The variable "count" will start at zero but be incremented inside the animation loop
    
    let animationMove =() => {                  //We are declaring the animation function here
        if(count >= rate){                      //It's made of a simple if-else statment that changes the (x,y) coordinates
            element.x = xPos;                   //Once the "count" variable reaches the "rate" value, the object gets set to the exact final coordinates and the animation ends
            element.y = yPos;
            app.ticker.remove(animationMove)
        } 
        else{
            element.x -= xChange;
            element.y -= yChange;
            count++;
        }
    }
    app.ticker.add(animationMove) //We now add the animation function to the ticker stack. The function will take care of removing itself from the stack
}


/***************************************************************************************************
* This function can create an animation for scaling an object up 
* "scaleX"/"scaleY" relates to how much you want to augementate the width/height of the object
* "element" relates to the object you're transforming
* "rate" relates to the incremental scale change per tick. Increasing it will make the sacling slower
* **************************************************************************************************/
function scaleTransform(scaleX, scaleY, element, rate){
    if( rate < 1){                              //Return if the rate is under 1. 1 would mean an instant position change. Entering a number below 1 would mess up the logic 
        return;
    }

    let xDiff = element.scale.x - scaleX;       // This is to calculate the difference in x and y scales
    let yDiff = element.scale.y - scaleY;       // A positive difference will increase an x or y scale while a negative difference will decrease it
    
    let xChange = xDiff/rate                    // This will calculate the average change over the time allotted (the "rate")
    let yChange = yDiff/rate                    // A larger rate means a slower change

    let count = 0;                              //The variable "count" will start at zero but be incremented inside the animation loop             

    let animationScale = () => {                    //We are declaring the animation function here
        if ( count >= rate){                        //It's made of a simple if-else statment that changes the x/y scales
            element.scale.x = scaleX;               //Once the "count" variable reaches the "rate" value, the object gets set to the exact X and Y scales, and the animation ends
            element.scale.y = scaleY;
            app.ticker.remove(animationScale);
        }
        else{
            element.scale.x -= xChange
            element.scale.y -= yChange
            count++;
        }
    }
    app.ticker.add(animationScale); //We now add the animation function to the ticker stack. The function will take care of removing itself from the stack
}

/*
* This function can create an animation for changing the alpha variable of an object up 
* "element" relates to the object you're transforming
* "changeTo" is the percentage you're changing the opacity to (0.0 - 1.0)
* "rate" relates to the incremental alpha change per tick. Increasing it will make the change slower
*/
function alphaTransform(element, changeTo, rate ){
    if( rate < 1){                                  //Return if the rate is under 1. 1 would mean an instant position change. Entering a number below 1 would mess up the logic 
        return;
    }

    let alphaDiff = (element.alpha - changeTo);     //This is to calculate the alpha differences between the start and end
    let alphaChange = alphaDiff/rate;               //This will calculate the average change over time alloted ("rate")

    let count = 0;                                  //The variable "count" will start at zero but be incremented inside the animation loop 

    let animationAlpha = () => {                    //We are declaring the animation function here
        if ( count >= rate){                        //It's made of a simple if-else statment that changes the alpha variable
            element.alpha = changeTo;               //Once the "count" variable reaches the "rate" value, the object gets set to the exact alpha value, and the animation ends
            app.ticker.remove(animationAlpha);      
        }
        else{
            element.alpha -= alphaChange;
            count++
        }
    }
    app.ticker.add(animationAlpha); //We now add the animation function to the ticker stack. The function will take care of removing itself from the stack
}

/********************************************************************************************************************
* This function can create an animation for blurring an object 
* "element" relates to the object you're transforming
* "blurStregth" will determine the percentage that the blur filter will apply
* Whole numbers will create no blur while decimals in between will cause a blur. The most blur will be at 1/2 of any number
* "intensity" will describe how extreme the blur filter is. Scaling it up will make the blur spread over a larger area
* ********************************************************************************************************************/
function blurTransform(element, blurStrength, intensity){
    var blurFilter = new PIXI.filters.BlurFilter();     //Blur filter properties
    blurFilter.blur = 0;
    let blurCount = 0;
    element.filters = [blurFilter];

    let count = 0;                                      //The variable "count" will start at zero but be incremented inside the animation loop

    let animationBlur = () => {                         //We are declaring the animation function here
        if ( count >= 10){                              //It's made of a simple if-else statment that changes the alpha variable
            app.ticker.remove(animationBlur);           //Once the "count" variable reaches 10 the animation ends
        }
        else{
            blurCount = blurStrength * Math.PI
            const blurAmount = Math.cos(blurCount);
            blurFilter.blur = intensity * blurAmount;
            count++;
        }
    }
    app.ticker.add(animationBlur);  //We now add the animation function to the ticker stack. The function will take care of removing itself from the stack
}
