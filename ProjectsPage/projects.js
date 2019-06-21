
class Projects{
    
    static createWindowHexagons(){
        let h1 = new Hexagon({x: app.screen.width/2, y: app.screen.height/2}, 100);
        // h1.graphics.lineStyle(2, 0x414141, 3);
        h1.draw(Hexagon.getHexColor("blue"));
    }
    
    static startProjects(){
        Projects.createWindowHexagons();
    }
}