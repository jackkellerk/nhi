/*
TODO: Make textStyle in captionFactory customizable
TODO: change fontSize according to hexagon size
TODO: Text don't go off the hexagon (auto-wrapping)
 */
class NewProject{
    
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
                content: 'Novice',
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
                }, {
                    content: 'Identify second phases',
                    onClick: shiftToNextPrompt
                }, {
                    content: 'Search for rare events',
                    onClick: shiftToNextPrompt
            }],
            unavailableOptions: ['Other'],
            fill: Hexagon.getHexColor("white"),
            fontSize: 23
        }));
        contents.push(new QuestionPage({
            questionTitle: 'To optimize the data acquisition \nworkflow, you may want to ...',
            availableOptions: [{
                content: 'Confirm',
                onClick: NewProject.goToSources
            }],
            choices: ['Operate microscope at 200 kV', 'Set probe current to 150 pA', 'Set detector collection angles'],
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
            
            newProjectAnswers.push({option: clickedOption, choices: selectedChoices});
            console.log(newProjectAnswers);
            clickedOption = null;
            selectedChoices = [];
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
            
            newProjectAnswers.pop();
            console.log(newProjectAnswers);
        }
    }
    
    static processNewProjectAnswers(){
        let ret = {};
        ret.proficiency = newProjectAnswers[0].option;
        ret.materials = newProjectAnswers[1].choices;
        ret.objective = newProjectAnswers[2].option;
        ret.optimize = newProjectAnswers[3].choices;
        console.log(ret);
        return ret;
    }
    
    static goToSources(){
        newProjectProperties = NewProject.processNewProjectAnswers();
        //postNewProject("new proj", app.screen.width, app.screen.height, newProjectProperties, "Lehigh", [1, 2]);  // An Ajax "POST" call to backend
        
        currentActivity = activityArray[4];
        updateActivity();
    }
    
    static startProjects(){
        NewProject.createBg();
        NewProject.createNewProjectPrompt();
        blurTransform(app.stage, 0.5, 5);
        console.log("Transform blurr");
    }
}

NewProject.currentHexagon = 0;

