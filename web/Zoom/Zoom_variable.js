// initialize images need to be used

// @Button
// mode_change.png made by Cursor Creative from https://www.flaticon.com/
// screenshot.png made by https://www.flaticon.com/authors/freepik
// move.png made made by https://www.flaticon.com/authors/icongeek26
const cancel = PIXI.Sprite.from('./Images/cancel_icon.png');
const modeSwitch = PIXI.Sprite.from('./Images/mode_change.png');
const screenshotIcon = PIXI.Sprite.from('./Images/screenshot.png');
const moveIcon = PIXI.Sprite.from('./Images/move.png');

// set options for buttons
// Cancel button
cancel.width = 50;
cancel.height = 50;
cancel.x = 10;
cancel.y = 30;
cancel.alpha = 0.33;
cancel.interactive = true;
cancel.buttonMode = true;

// Mode change button
modeSwitch.width = 50;
modeSwitch.height = 50;
modeSwitch.x = cancel.x;
modeSwitch.y = cancel.y + cancel.height + cancel.y;
modeSwitch.alpha = 1;
modeSwitch.interactive = true;
modeSwitch.buttonMode = true;

// icons to show current mode - screenshot & move
// mode icon should be at the center of modeSwitch
// however, but screenshot.png is touching the arrow of modeSwitch, so the width & height is shrinked by 2.5, and 2.5 is added to each x and y position.
// TL;DR -->
// screenshot icon is smaller than move icon by (cancel.width / 2 - screenshotIcon.width), and (cancel.width / 2 - screenshotIcon.width) / 2 is added to each x and y.
screenshotIcon.width = 20;
screenshotIcon.height = 20;
screenshotIcon.x = cancel.x + cancel.width / 4 + (cancel.width / 2 - screenshotIcon.width) / 2;
screenshotIcon.y = cancel.y + cancel.height + cancel.y + cancel.height / 4 + (cancel.width / 2 - screenshotIcon.width) / 2;
screenshotIcon.alpha = 0; // 0 because default mode is move

moveIcon.width = 25;
moveIcon.height = 25;
moveIcon.x = cancel.x + cancel.width / 4;
moveIcon.y = cancel.y + cancel.height + cancel.y + cancel.height / 4;
moveIcon.alpha = 1;

// create a new texture from image
// set background (default image)
// let bg_texture = new PIXI.Texture.from('./Images/lowmag_test.jpg');
// let bg_sprite = new PIXI.Sprite.from(bg_texture);

// initialzie & define style of guideText
const LMSIstyle = new PIXI.TextStyle({
    fontFamily: 'Helvetica',
    fontSize: 20,
    fill: '#FFFFFF', // gradient
    align: 'center',
    strokeThickness: 3,
    wordWrap: true,
    wordWrapWidth: 500,
});

// base64 matcher in RegExp to test base64 strings
const base64Matcher = new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$");

let cropGraphics = new PIXI.Graphics();