//console.log("Length: " + defaultSources.length);
//Creates style used by text. It is currently unnecessary but more of an example
const ps_title_style = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontVariant: "small-caps",
    fontSize: 26,
    fontWeight: 'bold',
    fill: '#FFFFFF', // gradient
    align: 'center',
    //strokeThickness: 3,
    wordWrap: true,
    wordWrapWidth: 1000,
});

const ps_caption_style = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontVariant: "small-caps",
    fontSize: 20,
    fill: '#FFFFFF', // gradient
    align: 'left',
    //strokeThickness: 1,
    wordWrap: true,
    wordWrapWidth: 1000,
});

// set background image
var source_bg = new PIXI.Sprite.from('Images/projectSource_test.jpg');
var up_arrow = new PIXI.Sprite.from('Images/up_arrow.png')
var down_arrow = new PIXI.Sprite.from('Images/down_arrow.png')
var back_arrow = new PIXI.Sprite.from('Images/left_arrow.png')
var confirm_button = new PIXI.Sprite.from('Images/confirmation-icon-0.jpg')
//var selected_Icon = new PIXI.Sprite.from('Images/selected_icon.jpg')


// variables to set border for hexagons
// x_limit: x coordinates of the screen, set in startSourcePage()
// x_infostarts/ends: start and end x coordinates of infobox
var x, y;

var sourceSelectionPlace;

var ps_sampleText;
var ps_sampleImage;
var afterSelectText;
var ps_title;

var index = 0;

// booleans for institution page
var totalIns = 0;
var defaultIns = 3;

// array for commands
var sourcesArray = [];
var institutionArray = [];
var sourceDescriptionBoxes = [];
var selectedSources = [];

/**
 * startSorucePage sets the background and stage containers required
 */
function startSourcePage() {
    sourceSelectionPlace = 0;
    getAllSources();
    x = app.screen.width / 8;
    y = app.screen.height / 8;

    // set width and height of the backgrond sprite, stage it to the app
    source_bg.width = app.screen.width;
    source_bg.height = app.screen.height;
    app.stage.addChild(source_bg);
    drawInsInfo();

    // set title
    ps_title = new PIXI.Text('Institutions', ps_title_style);
    //ps_title.on("pointerdown", moveSources);

    // ps_title = new PIXI.Text('Sources: Lehigh', ps_title_style);
    ps_title.x =  app.screen.width / 10;
    ps_title.y = app.screen.height / 30;
    app.stage.addChild(ps_title);

    // set example texts
    ps_sampleImage = new PIXI.Text(' ', ps_title_style);
    ps_sampleImage.x = app.screen.width * (6/8);
    ps_sampleImage.y = app.screen.height / 50;
    app.stage.addChild(ps_sampleImage);

    afterSelectText = new PIXI.Text(' ', ps_title_style);
    afterSelectText.x = app.screen.width * (10/8);
    afterSelectText.y = app.screen.height / 50;
    app.stage.addChild(afterSelectText);

    //Up and down arrows for the sources scrolling
    up_arrow.width = 50;
    up_arrow.height = 50;
    up_arrow.x = app.screen.width + 50
    up_arrow.y = app.screen.height * ( 7/10);
    //
    down_arrow.width = 50;
    down_arrow.height = 50;
    down_arrow.x = app.screen.width + 50;
    down_arrow.y = app.screen.height * (8/10);
    //
    back_arrow.width = 50;
    back_arrow.height = 50;
    back_arrow.x = app.screen.width/30
    back_arrow.y = app.screen.height/30
    //
    confirm_button.width = 50;
    confirm_button.height = 50;
    confirm_button.x = app.screen.width*(19/20)
    confirm_button.y = app.screen.height/2

    //Button mechanics for the arrows
    up_arrow.interactive = true;
    up_arrow.buttonMode = true;
    up_arrow.on('pointerdown', upButton);
    down_arrow.interactive = true;
    down_arrow.buttonMode = true;
    down_arrow.on('pointerdown', downButton);
    back_arrow.interactive = true;
    back_arrow.buttonMode = true;
    back_arrow.on('pointerdown', goBackToQuestions);
    confirm_button.interactive = true;
    confirm_button.buttonMode = true;
    confirm_button.on('pointerdown', confirmNewProject);

    confirm_button.x += 1000;


    app.stage.addChild(up_arrow);
    app.stage.addChild(down_arrow);
    app.stage.addChild(back_arrow);
    app.stage.addChild(confirm_button)

    populateSourceArray();
}

