const LI_style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#A50037'], // gradient
    align: 'center',
    stroke: '#000070',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 500,
});

//Text style for words appearing on graph
const LI_graphText = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 7,
    align: 'center',
});