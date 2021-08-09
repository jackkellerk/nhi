# coding: utf-8

import datetime
from PIL import Image
import numpy as np
#import cv2
#
from . import function
from .. import base

def make_imagefile(object, extention, filename=None):
    '''
    | **Summary**
    |  Save the image data acquired with SnapShot to a file.
    | **Args**
    |  arg1: Instance of Type(Detector)
    |  arg2: "jpg", "png", "bmp", "tiff"
    |  arg3: Filename. If omitted, 'date_detectorname' becomes the file name
    | **return**
    |  None
    '''
    try:
        imagedata = object.snapshot(extention)
        if(imagedata == None):
            return "[Failed] Snapshot Error"
        # make image file
        if (filename == None):
            date = datetime.datetime.today()
            filename = date.strftime("%Y%m%d_%H%M_%S_") + object.__dict__["detector"]

        file = open(filename + "." + extention , "wb")
        file.write(imagedata)
        file.close()
    except:
        print("Put an instance of the  'Detector' class in the first argument.")

def get_imagefile(detector, extention, filename=None):
    '''
    | **Summary**
    |  Save the image data acquired with SnapShot to a file.
    | **Args**
    |  arg1: Instance of Type(Detector)
    |  arg2: "jpg", "png", "bmp", "tiff"
    |  arg3: Filename. If omitted, 'date_detectorname' becomes the file name
    | **return**
    |  None
    '''
    imagedata = function.Detector(detector).snapshot(extention)
    if (imagedata == None):
        return "[Failed] Snapshot Error"
    #ファイル名自動生成
    if (filename == None):
        date = datetime.datetime.today()
        filename = date.strftime("%Y%m%d_%H%M_%S_") + detector

    file = open(filename + "." + extention , "wb")
    file.write(imagedata)
    file.close()

def get_rapid_imagefile(detectorName, extention, filename=None):
    '''
    | **Summary**
    |  Save the image data acquired with SnapShot to a file.
    | **Args**
    |  arg1: Instance of Type(Detector)
    |  arg2: "jpg", "png", "bmp", "tiff"
    |  arg3: Filename. If omitted, 'date_detectorname' becomes the file name
    | **return**
    |  None
    '''
#    _path = base.capturefilepath()
    _path = base.imagefilepath
    _instance = function.Detector(detectorName)
    detectorData = _instance.get_detectorsetting()
#    detectorData = json.loads(detectorData.decode('utf-8'))
    #画像データのサイズの取得
    ImageSize = detectorData['OutputImageInformation']
    ImageSize = ImageSize['ImageSize']
    Height = ImageSize['Height']
    Width = ImageSize['Width']
    #画像の取得
    imagedata = _instance.snapshot_rawdata()
#    _img = np.frombuffer(imagedata, dtype=np.uint16)
#    _img = np.reshape(_img, [Height, Width])
    img = np.frombuffer(imagedata, dtype=np.uint8)
    img = np.frombuffer(img, dtype='>i2')  #2byteを1pixelとして読む
    img = np.reshape(img, [Height,Width])
    img = img.astype(np.int8)

    #ファイルに保存
    if (filename == None):
        date = datetime.datetime.today()
        filename = date.strftime("%Y%m%d_%H%M_%S_") + detectorName + "." + extention
    else:
        filename = filename + "." + extention
    im = Image.fromarray(img, 'L')
    im.save(_path + "\\" + filename)
#    cv2.imwrite(_path + "\\" + filename, _img)


#def instance_raw(object, extention="jpg", filename=None):
#    try:
#        _path = base.capturefilepath()
#        detectorData = object.get_detectorsetting()
##        detectorData = json.loads(detectorData.decode('utf-8'))
#        #画像データのサイズの取得
#        ImageSize = detectorData['OutputImageInformation']
#        ImageSize = ImageSize['ImageSize']
#        Height = ImageSize['Height']
#        Width = ImageSize['Width']
#        imagedata = object.snapshot_rawdata()
#        
#        img = np.frombuffer(imagedata, dtype=np.uint8)
#        img = np.frombuffer(img, dtype='>i2')  #2byteを1pixelとして読む
#        img = np.reshape(img, [Height,Width])
#        img = img.astype(np.int8)
#
#        if(imagedata == None):
#            return "[Failed] Snapshot Error"
#        #ファイル名自動生成
#        if (filename == None):
#            date = datetime.datetime.today()
#            filename = date.strftime("%Y%m%d_%H%M_%S_") + object.__dict__["detector"]
#
##        file = open(filename + "." + extention , "wb")
##        file.write(imagedata)
##        file.close()
#        print(filename + "." + extention)
#        im = Image.fromarray(img, 'L')
#        im.save(_path + "\\" + filename + "." + extention)
#
#    except:
#        print("Detectorクラスのインスタンスを第1引数に入れてください")
    
    