/**
 * 
 * @param numSource 
 */
function drawInsInfo (numIns) {
    // set number of sources if numSource is null
    if (numIns == null) {
        numIns = defaultIns;
        totalIns = defaultIns;
    }
    else {
        totalIns = numSource;
    }
    // Hexagon Info: (all numbers already scaled)
    x = app.screen.width/3;
    y = app.screen.height/3;
    var scale = 2.2
    xChange = 100 * ((scale -2.3) + 1.0);
    showInstitutions(x,y, 2.2);
    //showInstitutions(x + (xChange*4), y, 2.2)
    //showInstitutions(x + (xChange*8), y, 2.2)
    var count = 0;
    institutionArray.forEach( function(element) {
        console.log(count);
        app.stage.addChild(element.container);
        var text = element.institution
        var res = text.replace("Images/institution/", "");
        res = res.replace(".png", "")
        res = res.replace(".jpg", "")
        console.log(res)
        element.container.interactive = true;
        //element.container.on('pointerdown', drawSourceInfo);
        element.container.on('pointerdown', function(){
            drawSourceInfo(res)
        });
        element.container.on('mouseout', ins_HoverOff);
        element.container.on('mouseover', ins_HoverOver1);
        element.container.on('mouseover', function(){
            changeSourceName(res);
        });
        count++;
    });
}


//lehigh, oakridge, john hopkins, ohio state
function drawSourceInfo(inputText) {
    var count = 1;
    var change = true;
    for( var i = 0; i < institutionArray.length; i++ ){
        count++
        if (count == 3){
            count = 0
            change ^= true;
        }if ( change == true){
            positionTransform(institutionArray[i].container.x -1000, institutionArray[i].container.y -1000, institutionArray[i].container, 30);
            alphaTransform(institutionArray[i].container, 0.0, (Math.floor(Math.random() * 10) + 1) * (Math.floor(Math.random() * 4) + 1))
        }else{
            alphaTransform(institutionArray[i].container, 0.0, (Math.floor(Math.random() * 10) + 1) * (Math.floor(Math.random() * 4) + 1))
            positionTransform(institutionArray[i].container.x +1000, institutionArray[i].container.y + 1000, institutionArray[i].container, 30);
        }
    }
    ps_title.text = "Sources";
    sourceSelectionPlace = 1;
    //ps_title.interactive = true;
    //ps_title.buttonMode = true;

    //positionTransform(app.screen.width*6/8, afterSelectText.y, afterSelectText, 30)
    afterSelectText.x = app.screen.width *(6/8);
    positionTransform(confirm_button.x-1000, confirm_button.y, confirm_button, 30)

    afterSelectText.text = inputText

    console.log(afterSelectText)

    
    // stage the infroConatiner
    sourcesArray.forEach(element => {
        //console.log("ellloooo")
        positionTransform(0, element.container.y, element.container, 30)
    });
    positionTransform(app.screen.width * (9.5/10), app.screen.height * (7/10), up_arrow, 30);
    positionTransform(app.screen.width * (9.5/10), app.screen.height * (8/10), down_arrow, 30);
    ps_sampleText = inputText
}




