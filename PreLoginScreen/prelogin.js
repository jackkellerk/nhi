var login_backgroundImage;

const ui_style = new PIXI.TextStyle({
    fontFamily: 'Tahoma',
    fontSize: 16,
    fill: ['#ffffff'], // gradient
    align: 'center',
    wordWrap: true,
    wordWrapWidth: 500,
    letterSpacing: 1
});

const login_style = new PIXI.TextStyle({
    fontFamily: 'Tahoma',
    fontSize: 30,
    fill: ['#ffffff'], // gradient
    align: 'center',
    wordWrap: true,
    wordWrapWidth: 500,
    letterSpacing: 2
});

var signUp_style = new PIXI.TextStyle({ 
    fontFamily: 'Tahoma',
    fontSize: 18,
    fill: ['#ffffff'], // gradient
    align: 'center',
    wordWrap: true,
    wordWrapWidth: 500,
});

var preLogin_style = new PIXI.TextStyle({ 
    fontFamily: 'Tahoma',
    fontSize: 180,
    fill: ['#ffffff'], // gradient
    align: 'center',
    wordWrap: true,
    wordWrapWidth: 500,
});

const display_text1 = new PIXI.TextStyle({
    fontFamily: 'Tahoma',
    fontSize: 50,
    fill: ['#ffffff'], // gradient
    align: 'center',
    wordWrap: true,
    wordWrapWidth: 600,
    letterSpacing: 2
});

var passwordTextBox;
var password = "";
var userTextBox;
var SU_userTextBox;
var SU_emailTextBox;
var SU_passwordTextBox;
var SU_repasswordTextBox;
    

