<!--Be able to display images to the screen in separate windows.
    Be able to open and close windows with static images.
    Resizing, moving windows is not necessary.-->

<!doctype html>
<html>

<script src="pixi.min.js"></script>

<!--set browser's default margins and padding to 0 on all HTML elements.-->
<style>* {padding: 0; margin: 0}</style>

<head>
  <meta charset="utf-8">
  <title>Windowing System</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <style>
    .modal {
      display: none; /* Hidden by default */
      position: fixed; /* Stay in place */
      z-index: 1; /* Sit on top */
      padding-top: 0px; /* Location of the box */
      left: 0;
      top: 0;
      width: 100%; /* Full width */
      height: 100%; /* Full height */
      overflow: auto; /* Enable scroll if needed */
      background-color: rgb(0,0,0); /* Fallback color */
      background-color: rgba(0,0,0,0.9); /* Black w/ opacity */
    }
    
    .modal-content {
      margin: auto;
      display: block;
      height: 100%;
      max-width: 800px;
    }
    
    /* The Close Button */
    .close {
      position: absolute;
      top: 15px;
      right: 35px;
      color: #f1f1f1;
      font-size: 40px;
      font-weight: bold;
      transition: 0.3s;
    }
    
    .close:hover, .close:focus {
      color: #bbb;
      text-decoration: none;
      cursor: pointer;
    }
    </style>
</head>

<body>
  <!-- The Modal -->
  <div id="myModal" class="modal">
    <span class="close">&times;</span>
    <img class="modal-content" id="img01">
  </div>

  <h1 style="color:darkslategray;">Nano Human Interface</h1>

  <script type="text/javascript">
      let type = "WebGL"
      if(!PIXI.utils.isWebGLSupported()){
        type = "canvas"
      }
      PIXI.utils.sayHello(type);

      const app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        antialias: true,
        transparent: false,
        resolution: devicePixelRatio,
        autoResize: true,
        backgroundColor: 0xC9D5DA
      });
      document.body.appendChild(app.view);

      window.addEventListener("resize", resize);

      function resize() {
        const parent = app.view.parentNode;
        app.renderer.resize(parent.clientWidth, parent.clientHeight);
        app.render();
      }

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
  </script>

</body>
</html>