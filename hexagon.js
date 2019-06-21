/*
PIXI hexagon
 */
class Hexagon{
    /*
    center: {x, y}, a Javascript object, coordinate of center
    hwidth: half width
     */
    static SQRT3 = MATH.sqrt(3);
    constructor(center, hwidth){
        this.center = center;
        this.x = center.x;
        this.y = center.y;
        this.hwidth = hwidth;
        this.radius = this.hwidth * 2 / Hexagon.SQRT3;
        this.width = this.hwidth * 2;
        this.height = this.radius * 2;
    }
    
    /*
    The following functions returns the center of the next hexagon assuming the same width/radius as the current one.
     */
    getCenterRight(gap){
        return {
            x: this.x + this.width + gap,
            y: this.y
        };
    }
    
    getCenterLeft(gap){
        return {
            x: this.x - this.width - gap,
            y: this.y
        };
    }
    
    getCenterUpperRight(gap){
        return {
            x: this.x + this.hwidth + gap/2,
            y: this.y + this.hwidth/Hexagon.SQRT3 + gap/2*Hexagon.SQRT3 + this.radius
        };
    }
    getCenterUpperLeft(gap){
        return {
            x: this.x - this.hwidth - gap/2,
            y: this.y + this.hwidth/Hexagon.SQRT3 + gap/2*Hexagon.SQRT3 + this.radius
        };
    }
    getCenterLowerRight(gap){
        return {
            x: this.x + this.hwidth + gap/2,
            y: this.y - this.hwidth/Hexagon.SQRT3 - gap/2*Hexagon.SQRT3 - this.radius
        };
    }
    
    getCenterLowerLeft(gap){
        return {
            x: this.x - this.hwidth - gap/2,
            y: this.y - this.hwidth/Hexagon.SQRT3 - gap/2*Hexagon.SQRT3 - this.radius
        };
    }
    
}