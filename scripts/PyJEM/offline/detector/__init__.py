#
##以下の書き方だと、function内のメソッドを利用できる。
"""
offline detector package
"""
from . import function
from .function import *



extention_list = ["jpg", "tif", "bmp", "png"]
detectors = function.get_attached_detector()
for i,word in enumerate(detectors):
    print(str(i) + " : " + word)