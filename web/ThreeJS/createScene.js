// MAIN

// Size of window from createWindow.js
var width = 1.3*screen.height-10;
var height = 0.73125*screen.height-30;
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
function initThreeJS() {

  // Create a canvas
  canvas = document.createElement('CANVAS');
  canvas.setAttribute("id", "threejsCanvas");
  /* canvas.width = width;
  canvas.height = height;
  canvas.style.left = xPositionWindow + "px";
  canvas.style.top = yPositionWindow + "px"; Testing to see if we even need to load in a second canvas */

  // SCENE
  scene = new THREE.Scene();
  // CAMERA
  var SCREEN_WIDTH = window.innerWidth,
    SCREEN_HEIGHT = window.innerHeight;
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
  renderer.setSize(width, height);
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
  // STATS
  /* stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.bottom = '0px';
  stats.domElement.style.zIndex = 100;
  container.appendChild(stats.domElement); */
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
  /* var wireframeMaterial = new THREE.MeshBasicMaterial({
    color: 0x000088, wireframe = true
  }); */

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
  /* var cubeGeometry = new THREE.CubeGeometry(50, 50, 50);
  
  cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.set(0, 26, 0);
  cube.name = "cube";
  scene.add(cube); */

  // initialize object to perform world/screen calculations
  projector = new THREE.Projector();

  // when the mouse moves, call the given function
  document.addEventListener('mousemove', onDocumentMouseMove, false);



 // Create window
  var firstImage = true;
  window3d = new SpecialWindow("Images/3D-test.jpg");
  window3d.drawWindow();

  window3d.tool1.interactive = true;
  window3d.tool1.on('pointerdown', function(){
    if (firstImage) {
      window3d.refreshImage("Images/3D-test2.jpg");
      firstImage = false;
    }
    else if (!firstImage) {
      window3d.refreshImage("Images/3D-test.jpg");
      firstImage = true;
    }
  });

  window3d.closeWindowMenu.close.interactive = true;
  window3d.closeWindowMenu.close.on('mouseover', function(){ window3d.closeWindowMenu.close.alpha = 0.7; });
  window3d.closeWindowMenu.close.on('mouseout', function(){ window3d.closeWindowMenu.close.alpha = 0.4; });
  window3d.closeWindowMenu.close.on('pointerdown', function(){
    app.stage.removeChild(window3d.closeWindowMenu.container);
  });

  window3d.closeWindowMenu.leftButton.interactive = true;
  window3d.closeWindowMenu.leftButton.on('mouseover', function(){ window3d.closeWindowMenu.leftButton.alpha = 1; });
  window3d.closeWindowMenu.leftButton.on('mouseout', function(){ window3d.closeWindowMenu.leftButton.alpha = 0.7; });
  window3d.closeWindowMenu.leftButton.on('pointerdown', function(){
    app.stage.removeChild(window3d.closeWindowMenu.container);
    app.stage.removeChild(window3d.container);
    Acc = 0;
  });

  window3d.closeWindowMenu.rightButton.interactive = true;
  window3d.closeWindowMenu.rightButton.on('mouseover', function(){ window3d.closeWindowMenu.rightButton.alpha = 1; });
  window3d.closeWindowMenu.rightButton.on('mouseout', function(){ window3d.closeWindowMenu.rightButton.alpha = 0.7; });
  window3d.closeWindowMenu.rightButton.on('pointerdown', function(){
    app.stage.removeChild(window3d.closeWindowMenu.container);
  });

  window3d.closeIcon.interactive = true;
  window3d.closeIcon.on('mouseover', function(){ window3d.closeIcon.alpha = 1; });
  window3d.closeIcon.on('mouseout', function(){ window3d.closeIcon.alpha = 0.8; });
  window3d.closeIcon.on('pointerdown', function(){
    app.stage.addChild(window3d.closeWindowMenu.container); 
  });

  window3d.minIcon.interactive = true;
  window3d.minIcon.on('mouseover', function(){ window3d.minIcon.alpha = 1; });
  window3d.minIcon.on('mouseout', function(){ window3d.minIcon.alpha = 0.8; });
  window3d.minIcon.on('pointerdown', function(){
    window3d.isOpen = false;
    app.stage.removeChild(window3d.container);
    app.stage.removeChild(tintBg); 
  });


  animate();
}

function onDocumentMouseMove(event) {
  // the following line would stop any other event handler from firing
  // (such as the mouse's TrackballControls)
  // event.preventDefault();

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
    var imgData = renderer.domElement.toDataURL("image/jpeg");
    var image = new Image();
    image.src = imgData;
    console.log("framerate");
    camera.position.x = radius * Math.cos( angle );  
camera.position.z = radius * Math.sin( angle );
angle += 0.01;
    window3d.refreshImage(image);
  
  requestAnimationFrame(animate);
  render();
  // update(); For now while testing, bring back later
}
var intersecting = false;
function update() {
  // find intersections

  // create a Ray with origin at the mouse position
  //   and direction into the scene (camera direction)
  var vector = new THREE.Vector3(mouse.x, mouse.y, 1);
  vector.unproject(camera);
  var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

  // create an array containing all objects in the scene with which the ray intersects
  var intersects = ray.intersectObjects(scene.children, true);

  // INTERSECTED = the object in the scene currently closest to the camera 
  //		and intersected by the Ray projected from the mouse position 	

  // if there is one (or more) intersections
  if (intersects.length > 1) {
    console.log(intersects[1].object.name);
    // if the closest object intersected is not the currently stored intersection object
    if (intersects[1].object != INTERSECTED) {
      // restore previous intersection object (if it exists) to its original color
      if (INTERSECTED)
        INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
      // store reference to closest object as current intersection object
      INTERSECTED = intersects[1].object;
      // store color of closest object (for later restoration)
      INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
      // set a new color for closest object
      if(intersects[1].object.name == "newcube")
      {
        INTERSECTED.material.color.setHex(0xffff00);
        intersecting = true;
      }
      else{
        intersecting = false;
      }
        
    }
  } else // there are no intersections
  {
    // restore previous intersection object (if it exists) to its original color
    if (INTERSECTED)
      INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
    // remove previous intersection object reference
    //     by setting current intersection object to "nothing"
    INTERSECTED = null;
  }

  controls.update();
  //stats.update();
}

function changeScene()
{
  if(intersecting)
  {
    scene.getObjectByName( "hockeypuck" ).visible = false;
    scene.getObjectByName( "newcube" ).material.wireframe = true;

    var newMaterial = new THREE.MeshBasicMaterial({ color: 0x32CD32 });
    
    var loader = new THREE.OBJLoader();
    // LOAD HOCKEYPUCK
    loader.load(
    'cubetwo.obj',
    function(object)
    {
      object.traverse( function( child ) {
            if ( child instanceof THREE.Mesh ) {
                child.name = "cubetwo";
                child.material = newMaterial;
                child.castShadow = true;
                child.receiveShadow = true;
            }
        } );
      object.castShadow = true;
      object.receiveShadow = true;
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
  }
}

function render() {
  renderer.render(scene, camera);
}