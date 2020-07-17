function startLoginPage() {
    var chooseProjectPage = new QuestionPage({
        questionTitle: 'Choose your project:',
        availableOptions: [{
            content: 'new project..',
            onClick: function () {
                chooseProjectPage.clear();
                proficiencyPage.display(app.stage);
            }
        }]
    });

    var proficiencyPage = new QuestionPage({
        questionTitle: 'Choose your proficiency:',
        availableOptions: [{
            content: 'Negligible',
            onClick: function () {
                proficiencyPage.clear();
                materialTypePage.display(app.stage);
            }
        }],
        unavailableOptions: ['Moderate', 'Expert']
    });

    var materialTypePage = new QuestionPage({
        questionTitle: 'What material(s) are you investigating',
        availableOptions: [{
            content: 'Generate bar code',
            onClick: function () {
                materialTypePage.clear();
                scientificObjectivePage.display(app.stage);
            }
        }],
        choices: ['Ceramics', 'Metals', 'Other']
    });

    var scientificObjectivePage = new QuestionPage({
        questionTitle: 'What is your scientific objective?',
        availableOptions: [{
            content: 'Grain boundary structure/chemistry',
            onClick: function () {
                scientificObjectivePage.clear();
                otherOptions.display(app.stage);
            }
        }],
        unavailableOptions: ['identify second phases', 'search for rare events', 'Other']
    })

    var otherOptions = new QuestionPage({
        questionTitle: 'To optimize the data acquisition workflow, you may want to ...',
        availableOptions: [{
            content: 'confirm'
        }],
        choices: ['Operate microscope at 200 kV', 'Set probe current to 150 pA', 'Set detector collection angles', 'Etc.']
    });

    chooseProjectPage.display(app.stage);

    uploadImage();

    // var checkbox = new Choice({content: '123'});

    // app.stage.addChild(checkbox.optionContainer);
}