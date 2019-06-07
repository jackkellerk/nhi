
var grainboundary_btn = new RectButton(80, 100, 40, 315, 'Jack Multi-Block Analysis', "Multiblock.jpg");
var lineintegral_btn = new RectButton(80, 170, 40, 315, 'Travis Line-Integral Analysis', "LineIntegral.jpg");
var lowmag_btn = new RectButton(80, 240, 40, 315, 'Eddie Low Magnification Imaging', "LowMag.jpg");
var multispec1_btn = new RectButton(80, 310, 40, 315, 'Desai Multispectrum Interface', "Multispectrum.jpg");;

var sources = ["Multiblock.jpg", "LineIntegral.jpg", "LowMag.jpg", "Multispectrum.jpg"];

function RectButton(x_position, y_position, height, width, text, source){
    var graphics = new PIXI.Graphics();
    graphics.beginFill(0xFFFFFF, 1); // Color and opacity
    graphics.lineStyle(2, 0x414141, 1);
    graphics.drawRect(x_position, y_position, width, height);
    graphics.endFill();
    graphics.interactive = true;
    graphics.on('mouseover', onHoverOver) // When mouse hovers over the button, it calls onHoverOver() function
    .on('mouseout', onHoverOff)
    .on('pointerdown', onSelect);
    graphics.alpha = 0.5;
    app.stage.addChild(graphics);

    const label = new PIXI.Text(text, {fontFamily: "Georgia", fontSize: 18, fill: 0x2F4F4F});
    label.position.x = x_position + 18;
    label.position.y = y_position + 10;
    app.stage.addChild(label);
}

function onHoverOver(event){
    this.data = event.data;
    this.alpha = 1;
}

function onHoverOff(event){
    this.data = event.data;
    this.alpha = 0.5;
}

var modal = document.getElementById("myModal");
var images = document.getElementsByClassName("myImages");
var modalImg = document.getElementById("img01");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

function onSelect(event) {
    this.data = event.data;
    modal.style.display = "block";
    modalImg.src = sources[0];
}

span.onclick = function() { 
    modal.style.display = "none";
}
