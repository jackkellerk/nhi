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

Title.prototype.clear = function(){
    this.text.visible = false;
}



function AvailableOption(options) {
    this.content = options.content;
    console.log(this.content);
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

AvailableOption.prototype.clear = function(){
    this.text.visible = false;
}

function UnavailableOption(options) {
    this.content = options.content;
    console.log(this.content);
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

UnavailableOption.prototype.clear = function(){
    this.text.visible = false;
}


function QuestionPage(options) {
    this.questionTitle = new Title({
        content: options.questionTitle
    });
    this.availableOptions = [];
    options.availableOptions.forEach(answer => {
        // console.log(answerOption.answer)
        this.availableOptions.push(new AvailableOption({
            content: answer.content,
            onClick: answer.onClick
        }));
    });
    this.unavailableOptions = [];
    options.unavailableOptions.forEach(answer => {
        // console.log(answerOption.answer)
        this.unavailableOptions.push(new UnavailableOption({
            content: answer
        }));
    });
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
}

QuestionPage.prototype.clear = function () {
    this.questionTitle.clear();
    this.availableOptions.forEach(answer => {
        answer.clear();
    })
    this.unavailableOptions.forEach(answer => {
        answer.clear();
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
