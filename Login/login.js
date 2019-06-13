function startLoginPage() {
    var chooseProjectPage = new QuestionPage({
        questionTitle: 'Choose your project:',
        availableOptions: [
            {
                content: 'new project..', onClick: function () {
                    chooseProjectPage.clear();
                    proficiencyPage.display(app.stage);
                }
            }
        ],
        unavailableOptions: []
    });

    var proficiencyPage = new QuestionPage({
        questionTitle: 'Choose your proficiency:',
        availableOptions: [
            {
                content: 'Negligible', onClick: function () {
                    proficiencyPage.clear();
                    materialTypePage.display(app.stage);
                }
            }
        ],
        unavailableOptions: ['Moderate', 'Expert']
    });

    var materialTypePage = new QuestionPage({
        questionTitle: 'What material(s) are you investigating',
        availableOptions: [
            {
                content: 'Generate bar code', onClick: function () {
                    materialTypePage.clear();
                    scientificObjectivePage.display(app.stage);
                }
            }
        ],
        unavailableOptions: ['Ceramics', 'Metals', 'Other']
    });

    var scientificObjectivePage = new QuestionPage({
        questionTitle: 'What is your scientific objective?',
        availableOptions: [{
            content: 'Grain boundary structure/chemistry'
        }],
        unavailableOptions: ['identify second phases', 'search for rare events', 'Other']
    })
    chooseProjectPage.display(app.stage);

    // proficiencyPage.display(app.stage);

}