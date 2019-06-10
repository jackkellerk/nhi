
class Tilting{
    //Globals
    static optionContainer = new PIXI.Container();
    static sprites = [];
    static metalsprite;
    
    static pixiSetup() {
        this.metalsprite = new PIXI.Sprite.from('Images/sinteredMetal.png');
        this.metalsprite.anchor.set(0.5);
        this.metalsprite.scale.set(2);
        app.stage.addChild(this.metalsprite);
    }
    
    static onClickDropdownBtn(){
        Tilting.optionContainer.visible = !Tilting.optionContainer.visible;
    }
    
    static createTiltingDropdown(){
        let dropdownBtn = Spectrum.createButton(20,app.screen.height-80, 60, 60,
                this.onClickDropdownBtn);
        dropdownBtn.buttonMode = true;
        let dropdownContainer = new PIXI.Container();
        dropdownContainer.addChild(dropdownBtn);
        
        let optionBtns = [];
        let options = ["red", "green", "blue", "original"];
        let texts = [];
        for (let i = 0; i < 4; i++) {
            optionBtns.push(Spectrum.createButton(85 + i*65, app.screen.height-80, 60, 60,
                    function(){Spectrum.onClickColorOptions(options[i])}));
            optionBtns[i].buttonMode = true;
            texts.push(new PIXI.Text(options[i]));
            texts[i].style = {align: "center"};
            optionBtns[i].addChild(texts[i]);
            this.optionContainer.addChild(optionBtns[i]);
        }
        this.optionContainer.visible = false;
        dropdownContainer.addChild(this.optionContainer);
        
        app.stage.addChild(dropdownContainer);
    }
    
    static startTilting(){
        this.pixiSetup();
        this.createTiltingDropdown();
    
    }
}