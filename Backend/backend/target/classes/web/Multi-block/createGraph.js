//Text style for information concerning line data
const lumStyle = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 12,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#C70039'], // gradient
    align: 'center',
    stroke: '#4a1850',
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
const graphText = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 7,
    align: 'center',
});


// Not mine
function MB_createGraph() {

            //Tells user how to use application
            //Text will change along with process
            const richText = new PIXI.Text('', style);
            richText.x = app.screen.width/2 - 250;
            richText.y = 0;
            app.stage.addChild(richText);
            //Some constants initialized here to be used later
            //Slope text is used to show details about the line drawn
            const slopeText = new PIXI.Text('', lumStyle);
            //Graphics concern the line itself
            const graphics = new PIXI.Graphics();
            //Graphs deals with the actual graph drawn as a result to the line data
            const graphs = new PIXI.Graphics();
            //This container will hold all the horizontal graph text
            const hTextContainer = new PIXI.Container(); 
            app.stage.addChild(hTextContainer);
            //This container will hold all the vertical graph text
            const vTextContainer = new PIXI.Container();    
            app.stage.addChild(vTextContainer);


                //Resets graph related visuals
                graphs.clear();
                hTextContainer.removeChildren();
                vTextContainer.removeChildren();

                //Create a rectangle
                //Outside boundary 
                var boundary_tlx = app.screen.width / 2;
                var boundary_tly = app.screen.height / 2;
                var boundaryWidth = 500;
                var boundaryHeight = 300;
                graphs.lineStyle(1, 0x000000, 1);
                graphs.beginFill(0xffffff);
                graphs.drawRect(boundary_tlx, boundary_tly, boundaryWidth, boundaryHeight);
                graphs.endFill();
                app.stage.addChild(graphs);

                //Inner graph
                var graph_tlx = boundary_tlx + 50;
                var graph_tly = boundary_tly + 25;
                var graphWidth = 425;
                var graphHeight = 225;
                graphs.lineStyle(1, 0x000000, 1);
                graphs.beginFill(0xffffff);
                graphs.drawRect(graph_tlx, graph_tly, graphWidth, graphHeight);
                graphs.endFill();
                app.stage.addChild(graphs);

                //This takes care of the horizontal segements of the graph
                var horizontalColumns = 10;
                var horizontalHalfSpacing = graphWidth / (horizontalColumns * 2);    //Spacing between each noted index
                var horizontalDashY = graph_tly + graphHeight;      //Starting point for everything (Bottom of graph)
                var horizontalDashX = graph_tlx;        //Left hand side
                var currentX = horizontalDashX + horizontalHalfSpacing;     //Off sets the first element
                
                var horizontalText = [];   //Text to be used
                for (var i = 0; i <= horizontalColumns; i++) {
                    horizontalText.push(Math.floor((intensity.length / 10) * i));
                }
                for (var i = 0; i < horizontalColumns; i++) {
                    graphs.lineStyle(1, 0x000000)               //Creates a line to indicate the index
                        .moveTo(currentX, horizontalDashY - 5)
                        .lineTo(currentX, horizontalDashY + 5);

                    const hText = new PIXI.Text(horizontalText[i], graphText);  //Adds text underneath it
                    hText.x = currentX - hText.width/2;
                    hText.y = horizontalDashY + 10;
                    hTextContainer.addChild(hText);

                    graphs.lineStyle(1, 0x33FFFC)               //Creates the background lines for the graph
                        .moveTo(currentX, horizontalDashY - graphHeight)
                        .lineTo(currentX, horizontalDashY);
                    currentX += 2 * horizontalHalfSpacing;
                }
                app.stage.addChild(hTextContainer);

                //This takes care of the vertical segements of the graph
                var verticalRows = 15;
                var verticalSpacing = graphHeight / verticalRows;
                var verticalDashY = graph_tly + graphHeight;
                var verticalDashX = graph_tlx;
                var currentY = verticalDashY;
               // var verticalText = ["51", "102", "153", "204", "255"];
                var verticalText = [];
                var verticalValueSpacing = 20;
                var counter = 0;
                for (var i = 0; i <= verticalRows; i++) {
                    verticalText.push(Math.floor(counter));
                    counter += verticalValueSpacing;
                }

                for (var i = 0; i <= verticalRows; i++) {
                    const vText = new PIXI.Text(verticalText[i], graphText);
                    vText.x = verticalDashX - 20;
                    graphs.lineStyle(1, 0x000000)
                        .moveTo(verticalDashX - 5, currentY)
                        .lineTo(verticalDashX, currentY);
                    if (i != 0) {
                        graphs.lineStyle(1, 0x33FFFC)
                            .moveTo(verticalDashX, currentY)
                            .lineTo(verticalDashX + graphWidth, currentY);
                    }
                    vText.y = currentY - (vText.height) / 2;
                    vTextContainer.addChild(vText);
                    currentY -= verticalSpacing;
                }
                app.stage.addChild(vTextContainer);


                //This plots the actual data of the graph 
                
                var arrayLength = intensity.length; //used for loop bounds
                var valueSpacing = graphHeight;   //finds pixel length of each individual y value (y-axis)
                var entrySpacing = (graphWidth - (horizontalHalfSpacing * 2)) / arrayLength;    //Spacing between each entry (x-axis)
                var entryStartY = graph_tly + graphHeight;      //Starting point for everything (Bottom of graph)
                var entryStartX = graph_tlx + horizontalHalfSpacing;        //Left hand side
                var entryCurrentX = entryStartX;
                for (var i = 0; i < arrayLength; i++) {
                    var peakCheck = false;
                    var peakLength = line.peakData.length;
                    for (var j = 0; j < peakLength; j++) {
                        if (i == line.peakData[j]) {
                            peakCheck = true;
                            break;
                        }//end if
                    }//end for
                    var valleyCheck = false;
                    var valleyLength = line.valleyData.length;
                    for (var j = 0; j < valleyLength; j++) {
                        if (i == line.valleyData[j]) {
                            valleyCheck = true;
                            break;
                        }//end if
                    }//end for
                    if (peakCheck) {
                        slopeText.text += '\n' + 'Drawing peak at ' + i; //Used for testing not necessary
                        
                        graphs.lineStyle(2, 0x165F0A)               //Creates bar for the ith entry of the bar graph
                            .moveTo(entryCurrentX - 1, entryStartY)
                            .lineTo(entryCurrentX - 1, entryStartY - (valueSpacing * (line.lineDataPoints[i])));
                    }// end if
                    else if (valleyCheck) {
                        slopeText.text += '\n' + 'Drawing valley at ' + i; //Used for testing not necessary
                       // if (i == peakStart || i == peakEnd) {
                            graphs.lineStyle(2, 0x0A175F)               //Creates bar for the ith entry of the bar graph
                                .moveTo(entryCurrentX - 1, entryStartY)
                                .lineTo(entryCurrentX - 1, graph_tly);
                      //  }
                      /*  else {
                            graphs.lineStyle(2, 0x0A175F)               //Creates bar for the ith entry of the bar graph
                                .moveTo(entryCurrentX - 1, entryStartY)
                                .lineTo(entryCurrentX - 1, entryStartY - (valueSpacing * (lineDataPoints[i] - minValue)));
                        }*/
                    }// end else if
                    else {
                        graphs.lineStyle(2, 0xC70039)               //Creates bar for the ith entry of the bar graph
                            .moveTo(entryCurrentX - 1, entryStartY)
                            .lineTo(entryCurrentX - 1, entryStartY - (valueSpacing * (line.lineDataPoints[i])));
                    }// end else
                    entryCurrentX += entrySpacing;
                }//end of for loop

                //Draw baseline
                graphs.lineStyle(1, 0x4A235A)
                    .moveTo(verticalDashX, entryStartY - (valueSpacing * (line.baseline)))
                    .lineTo(verticalDashX + graphWidth, entryStartY - (valueSpacing * (line.baseline)));
                

            }//end of create graph
