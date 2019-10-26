//Factory design pattern for sentences
//constructors below SHOULD NOT be directly called.
// TODO: Rewrite the fake classes into ES6 classes. Thus let newProject shiftToNextPrompt to be able to clear the selected choices.
function Title(options) {
    this.content = options.content;
    // console.log(this.content);
    this.style = new PIXI.TextStyle({
        fontSize: options.fontSize || 36,
        fontFamily: options.fontFamily || 'Arial Black',
        fontVariant: options.fontVariant || 'small-caps',
        fill: options.fill || Hexagon.getHexColor("black")
    });
}
Title.prototype.display = function (container) {
    this.text = new PIXI.Text(this.content, this.style);
    this.text.x = container.height * 0.05;
    this.text.y = container.height * 0.28;
    container.addChild(this.text);
    return {x: this.text.x, y: this.text.y + this.text.height};
};

Title.prototype.clear = function () {
    this.text.visible = false;
};



function AvailableOption(options) {
    this.content = options.content;
    this.style = new PIXI.TextStyle({
        fill: options.fill || "#2d2d2d",
        fontSize: options.fontSize || 36
    });

    this.text = new PIXI.Text(this.content, this.style);
    this.text.buttonMode = true;
    this.text.interactive = true;
    // this.text.onClick = options.onClick;
    this.text.on('pointerdown', onButtonDown)
            .on('pointerdown', function(){ onClickAvailableOption(options.content); })
        .on('pointerup', onButtonUp)
        .on('pointerupoutside', onButtonUp)
        .on('pointerover', onButtonOver)
        .on('pointerout', onButtonOut);
    
    function onClickAvailableOption(content){
        clickedOption = content;
        
        options.onClick();
    }
}

AvailableOption.prototype.display = function (container, options) {

    this.text.x = options.x || 50;
    this.text.y = options.y;
    container.addChild(this.text);
    return this.text.height;
};

AvailableOption.prototype.clear = function () {
    this.text.visible = false;
};

function UnavailableOption(options) {
    this.content = options.content;
    this.style = new PIXI.TextStyle({
        fill: options.fill || "#777777",
        fontSize: options.fontSize || 36
    });

    this.text = new PIXI.Text(this.content, this.style);
}

UnavailableOption.prototype.display = function (container, options) {

    this.text.x = options.x || 50;
    this.text.y = options.y;
    container.addChild(this.text);
    return this.text.height;
};

UnavailableOption.prototype.clear = function () {
    this.text.visible = false;
};



const checkboxCheckedTexture = new PIXI.Texture.from('Images/checkbox_checked_white.png');
const checkboxCheckedSelectedTexture = new PIXI.Texture.from('Images/checkbox_checked_selected.png');
const checkboxUncheckedTexture = new PIXI.Texture.from('Images/checkbox_unchecked_white.png');
const checkboxUncheckedSelectedTexture = new PIXI.Texture.from('Images/checkbox_unchecked_selected.png');


function Choice(options) {
    let text = new PIXI.Text(options.content, new PIXI.TextStyle({
        fill: options.fill || "#2d2d2d",
        fontSize: options.fontSize || 30
    }));
    this.optionContainer = new PIXI.Container();
    this.optionContainer.content = options.content;
    text.x = 40;
    this.optionContainer.buttonMode = true;
    this.optionContainer.interactive = true;
    // this.optionContainer.on('pointerdown', checkboxOnPointerDown)
    //         .on('pointerup', function(){ checkboxOnPointerUp(options.content); })
    //         .on('pointerupoutside', checkboxOnPointerUp)
    //     .on('pointerover', checkboxOnPointerOver)
    //     .on('pointerout', checkboxOnPointerOut);
    this.optionContainer.on('pointerdown', checkboxOnPointerDown)
            .on('pointerup', checkboxOnPointerUp)
            .on('pointerupoutside', checkboxOnPointerUp)
            .on('pointerover', checkboxOnPointerOver)
            .on('pointerout', checkboxOnPointerOut);
    this.optionContainer.isChecked = false;
    let checkbox = new PIXI.Sprite(checkboxUncheckedTexture);
    this.optionContainer.addChild(checkbox);
    this.optionContainer.addChild(text);
    checkbox.width = 30;
    checkbox.height = 30;
    checkbox.y = 2;
    // checkbox.tint = 0xb3b3b3;
    checkbox.interactive = true;
    
    function checkboxOnPointerDown() {
        this.isdown = true;
    }
    
    // function checkboxOnPointerUp(content) {
    //     this.isdown = false;
    //     if (this.isOver) {
    //         if (this.isChecked) {
    //             checkbox.texture = checkboxUncheckedSelectedTexture;
    //             this.isChecked = false;
    //             selectedChoices = selectedChoices.filter(e => e !== content);  // remove content from the array
    //         } else {
    //             checkbox.texture = checkboxCheckedSelectedTexture;
    //             this.isChecked = true;
    //             selectedChoices.push(content);
    //         }
    //     } else {
    //         if (this.isChecked) {
    //             checkbox.texture = checkboxCheckedTexture;
    //             selectedChoices = selectedChoices.filter(e => e !== content);  // remove content from the array
    //         } else {
    //             checkbox.texture = checkboxUncheckedTexture;
    //             selectedChoices.push(content);
    //         }
    //     }
    // }
    function checkboxOnPointerUp() {
        this.isdown = false;
        if (this.isOver) {
            if (this.isChecked) {
                checkbox.texture = checkboxUncheckedSelectedTexture;
                this.isChecked = false;
                selectedChoices = selectedChoices.filter(e => e !== this.content);  // remove content from the array
                console.log(`removed ${this.content}`)
            } else {
                checkbox.texture = checkboxCheckedSelectedTexture;
                this.isChecked = true;
                selectedChoices.push(this.content);
                console.log(`Added ${this.content}`)
            }
        } else {
            if (this.isChecked) {
                checkbox.texture = checkboxCheckedTexture;
                selectedChoices = selectedChoices.filter(e => e !== this.content);  // remove content from the array
                console.log(`removed ${this.content}`)
            } else {
                checkbox.texture = checkboxUncheckedTexture;
                selectedChoices.push(this.content);
                console.log(`Added ${this.content}`)
            }
        }
    }
    
    function checkboxOnPointerOver() {
        this.isOver = true;
        if (this.isdown) {
            return;
        }
        if (this.isChecked) {
            checkbox.texture = checkboxCheckedSelectedTexture;
        } else {
            checkbox.texture = checkboxUncheckedSelectedTexture;
        }
    }
    
    function checkboxOnPointerOut() {
        this.isOver = false;
        if (this.isdown) {
            return;
        }
        if (this.isChecked) {
            checkbox.texture = checkboxCheckedTexture;
        } else {
            checkbox.texture = checkboxUncheckedTexture;
        }
    }

}

