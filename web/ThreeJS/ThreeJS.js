class ThreeJS
{
    constructor(imagePath, parent)
    {
        this.parent = parent;

        this.threeJSContainer = new PIXI.Container();

        // initial image displayed in window
        this.imagePath = imagePath;
        this.image = new PIXI.Sprite.from(imagePath);
        this.image.on('pointerdown', onMoveThreeJS)
        .on('pointerup', onExitThreeJS)
        .on('pointerupoutside', onExitThreeJS);
        this.image.mask = this.parent.windowRect;
        //this.parent.backgroundSprite = this.image;

        this.image.position.x = 0;
        this.image.position.y = 0;
        this.image.height = 0.73125*h - 30;
    }

    // function is called to change displayed image in window (called regularly for animated effect)
    refreshImage(imagePath)
    {
        //this.image.texture = PIXI.Texture.from(imagePath);
        //this.image.mask = this.windowRect;

        this.parent.backgroundSprite.texture = PIXI.Texture.from(imagePath);
        this.parent.backgroundSprite.mask = this.parent.windowRect;
    }

    UIBool(parameter)
    {
        this.threeJSContainer.visible = parameter;
    }
} 

// Size of window from createWindow.js
var SCREEN_WIDTH = 1.3*screen.height-10;
var SCREEN_HEIGHT = 0.73125*screen.height-30;
var angle = 0;
var radius = 500;

// standard global variables
var container, scene, camera, renderer, controls, stats, window3d, canvas;
var clock = new THREE.Clock();

// custom global variables
var cube;
var projector, mouse = {
    x: 0,
    y: 0
  },
  INTERSECTED;

// FUNCTIONS 		
function createThreeJS() {

  // Create a canvas
  canvas = document.createElement('CANVAS');
  canvas.setAttribute("id", "threejsCanvas");

  // SCENE
  scene = new THREE.Scene();
  // CAMERA
  var VIEW_ANGLE = 45,
    ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
    NEAR = 0.1,
    FAR = 20000;
  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  scene.add(camera);
  camera.position.set(0, 150, 400);
  camera.lookAt(scene.position);

  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  container = canvas;
  renderer.shadowMapEnabled = true;
renderer.shadowMapSoft = true;

renderer.shadowCameraNear = 3;
renderer.shadowCameraFar = camera.far;
renderer.shadowCameraFov = 50;

renderer.shadowMapBias = 0.0039;
renderer.shadowMapDarkness = 0.5;
renderer.shadowMapWidth = 1024;
renderer.shadowMapHeight = 1024;
container.appendChild(renderer.domElement);
  // EVENTS

  // CONTROLS
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  // LIGHT
  var light = new THREE.PointLight(0xffffff);
  light.position.set(0, 250, 0);
  light.castShadow = true;
  scene.add(light);
  // FLOOR
  var loader = new THREE.TextureLoader();
  var newMaterial = new THREE.MeshLambertMaterial( { color: 0xff0000, wireframe: true } );
  var floorTexture = loader.load('https://stemkoski.github.io/Three.js/images/checkerboard.jpg');
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(10, 10);
  var floorMaterial = new THREE.MeshBasicMaterial({
    map: floorTexture,
    side: THREE.DoubleSide
  });
  var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
  var floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.name = "floor";
  floor.position.y = -0.5;
  floor.rotation.x = Math.PI / 2;
  scene.add(floor);
  // SKYBOX/FOG
  var skyBoxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
  var skyBoxMaterial = new THREE.MeshBasicMaterial({
    color: 0x9999ff,
    side: THREE.BackSide
  });
  var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
  skyBox.name = "skyBox";
  scene.add(skyBox);

  var cubeMaterial = new THREE.MeshBasicMaterial({
    color: 0x000088
  });

  // OBJLOADER
  var loader = new THREE.OBJLoader();
  // LOAD CUBE
  loader.load(
    '../ThreeJS/cube.obj',
    function(object)
    {
      object.traverse( function( child ) {
            if ( child instanceof THREE.Mesh ) {
                child.name = "newcube";
                child.material = cubeMaterial;
            }
        } );
        object.position.y = 25;
      object.scale.set(24,24,24);
      scene.add(object);
    },
    function(xhr)
    {
      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    function(error)
    {
      console.log( 'An error happened' );
    }
  );
  // LOAD HOCKEYPUCK
  loader.load(
    '../ThreeJS/hockeypuck.obj',
    function(object)
    {
      object.traverse( function( child ) {
            if ( child instanceof THREE.Mesh ) {
                child.name = "hockeypuck";
                child.material.wireframe = true;
            }
        } );
      object.position.y = 25;
      object.scale.set(25,25,25);
      scene.add(object);
    },
    function(xhr)
    {
      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    function(error)
    {
      console.log( 'An error happened' );
    }
  );

  ////////////
  // CUSTOM //
  ////////////

  // initialize object to perform world/screen calculations
  projector = new THREE.Projector();

  // when the mouse moves, call the given function
  document.addEventListener('mousemove', onDocumentMouseMove, false);

  animate();
  setTimeout(function() {var imgData = renderer.domElement.toDataURL("image/jpeg");
  var image = new Image();
  image.src = imgData;
  currentThreeJSInstance.refreshImage(image);}, 200);
}

function onDocumentMouseMove(event) {
    // update the mouse variable
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }
  
function animate() {
  
      if(renderer == null)
      {
          console.log("this is null");
          return;
      }
      // This is where we capture the canvas' image
      var imgData = renderer.domElement.toDataURL("image/jpeg");
      var image = new Image();
      image.src = imgData;
      console.log("framerate");
      
      // Only render when the user does something with the mouse, otherwise ThreeJS lags!
      if((down || scrollUp || scrollDown) && threeJSMove)
      {
        currentThreeJSInstance.refreshImage(image);
        scrollUp = false;
        scrollDown = false;
      }
    
    requestAnimationFrame(animate);
    render();
    // update(); For now while testing, bring back later
}

// Renderer for ThreeJS
function render() {
    renderer.render(scene, camera);
}

// These functions are for moving the ThreeJS screen
function onMoveThreeJS(event)
{
    if(!threeJSMove)
    {
        threeJSMove = true;
    }
}

function onExitThreeJS(event)
{
    threeJSMove = false;
}