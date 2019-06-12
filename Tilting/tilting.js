
class Tilting{
    static bgContainer = new PIXI.Container();
    static sprites = [];
    static current = 0;
    static TOTAL = 4;
    
    static rotateRight(){
        Tilting.bgContainer.removeChildAt(0);
        if(Tilting.current < Tilting.TOTAL - 1){
            Tilting.current++;
        }else{
            Tilting.current = 0;
        }
        Tilting.bgContainer.addChild(Tilting.sprites[Tilting.current]);
    }
    
    static rotateLeft(){
        Tilting.bgContainer.removeChildAt(0);
        if(Tilting.current > 0){
            Tilting.current--;
        }else{
            Tilting.current = Tilting.TOTAL - 1;
        }
        Tilting.bgContainer.addChild(Tilting.sprites[Tilting.current]);
    }
    
    static pixiSetup() {
        for (let i = 0; i < 4; i++) {
            Tilting.sprites.push(new PIXI.Sprite.from(`Images/tilt${i}.png`));
            Tilting.sprites[i].anchor.set(0.5);
        }
        Tilting.bgContainer.addChild(Tilting.sprites[Tilting.current]);
        app.stage.addChild(Tilting.bgContainer);
    }
    
    static createTiltingButtons(){
        let rotateContainer = new PIXI.Container();
        let onclickFuncs = [Tilting.rotateLeft, Tilting.rotateRight];
        for (let i = 0; i < 2; i++) {
            let icon = new PIXI.Sprite.from(`Images/rotate${i}.png`);
            let tiltingBtn = Spectrum.createButton(20 + i*65, app.screen.height-80, 60, 60,
                    onclickFuncs[i], icon);
            tiltingBtn.buttonMode = true;
            rotateContainer.addChild(tiltingBtn);
        }
        app.stage.addChild(rotateContainer);
    }
    
    static startTilting(){
        Tilting.pixiSetup();
        Tilting.createTiltingButtons();
    }
}