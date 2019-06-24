
class NewProject{
    
    static createWindowHexagons(){
        let h = app.screen.height;
        let radius = h * 0.7 / 3.5;
        let hwidth = radius / 2 * Math.sqrt(3);
        let center0 = {x: 0.3 * h + hwidth, y: 0.2 * h + radius};
        let windowHexagons = [];
        for (let i = 0; i < 3; i++) {
            windowHexagons.push(new Hexagon(center0, null, radius));
            windowHexagons[i * 2].draw(Hexagon.getHexColor("purple"));
            windowHexagons.push(new Hexagon(windowHexagons[i*2].getCenterLowerRight(0.005 * h), null, radius));
            windowHexagons[i * 2 + 1].draw(Hexagon.getHexColor("purple"));
            center0 = windowHexagons[i * 2].getCenterRight(0.005 * h);
        }
        // h1.graphics.lineStyle(2, 0x414141, 3);
        
        // const
    }
    
    static createBg(){
        const gradTexture = createGradTexture();
        const sprite = new PIXI.Sprite(gradTexture);
        sprite.width = window.innerWidth;
        sprite.height = window.innerHeight;
        app.stage.addChild(sprite);
    }
    
    static createNewProjectPrompt(){
        let h = app.screen.height;
        let prompt = new Hexagon({x: app.screen.width/2, y: h/2}, 0.4 * h);
        prompt.graphics.lineStyle(2, 0x414141, 3);
        prompt.draw(Hexagon.getHexColor("transparent"), 0);
    }
    
    static startProjects(){
        NewProject.createBg();
        NewProject.createNewProjectPrompt();
        // NewProject.createWindowHexagons();
    }
}