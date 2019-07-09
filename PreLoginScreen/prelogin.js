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
    fontSize: 23,
    fill: ['#ffffff'], // gradient
    align: 'center',
    wordWrap: true,
    wordWrapWidth: 500,
    letterSpacing: 2
});

var signUp_style = new PIXI.TextStyle({ 
    fontFamily: 'Tahoma',
    fontSize: 15,
    fill: ['#ffffff'], // gradient
    align: 'center',
    wordWrap: true,
    wordWrapWidth: 500,
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
    
    var LI_backgroundImage = new PIXI.Sprite.from("Images/login_background.jpg");
    
    app.stage.addChild(LI_backgroundImage);
    LI_backgroundImage.width = app.screen.width;
    LI_backgroundImage.height = app.screen.height;
    LI_backgroundImage.interactive = true;
    LI_backgroundImage.buttonMode = true;
    LI_backgroundImage.on("pointerdown",showLogin);
    LI_backgroundImage.alpha = 1.0
    
    login_UI.alpha = 0;

    var pl_radius = 0;
    if (app.screen.width >= app.screen.height) { pl_radius = app.screen.height/2.5;
    } else { pl_radius = app.screen.width/2.5; }
    var login_hex = new Hexagon({x: app.screen.width/2, y:app.screen.height/2}, 0, pl_radius);
    login_hex.graphics.lineStyle(9, 0xFFFFFF);
    //login_hex.graphics.hitArea = new PIXI.Polygon(polyPoints);
    //login_hex.graphics.interactive = false;
    //login_hex.graphics.interactiveChildren = false;
    login_hex.graphics.on("pointerdown",moveLogin);
    login_hex.draw(0xFFFFFF, 0);
    app.stage.removeChild(login_hex.container);
    login_UI.addChild(login_hex.container);

    
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
    userTextBox.interactiveChildren = false;
    userTextBox.placeholder = "Username";
    login_UI.addChild(userTextBox);

    var passwordText = new PIXI.Text("Password", ui_style);
    passwordText.x = login_hex.x - 120;
    passwordText.y = login_hex.y + 60;
    //login_UI.addChild(passwordText);

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
    passwordTextBox.interactiveChildren = false;
    passwordTextBox.placeholder = "Password";
    passwordTextBox.on("input",changePassword);
    passwordTextBox.on("keydown",keyDown);
    login_UI.addChild(passwordTextBox);

    var password = "";

    var passwordShow = new PIXI.Text(password, ui_style);
    passwordShow.x = app.screen.width * (1/4) + 50;
    passwordShow.y = passwordTextBox.y + passwordTextBox.height + 20;
    login_UI.addChild(passwordShow);

    let loginText = new PIXI.Text("Login", login_style);
    loginText.x = login_hex.x - 30;
    loginText.y = login_hex.y + 135;
    loginText.interactive = true;
    loginText.buttonMode = true;
    loginText.on("pointerdown", loginToBackend);
    //loginText.on("pointerdown",toProjectSelection);
    login_UI.addChild(loginText);

    var signUpContainer = new PIXI.Container();

    

    let signUpText = new PIXI.Text("Sign Up", signUp_style);
    signUpText.x = app.screen.width * (4/8) - signUpText.width/2;
    signUpText.y = app.screen.height * (7/8) + 20;
    signUpText.on("pointerdown",moveLogin);
    signUpText.interactive = true;
    signUpText.buttonMode = true;
    signUpContainer.addChild(signUpText);

    // underline
    generateTextLine(signUpText.x, signUpText.y+signUpText.height, signUpText.width, 2, 1)

    signUpContainer.alpha = 0;

    signUpContainer.alpha = 0;
    app.stage.addChild(signUpContainer);
    app.stage.addChild(login_UI);

    

    var blurText = new PIXI.Text("Hello", login_style);
    blurText.x = app.screen.width/2;
    blurText.y = app.screen.height/2;
    blurText.interactive = true;
    blurText.on("keypress",showInput);
    // app.stage.addChild(blurText);
    


    signUp_UI.interactiveChildren = true;
    signUp_UI.on("pointerdown",moveLogin);
    // signUp_UI.x = 0; //unneccesary
    signUp_UI.y = app.screen.height;

    var signup_hex = new Hexagon({x: app.screen.width/2, y:app.screen.height/2}, 0, pl_radius);
    signup_hex.graphics.lineStyle(9, 0xFFFFFF);
    signup_hex.graphics.alpha = 1;
    //signup_hex.graphics.hitArea = new PIXI.Polygon(polyPoints);
    //signup_hex.graphics.interactive = false;
    //signup_hex.graphics.interactiveChildren = false;
    signup_hex.graphics.on("pointerdown",moveLogin);
    signup_hex.draw(0xFFFFFF, 0);
    app.stage.removeChild(signup_hex.container);
    signUp_UI.addChild(signup_hex.container);

    
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
    SU_userTextBox.interactiveChildren = false;
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
    SU_emailTextBox.interactiveChildren = false;
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
    SU_passwordTextBox.interactiveChildren = false;
    SU_passwordTextBox.placeholder = "Password";
    SU_passwordTextBox.on("input",changePassword);
    SU_passwordTextBox.on("keydown",keyDown);
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
        /*{
            default: {fill: 0xFFFFFF, rounded: 10, stroke: {color: 0xCBCEE0, width: 2}},
            focused: {fill: 0xE1E3EE, rounded: 10, stroke: {color: 0xABAFC6, width: 2}},
            disabled: {fill: 0xDBDBDB, rounded: 16}
        }*/
    });
    SU_repasswordTextBox.x = signup_hex.x-(pl_radius+20)/2 + 2;
    SU_repasswordTextBox.y = signup_hex.y + 60;
    SU_repasswordTextBox.interactiveChildren = false;
    SU_repasswordTextBox.placeholder = "Confirm Password";
    SU_repasswordTextBox.on("input",changePassword);
    SU_repasswordTextBox.on("keydown",keyDown);
    signUp_UI.addChild(SU_repasswordTextBox);

    var SU_signUpText = new PIXI.Text("Sign Up", login_style);
    SU_signUpText.x = signup_hex.x - 45;
    SU_signUpText.y = signup_hex.y + 135;
    SU_signUpText.on("pointerdown",moveLogin);
    signUp_UI.addChild(SU_signUpText);

    var SU_loginText = new PIXI.Text("Login", signUp_style);
    SU_loginText.x = app.screen.width * (4/8) - signUpText.width/2;
    SU_loginText.y = app.screen.height + 50;
    //SU_loginText.on("pointerdown",moveLogin);
    SU_loginText.interactive = true;
    SU_loginText.buttonMode = true;
    app.stage.addChild(SU_loginText);

    // underline
    generateTextLine(SU_loginText.x, SU_loginText.y+SU_loginText.height, SU_loginText.width, 2, 2)


    
    app.stage.addChild(signUp_UI);
    






    var blurFilter1 = new PIXI.filters.BlurFilter();
    var blurFilter2 = new PIXI.filters.BlurFilter();

    login_UI.filters = [blurFilter1];
    signUpContainer.filters = [blurFilter1];
    LI_backgroundImage.filters = [blurFilter2];
    blurFilter2.blur = 0;

    count = 0;
    timer = 0;
    blurIn = false;
    blurOut = false;
    moveUp = false;
    moveDown = false;
    runTimer = false;
    
    app.ticker.add(() => {
        //Blur animation
        // blurText.text = timer;
        if(runTimer){
            timer += 0.01;
        }

        if(timer >= 30){
            hideLogin();
        }
        
        if(blurIn){
            count += 0.04;
            
            blurFilter2.blur = 20 * count;
            blurFilter1.blur =  20 * (1 - count);
            login_UI.alpha = count;
            //login_hex.graphics.alpha = count;
            //userTextBox.alpha = count;
            signUpContainer.alpha = count;


            
            blurText.text = "count: " + count;
            if(count >= 1){
                blurIn = false;
                count = 0;
                loginText.interactive = true;
                loginText.buttonMode = true;
                signUpText.interactive = true;
                signUpText.buttonMode = true;
                passwordTextBox.interactiveChildren = true;
                userTextBox.interactiveChildren = true;
                AFKtimerStart();
            }
        }
        if(blurOut){
            count += 0.04;

            blurFilter1.blur = 20 * count;
            blurFilter2.blur =  20 * (1 - count);
            login_UI.alpha = 1 - count;
           // login_hex.graphics.alpha = 1 - count;
           // userTextBox.alpha = 1 - count;
            if(count >= 1){
                blurOut = false;
                count = 0;
                LI_backgroundImage.interactive = true;
                LI_backgroundImage.buttonMode = true;
                passwordTextBox.interactiveChildren = false;
                userTextBox.interactiveChildren = false;
            }
        }

        if(moveUp){
            count += 0.08;
            movementSpeed = 20;
            login_UI.y -= movementSpeed;
            signUp_UI.y -= movementSpeed;
            signUpContainer.y -= movementSpeed;
            signUpContainer.alpha = 1 - count;
            if(login_UI.y <= ((-1) * (app.screen.height * (6/8)))){
                count = 0;
                moveUp = false;
                login_UI.y  = (-1) * (app.screen.height * (6/8));
                
                login_hex.graphics.interactive = true;
                login_hex.graphics.buttonMode = true;
                //  signUp_UI.interactive = false;
                signUp_UI.interactiveChildren = true;
                SU_emailTextBox.interactiveChildren = true;
                SU_userTextBox.interactiveChildren = true;
                SU_passwordTextBox.interactiveChildren = true;
                SU_repasswordTextBox.interactiveChildren = true;
                // signUp_UI.buttonMode = false;

            }
            
        }
        if(moveDown){
            count += 0.08;
            movementSpeed = 20;
            login_UI.y += movementSpeed;
            signUp_UI.y += movementSpeed;
            signUpContainer.y += movementSpeed;
            signUpContainer.alpha = count;
            if(login_UI.y >= 0){
                count = 0;
                moveDown = false;
                login_UI.y  = 0;
                loginText.interactive = true;
                loginText.buttonMode = true;
                signUpText.interactive = true;
                signUpText.buttonMode = true;
                
                AFKtimerStart();
            }
            
        }
    });
}


