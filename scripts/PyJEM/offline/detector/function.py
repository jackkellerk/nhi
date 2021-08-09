# -*- coding: utf-8 -*-

import json
import os 
import matplotlib.pyplot as plt
from PIL import Image
import numpy as np
import datetime
import cv2

resource_path = os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir)) + r"\resource"

ref_imagefilename = "\snapshot."
_detectorlist = ["camera", "STEM Image"]
_extention_list = ["jpg", "tif", "bmp", "png"]
_ret_status = {"status", "OK"}
_detectordata = json.load(open(resource_path + r"\offline_detector_data.json", "r"))


def get_attached_detector():
    '''
    | [Offline]     
    | **Summary**
    | Acquisition of detector names currently available in TEMCenter.
    | **return**
    | type: list
    | Available Detector Name
    '''
    return _detectorlist

def assign_channel(detectorName, channel = None):
    """
    | [Offline] 
    | **Summary**
    | Set the specified detector to Active.
    | **arg** 
    | detectorName: Detector name, string
    | channel: Selection of channel to assign detectors (Only multiple channles), int
    | **return**
    | type   ： Dict
    | Assigned Detector name
    """   
    if (channel == None):
        channel = str(1)
    if  (type(channel) == int):
        channel = str(channel)
    return {detectorName : channel}

def snapshotall():
    '''
    | [Offline] 
    | **Summary**
    | All images of the selected STEM detector are taken.
    | **return**
    | Execute Result
    '''    
    # Online版の動きに合わせると戻り値は無い
#    im = np.array(Image.open(resource_path + str("\camera.jpg")).convert('L'))
#    im_byte = im.tobytes()
    return

# #ChangeImageSelectorの対応。TEMCenterに接続は確認済み
def imageselector_kind(selector):
    '''
    | [Offline] 
    | **Summary**
    | Change ImageSelector mode (only JEM-2800)
    | **arg** 
    | selector: 0= , 1=SEI, 2= , 3=BEI, 4=DF, 5=TEM, 6=DIFF
    | **return**
    | type   : json.Dict
    | result status
    '''
    return 

class Detector:
    '''
      It can acquire the information, acquire image data, 
      execute automatic function, etc. of detector specified by argument.
    | Detector names to be entered as arguments can be obtained with 
      "detector.detectorlist" or "detector.get_attached_detector()".
    '''

    def __init__(self, detectorName):
        """
        | [Offline] 
        | Summary：
        | arg    ： detectorName - Detector name to be set
        | Except :
        """
        try:
            #detector名での判断はいらない気もする。Offlineだし
            self.detector = detectorName
            if(type(detectorName) is str):
                if(detectorName in _detectorlist):
                    print(detectorName + " is Correct!")
                else:
                    print(detectorName + " is not Correct.")
                
            elif(type(detectorName) is int):
                if (detectorName < len(_detectorlist)):
                    print(_detectorlist[detectorName] + " is Correct!")
                else:
                    print(detectorName + " is not Correct.")
        except:
            print("Catch Exception!")

    def livestart(self):
        """
        | [Offline] 
        | **Summary**
        | Live View Start
        | **return**
        | type: json.Dict
        | Execute Result
        """
        return _ret_status

    def livestop(self):
        '''
        | [Offline] 
        | **Summary**
        | Live View Stop
        | **return**
        | type: json.Dict
        | Execute Result
        '''
        return _ret_status

    def snapshot(self, extention, save=False, filename=None, show=False):
        """
        | [Offline] 
        | **Summary**
        | Take an image with the specified extension.
          The captured image is returned as a file stream.
        | Select whether to save the image file with flag.
        | **arg**
        |  extention: "jpg", "png", "bmp", "tiff"
        |  flag: True: save image file.
        |  filename: Name of file to save
        |  show: show the saved file.
        | **return**
        | type   : Stream
        | File stream saved with the selected extension
        """      
        if (extention in _extention_list):   
            ref_imagefile = resource_path + ref_imagefilename + str(extention)
            img = cv2.imread(ref_imagefile, cv2.IMREAD_GRAYSCALE)     
            
#            im = cv2.imencode("." + str(extention), img)[1].tostring()
                
            if (save or filename is not None):     # offline上ではsaveする必要ないためコメントアウト
                if(filename is None):            
                    f = datetime.datetime.today()
                    filename = f.strftime("%Y%m%d_%H%M_%S_") + self.detector
                ref_imagefile = resource_path + "\\" + filename + "." + extention
                cv2.imwrite(ref_imagefile, img)
