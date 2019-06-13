/**
         * Object used to represent a line on the screen. It's major components consists of a start
         * and end point objects, a grapic used as its visual representation, a name(index number)
         * and the backgtound image used to gather data.
         */
class Line {
    constructor(startPoint, endPoint, background, name, image) {
        this.startPoint = startPoint;
        this.startPoint.setOwner(this);
        this.endPoint = endPoint;
        this.endPoint.setOwner(this);
        this.background = background;
        this.name = name;
        this.image = image;
        this.data = -1;
        //This are data fields mostly used to gather/store data
        this.lineDataPoints = [];
        this.peakData = [];
        this.valleyData = [];
        this.baseline = 0;
        this.maxValue = 0;
        this.valueDifference = 0;
        this.threshold = 5;
        this.baseline = 0;
        this.peakStart = 0;
        this.peakEnd = 0;
    }

    /**
     * Simply finds the slope of the line using the coordinates of the start and end point
     * Isn't currently used. was used previously to determine line function but as of now
     * has little to no use.
     */
    slope() {
        var changeY = this.endPoint.y - this.startPoint.y;
        var changeX = this.endPoint.x - this.startPoint.x;
        var slope = 0;
        if (changeX != 0) {
            slope = (changeY) / (changeX);
        }
        return slope;
    }

    /**
     * Simply finds the length of the line using the coordinates of the start and end point
     */
    length() {
        var changeY = this.endPoint.y - this.startPoint.y;
        var changeX = this.endPoint.x - this.startPoint.x;
        return Math.sqrt(Math.pow(changeY, 2) + Math.pow(changeX, 2));
    }

    /**
     * Goes across the line itself and gathers a certain amount of measurements depending on
     * the length of the line. Measurements are taken with the background image data field
     * and consists of finding the intensity of the pixels along the line. 
     */
    findDataPoints() {
        //Clears array of previous measurements

        this.lineDataPoints = [];

        var changeY = this.endPoint.y - this.startPoint.y;
        var changeX = this.endPoint.x - this.startPoint.x;


        var entries = 0;
        var temp = this.length();
        if (temp < 50) {
            //entries = length;
            entries = 100;
        }
        else if (temp < 100) {
            //entries = length * (3 / 4);
            entries = 100;
        }
        else if (temp < 200) {
            //entries = length * (2 / 4);
            entries = 105;
        }
        else if (temp < 400) {
            // entries = length * (1 / 4);
            entries = 115;
        }
        else if (temp < 800) {
            //entries = length * (1 / 6);
            entries = 120;
        }
        else {
            entries = temp * (1 / 8);
        }
        var spaceX = changeX / entries;
        var currentX = this.startPoint.x;
        var spaceY = changeY / entries;
        var currentY = this.startPoint.y;
        var canvas = app.renderer.plugins.extract.canvas(this.background);
        var context = canvas.getContext('2d');
        for (var i = 0; i <= entries; i++) {


            //Takes the rgba values of a specific pixel and calculates intensity 
            //getImageData takes in x-cooridinate/y-coordinate/width/height
            //the data is broken into a 1D array with each pixel information
            //Being seperated as so R-value/G-value/B-value/alpha-value 
            var rgba = context.getImageData(currentX, currentY, 1, 1).data;
            var R = rgba[0];
            var G = rgba[1];
            var B = rgba[2];
            var luminance = 0.2126 * R + 0.7152 * G + 0.0722 * B;

            this.lineDataPoints.push(luminance);
            if (i == 0) {
                this.maxValue = luminance;

            }
            else {
                if (this.maxValue < luminance) {
                    this.maxValue = luminance;

                }
            }
            //Creates small squares denoting where measurements were taken
            /* this.image.beginFill(0xC70039);
             this.image.drawRect(currentX - 2, currentY - 2, 4, 4);
             this.image.endFill();
             app.stage.addChild(this.image);*/
            //Increments coordinates
            currentX += spaceX;
            currentY += spaceY;
        }
        this.maxValue = (Math.floor(this.maxValue / 5) + 1) * 5;
        if (this.maxValue >= 255) {
            this.maxValue = 260;
        }
        this.valueDifference = this.maxValue;
    }