function moveSources(){
    console.log("Array Length: " + institutionArray.length);
    var count = 1;
    var change = true;
    for( var i = 0; i < institutionArray.length; i++ ){
        count++
        if (count == 3){
            count = 0
            change ^= true;
        }if ( change == true){
            positionTransform(institutionArray[i].container.x +1000, institutionArray[i].container.y + 1000, institutionArray[i].container, 30);
            alphaTransform(institutionArray[i].container, 1.0, 10)
        }else{
            alphaTransform(institutionArray[i].container, 1.0, 10)
            positionTransform(institutionArray[i].container.x - 1000, institutionArray[i].container.y - 1000, institutionArray[i].container, 30);
        } 
    }
    ps_title.text = "Institutions";
    afterSelectText.x = app.screen.width * (10/8);
    //ps_title.interactive = false;
    //ps_title.buttonMode = false;
    //ps_title.on("pointerdown", moveSources);
    sourcesArray.forEach(element => {
        positionTransform(app.screen.width + 200, element.container.y, element.container, 30);
    });
    positionTransform(app.screen.width + 50, app.screen.height * (7/10), up_arrow, 30);
    positionTransform(app.screen.width + 50, app.screen.height * (8/10), down_arrow, 30);
    //positionTransform(app.screen.width * 10/8, afterSelectText.y, afterSelectText, 30);
    positionTransform(confirm_button.x+1000, confirm_button.y, confirm_button, 30)
    sourceSelectionPlace = 0;
    //alphaTransform(source_infoContainer, 0, 30)

}


function clickSource(element){
    //console.log(element.container.getChildAt(1).alpha)
    var start = element.container.getChildAt(1).alpha

    /**
     * Uncomment for when we edit our app to have users choose a starting image
     */

    // if ( start == 0){
    //     element.container.getChildAt(1).alpha =1;
    //     selectedSources.push(element.id)
    // } else {
    //     element.container.getChildAt(1).alpha =0;
    //     for( var i = 0; i < selectedSources.length; i++){ 
    //         if ( selectedSources[i] === element.id) {
    //           selectedSources.splice(i, 1); 
    //           i--;
    //         }
    //      }
    // }
    var uid = 8;
    var sessionkey = "test_session_key";
    var d = new Date();
    var url = "/i/demo/Sample_project/microscopy.jpg" 
    selectedSources.push(url)
    console.log("Start")
    selectedSources.forEach(element => {
        console.log(element)
    });
    console.log("End")
    
}

function confirmNewProject(){
    var jsonString = JSON.stringify(selectedSources);
    console.log(jsonString);
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+'_'+time;
    console.log(dateTime)
    var project_name = "NewProject_" + dateTime;
    // d.toLocaleString().replace(", ", "_").replace("/ AM| PM/g", "");
    //+ d.getMonth+"/"+d.getDate+"/"+d.getFullYear+ "_"+d.getHours+":"+d.getMinutes+":"+d.getSeconds;
    //onsole.log (project_name)
    if(selectedSources.length != 0){
        postNewProject(project_name, app.screen.width, app.screen.height, newProjectProperties, "Lehigh", selectedSources);  // An Ajax "POST" call to backend
    }
    currentActivity = activityArray[1];
    updateActivity();
    create_project++;
}

function goBackToQuestions(){
    if(sourceSelectionPlace === 0){
        currentActivity = activityArray[3];
        institutionArray.length = 0;
        updateActivity();

    } else if (sourceSelectionPlace === 1){
        moveSources();
    }

}



function changeSourceName(input){
    ps_sampleImage.text = input;
}

function upButton(){
    console.log(index)

    yChange = app.screen.height/4
    if(index == 0 ){ 
        sourcesArray[11].container.y = 0 - (yChange* 12);
        sourcesArray.forEach(element => {
            positionTransform(element.container.x, element.container.y +yChange, element.container, 6)
        });
        index = 11;
    } else if(index > -1){
        sourcesArray[index-1].container.y = 0 - yChange*(index);
        sourcesArray.forEach(element => {
            positionTransform(element.container.x, element.container.y +yChange, element.container, 6)
        });
        index -=1;
    } else {
        console.log("past 12")
    }
}

