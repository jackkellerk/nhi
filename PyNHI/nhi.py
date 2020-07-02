# nhi.py uses Python 3.5+
# PIL is a dependency of nhi
from PIL import Image
import numpy as np
import sys

# This function can be used to update the user on the completion of the code in the interface

""" Parameters
    percentage is eithera float or an int to represent the percentage of the code completed """

def progress(percentage):
    if isinstance(percentage, int):
        print(str(percentage) + "%")
    elif isinstance(percentage, float):
        print(str(percentage * 100) + "%")
    else:
        pass

# This is the output function users will call once they are done with their script

""" Parameters:
    image is an image represented as a PIL Image;
    new_window is a varaible to specify whether the frontend will either (False): update the existing window's image or (True): instantiate a new window;
    path is a variable to represent the path to save the image;
    file_extension is a variable to represent what to save the image as (.png, .jpg, .tiff, etc.);
    color is a variable to specify whether the image should be either colorized or greyscale ('RGB', 'L') """

def output(image, new_window=False, path=sys.argv[-1], file_extension='.png', color='RGB'):
    image.save(path + file_extension)
    if new_window:
        print("Done, create new window")
    else:
        print("Done")