# coding: UTF-8
import time
import sys
from PyJEM import detector
from PyJEM import TEM3
import cv2
import numpy as np
import matplotlib.pyplot as plt
import math


if __name__ == '__main__':
    
    num = int(input("input:"))
    detectorName = input("detectorName: ")
    extention = input("extention: ")
    
    _stage = TEM3.Stage3()
    _detector = detector.Detector(detectorName)
    
    print ("Start Python Script.")
    
    _stage.SetXRel(10000)
    _stage.SetYRel(10000)
    
    time.sleep(1)
    
    _stage.SetXRel(-10000)
    _stage.SetYRel(-10000)
    
    time.sleep(1)
    
    st = time.clock()
    
    for i in range(num+1):
        if ( i == 0):
            SnapShotData = _detector.snapshot(extention)
            filename = "test" + str(i)
            file = open(filename + "." + extention , "wb")
            file.write(SnapShotData)
            file.close()
    
        elif( i > 0):
            SnapShotData = _detector.snapshot(extention)
            filename = "test" + str(i)
            file = open(filename + "." + extention , "wb")
            file.write(SnapShotData)
            file.close()
    
            img1 = cv2.imread("test" + str(0) + "." + extention, 0)
            img2 = cv2.imread("test" + str(i) + "." + extention, 0)
    
            img1 = np.float32(img1)
            img2 = np.float32(img2)
    
            print ("No." + str(i))
            value,b = cv2.phaseCorrelate(img1,img2)
            print ("X = " + str(value[0]) + ", Y = " + str(value[1]))
    
            distance = math.sqrt((value[0]*value[0]) + (value[1]*value[1]))
            print ("Distance = " + str(distance))
    
            plt.plot(i, distance, "o")
    
    fin = time.clock()
    print ("= End =")
    print ("Time = "+str(fin - st) + " sec")
    print ("Drift = " + str(distance / (fin - st)) + " (pixels / sec)")
    plt.show()
    
    sys.exit()
