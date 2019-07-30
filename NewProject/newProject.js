/*
TODO: Make textStyle in captionFactory customizable
TODO: change fontSize according to hexagon size
TODO: click on last hexagon to go back
TODO: Text don't go off the hexagon
TODO: Cancel
 */
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
        let w = app.screen.width;
        let numPrompts = 4;
        let prompts = [];
        let contents = [];
        let returnIcons = [];
        
        contents.push(new QuestionPage({
            questionTitle: 'Choose your proficiency:',
            availableOptions: [{
                content: 'Negligible',
                onClick: shiftToNextPrompt
            }, {
                /*
                TODO: Only the descendent QuestionPages of the first options are known. These are simply displaying the same things. The actual contents are to be designed.
                */
                content: 'Moderate',
                onClick: shiftToNextPrompt
            }, {
                content: "Expert",
                onClick: shiftToNextPrompt
            }],
            fill: Hexagon.getHexColor("white"),
            fontSize: 23
        }));
        contents.push(new QuestionPage({
            questionTitle: 'What material(s) are you \ninvestigating',
            availableOptions: [{
                content: 'Generate bar code',
                onClick: shiftToNextPrompt
            }],
            choices: ['Ceramics', 'Metals', 'Other'],
            fill: Hexagon.getHexColor("white"),
            fontSize: 23
        }));
        contents.push(new QuestionPage({
            questionTitle: 'What is your scientific objective?',
            availableOptions: [{
                content: 'Grain boundary structure/chemistry',
                onClick: shiftToNextPrompt
            }],
            unavailableOptions: ['identify second phases', 'search for rare events', 'Other'],
            fill: Hexagon.getHexColor("white"),
            fontSize: 23
        }));
        contents.push(new QuestionPage({
            questionTitle: 'To optimize the data acquisition \nworkflow, you may want to ...',
            availableOptions: [{
                content: 'confirm',
                onClick: returnToAllProjects
            }],
            choices: ['Operate microscope at 200 kV', 'Set probe current to 150 pA', 'Set detector collection angles', 'Etc.'],
            fill: Hexagon.getHexColor("white"),
            fontSize: 23
        }));
    
        let hwidth = 0.4 * h;
        let exposedWidth = 0.15 * h;
        let gap = w / 2 - hwidth - exposedWidth;
        let centerNext = {x: w / 2, y: h / 2};
        
        for (let i = 0; i < numPrompts; i++) {
            prompts.push(new Hexagon(centerNext, hwidth));
            centerNext = prompts[i].getCenterRight(gap);
            prompts[i].graphics.lineStyle(2, 0x414141, 3);
            prompts[i].draw(Hexagon.getHexColor("transparent"), 0);
            
            contents[i].display(prompts[i].container);
            
            returnIcons.push(makeReturnIcon(hwidth, exposedWidth));
            returnIcons[i].interactive = true;
            returnIcons[i].buttonMode = true;
            returnIcons[i].on('pointerdown', function(){ shiftToLastPrompt(i); });
            prompts[i].container.addChild(returnIcons[i]);
        }
        
        function makeReturnIcon(hwidth, exposedWidth){
            let g = new PIXI.Graphics();
            g.beginFill(0x414141, 0.6);
            g.lineStyle(2, 0x414141, 3);
            g.drawPolygon([  // every two number represents a coordinate of a point on the path of this hexagon
                hwidth * 2 - 0.85 * exposedWidth, hwidth / Hexagon.SQRT3 * 2,  // Left vertex
                hwidth * 2 - 0.15 * exposedWidth, hwidth / Hexagon.SQRT3 + exposedWidth * 0.15,  // Upper right vertex
                hwidth * 2 - 0.15 * exposedWidth, hwidth / Hexagon.SQRT3 * 3 - exposedWidth * 0.15// Lower right vertex
                // hwidth * 2, radius / 2,
                // hwidth * 2, radius * 3 / 2,
                // hwidth, radius * 2,
                // 0, radius * 3 / 2,
                // 0, radius / 2
            ]);
            g.endFill();
            g.visible = false;
            return g;
            
        }
    
        function shiftToNextPrompt(){
            for (let i = 0; i < numPrompts; i++) {
                positionTransform(prompts[i].container.x - (gap + hwidth * 2), prompts[i].container.y, prompts[i].container, 10);  // Customize
                // prompts[i].container.x -= (gap + hwidth * 2);  // Customize
            }
            returnIcons[NewProject.currentHexagon].visible = true;
            NewProject.currentHexagon ++;
        }
    
        function shiftToLastPrompt(clickedIndex){
            console.log(clickedIndex + " " + NewProject.currentHexagon);
            if(clickedIndex === NewProject.currentHexagon - 1){
                for (let i = 0; i < numPrompts; i++) {
                    positionTransform(prompts[i].container.x + (gap + hwidth * 2), prompts[i].container.y, prompts[i].container, 10);  // Customize
                    // prompts[i].container.x += (gap + hwidth * 2);  // Customize
                }
                NewProject.currentHexagon --;
                returnIcons[NewProject.currentHexagon].visible = false;
            }
        }
    }
    
    /*
    Goes back to All Projects Page
     */
    static createCancelButton(){
        // let h = app.screen.height;
        let cancel = new PIXI.Text("Cancel", {fill: Hexagon.getHexColor("white")});
        cancel.interactive = true;
        cancel.onClick = returnToAllProjects;
        cancel.on('pointerdown', onButtonDown)
                .on('pointerup', onButtonUp)
                .on('pointerupoutside', onButtonUp)
                .on('pointerover', onButtonOver)
                .on('pointerout', onButtonOut);
        return cancel;
    }
    
    static startProjects(){
        NewProject.createBg();
        NewProject.createNewProjectPrompt();
        blurTransform(app.stage, 0.5, 5)
        // NewProject.createWindowHexagons();
    }
}

NewProject.currentHexagon = 0;

function returnToAllProjects(){
    currentActivity = activityArray[1];
    updateActivity();
}