function startPreLogin()
{
    //Back drop for the pre/login screen and when clicked on will reveal the login screen
    login_backgroundImage = new PIXI.Sprite.from("Images/login_background.jpg");
    
    app.stage.addChild(login_backgroundImage);
    login_backgroundImage.width = app.screen.width;
    login_backgroundImage.height = app.screen.height;
    login_backgroundImage.interactive = true;
    login_backgroundImage.buttonMode = true;
    login_backgroundImage.on("pointerdown",showLogin);
    login_backgroundImage.alpha = 1.0;

    //For now these quotes are random ones found on the internet related to programming in general. 
    //They will be replaced with descriptions of the background image shown.
    var quoteArray = [" \'\' Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live \'\' ",
    "\'\'There are two ways of constructing a software design. One way is to make it so simple that there are obviously no deficiencies." +
     "And the other way is to make it so complicated that there are no obvious deficiencies.\'\'",
     "To iterate is human, to recurse divine.",
     "The trouble with programmers is that you can never tell what a programmer is doing until it\'s too late.",
     "Most of you are familiar with the virtues of a programmer. There are three, of course: laziness, impatience, and hubris."];
    var authorArray = ["- John Woods","- C.A.R. Hoare","- L. Peter Deutsch","- Seymour Cray","- Larry Wall"];
    //This takes the length of the quote array and decides on a random entry to use and display to the user.
    var arr_length = quoteArray.length;
    var arr_index = Math.floor((Math.random() * arr_length));

    preDisplayQuote = new PIXI.Text(quoteArray[arr_index],display_text1);
    preDisplayAuthor = new PIXI.Text(authorArray[arr_index], login_style);

    preDisplayQuote.x = app.screen.width/2 - preDisplayQuote.width/2;
    preDisplayQuote.y = app.screen.height/2 - preDisplayQuote.height/2;

    preDisplayAuthor.x = preDisplayQuote.x;
    preDisplayAuthor.y = preDisplayQuote.y + preDisplayQuote.height + preDisplayAuthor.height;

    app.stage.addChild(preDisplayQuote);
    app.stage.addChild(preDisplayAuthor);
    
    //Login_UI - container for all UI elements concerning the login screen 
    //The hexgon that surrounds all the other elements
    var pl_radius = 0;
    if (app.screen.width >= app.screen.height) { pl_radius = app.screen.height/2.5;
    } else { pl_radius = app.screen.width/2.5; }
    var login_hex = new Hexagon({x: app.screen.width/2, y:app.screen.height/2}, 0, pl_radius);
    login_hex.graphics.lineStyle(9, 0xFFFFFF);
    login_hex.graphics.on("pointerdown",moveLogin);
    login_hex.draw(0xFFFFFF, 0);
    app.stage.removeChild(login_hex.container);
    login_UI.addChild(login_hex.container);

    //Pre login text shows up when login hexagon is tiny
    preLoginText = new PIXI.Text("Login", preLogin_style);



    /** Inner elements of Login UI **/
    
    //Area where user types in their username    
    userTextBox = new PIXI.TextInput({
        input: {
            fontFamily: 'Tahoma',
            fontSize: '14pt',
            padding: '10px',
            width: '250px',
            color: '#FFFFFF',
            letterSpacing: 2
        }, 
        box: generateTextLine(login_hex.x-(pl_radius+50)/2, login_hex.y-31, pl_radius+50, 3, 1)
    });
    userTextBox.x = login_hex.x-(pl_radius+50)/2 + 2;
    userTextBox.y = login_hex.y - 75;
    userTextBox.interactiveChildren = true;
    userTextBox.placeholder = "Username";
    Inner_Login_UI.addChild(userTextBox);

    //Area where user types in password
    passwordTextBox = new PIXI.TextInput({
        input: {
            fontFamily: 'Tahoma',
            fontSize: '14pt',
            padding: '10px',
            width: '250px',
            color: '#FFFFFF',
            letterSpacing: 2
        }, 
        box: generateTextLine(login_hex.x-(pl_radius+50)/2, login_hex.y+44, pl_radius+50, 3, 1)
    });
    passwordTextBox.x = login_hex.x-(pl_radius+50)/2 + 2;
    passwordTextBox.y = login_hex.y;
    passwordTextBox.interactiveChildren = true;
    passwordTextBox.placeholder = "Password";
    Inner_Login_UI.addChild(passwordTextBox);

    //Interactable text used to move to project selection screen
    let loginText = new PIXI.Text("Login", login_style);
    loginText.x = login_hex.x - loginText.width/2;
    loginText.y = login_hex.y + 135;
    loginText.interactive = true;
    loginText.buttonMode = true;
    loginText.on("pointerdown", loginToBackend);
    Inner_Login_UI.addChild(loginText);

    //Interactable text used to move to sign up screen
    let signUpText = new PIXI.Text("Sign Up", signUp_style);
    signUpText.x = login_hex.x - signUpText.width/2;
    signUpText.y = loginText.y + (signUpText.height * 3);
    signUpText.on("pointerdown",moveLogin);
    signUpText.interactive = true;
    signUpText.buttonMode = true;
    Inner_Login_UI.addChild(signUpText);

    /** End of inner Login UI elements**/
    Inner_Login_UI.alpha = 0;
    Inner_Login_UI.interactiveChildren = false;
    login_UI.addChild(Inner_Login_UI);

    //Adjusting Login Ui to its starting position
    login_UI.alpha = 1;
    scaleTransform(.1, .1, login_UI, 1);
    positionTransform(app.screen.width - ((login_UI.width * .1) * 1.2), app.screen.height - ((login_UI.height * .1) * 1.2), login_UI, 1);
    login_UI.addChild(preLoginText);
    preLoginText.x = login_UI.x + login_UI.width - login_hex.width/2 - preLoginText.width/2;
    preLoginText.y = login_UI.y + login_UI.height - login_hex.height/2 - preLoginText.height/2;
    preLoginText.alpha = 1;
    app.stage.addChild(login_UI);


    /**
     *  Sign Up UI is similar to login as it is a hexagon will text boxes inside of it.
     *  It starts off hidden a the bottle of the screen and is shown after the move Login
     *  functino is used.
     * **/
    signUp_UI.interactiveChildren = true;
    signUp_UI.on("pointerdown",moveLogin);
    signUp_UI.y = app.screen.height;

    //The Hexagon acting as the boundary for the sign up screen
    var signup_hex = new Hexagon({x: app.screen.width/2, y:app.screen.height/2}, 0, pl_radius);
    signup_hex.graphics.lineStyle(9, 0xFFFFFF);
    signup_hex.graphics.alpha = 1;
    signup_hex.graphics.on("pointerdown",moveLogin);
    signup_hex.draw(0xFFFFFF, 0);
    app.stage.removeChild(signup_hex.container);
    signUp_UI.addChild(signup_hex.container);

    //This smaller hexagon will act as a button to move back to the login screen
    var backToLogin_hex = new Hexagon({x: signup_hex.x + signup_hex.width/2, y:signup_hex.y + signup_hex.height/2}, 0, pl_radius/8);
    backToLogin_hex.graphics.lineStyle(9, 0xFFFFFF);
    backToLogin_hex.graphics.alpha = 1;
    backToLogin_hex.graphics.on("pointerdown",moveSignUp);
    backToLogin_hex.draw(0xFFFFFF, 0);
    app.stage.removeChild(backToLogin_hex.container);
    signUp_UI.addChild(backToLogin_hex.container);

    //This text lies within the backtologin button and will be the interactive
    //section users click on
    var SU_loginText = new PIXI.Text("Login", signUp_style);
    SU_loginText.x = backToLogin_hex.x - SU_loginText.width/2;
    SU_loginText.y = backToLogin_hex.y - SU_loginText.height/2;
    SU_loginText.interactive = true;
    SU_loginText.buttonMode = true;
    SU_loginText.on("pointerdown",moveSignUp);
    signUp_UI.addChild(SU_loginText);

    /** Here begins the many text boxes used in the sign up page **/
    SU_userTextBox = new PIXI.TextInput({
        input: {
            fontFamily: 'Tahoma',
            fontSize: '13pt',
            padding: '10px',
            width: '250px',
            color: '#FFFFFF',
            letterSpacing: 2
        }, 
        box: generateTextLine(signup_hex.x-(pl_radius+20)/2, signup_hex.y-81, pl_radius+20, 3, 2)
    });
    SU_userTextBox.x = signup_hex.x-(pl_radius+20)/2 + 2;
    SU_userTextBox.y = signup_hex.y - 122;
    SU_userTextBox.interactiveChildren = true;
    SU_userTextBox.placeholder = "Enter Username";
    signUp_UI.addChild(SU_userTextBox);

    SU_emailTextBox = new PIXI.TextInput({
        input: {
            fontFamily: 'Tahoma',
            fontSize: '13pt',
            padding: '10px',
            width: '250px',
            color: '#FFFFFF',
            letterSpacing: 2
        }, 
        box: generateTextLine(signup_hex.x-(pl_radius+20)/2, signup_hex.y-21, pl_radius+20, 3, 2)
    });
    SU_emailTextBox.x = signup_hex.x-(pl_radius+20)/2 + 2;
    SU_emailTextBox.y = signup_hex.y - 62;
    SU_emailTextBox.interactiveChildren = true;
    SU_emailTextBox.placeholder = "Enter Email";
    signUp_UI.addChild(SU_emailTextBox);


    SU_passwordTextBox = new PIXI.TextInput({
        input: {
            fontFamily: 'Tahoma',
            fontSize: '13pt',
            padding: '10px',
            width: '250px',
            color: '#FFFFFF',
            letterSpacing: 2
        }, 
        box: generateTextLine(signup_hex.x-(pl_radius+20)/2, signup_hex.y + 41, pl_radius+20, 3, 2)
    });
    SU_passwordTextBox.x = signup_hex.x-(pl_radius+20)/2 + 2;
    SU_passwordTextBox.y = signup_hex.y + 0;
    SU_passwordTextBox.interactiveChildren = true;
    SU_passwordTextBox.placeholder = "Password";
    signUp_UI.addChild(SU_passwordTextBox);

    SU_repasswordTextBox = new PIXI.TextInput({
        input: {
            fontFamily: 'Tahoma',
            fontSize: '13pt',
            padding: '10px',
            width: '250px',
            color: '#FFFFFF',
            letterSpacing: 2
        }, 
        box: generateTextLine(signup_hex.x-(pl_radius+20)/2, signup_hex.y + 101, pl_radius+20, 3, 2)
    });
    SU_repasswordTextBox.x = signup_hex.x-(pl_radius+20)/2 + 2;
    SU_repasswordTextBox.y = signup_hex.y + 60;
    SU_repasswordTextBox.interactiveChildren = true;
    SU_repasswordTextBox.placeholder = "Confirm Password";
    signUp_UI.addChild(SU_repasswordTextBox);

    var SU_signUpText = new PIXI.Text("Sign Up", login_style);
    SU_signUpText.x = signup_hex.x - SU_signUpText.width/2;
    SU_signUpText.y = signup_hex.y + 135;
    SU_signUpText.interactive = true;
    SU_signUpText.buttonMode = true;
    SU_signUpText.on("pointerdown", signUpBackend);
    signUp_UI.addChild(SU_signUpText);
    
    app.stage.addChild(signUp_UI);
}


