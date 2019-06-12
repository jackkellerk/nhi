// Determining what activity we are on
var currentActivity = 'Welcome';
var activityArray = ['Welcome', 'Windows', 'Zoom', 'Multispectrum', 'Line', 'Tilting', 'Multi-block'];

/* These are global variables for Multi-block */

// Instantiate the PIXI JS Graphics Library (this is for the UI stuff)
var graphics = new PIXI.Graphics();
var additionalButtons = new PIXI.Graphics();
var dragImage = null;

// These are the variables for the highlight function in Multi-block
var initialXMousePosition;
var initialYMousePosition;
var boxArray = [];
var comparisonBoxArray = [];
var informationBoxArray = [];
var intensity = []; // holds values for pixel intensity
var offset = 50; // 50 pixels between comparison boxes
var width;
var height;

// These are the variables for the annotation feature in Multi-block
var strokeArray = [];
var drawingArray = [];

// Variables for rotation feature
var clockwiseRotation = null;

// This is for the instruction feature
var instructionContainer = new PIXI.Container();

/* End of Multi-block global variables */



/* Begin of Window System global variables */

// for popup window
var PopupContainer = new PIXI.Container();

/* End of Window System global variables */