#            file = open(resource_path + "\\" + filename + "." + extention, "wb")
#            file.write(img)
#            file.close()
            if (show == True):
                plt.gray()
                plt.imshow(img)     
                return 
            if save is True or filename is not None or show is True:
                return ref_imagefile
            else:                
                return img

    def snapshotframe(self, extention):
        """
        | [Offline] 
        | **Summary**
        | Take an image with the specified extension.
          The captured image is returned as a file stream.
        | **arg**
        | extention - "jpg", "png", "bmp", "tiff"
        | **return**
        | type   : Stream
        | File stream saved with the selected extension
        """
        if (extention in _extention_list):           
            ref_imagefile = resource_path + ref_imagefilename + str(extention)
            # cv2.IMREAD_GRAYSCALE -> GrayScale
            img = cv2.imread(ref_imagefile, cv2.IMREAD_GRAYSCALE)       
            im = cv2.imencode("." + str(extention), img)[1].tostring()
            return im
        return 

    def snapshot_rawdata(self):
        '''
        | [Offline] 
        | **Summary**
        | Raw data of the image acquired by the specified detector.
          the raw data is returned as a byte array.
        | **arg**
        | extention: "jpg", "png", "bmp", "tiff"
        | **return**
        | type   : Stream
        | 2 dimensional byte array of acquired image data.
        '''
        f = open(resource_path + r"/snapshot.jpg", "rb", buffering=0)
        f.close()
        im = np.array(Image.open(resource_path + r"/snapshot.jpg").convert('L'))   
        im_byte = im.tobytes()
        return im_byte

    def livesnapshot(self, extention):
        '''
        | [Offline] 
        | **Summary**
        | Take an image with the specified extension.
        | Obtaining images faster than "snapshot".
        | **arg**
        | extention - "jpg", "png", "bmp", "tiff"
        | **return**
        | File stream saved with the selected extension
        | type   : Stream
        '''
        if (extention in _extention_list):           
            ref_imagefile = resource_path + ref_imagefilename + str(extention)
            img = cv2.imread(ref_imagefile, cv2.IMREAD_GRAYSCALE)       
            im = cv2.imencode("." + str(extention), img)[1].tostring()
            return im
        return 

    def get_detectorsetting(self):
        '''
        | [Offline] 
        | **Summary**
        | Obtaining setting information of selected detector.
        | **return**
        | {"status Name":"value"}
        | type   : json.Dict
        '''
        #jsonデータの読み取り
#        f = open(resource_path + r"\offline_detector_data.json", "r")
#        json_data = json.load(f)
        
        return _detectordata

############################# Set ####################################
    def set_frameintegration(self, value):
        '''
        | [Offline] 
        | **Summary**
        | Set the accumulation count.
        | **arg**
        | value: 0-255 (It depends on TEM model)
        | **return**
        | The value set to TEM.
        | type   : json.Dict
        '''        
        _detectordata["frameIntegration"] = value
        return {"frameIntegration":value}

    def set_exposuretime_index(self, value):
        '''
        | [Offline] 
        | **Summary**
        | Set the exposure time as index.
        | **arg**
        | value - 0 - 65535 (It depends on TEM model)
        | **return**
        | The value set to TEM.
        | type   : json.Dict
        '''
        _detectordata["ExposureTimeIndex"] = value
        return {"ExposureTimeIndex":value}

    def set_gainindex(self, value):
        '''
        | [Offline] 
        | **Summary**
        | Set the gain value as index.
        | **arg**
        | value - 0- 4095 (It depends on TEM model)
        | **return**
        | The value set to TEM.
        | type   : json.Dict
        '''
        return {"GainIndex":value}

    def set_offsetindex(self, value):
        '''
        | [Offline] 
        | **Summary**
        | Set the offset value as index.
        | **arg**
        | value - 0- 4095 (It depends on TEM model)
        | **return**
        | The value set to TEM.
        | type   : json.Dict
        '''
        _detectordata["OffsetIndex"] = value
        return {"OffsetIndex":value}

#    def set_horizontal_lineNo(self, value):
#        """
#        | [Offline] 
#        | Summary: Set the Horizontal Line number.
#        |          Can not be executed at present.(2017/11)
#        | arg    : value -
#        | return : The value set to TEM.
#        | type   : json.Dict
#        | Except :
#        """
#        return {"HorizontalLineNo":value}
#
#    def set_vertical_lineNo(self, value):
#        """
#        | [Offline] 
#        | Summary: Set the Vertical Line number.
#        |          Can not be executed at present.(2017/11)
#        | arg    : value -
#        | return : The value set to TEM.
#        | type   : json.Dict
#        | Except :
#        """
#        return {"VerticalLineNo":value}

    def set_exposuretime_value(self, value):
        '''
        | [Offline] 
        | **Summary**
        | Set the exposure time as usec value.
        | **arg**
        | value - 0-1000000[μsec] (It depends on TEM model)
        | **return**
        | The value set to TEM.
        | type   : json.Dict
        '''
        _detectordata["ExposureTimeValue"] = value
        return {"ExposureTimeValue":value}

    def set_scanrotation(self, value):
        '''
        | [Offline] 
        | **Summary**
        | Set the scanRotation angle as absolute value.
        | **arg**
        | value - 0-360
        | **return**
        | The value set to TEM.
        | type   : json.Dict
        '''
        _detectordata["ScanRotation"] = value
        return {"ScanRotation":value}

    def set_scanrotation_step(self, value):
        '''
        | [Offline] 
        | **Summary**
        | Set the minimum variation of scanRotation.
        | **arg**
        | value -
        | **return**
        | The value set to TEM.
        | type   : json.Dict
        '''
        _detectordata["scanRotationStep"] = value
        return {"scanRotationStep":value}

    #引数は、RectAngleに対応RectAngle(X, Y, Width, Height)
