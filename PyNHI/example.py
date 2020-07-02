import nhi
from PIL import Image

image = Image.open('example.jpg')

for y in range(image.height):

    percentage = float(y / image.height)
    nhi.progress(percentage)

    for x in range(image.width):
        current_color = image.getpixel( (x, y) )
        new_color = current_color + 100
        image.putpixel( (x, y), new_color)

nhi.output(image)