function downButton(){
    yChange = app.screen.height/4
    console.log(index)
    if(index ==11){
        console.log("   A  ")
        var newIndex = index-8
        sourcesArray[newIndex].container.y = 0 + ((yChange) * (4-newIndex))
        sourcesArray.forEach(element => {
            positionTransform(element.container.x, element.container.y -yChange, element.container, 6)
        });
        index = 0;
    }else if(index > 7){ 
        console.log("   A  ")
        var newIndex = index-8
        sourcesArray[newIndex].container.y = 0 + ((yChange) * (4-newIndex))
        sourcesArray.forEach(element => {
            positionTransform(element.container.x, element.container.y -yChange, element.container, 6)
        });
        index += 1;
    } else if(index > -1){
        console.log("   B  ")
        var newIndex = index+4
        sourcesArray[newIndex].container.y = 0 + ((yChange) * (4-newIndex))
        sourcesArray.forEach(element => {
            positionTransform(element.container.x, element.container.y -yChange, element.container, 7)
        });
        index +=1;
    } else {
        console.log("past 12")
    }
}


function ins_HoverOver1(){
    var element1 = this.getChildAt(0);
    var element2 = this.getChildAt(1);
    var element3 = this.getChildAt(2);
    if( element1.scale.x < 1.1){
        scaleTransform(element1.scale.x*1.1, element1.scale.y*1.1, element1, 2)
        scaleTransform(element2.scale.x*1.1, element2.scale.y*1.1, element2, 2)
        scaleTransform(element3.scale.x*1.1, element3.scale.y*1.1, element3, 2)
    } else {
        return;
    }
}


function ins_HoverOff(){
    ps_sampleImage.text = "";
    var element1 = this.getChildAt(0);
    var element2 = this.getChildAt(1);
    var element3 = this.getChildAt(2);
    if (element1.scale.x > 1.0){
        scaleTransform(element1.scale.x/1.1, element1.scale.y/1.1, element1, 2)
        scaleTransform(element2.scale.x/1.1, element2.scale.y/1.1, element2, 2)
        scaleTransform(element3.scale.x/1.1, element3.scale.y/1.1, element3, 2)
    } else {
        return;
    }
}

