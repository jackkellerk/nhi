// Determining what activity we are on
var currentActivity = 'Welcome';
var activityArray = ['Welcome', 'AllProjects', 'Windows', 'NewProject', 'Source', 'Zoom', 'Multispectrum', 'Line', 'Tilting', 'Multi-block'];
var create_project = 0;


/* Pre Login Screen gloval vars */
//Edited by Travis
var preDisplayQuote = new PIXI.Text();
var preDisplayAuthor = new PIXI.Text();

var login_UI = new PIXI.Graphics();
var Inner_Login_UI = new PIXI.Graphics();
var signUp_UI = new PIXI.Graphics();

var preLoginText = new PIXI.Text();
var loginText = new PIXI.Text();
var signUpText = new PIXI.Text();

var initialActivation = true;



/* These are global variables for Multi-block */

var MBContainer = new PIXI.Container();

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



/* Start of global variables for Zoom (LMSI) */
var richText;
/* End of global variables for Zoom (LMSI) */


/* Start of global variables for New Project */
let clickedOption;
let selectedChoices = [];
let newProjectAnswers = [];  // each element in the array is {option: "", choices: ["", ...]}
let newProjectProperties;  // processed JSON object of newProjectAnswers
/* End of global variables for New Project */

var threeJSMove = false;
var currentThreeJSInstance = null;
