import nhi
import numpy as np
from PIL import Image

image = Image.open('example.jpg')

for i in range(image.height):
    percentage = float(i / image.height)
    nhi.progress(percentage)
    for j in range(image.width):
        current_color = image.getpixel( (j, i) )
        new_color = current_color + 100
        image.putpixel( (j, i), new_color)

nhi.output(image)