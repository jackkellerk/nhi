# -*- coding: utf-8 -*-
"""
Created on Thu Oct 27 13:27:05 2016

@author: dmaekawa
"""
import datetime

import json
import numpy as np
#import matplotlib.pyplot as plt
from PIL import Image
from PyJEM import detector

#detectorName -> PyJEMの方の値を取得
#fileName -> 出力ファイル名,引数?
#ImageSize -> listとして取得する。 [ , ]

def RawDataToFile(detectorName, extention, filename = None):
    try:
        _instance = detector.Detector(detectorName)
        detectorData = _instance.get_detectorsetting()
    
        #ImageSizeの取得
        ImageSize = detectorData['OutputImageInformation']
        ImageSize = ImageSize['ImageSize']
        Height = ImageSize['Height']
        Width = ImageSize['Width']
    
        rawData = _instance.snapshot_rawdata()
    
        #rawDataをImageファイル変換
        img = np.frombuffer(rawData, dtype=np.uint8)
        img = np.frombuffer(img, dtype='>i2')  #2byteを1pixelとして読む
        img = np.reshape(img, [Height,Width])
        img = img.astype(np.int8)
    
        #画像の表示
        #plt.show(img)
    
        #画像の保存
        if filename == None:
            date = datetime.datetime.today()
            filename = "JEM-2800Image_" + date.strftime("%Y%m%d_%H%M_%S_") + detectorName + "_ImagePanel"
    
    
        im = Image.fromarray(img, 'L')
        im.save(filename + "." + extention)
    
    except:
        print("Failed")

#jpgファイルの作成
def rawDataToJpeg(detectorName, fileName = None):
    extention = "jpg"
    RawDataToFile(detectorName , extention, fileName)

#bmpファイルの作成
def rawDataToBmp(detectorName, fileName = None):
    extention = "bmp"
    RawDataToFile(detectorName , extention, fileName)

#pngファイルの作成
def rawDataToPng(detectorName, fileName = None):
    extention = "png"
    RawDataToFile(detectorName , extention, fileName)

#Tifファイルの作成
def rawDataToTif(detectorName, fileName = None):
    extention = "tif"
    RawDataToFile(detectorName , extention, fileName)



if __name__ == '__main__':
    fileName = input("FileName: ")
    
#    RawDataToFile("ADF1", ")    
    
    for i in range(detector.detectors.__len__()):
#        rawDataToPng(detector.detectors[i], fileName + str(i))
        rawDataToJpeg(detector.detectors[i], fileName + str(i))
#        rawDataToBmp(detector.detectors[i], fileName + str(i))
#        rawDataToTif(detector.detectors[i], fileName + str(i))

