
// creates new projects for project selection screen
class Project {

    constructor(name, imagePath, count) {
        this.container = new PIXI.Container();
        let infoContainer = new PIXI.Container();

        // get which level will the project be 
        var verticalShift = Math.floor(count/3);
        // initial hex is the initially drawn hex in top left corner of hex grid (see a_drawHex.js)
        let x = initialHex.x + 485 + (count%3)*417;
        let y = initialHex.getCenterLowerRight(0).y + verticalShift*253;
        //edited to adjust the position
        
        // bottom left hexagon of each project with general info (not extra info)
        this.infoHex = new Hexagon({x, y}, 0, 80);
        this.infoHex.graphics.alpha = 0.8;
        this.infoHex.draw(0x909090);
        app.stage.removeChild(this.infoHex.container);
        this.container.addChild(this.infoHex.container);

        // background image used to "preview" the project
        var image = new PIXI.Sprite.from(imagePath);
            image.width = 700;
            image.height = 550;
            image.position.x = this.infoHex.x - 400;
            image.position.y = this.infoHex.y - 300;
        this.container.addChild(image);

        // this graphics shape will mask the background image
        var shape = new PIXI.Graphics();
            shape.beginFill(0x000000);
            shape.drawPolygon([69.282,0, 138.564,40, 207.846,0, 277.128,40, 277.128,120, 207.846,160, 207.846,240, 138.564,280, 69.282,240, 69.282,160, 0,120, 0,40]);
            shape.endFill();
            shape.x = 198 + (count%3)*417;
            shape.y = this.infoHex.y - 200;
        image.mask = shape;
        this.container.addChild(shape);

        // this graphics element will include the extra information (last edited, institution, etc)
        var infoShape = new PIXI.Graphics();
            infoShape.beginFill(0x000000);
            infoShape.drawPolygon([69.282,0, 138.564,40, 207.846,0, 277.128,40, 277.128,120, 207.846,160, 207.846,240, 138.564,280, 69.282,240, 69.282,160, 0,120, 0,40]);
            infoShape.endFill();
            infoShape.x = shape.x;
            infoShape.y = shape.y; //app.screen.height/3.5 - 80;
            infoShape.alpha = 0.5;
        infoContainer.addChild(infoShape);

        // this is a border drawn over the project when hovered over
        var shapeOutline = new PIXI.Graphics();
            shapeOutline.lineStyle(1.5, 0x909090, 1.5);
            shapeOutline.drawPolygon([69.282,0, 138.564,40, 207.846,0, 277.128,40, 277.128,120, 346.41,160, 346.41,240, 277.128,280, 207.846,240, 138.564,280, 69.282,240, 69.282,160, 0,120, 0,40]);
            shapeOutline.x = infoShape.x;
            shapeOutline.y = infoShape.y;
        infoContainer.addChild(shapeOutline);

        // text included in info Shape
        let detailtxt = "Last Edited\n\n         Whitaker Laboratory\n         Lehigh University\n         06/25/19\n         13:23"
        if(count !=0){
            //display backend project 
            detailtxt = project_list[count-1][1]["name"] +"\n\n         " + project_list[count-1][1]["institution"]+ "\n         "+ project_list[count-1][1]["date_creation"] + "\n         pid: "+ project_list[count-1][1]["pid"]
        }
        let details = new PIXI.Text(detailtxt, {fill: "#ffffff", fontFamily: "Arial", fontWeight: "bold", fontSize: 14, lineHeight: 20});
            details.position.x = shapeOutline.x + 50;
            details.position.y = shapeOutline.y + 60;
        infoContainer.addChild(details);

        let titleMetrics = PIXI.TextMetrics.measureText(name, a_projecttitlestyle);
        let title = new PIXI.Text(name, a_projecttitlestyle);
            title.position.x = this.infoHex.x - titleMetrics.width/2;
            title.position.y = this.infoHex.y - 32;
        this.container.addChild(title);

        // select button specific to each project to allow for customizable functionality (access with myProject.select.on('pointerdown', ...); )
        this.select = new PIXI.Graphics();
            this.select.beginFill(0xFFFFFF);
            this.select.drawRoundedRect(this.infoHex.x-46,this.infoHex.y+10, 92,22, 2);
            this.select.endFill();
            //this.select.alpha = 0.75;
            this.select.buttonMode = true;
            this.select.interactive = true;
        this.container.addChild(this.select);
        //app.stage.addChild(select);

        // text on select button
        let selectTxt = "Open";
        let selectMetrics = PIXI.TextMetrics.measureText(selectTxt, a_projectselectstyle);
        let selectTitle = new PIXI.Text(selectTxt, a_projectselectstyle);
            selectTitle.position.x = this.infoHex.x - selectMetrics.width/2;
            selectTitle.position.y = this.infoHex.y+11;
        this.container.addChild(selectTitle);

        // only display infocontainer when hovering over project shape
        infoContainer.visible = false;
        this.container.addChild(infoContainer);
        app.stage.addChild(this.container);
        //this.container.alpha = 0.8;
        this.container.interactive = true;
        this.container.on('mouseover', function(){ infoContainer.visible = true;});
        this.container.on('mouseout', function(){ infoContainer.visible = false; });

        // scale and move this project's container if isTouch is true
        if (isTouch) {
            this.container.scale.x = this.container.scale.y = 0.3375;
            this.container.x = this.container.x + 461;
            this.container.y = this.container.y + 86;

            infoContainer.scale.x = infoContainer.scale.y = 0.3375;
            infoContainer.x = infoContainer.x + 461;
            infoContainer.y = infoContainer.y + 86;
        }





    }

    newProject() {
        
        this.newProjectContainer = new PIXI.Container();

        let newP = new Hexagon({x:this.infoHex.getCenterUpperRight(279).x, y: this.infoHex.getCenterUpperRight(0).y}, 0, 80);
        newP.graphics.lineStyle(3, 0x909090, 3);
        newP.graphics.buttonMode = true;
        newP.graphics.interactive = true;
        newP.graphics.on('mouseover', function(){ plusIcon.alpha = 0.8; });
        newP.graphics.on('mouseout', function(){ plusIcon.alpha = 0.6; });
        newP.graphics.on('pointerdown', a_newPSelect.bind(this));
        newP.draw(0x909090, 0.8);
        app.stage.removeChild(newP.container);
        this.newProjectContainer.addChild(newP.container);

        let plusIcon = new PIXI.Sprite.from("Images/plus-icon.png");
        plusIcon.width = 65;
        plusIcon.height = 65;
        plusIcon.position.x = newP.x-33;
        plusIcon.position.y = newP.y-33;
        plusIcon.alpha = 0.6;
        this.newProjectContainer.addChild(plusIcon);

        if (isTouch) {
            this.newProjectContainer.scale.x = this.newProjectContainer.scale.y = 0.3375;
            this.newProjectContainer.x = this.newProjectContainer.x + 461;
            this.newProjectContainer.y = this.newProjectContainer.y + 86;
        }
        app.stage.addChild(this.newProjectContainer);

    }









}

function a_newPSelect()
{
    currentActivity = activityArray[3];
    moveLeftProjectSelection()
    setTimeout('updateActivity()', 200); 
}