function generateTextLine(x, y, w, lineWidth, type){
    let line = new PIXI.Graphics();
    line.lineStyle(lineWidth, 0xFFFFFF)
        .moveTo(x, y)
        .lineTo(x+w, y);
    if (type == 1) { Inner_Login_UI.addChild(line); }
    else if (type ==2) { signUp_UI.addChild(line); }
}

function showLogin(event){

    alphaTransform(preDisplayQuote, 0, 20);
    alphaTransform(preDisplayAuthor, 0, 20);
    alphaTransform(Inner_Login_UI, 1, 30);
    scaleTransform(1, 1, login_UI, 30);
    positionTransform(0, 0, login_UI, 30);
    alphaTransform(preLoginText, 0, 5);
    blurTransform(this, 1, 10);
    Inner_Login_UI.interactiveChildren = true;

    this.interactive = false;
    this.buttonMode = false;
    
}

function hideLogin(event){
    blurOut = true;
    loginText.interactive = false;
    loginText.buttonMode = false;
    AFKtimerStop();
}

function moveLogin(event){
    positionTransform(0, -login_UI.height, login_UI, 30);
    positionTransform(0, 0, signUp_UI, 30);
    Inner_Login_UI.interactiveChildren = false;
    signUp_UI.interactiveChildren = true;

}

function moveSignUp(event){
    positionTransform(0, 0, login_UI, 30);
    positionTransform(0, app.screen.height, signUp_UI, 30);
    Inner_Login_UI.interactiveChildren = true;
    signUp_UI.interactiveChildren = false;
}

function showInput(event){
    var x = event.keyCode;
    console.log("Activated function");
    blurText.text += x;
}

//Agustin: edit
function toProjectSelection()
{
    currentActivity = activityArray[1];
    alphaTransform(login_backgroundImage,0.0, 10 )
    positionTransform(-1000, app.stage.y, app.stage, 12)
    updateActivity();
}
