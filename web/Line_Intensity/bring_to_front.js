/**
* In situations where you may have images place on top of one another this will help bring those behind
* into the front. This occurs by finding the parent of the given image, then the image is removed and then readded 
* to the parent which effectivelyplaces the image on top of everything else.
* @param image the sprite/graphic/etc that needs to be brought to the front
*/
function bringToFront(image) {
    if (image.parent) {
        var parent = image.parent;
        parent.removeChild(image);
        parent.addChild(image);
    }
}