# -*- coding: utf-8 -*-

import datetime
import json
import numpy as np
#import matplotlib.pyplot as plt
from PIL import Image
from PyJEM import detector
import os 
import cv2


def _get_imagefile_size(detectorname):
    """
    Get the image size of the detector name in the argument and return it as a list.
    arg1: Detectorname
    out: [height, width]
    """
    detectorData = detectorname.get_detectorsetting()
    detectorData = json.loads(detectorData.decode('utf-8'))

    #ImageSizeの取得
    imagesize = detectorData['OutputImageInformation']
    imagesize = imagesize['ImageSize']
    height = imagesize['Height']
    width = imagesize['Width']
    size = [height, width]
    return size



if __name__ == '__main__':
    #画像を保存するファイルの有無
    if not os.path.exists("4DScan_Data"):
        os.mkdir("4DScan_Data")
    #検出器名の指定
    _spotdetectorname = input("Spot_detectorName: ")
    spotdetector = detector.Detector(_spotdetectorname)
    _snapshotdetectorname = input("SnapShot_detectorName: ")
    snapshotdetector = detector.Detector(_snapshotdetectorname)

    if spotdetector != None and snapshotdetector != None:
        ##ScanModeをSpotに変更
        #spotdetector.set_scanmode(1)

        #撮影範囲の設定
        size = _get_imagefile_size(snapshotdetector)
        width = size[1]
        height = size[0]
        sx = 255 - int(width / 2)
        sy = 255 - int(height / 2)
        for y in range(0, height):
        	for x in range(0, width):
        		#スポット位置設定
                 detector.Detector(_spotdetectorname).set_spotposition(sx+x, sy+y)
        		#カメラ画像取得
                 rawdata = detector.Detector(_snapshotdetectorname).livesnapshot("raw")
                 _img = np.frombuffer(rawdata, dtype=np.uint16)
                 _img = np.reshape(_img, [512,512])
        		#ファイルに保存
                 fname = "4DScanAC\\"+str(y)+"_"+str(x)+".tif"
                 cv2.imwrite(fname,_img)