function populateSourceArray() {
    var change = (80 * 2 + 4 * 2)
    var x_origin = app.screen.width/8;
    var y_origin = app.screen.height/7;
    var current_Id = 1;
    for (var i = 0; i < defaultSources.length; i++, y += change) {
        var source_infoContainer = new PIXI.Container();
        var textContainer = new PIXI.Container();
        var hexContainer = new PIXI.Container();
        var hex = new PIXI.Graphics();
        hex.clear();
        // set color as white (0xffffff), line thickness as 3
        hex.lineStyle(4, 0xffffff, 9);
        // fill hexagon with grey (0x808080)
        hex.beginFill(0x889399);

        var sourceName;
        var imgPath;
        var info1;
        var info2;
        if(i < defaultSources.length){
            sourceName = defaultSources[i].name;
            imgPath = defaultSources[i].image;
            info1 = defaultSources[i].info1;
            info2 = defaultSources[i].info2;
        }
        else{
            sourceName = "Source " + (i + 1)
            imgPath = "Images/Sources/electron_microscope_001.jpg";
            info1 = "Nothing much to say here";
            info2 = "Nothing much to say here again";
        }
        // check if all sources are loaded
        // if lowest point of the new row is over y_limit, break;

        var pl_radius = 0;
        pl_radius = app.screen.width * (1/25);
        var mask_hex = new Hexagon({x: x_origin, y: y_origin}, 0, pl_radius);
        mask_hex.graphics.lineStyle(1, 0xFFFFFF);
        mask_hex.draw(0xFFFFFF, 1);
        app.stage.removeChild(mask_hex.container);
        hexContainer.addChild(mask_hex.container);

        var border_hex = new Hexagon({x: x_origin, y: y_origin}, 0, pl_radius);
        border_hex.graphics.lineStyle(4, 0xFFFFFF);
        border_hex.draw(0xFFFFFF, 0);
        app.stage.removeChild(border_hex.container);
        hexContainer.addChild(border_hex.container);

        const sourceImg = new PIXI.Sprite.from(imgPath);
        source_infoContainer.addChild(sourceImg);
        sourceImg.mask = mask_hex.graphics;
        sourceImg.width = mask_hex.width;
        sourceImg.height = mask_hex.height;
        sourceImg.x = app.screen.width/8 - sourceImg.width/2;
        sourceImg.y =  (y_origin) - sourceImg.height/2;

        // draw hexagon thumbnail
        hex.drawPolygon([mask_hex.x + pl_radius * 2 ,mask_hex.y - pl_radius, mask_hex.x + pl_radius * 2  + app.screen.width * (5.5/8),mask_hex.y - pl_radius, mask_hex.x + pl_radius * 2  + app.screen.width* (5.5/8),mask_hex.y + pl_radius,mask_hex.x + pl_radius * 2 ,mask_hex.y + pl_radius]);
       
        var sourceTitle = new PIXI.Text(sourceName, ps_title_style);
        sourceTitle.x = (mask_hex.x + pl_radius * 2) + 5;
        sourceTitle.y = mask_hex.y - pl_radius;
        textContainer.addChild(sourceTitle);


        var indentSpace = mask_hex.x + pl_radius * 2 + hex.width/50;

        var infoCaption = new PIXI.Text(info1, ps_caption_style);
        infoCaption.x = indentSpace + hex.width/50;
        infoCaption.y = sourceTitle.y + sourceTitle.height;
        textContainer.addChild(infoCaption);

        pl_radius = 0;
        if (app.screen.width >= app.screen.height) { 
            pl_radius = app.screen.height * (1/200);
        } else { 
            pl_radius = app.screen.width * (1/200); 
        }
        var tiny_hex = new Hexagon({x: indentSpace, y: infoCaption.y + infoCaption.height/2}, 0, pl_radius);
        tiny_hex.graphics.lineStyle(6, 0xFFFFFF);

        //  mask_hex.graphics.on("pointerdown",moveLogin);
        tiny_hex.draw(0xFFFFFF, 0);
        tiny_hex.graphics.beginFill(0xDE3249);
        tiny_hex.graphics.endFill();
        app.stage.removeChild(tiny_hex.container);
        hexContainer.addChild(tiny_hex.container);

        var infoCaption2 = new PIXI.Text(info2, ps_caption_style);
        infoCaption2.x = indentSpace + hex.width/50;
        infoCaption2.y = infoCaption.y + infoCaption.height;
        textContainer.addChild(infoCaption2);

        pl_radius = 0;
        if (app.screen.width >= app.screen.height){ 
            pl_radius = app.screen.height * (1/200);
        }else{ 
            pl_radius = app.screen.width * (1/200); 
        }
        var tiny_hex2 = new Hexagon({x: indentSpace, y: infoCaption2.y + infoCaption2.height/2}, 0, pl_radius);
        tiny_hex2.graphics.lineStyle(6, 0xFFFFFF);

        //  mask_hex.graphics.on("pointerdown",moveLogin);
        tiny_hex2.draw(0xFFFFFF, 0);
        tiny_hex2.graphics.beginFill(0xDE3249);
        tiny_hex2.graphics.endFill();
        app.stage.removeChild(tiny_hex2.container);
        hexContainer.addChild(tiny_hex2.container);
        // end filling
        hex.endFill();

        // hex.interactive = true;
        // hex.buttonMode = true;
        // hex.on('pointerdown', clickSource);

        //mask_hex.y - pl_radius, mask_hex.x + pl_radius * 2  + app.screen.width* (5.5/8)
        var selected_Icon = new PIXI.Sprite.from('Images/selected_icon2.png')
        selected_Icon.width = 30;
        selected_Icon.height = 30;
        selected_Icon.x = app.screen.width * 7.2/8;
        selected_Icon.y= y_origin -20
        selected_Icon.alpha = 0;
        source_infoContainer.addChild(selected_Icon)
        console.log(selected_Icon.x + "     " +selected_Icon.y);

        // add child to the container

        
        //sourceDescriptionBoxes.push(hex);
        source_infoContainer.addChild(hex);
        source_infoContainer.addChild(textContainer);
        source_infoContainer.addChild(hexContainer);
        source_infoContainer.x = app.stage.width + 10;

        var newSource = new SourceElement(source_infoContainer, current_Id);
        sourcesArray.push(newSource);
        app.stage.addChild(source_infoContainer);

        y_origin += app.screen.height/4;
        current_Id++;
    }

    sourcesArray.forEach(element => {
        element.container.getChildAt(2).interactive = true;
        element.container.getChildAt(2).buttonMode = true;
        element.container.getChildAt(2).on('pointerdown', function(){
            clickSource(element);
        });
    });
}


