
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
    
        let proficiencyPage = new QuestionPage({
            questionTitle: 'Choose your proficiency:',
            availableOptions: [{
                content: 'Negligible',
                onClick: function () {
                    proficiencyPage.clear();
                    materialTypePage.display(prompt.container);
                }
            }],
            unavailableOptions: ['Moderate', 'Expert'],
            fill: Hexagon.getHexColor("white"),
            fontSize: 23
        });
    
        let materialTypePage = new QuestionPage({
            questionTitle: 'What material(s) are you investigating',
            availableOptions: [{
                content: 'Generate bar code',
                onClick: function () {
                    materialTypePage.clear();
                    scientificObjectivePage.display(prompt.container);
                }
            }],
            choices: ['Ceramics', 'Metals', 'Other'],
            fill: Hexagon.getHexColor("white"),
            fontSize: 23
        });
    
        let scientificObjectivePage = new QuestionPage({
            questionTitle: 'What is your scientific objective?',
            availableOptions: [{
                content: 'Grain boundary structure/chemistry',
                onClick: function () {
                    scientificObjectivePage.clear();
                    otherOptions.display(prompt.container);
                }
            }],
            unavailableOptions: ['identify second phases', 'search for rare events', 'Other'],
            fill: Hexagon.getHexColor("white"),
            fontSize: 23
        });
    
        let otherOptions = new QuestionPage({
            questionTitle: 'To optimize the data acquisition \nworkflow, you may want to ...',
            availableOptions: [{
                content: 'confirm',
                onClick: returnToAllProjects
            }],
            choices: ['Operate microscope at 200 kV', 'Set probe current to 150 pA', 'Set detector collection angles', 'Etc.'],
            fill: Hexagon.getHexColor("white"),
            fontSize: 23
        });
    
        proficiencyPage.display(prompt.container);
        
        let cancel = NewProject.createCancelButton();
        prompt.container.addChild(cancel);
        cancel.x = prompt.container.width / 2 - cancel.width / 2;
        cancel.y = prompt.container.height * 0.8;
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
        // NewProject.createWindowHexagons();
    }
}

function returnToAllProjects(){
    currentActivity = activityArray[1];
    updateActivity();
}