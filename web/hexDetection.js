// boolean to determine whether the point is in the triangle
var isTri = false;

// variables for points to check, points of triangle
var AB, BC, AZ;
var t1, t2;

/**
 * function getHex() gets (x,y) coordinates to test whether (x,y) is in area represented by hexArr.
 * hexArr includes all 6 points of hexagon
 * @param x x_coordinate of the point to test
 * @param y y_coordinate of the point to test
 * @param hexArr array including all points of the hexagon
 */
function getHex(x, y, hexArr) {

    // collisionDetect_tri(x, y, hexArr[0], hexArr[1], hexArr[2]);
}

/**
 * collisionDetect_tri gets location (x,y) to check and points of triangle in array, return true if the point is in triangle.
 * @param {} x 
 * @param {*} y 
 * @param {*} triArr 
 */
function collisionDetect_tri(x, y, _triArr) {

}

/**
 * 
 * @param {*} p0
 * @param {*} p1 
 * @param {*} p2 
 * @param {*} p3 
 */
function collisionDetect_tri(p0, p1, p2, p3) {

    isTri = false;

    // calculate two vector of triangle, using 3 points
    AB = math.subtract(p2, p1);
    AC = math.subtract(p3, p1);

    // calculate line equation of dot 'z' (p0)
    AZ = math.subtract(p0, p1);

    // A dot 'z' (p0) on 2D plane can be showed with linear equation
    // t1 * AB + t2 * AC = AZ;
    // AB.x * t1 + AC.x * t2 = AZ.x
    // AB.y * t1 + AC.y * t2 = AZ.y

    // AB[0] * t1 + AC[0] * t2 = AZ[0]
    // AB[1] * t1 + AC[1] * t2 = AZ[1]
    // t1 = (AZ[0] - (AC[0] * t2)) / AB[0]
    // t2 = (AB[1] * (AZ[0] - (AC[0] * t2))) / AB[0] + AC[1] * t2 = AZ[1]
    //    = (AZ[1] - (AB[1] * (AZ[0] - (AC[0] * t2))) / AB[0]) / AC[1]

    t2 = AZ[1] / (AC[1] - (AB[1] * AC[0] / AB[0]));
    t1 = (AZ[0] - (AC[0] * t2)) / AB[0];

    
    if (AB[0] == 0) {
        console.log("hi!");
        t2 = AZ[1] / (AC[1] - (AB[1] * AC[0] / AB[0]));
        t1 = (AZ[0] - (AC[0] * t2)) / AB[0];
    }

    console.log("triangle points: " + AB[0] + " " + AB[1] + ", " + p3[0] + " " + p3[1]);
    console.log("t1: " + t1 + "t2: " + t2);
    console.log("points: " + p0[0] + " " + p0[1]);

    if (t1 >= 0 && t1 <= 1) {
        if (t2 >= 0 && t2 <= 1) {
            if (t1 + t2 <= 1) isTri = true;
        }
    }

    console.log("isTri: " + isTri);

    return isTri;
}