#    def set_imaging_area(self, X=None, Y=None, Width=None, Height=None):
    def set_imaging_area(self, Width=None, Height=None):
        '''
        | [Offline] 
        | Summary: Set the number of pixels of the live image.
                   x and y are the coordinates of the starting pixel of the read image.
                   width and height are the coordinates of the end pixel of the read image.
        |          If no value is entered for the argument, the value is not changed.
        | arg    : x - 0-4096
        |          y - 0-4096
        | 　　　　　　 Width - 0-4096
        | 　　　　　　 Height - 0-4096
        | return : The value set to TEM.
        | type   : json.Dict
        | Except :
        '''
        X = None
        Y = None
        
        return {"ImagingArea":{"X":X, "Y":Y, "Width":Width, "Height":Height}}

    def set_spotposition(self, X=None, Y= None):
        '''
        | [Offline] 
        | **Summary**
        | Set the beam position when ScanMode is "Spot".
          Sets which part of the scanning range set by ImagingArea is scanned.
          The top left vertex is (0, 0).
        | If no value is entered for the argument, the value is not changed.
        | **arg**
        | x: 0-4096
        | y: 0-4096
        | **return**
        | The value set to TEM.
        | type   : json.Dict
        '''
        return {"SpotPosition":{"X":X, "Y":Y}}

    #引数は、RectAngleに対応RectAngle(X, Y, Width, Height)
    def set_areamode_imagingarea(self, X=None, Y=None, Width=None, Height=None):
        '''
        | [Offline] 
        | **Summary**
        | Set the beam position when ScanMode is "Area".
          Sets which part of the scanning range set by ImagingArea is scanned.
          The top left vertex is (0, 0).
        | If no value is entered for the argument, the value is not changed.
        | **arg**
        | x - 0-4096
        | y - 0-4096
        | Width - 0-4096
        | Height - 0-4096
        | **return**
        | The value set to TEM.
        | type   : json.Dict
        '''
        return {"AreaModeImagingArea":{"X":X, "Y":Y, "Width":Width, "Height":Height}}

    def set_scanmode(self, value):
        '''
        | [Offline] 
        | **Summary**
        | Set the scanMode.
        | **arg**
        | value - 0:Scan, 1:Area, 3:Spot
        | **return**
        | The value set to TEM.
        | type   : json.Dict
        '''
        return {"scanMode":value}

#    def set_syncmode(self, value):
#        '''
#        | [Offline] 
#        | Summary: 
#        | arg    : value -
#        | return : The value set to TEM.
#        | type   : json.Dict
#        | Except :
#        '''
#        return {"SyncMode":value}
#
#    def set_multidetectormode(self, value):
#        '''
#        | [Offline] 
#        | Summary: Change the detector display screen.
#        | arg    : value - 1:Single, 2:Dual, 4:Quad
#        | return : The value set to TEM.
#        | type   : json.Dict
#        | Except :
#        '''
#        return {"MultiDetectorMode":value}

    def set_binningindex(self, value):
        '''
        | **Summary**
        | Set the Binning value as index.
          (This function corresponds to camera only.)　　　　　
        | **arg**
        | value - 0-4 (It depends on TEM model)
        | **return**
        | The value set to TEM.
        | type   : json.Dict
        '''
        return {"BinningIndex":value}

############################## Auto機能 #####################################
    def AutoFocus(self):
        '''
        | **Summary**
        | Execute AutoFocus
        | **return**
        | Execution Result
        | type   ： json.Dict
        '''
        return _ret_status

    def AutoContrastBrightness(self):
        '''
        | **Summary**
        | Execute AutoContrastBrightness
        | **return**
        | Execution Result
        | type   ： json.Dict
        '''
        return _ret_status

    def AutoStigmator(self):
        '''
        | **Summary**
        | Execute AutoStigmator
        | **return**
        | Execution Result
        | type   ： json.Dict
        '''
        return _ret_status

    def AutoOrientation(self):
        '''
        | **Summary**
        | Execute AutoOrientation
        | **return**
        | Execution Result
        | type   ： json.Dict
        '''
        return _ret_status

    def AutoZ(self):
        '''
        | **Summary**
        | Execute AutoZ
        | **return**
        | Execution Result
        | type   ： json.Dict
        '''
        return _ret_status
                
