//Factory design pattern for sentences
//constructors below SHOULD NOT be directly called.
function Title(options) {
    this.content = options.content;
    // console.log(this.content);
    this.style = new PIXI.TextStyle({
        fontSize: options.fontSize || 36,
        fontFamily: options.fontFamily || 'Arial Black',
        fontVariant: options.fontVariant || 'small-caps'
    });
}
Title.prototype.display = function (container) {
    this.text = new PIXI.Text(this.content, this.style);
    this.text.x = 50;
    this.text.y = 50;
    container.addChild(this.text);
    return this.text.height;
}

Title.prototype.clear = function () {
    this.text.visible = false;
}



function AvailableOption(options) {
    this.content = options.content;
    this.style = new PIXI.TextStyle({
        fill: options.fill || "#2d2d2d",
        fontSize: options.fontSize || 36
    });

    this.text = new PIXI.Text(this.content, this.style);
    this.text.buttonMode = true;
    this.text.interactive = true;
    this.text.onClick = options.onClick;
    this.text.on('pointerdown', onButtonDown)
        .on('pointerup', onButtonUp)
        .on('pointerupoutside', onButtonUp)
        .on('pointerover', onButtonOver)
        .on('pointerout', onButtonOut);
}

AvailableOption.prototype.display = function (container, options) {

    this.text.x = 50;
    this.text.y = options.y;
    container.addChild(this.text);
    return this.text.height;
}

AvailableOption.prototype.clear = function () {
    this.text.visible = false;
}

function UnavailableOption(options) {
    this.content = options.content;
    this.style = new PIXI.TextStyle({
        fill: options.fill || "#777777",
        fontSize: options.fontSize || 36
    });

    this.text = new PIXI.Text(this.content, this.style);
}

UnavailableOption.prototype.display = function (container, options) {

    this.text.x = 50;
    this.text.y = options.y;
    container.addChild(this.text);
    return this.text.height;
}

UnavailableOption.prototype.clear = function () {
    this.text.visible = false;
}



const checkboxCheckedTexture = new PIXI.Texture.from('Images/checkbox_checked.png');
const checkboxCheckedSelectedTexture = new PIXI.Texture.from('Images/checkbox_checked_selected.png');
const checkboxUncheckedTexture = new PIXI.Texture.from('Images/checkbox_unchecked.png');
const checkboxUncheckedSelectedTexture = new PIXI.Texture.from('Images/checkbox_unchecked_selected.png');

function Choice(options) {
    var text = new PIXI.Text(options.content, new PIXI.TextStyle({
        fill: options.fill || "#2d2d2d",
        fontSize: options.fontSize || 30
    }));
    this.optionContainer = new PIXI.Container();
    text.x = 40;
    this.optionContainer.buttonMode = true;
    this.optionContainer.interactive = true;
    this.optionContainer.on('pointerdown', checkboxOnPointerDown)
        .on('pointerup', checkboxOnPointerUp)
        .on('pointerupoutside', checkboxOnPointerUp)
        .on('pointerover', checkboxOnPointerOver)
        .on('pointerout', checkboxOnPointerOut);
    this.optionContainer.isChecked = false;
    var checkbox = new PIXI.Sprite(checkboxUncheckedTexture);
    this.optionContainer.addChild(checkbox);
    this.optionContainer.addChild(text);
    checkbox.width = 30;
    checkbox.height = 30;
    checkbox.y = 2;
    checkbox.interactive = true;
    function checkboxOnPointerDown() {
        this.isdown = true;
    }

    function checkboxOnPointerUp() {
        this.isdown = false;
        if (this.isOver) {
            if (this.isChecked) {
                checkbox.texture = checkboxUncheckedSelectedTexture;
                this.isChecked = false;
            } else {
                checkbox.texture = checkboxCheckedSelectedTexture;
                this.isChecked = true;
            }
        } else {
            if (this.isChecked) {
                checkbox.texture = checkboxCheckedTexture;
            } else {
                checkbox.texture = checkboxUncheckedTextures;
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
    this.optionContainer.x = 50;
    this.optionContainer.y = options.y;
    container.addChild(this.optionContainer);
    return this.optionContainer.height;
}

Choice.prototype.clear = function () {
    this.optionContainer.visible = false;
}



function QuestionPage(options) {
    this.questionTitle = new Title({
        content: options.questionTitle
    });
    this.availableOptions = [];
    if ('availableOptions' in options) {
        options.availableOptions.forEach(answer => {
            // console.log(answerOption.answer)
            this.availableOptions.push(new AvailableOption({
                content: answer.content,
                onClick: answer.onClick
            }));
        });
    }
    this.unavailableOptions = [];
    if ('unavailableOptions' in options) {
        options.unavailableOptions.forEach(answer => {
            // console.log(answerOption.answer)
            this.unavailableOptions.push(new UnavailableOption({
                content: answer
            }));
        });
    }
    this.choices = [];
    if('choices' in options){
        options.choices.forEach(choice => {
            // console.log(answerOption.answer)
            this.choices.push(new Choice({
                content: choice
            }));
        });
    }
}

QuestionPage.prototype.display = function (container) {
    var height = this.questionTitle.display(container) + 50;
    // console.log(height);
    this.availableOptions.forEach(answer => {
        height += answer.display(container, { y: height }) + 10;
        // console.log(height);
    });
    this.unavailableOptions.forEach(answer => {
        height += answer.display(container, { y: height }) + 10;
        // console.log(height);
    });
    
    this.choices.forEach(choice => {
        height += choice.display(container, { y: height }) + 10;
        // console.log(height);
    });
}

QuestionPage.prototype.clear = function () {
    this.questionTitle.clear();
    this.availableOptions.forEach(answer => {
        answer.clear();
    })
    this.unavailableOptions.forEach(answer => {
        answer.clear();
    })
    
    this.choices.forEach(choices => {
        choices.clear();
    })
}
function onButtonDown() {
    this.isdown = true;
    this.style.fill = 0x00FF00;
}

function onButtonUp() {
    this.isdown = false;
    if (this.isOver) {
        this.style.fill = 0x777777;
        this.onClick();
    } else {
        this.style.fill = 0x2d2d2d;
    }
}

function onButtonOver() {
    this.isOver = true;
    if (this.isdown) {
        return;
    }
    this.style.fill = 0x777777;
}

function onButtonOut() {
    this.isOver = false;
    if (this.isdown) {
        return;
    }
    this.style.fill = 0x2d2d2d;
}
