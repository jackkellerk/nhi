let popupTitleStyle;
let popupButtonStyle;

class PopupRect{
    static get preset_h(){
        return app.screen.height;
    }

    constructor(titletxt, lefttxt)
    {
        popupTitleStyle = new PIXI.TextStyle({fontFamily: 'Arial', fontSize: 20, fontType: 'bold', fill: 0xffffff, miterLimit: 4, strokeThickness: 2, wordWrap: false});
        popupButtonStyle = new PIXI.TextStyle({fontFamily: 'Arial', fontSize: 17, fill: 0x000000, letterSpacing: 1.2});

        let metrics1 = PIXI.TextMetrics.measureText(titletxt, popupTitleStyle);
        this.width = metrics1.width + 30;
        if (this.width > (app.screen.width/2.5)) {
            this.width = app.screen.width/2.5;
            popupTitleStyle = new PIXI.TextStyle({fontFamily: 'Arial', fontSize: 20, fontType: 'bold', fill: 0xffffff, miterLimit: 4, strokeThickness: 2, wordWrap: true, align: "center", wordWrapWidth: this.width - 30});
        }
        else if (this.width < (app.screen.width/3)) {
            this.width = app.screen.width/3;
        }
        
        // re-assign Text metrics in case they changed
        metrics1 = PIXI.TextMetrics.measureText(titletxt, popupTitleStyle);
        this.height = 180 + metrics1.height;

        this.x_val = (app.screen.width - this.width)/2;
        this.y_val = (app.screen.height - this.height)/2;
        this.titletxt = titletxt;
        this.lefttxt = lefttxt;

        this.container = new PIXI.Container();
        this.graphics = new PIXI.Graphics();
        this.close = new PIXI.Sprite.from("Images/close-icon.png");
        this.leftButton = new PIXI.Graphics();
        this.rightButton = new PIXI.Graphics();

    }

    /*
    Customize , i.e. lineStyle, before call this function.
    fill: color used in Graphics.beginFill(fill)
     */
    drawPopup(fill=0x7F7F7F, roundedness=2){
        this.graphics.beginFill(fill);
        // this.graphics.lineStyle(2, 0x414141, 3);
        this.graphics.drawRoundedRect(
            this.x_val, this.y_val,     // x,y coordinates
            this.width, this.height,    // width, height
            roundedness                 // roundedness of corners
        );
        this.graphics.endFill();
        this.container.addChild(tintBg);
        this.container.addChild(this.graphics);

        let titleTextMetrics = PIXI.TextMetrics.measureText(this.titletxt, popupTitleStyle);
        let titleText = new PIXI.Text(this.titletxt, popupTitleStyle);
            titleText.x = this.x_val + (this.width - titleTextMetrics.width)/2;
            titleText.y = this.y_val + this.height/2 - titleTextMetrics.height - 10;
        this.container.addChild(titleText);

        this.close.height = 25;
        this.close.width = 25;
        this.close.x = this.x_val + this.width - 33;
        this.close.y = this.y_val + 7;
        this.close.buttonMode = true;
        this.close.alpha = 0.4;
        this.container.addChild(this.close);

        this.leftButton.lineStyle(2, 0xFFFFFF, 2);
        this.leftButton.beginFill(0xFFFFFF);
        this.leftButton.drawRoundedRect(this.x_val+(this.width/6)-20,this.y_val+this.height-80, this.width/3,this.height/5.5, roundedness);
        this.leftButton.endFill();
        this.leftButton.buttonMode = true;
        // customize '.on' functionality yourself
        this.leftButton.alpha = 0.7;
        this.container.addChild(this.leftButton);

        let leftTextMetrics = PIXI.TextMetrics.measureText(this.lefttxt, popupButtonStyle);
        let leftText = new PIXI.Text(this.lefttxt, popupButtonStyle);
            leftText.x = this.x_val + (this.width/6) - 20 + (this.width/3 - leftTextMetrics.width)/2;
            leftText.y = this.y_val + this.height - 80 + (this.height/5.5 - leftTextMetrics.height)/2;
        this.container.addChild(leftText);

        this.rightButton.lineStyle(2, 0xFFFFFF, 2);
        this.rightButton.beginFill(0xFFFFFF);
        this.rightButton.drawRoundedRect(this.x_val+(0.5*this.width)+20,this.y_val+this.height-80, this.width/3,this.height/5.5, roundedness);
        this.rightButton.endFill();
        this.rightButton.buttonMode = true;
        this.rightButton.alpha = 0.7;
        this.container.addChild(this.rightButton);

        let rightTextMetrics = PIXI.TextMetrics.measureText("Cancel", popupButtonStyle);
        let rightText = new PIXI.Text("Cancel",  popupButtonStyle);
        rightText.x = this.x_val + (this.width/2) + 20 + (this.width/3 - rightTextMetrics.width)/2;
        rightText.y = this.y_val + this.height - 80 + (this.height/5.5 - rightTextMetrics.height)/2;
        this.container.addChild(rightText);



    }





    
}