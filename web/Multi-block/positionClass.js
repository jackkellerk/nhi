class Position
{
    constructor(initial_x_position, initial_y_position)
    {
        // These coordinates refer to the top left corner with respect to the image
        // Remember the length of the image is multiplied by the scale (in our case it is 3)
        this.xPosition = initial_x_position;
        this.yPosition = initial_y_position;

        // These variables are here to calculate the change in mouse movement
        this.initialMouseX = 0;
        this.initialMouseY = 0;

        this.deltaX = 0;
        this.deltaY = 0;
    }
}