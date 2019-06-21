/*
PIXI hexagon
 */
class Hexagon{
    static SQRT3 = Math.sqrt(3);
    
    /*
    center: {x, y}, a Javascript object, coordinate of center
    hwidth: half width
     */
    constructor(center, hwidth=null, radius=null){
        this.center = center;
        this.x = center.x;
        this.y = center.y;
        if(hwidth){
            this.hwidth = hwidth;
            this.radius = this.hwidth * 2 / Hexagon.SQRT3;
        }else if(radius){
            this.radius = radius;
            this.hwidth = radius / 2 * Hexagon.SQRT3;
        }else{
            throw new Error("Either a hwidth or a radius is needed in the constructor of Hexagon.");
        }
        this.width = this.hwidth * 2;
        this.height = this.radius * 2;
        
        // Use this container to add icon and stuff that are with this hexagon
        this.container = new PIXI.Container();
        this.container.x = this.x;
        this.container.y = this.y;
        // Add click handlers to this graphics. Remember to set this.graphics.interactive = true;
        this.graphics = new PIXI.Graphics();
    }
    
    /*
    Customize , i.e. lineStyle, before call this function.
    fill: color used in Graphics.beginFill(fill)
     */
    draw(fill=0xFFFFFF){
        this.graphics.beginFill(fill);
        // this.graphics.lineStyle(2, 0x414141, 3);
        this.graphics.drawPolygon([  // every two number represents a coordinate of a point on the path of this hexagon
            0, 0 - this.radius,
            0 + this.hwidth, 0 - this.radius/2,
            0 + this.hwidth, 0 + this.radius/2,
            0, 0 + this.radius,
            0 - this.hwidth, 0 + this.radius/2,
            0 - this.hwidth, 0 - this.radius/2
        ]);
        this.graphics.endFill();
        this.container.addChild(this.graphics);
        app.stage.addChild(this.container);
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
    
    getCenterLowerRight(gap){
        return {
            x: this.x + this.hwidth + gap/2,
            y: this.y + this.hwidth/Hexagon.SQRT3 + gap/2*Hexagon.SQRT3 + this.radius
        };
    }
    getCenterLowerLeft(gap){
        return {
            x: this.x - this.hwidth - gap/2,
            y: this.y + this.hwidth/Hexagon.SQRT3 + gap/2*Hexagon.SQRT3 + this.radius
        };
    }
    getCenterUpperRight(gap){
        return {
            x: this.x + this.hwidth + gap/2,
            y: this.y - this.hwidth/Hexagon.SQRT3 - gap/2*Hexagon.SQRT3 - this.radius
        };
    }
    
    getCenterUpperLeft(gap){
        return {
            x: this.x - this.hwidth - gap/2,
            y: this.y - this.hwidth/Hexagon.SQRT3 - gap/2*Hexagon.SQRT3 - this.radius
        };
    }
    
    /*
    Helper function. Gets hex representation of a color given color name in string
     */
    static getHexColor(colorStr) {
        let a = document.createElement('div');
        a.style.color = colorStr;
        let colors = window.getComputedStyle( document.body.appendChild(a) ).color.match(/\d+/g).map(function(a){ return parseInt(a,10); });
        document.body.removeChild(a);
        return (colors.length >= 3) ? '0x' + (((1 << 24) + (colors[0] << 16) + (colors[1] << 8) + colors[2]).toString(16).substr(1)) : false;
    }
}