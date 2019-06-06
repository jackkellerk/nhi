<!--Be able to display images to the screen in separate windows.
    Be able to open and close windows with static images.
    Resizing, moving windows is not necessary.-->

<!doctype html>
<html>

<head>
  <meta charset="utf-8">
  <title>Windowing System</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<script src="pixi.min.js"></script>

<!--set browser's default margins and padding to 0 on all HTML elements.-->
<style>* {padding: 0; margin: 0}</style>

<body>
  <h1 style="color:darkslategray;">Nano Human Interface</h1>

  <button class="btn jack">Jack Grain Boundary Analysis</button>
  <button class="btn travis">Travis Line-Integral Analysis</button>
  <button class="btn eddie">Eddie Low Magnification Image</button>
  <button class="btn desai">Desai Multispectrum Analysis</button>

  <style>
    .btn {
      background-color: rgb(94, 142, 156);
      color: white;
      text-align: center;
      display: inline-block;
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
      position: absolute;
      left: 80px;
    }
  
    .btn:hover {
      background: white;
      color: rgb(94, 142, 156);
    }
    .jack {top: 110px;}
    .travis {top: 170px;}
    .eddie {top: 230px;}
    .desai {top: 290px;}
  </style>

  <script type="text/javascript">
      let type = "WebGL"
      if(!PIXI.utils.isWebGLSupported()){
        type = "canvas"
      }
      PIXI.utils.sayHello(type)

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
  </script>

</body>
</html>