function showInstitutions(startX, startY, inScale){
    var x = startX
    var y = startY
    var scale = inScale;
    var temp = x;
    var incX = 100 * ((scale -2.3) + 1.0);
    var incY = 120 * ((scale -2.0) + 1.0);
    for (var i = 0; i < insImages.length; i++, x += incX *2 ) {
        var ins_infoContainer = new PIXI.Container();
        
        var newSprite = new PIXI.Sprite.from(insImages[i]);
        newSprite.width = 100 * (((scale-2.1) * 0.5) + 1.0);
        newSprite.height = 100 * (((scale-2.1) * 0.5) + 1.0);
        newSprite.x = x + 70 * ((scale-2.0) + 1.0);
        newSprite.y = y + 1 * ((scale-2.0) + 1.0);

        var hex = new PIXI.Graphics();
        // set color as white (0xffffff), line thickness as 3
        hex.lineStyle(2,0x808080, 3);
        // fill hexagon with grey (0x808080)
        hex.beginFill(0xffffff);
        // draw hexagon for institution
        hex.drawPolygon([x+(34.8 + 4)*scale, y, x+(34.8*2 + 4)*scale, y+20*scale, x+(34.8*2 + 4)*scale, y+60*scale, x+(34.8 + 4)*scale, y+80*scale, x+4*scale ,y+60*scale, x+4*scale, y+20*scale]);
        hex.endFill();
        //newSprite.mask = hex;

        //Outline Hexegon
        var hex1 = new PIXI.Graphics();
        hex1.lineStyle(2, 0x808080, 4);
        // draw hexagon for institution
        hex1.drawPolygon([x+(34.8 + 4)*scale, y, x+(34.8*2 + 4)*scale, y+20*scale, x+(34.8*2 + 4)*scale, y+60*scale, x+(34.8 + 4)*scale, y+80*scale, x+4*scale ,y+60*scale, x+4*scale, y+20*scale]);
       
        var texture = app.renderer.generateTexture(hex);
        var sprite = new PIXI.Sprite(texture);
        sprite.x = x+(34.8 + 4)*scale
        sprite.y = y
        ins_infoContainer.addChild(sprite);

        var texture1 = app.renderer.generateTexture(hex1);
        var sprite1 = new PIXI.Sprite(texture1);
        sprite1.x = x+(34.8 + 4)*scale
        sprite1.y = y
        ins_infoContainer.addChild(sprite1);

        sprite.anchor.set(0.5);
        sprite1.anchor.set(0.5);
        newSprite.anchor.set(0.5);

        //ins_infoContainer.addChild(hex);
        //ins_infoContainer.addChild(hex1);
        ins_infoContainer.addChild(newSprite);
        ins_infoContainer.pivot.x = (ins_infoContainer.width/2)
        ins_infoContainer.pivot.y = (ins_infoContainer.height/2)
        

        var newInstitution = new Institution(insImages[i], i, ins_infoContainer);
        institutionArray.push(newInstitution);

        //make the align zigzag
        var compare = i % 4;
        if ( compare == 1 && i != 0 ){
            x -= incX*3
            y += incY;
        } else if ( compare == 3){
            x = temp - incX * 2;
            y += incY;
        } 
    } 
}