    /**
     * This takes the collected data points found across the line and will look for peaks/local maxima 
     * within the data. It does this by going point by point and looking a few measurements before and
     * after and checks if it is the highest of the bunch. The threshold datafield determines how far 
     * the program searches in either direction.
     */
    findPeakData() {
        this.peakData = [];
        var dataLength = this.lineDataPoints.length;
        for (var i = 0; i < dataLength; i++) {
            var check = true;
            for (var j = 1; j <= this.threshold; j++) {
                if ((i - j) >= 0) {
                    if (this.lineDataPoints[i] < this.lineDataPoints[i - j]) {
                        check = false;
                    }
                }
                if ((i + j) < dataLength) {
                    if (this.lineDataPoints[i] < this.lineDataPoints[i + j]) {
                        check = false;
                    }
                }
            }
            if (check) {
                if (i > 0) {
                    if (this.lineDataPoints[i] == this.lineDataPoints[i - 1]) {
                        continue;
                    }
                }
                this.peakData.push(i);
            }
        }
    }

    /**
     * Functions very similarly to findPeakData but instead of fniding peaks/local maxima this functions
     * searches for valleys/local minima.
     */
    findValleyData() {

        this.valleyData = [];
        var dataLength = this.lineDataPoints.length;
        for (var i = 0; i < dataLength; i++) {
            var check = true;
            for (var j = 1; j <= this.threshold; j++) {
                if ((i - j) >= 0) {
                    if (this.lineDataPoints[i] > this.lineDataPoints[i - j]) {
                        check = false;
                    }
                }
                if ((i + j) < dataLength) {
                    if (this.lineDataPoints[i] > this.lineDataPoints[i + j]) {
                        check = false;
                    }
                }
            }
            if (check) {
                if (i > 0) {
                    if (this.lineDataPoints[i] == this.lineDataPoints[i - 1]) {
                        continue;
                    }
                }
                this.valleyData.push(i);
            }
        }

    }

    /**
     * This function is merely a temporary solution for finding this information. Right now to find where 
     * a massive peak begins and ends the program will look for the biggest space between valleys and only between
     * valleys that arent that different in value. This isnt very efficient and needs a superior algorithm to 
     * do this job correctly but this does works for some situations.
     */
    findPeak() {

        var differenceThreshold = 10;
        var max = 0;
        var vdLength = this.valleyData.length;
        for (var i = 1; i < vdLength; i++) {
            var seperation = 1; //How far to look for the previous valley point
            while (true) {
                if (Math.abs(this.lineDataPoints[this.valleyData[i]] - this.lineDataPoints[this.valleyData[i - seperation]]) <= differenceThreshold) {   //checks to see  if valley is in peak or in baseline
                    //Since valley data is holding the index value we can find how far apart they are from one another in the oringial array
                    var distance = this.valleyData[i] - this.valleyData[i - seperation]; //The distance between the two points
                    if (distance > max) {   //if the distance is greater replace previous information
                        max = distance;
                        this.peakStart = this.valleyData[i - seperation];
                        this.peakEnd = this.valleyData[i];
                    }
                    break;
                }
                else {
                    seperation++; // if the value was found inside peak then look for the next valley 
                    if (i - seperation < 0) {
                        break;
                    }
                }
            }
        }
    }

    /**
     * Since the data found from findPeak() isn't the best then results of this function aren't always accurate.
     * This takes all other data points outside of the massive peak and finds the average to create a baseline for the
     * background data
     */
    findBaseLine() {

        var summation = 0
        var counter = 0;
        var ldLength = this.lineDataPoints.length;
        for (var i = 0; i < ldLength; i++) {
            if (i > this.peakStart && i < this.peakEnd) {
                continue;
            }
            summation += this.lineDataPoints[i];
            counter++;
        }
        this.baseline = summation / counter;

    }