Choice.prototype.display = function (container, options) {
    this.optionContainer.x = options.x || 50;
    this.optionContainer.y = options.y;
    container.addChild(this.optionContainer);
    return this.optionContainer.height;
};

Choice.prototype.clear = function () {
    this.optionContainer.visible = false;
};



function QuestionPage(options) {
    this.questionTitle = new Title({
        content: options.questionTitle,
        fill: options.fill,
        fontSize: options.fontSize
    });
    this.availableOptions = [];
    if ('availableOptions' in options) {
        options.availableOptions.forEach(answer => {
            // console.log(answerOption.answer)
            this.availableOptions.push(new AvailableOption({
                content: answer.content,
                onClick: answer.onClick,
                fill: options.fill,
                fontSize: options.fontSize
            }));
        });
    }
    this.unavailableOptions = [];
    if ('unavailableOptions' in options) {
        options.unavailableOptions.forEach(answer => {
            // console.log(answerOption.answer)
            this.unavailableOptions.push(new UnavailableOption({
                content: answer,
                fill: options.fill,
                fontSize: options.fontSize
            }));
        });
    }
    this.choices = [];
    if('choices' in options){
        options.choices.forEach(choice => {
            // console.log(answerOption.answer)
            this.choices.push(new Choice({
                content: choice,
                fill: options.fill,
                fontSize: options.fontSize
            }));
        });
    }
}

QuestionPage.prototype.display = function (container) {
    let h = container.height;
    let position = this.questionTitle.display(container);
    let x = position.x + 0.03 * h;
    let y = position.y + 0.04 * h;
    // console.log(height);
    this.availableOptions.forEach(answer => {
        y += answer.display(container, { x: x, y: y }) + 0.02 * h;
        // console.log(height);
    });
    this.unavailableOptions.forEach(answer => {
        y += answer.display(container, { x: x, y: y }) + 0.02 * h;
        // console.log(height);
    });
    
    this.choices.forEach(choice => {
        y += choice.display(container, { x: x, y: y }) + 0.02 * h;
        // console.log(height);
    });
};

QuestionPage.prototype.clear = function () {
    this.questionTitle.clear();
    this.availableOptions.forEach(answer => {
        answer.clear();
    });
    this.unavailableOptions.forEach(answer => {
        answer.clear();
    });
    
    this.choices.forEach(choices => {
        choices.clear();
    })
};
function onButtonDown() {
    this.isdown = true;
    this.style.fill = 0xcccccc;
}

function onButtonUp() {
    this.isdown = false;
    if (this.isOver) {
        this.style.fill = 0x808080;
        // this.onClick();
    } else {
        this.style.fill = 0xffffff;
    }
}

function onButtonOver() {
    this.isOver = true;
    if (this.isdown) {
        return;
    }
    this.style.fill = 0x808080;
}

function onButtonOut() {
    this.isOver = false;
    if (this.isdown) {
        return;
    }
    this.style.fill = 0xffffff;
}
