# PyNHI Documentation
-----
## Setup
Good news, creating custom image analysis scripts for the interface is very easy if you know some Python! Don't worry if you don't know Python, it is not hard to pick up! Before we examine any examples, make sure you install [Python](https://www.python.org/downloads/). After you have done that, install the nhi package and the Pillow package using pip in the command line:
    `> pip install Pillow`
    `> pip install nhi`

## Use of functions
When writing scripts, it is important to be cognizant of the two functions in the nhi package: 1) nhi.progress and 2) nhi.output. The progress function accepts either an integer or a float as the sole parameter; it updates the user in the interface on your script's progress. You can either stagger the progress function throughout your code or use it in a for loop --- you can see some examples down below. You can write a custom script without using the progress functon, however, you cannot write a script without the output function! The output function has one mandatory parameter of PIL image type; the other parameters are 1) new_window, 2) path, and 3) file_extension. *new_window* is a boolean that specifies whether a new window should be created in the interface with the resulting image. *path* is a string that specifies the location on the computer where your image will be saved. __N.B. while running your custom script in the interface, path should not be changed! It is for debugging purposes only!__ *file_extension* is a string specifing the file format the image will be saved in (png, jpg, tif).
    
Ok, now let's run through some basic examples!
## Examples
1. Adding a light tint to your image
    ```
    # These are the dependencies to import
    import nhi
    from PIL import Image
    
    # Open the image using the Image.open function
    image = Image.open('path/to/image.[png, jpg, tif]')
    
    # Create a for loop to run through each column of pixels in the image (think of your image as a 2D matrix)
    for y in range(image.height):
    
        # Create a variable to update the user on the script's progress
        percentage = float(y / image.height)
        nhi.progress(percentage)
    
        # Create a for loop to run through each row of pixels in the image (think of your image as a 2D matrix)
        for x in range(image.width):
            
            # current_color holds each pixel's intensity value (think of your image as a 2D matrix)
            current_color = image.getpixel( (x, y) )
            
            # new_color is the modified version of the pixel intensity
            new_color = current_color + 100
            
            # Assign the new_color to the pixel in the image
            image.putpixel( (x, y), new_color)
    
    # Call the output function
    nhi.output(image, path="example", file_extension=".png")
    ```
    You should now be able to run the Python script from the command line:
    `> python example.py`
    
    As you run the script, in your command line, you will see a progress bar or percentages showing you the script's progress. At the end, it will display "Done". You can then look into the same directory as your Python script and see example.png, your updated image!
    
2. Can't find what you want to do in one of our examples? No problem! Try Google searching "Python [whatever you want to do to your image]" and something should show up (typically from Stack Overflow). Have fun!

# FAQ
- Why am I seeing "Error; Make sure image is a PIL image. When running the script on the interface ensure that you are not overriding the path parameter!" in the interface?
    -  You are having an error in your nhi.output function. As the error states, ensure that your first parameter is of type PIL image and that you haven't edited the path parameter. Example: `nhi.output(image)

# Contact
- Jack Kellerk (jjk322@lehigh.edu)