    resetStart() {
        this.clearImage();
        this.startPoint.clearImage();
    }
    resetEnd() {
        this.clearImage();
        this.endPoint.clearImage();
    }
    changeStart(nX, nY) {
        this.clearImage();
        this.startPoint.changeLocation(nX, nY);
        this.resetImage();
    }
    resetEnd() {
        this.clearImage();
        this.endPoint.clearImage();
    }

    /**
     * This is used whenever trying to permanetly delete a line.This function clears the points on the line while also
     * clearing the image/data graphics and removes all types of interactivity so that the user no longer has access to
     * this removed line.
     */
    removeLine() {
        this.startPoint.clearImage();
        this.endPoint.clearImage();
        this.clearImage();
        this.data.clear();
        this.image.interactive = false;
        this.image.buttonMode = false;
        this.hitArea = null;
    }

    /**
     * Clears all image graphic information
     */
    clearImage() {
        this.image.clear();
        this.data.clear();
    }

    /**
     * Will redraw the line using the current starting and end point information
     */
    resetImage() {
        this.image.lineStyle(1, 0x000070)
            .moveTo(this.startPoint.x, this.startPoint.y)
            .lineTo(this.endPoint.x, this.endPoint.y);
        var polyPts;
        if (this.startPoint.x > this.endPoint.x) {
            polyPts = [this.startPoint.x - 5, this.startPoint.y - 5, this.startPoint.x + 5, this.startPoint.y + 5, this.endPoint.x + 5, this.endPoint.y + 5, this.endPoint.x - 5, this.endPoint.y - 5];
        }
        else if (this.startPoint.x < this.endPoint.x) {
            polyPts = [this.startPoint.x - 5, this.startPoint.y + 5, this.startPoint.x + 5, this.startPoint.y - 5, this.endPoint.x + 5, this.endPoint.y - 5, this.endPoint.x - 5, this.endPoint.y + 5];
        }
        else if (this.startPoint.x == this.endPoint.x) {
            polyPts = [this.startPoint.x - 5, this.startPoint.y, this.startPoint.x + 5, this.startPoint.y, this.endPoint.x + 5, this.endPoint.y, this.endPoint.x - 5, this.endPoint.y];
        }
        this.image.hitArea = new PIXI.Polygon(polyPts);
        app.stage.addChild(this.image);

    }

    /**
     *  Calls all functions based around gathering information to have info datafields to hold 
     *  current/new information to be used
     */
    fetchInformation() {
        this.findDataPoints();
        this.findPeakData();
        this.findValleyData();
        this.findPeak();
        this.findBaseLine();
    }//end of line details function

    /**
     * This function fetches and goes thru the info data fields and creates more images representing where measurements
     * were taken.
     */
    displayDetails() {
        this.fetchInformation();
        if (this.data != -1) {
            this.data.clear();
        }
        var changeY = this.endPoint.y - this.startPoint.y;
        var changeX = this.endPoint.x - this.startPoint.x;
        var entries = this.lineDataPoints.length;
        var spaceX = changeX / entries;
        var currentX = this.startPoint.x;
        var spaceY = changeY / entries;
        var currentY = this.startPoint.y;
        const data = new PIXI.Graphics();
        for (var i = 0; i <= entries; i++) {
            //Creates small squares denoting where measurements were taken
            data.beginFill(0xA50037);
            data.lineStyle(1, 0x52001B, 1);
            data.drawRect(currentX - 2, currentY - 2, 4, 4);
            data.endFill();
            app.stage.addChild(data);
            //Increments coordinates
            currentX += spaceX;
            currentY += spaceY;
        }//end loop
        this.data = data;
        this.startPoint.clearImage();
        this.startPoint.resetImage();
        this.endPoint.clearImage();
        this.endPoint.resetImage();
    }


}