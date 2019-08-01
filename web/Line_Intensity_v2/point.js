/**
         * Object used to represent a point on a line, specifically either the start or end point.
         * The object holds an x and y coordinates along with a graphic used to indicate itself.
         */
class Point {
    constructor(x, y,windowContainer) {
        this.x = x;
        this.y = y;
        this.image = new PIXI.Graphics();
        this.image.interactive = true;
        this.image.buttonMode = true;
        this.image.beginFill(0x000070);
        this.image.drawRect(x - 5, y - 5, 10, 10);
        this.image.endFill();
        var polyPts;
        polyPts = [x - 5, y - 5, x - 5, y + 5, x + 5, y + 5, x + 5, y - 5];
        this.image.hitArea = new PIXI.Polygon(polyPts);
        windowContainer.addChild(this.image);
        this.owner = -1;
    }
    /**
     * Used to move the given point to a new location. It starts off by clearing its current
     * image, then sets its new coordinates, and finally resets its image with the new
     * coordinates
     * @param nX the new x coordinate
     * @param nY the new y coordinate
     */
    changeLocation(nX, nY) {
        this.clearImage();
        this.x = nX;
        this.y = nY;
        this.resetImage(windowContainer);
    }

    /**
     * This clears the image graphic of all of its content 
     */
    clearImage() {
        this.image.clear();
        this.image.interactive = false;
        this.image.buttonMode = false;
    }
    /**
     * Typically used after the clearImage function, this allows the object to draw itself again 
     * where ever the coordiantes are located.
     */
    resetImage(windowContainer) {
        this.image.beginFill(0x000070);
        this.image.drawRect(this.x - 5, this.y - 5, 10, 10);
        this.image.endFill();
        var polyPts;
        polyPts = [this.x - 5, this.y - 5, this.x - 5, this.y + 5, this.x + 5, this.y + 5, this.x + 5, this.y - 5];
        this.image.hitArea = new PIXI.Polygon(polyPts);
        windowContainer.addChild(this.image);
        this.image.interactive = true;
        this.image.buttonMode = true;
    }

    setOwner(line) {
        this.owner = line
    }
}