function generateTextLine(x, y, w, lineWidth, type){
    let line = new PIXI.Graphics();
    line.lineStyle(lineWidth, 0xFFFFFF)
        .moveTo(x, y)
        .lineTo(x+w, y);
    if (type == 1) { login_UI.addChild(line); }
    else if (type ==2) { signUp_UI.addChild(line); }
}

function showLogin(event){
    blurIn = true;
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
    if(login_UI.y == 0 && !moveDown){
        moveUp = true;
        AFKtimerStop();
        loginText.interactive = false;
        loginText.buttonMode = false;
        signUpText.interactive = false;
        signUpText.buttonMode = false;
    }
    else if (!moveUp){
        moveDown = true;
        login_UI.interactive = false;
        login_UI.buttonMode = false;
    }
}

function AFKtimerStart(){
    runTimer = true;
}

function AFKtimerStop(){
    timer = 0;
    runTimer = false;
}

function showInput(event){
    var x = event.keyCode;
    console.log("Activated function");
    blurText.text += x;
}

function keyDown(keycode){
var valid = 
    (keycode > 47 && keycode < 58)   || // number keys
    keycode == 32 || keycode == 13   || // spacebar & return key(s) (if you want to allow carriage returns)
    (keycode > 64 && keycode < 91)   || // letter keys
    (keycode > 95 && keycode < 112)  || // numpad keys
    (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
    (keycode > 218 && keycode < 223);   // [\]' (in order)
    if(valid){
        passwordTextBox.text = password;
        console.log("Activated down function: " + password);
    }
}
function changePassword(text){
    password = text;
    console.log("Activated function: " + text);
    var length = password.length;
    passwordTextBox.text = "";
    for(var i = 0; i < length; i++){
        passwordTextBox.text += "*";
    }
    
    /*  .
    if(text.length > password.length){
        var char = passwordTextBox.text.slice(passwordTextBox.text.length() - 1);
        passwordTextBox.text += "*";
        password += char;
    }
    else if(){
        var char = password.slice(password.length() - 1);

    }*/
    
}

//Agustin: edit
function toProjectSelection()
{
    currentActivity = activityArray[1];
    alphaTransform(LI_backgroundImage,0.0, 10 )
    positionTransform(-1000, app.stage.y, app.stage, 12)
    updateActivity();
}
