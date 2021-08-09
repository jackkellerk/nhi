# coding: utf-8

#import json
import os
import httplib2 #urlのParseに使用
import datetime 
import cv2
import matplotlib.pyplot as plt

#from .. import connect
#from .connect import *

from .. import exception

from ..base import Connect, Setting

from .. import base
#from ..base import capturefilepath, doc, imagefilepath
#from enum import Enum

#from . import auto_param

#from . import app_func
#from .app_func import *

"""
This Module supply only function, TEMCenter DetectorRESTService.
"""

_connect = Connect("detectorrestservice", "Detector")
_setting = Setting()

#_url = connect.Connect(connect.Port.DetectorRESTService)._url() + "/Detector/"
#_imagepath = base.imagefilepath
detectors = []

def reload():
    """reload function"""    
    global _connect
    _connect = Connect("detectorrestservice", "Detector")
    
    get_attached_detector()
    

def get_attached_detector():
    """
    | **Summary**
    |  Acquisition of detector names currently available in TEMCenter.
    | **arg**
    |  None
    | **return**
    | type： list
    | Available Detector Name
    """
#    url = _url + "GetAttachedDetector"
#    cont = connect.request(url, "GET")
    cont = _connect.request("GET", url="GetAttachedDetector")
#    cont = json.loads(cont.decode('utf-8'))
#    if(cont== None):
#        return
#           
    global detectors
    detectors = []
    for i in cont:
        detectors.append(i)
    return detectors    


def assign_channel(detectorName, channel = None):
    """
    | **Summary**
    |  Set the specified detector to Active.
    | **arg**
    |  detectorName - Detector name
    |  channel - Selection of channel to assign detectors (Only multiple channles)
    | **return**
    | type ： Stream
    | Assigned Detector name
    """
    detector = None

    _detector = get_attached_detector()
    if _detector == None:
        print("FAILED")
#    if detectors == None:
#        print("FAILED")
        raise exception.ClientExcept("No available detectors were found.")
    if(type(detectorName) is str):
        for i in _detector:     
            if str(detectorName).lower() == str(i).lower():
                detector = httplib2.urllib.parse.quote(detectorName, safe="")
#                print(i + " is Correct!")
                print("{0} is Correct!".format(i))
                break
        if(detector == None):
            print("{0} is not Correct.".format(detectorName))
            raise exception.ClientExcept("No available detectors were found.")
            return 
            
    if (channel == None):
        channel = str(1)
    if  (type(channel) == int):
        channel = str(channel)
#    url = _url + detector + "/AssignChannel/" + channel
#    cont = connect.request(url, "GET")
    cont = _connect.request("GET", url="{0}/AssignChannel/{1}" .format(detector, channel))
    return cont

def snapshotall():
    '''
    | **Summary**
    |  All images of the selected STEM detector are taken.
    | **return**
    | Execute Result
    | type : json.Dict
    '''
    cont = _connect.request("POST", url="SnapShotAll")
    return cont

class Detector:
    '''
    | It can acquire the information, acquire image data, 
      execute automatic function, etc. of detector specified by argument.
    | Detector names to be entered as arguments can be obtained with 
      "detector.detectorlist" or "detector.get_attached_detector()".
    '''
    _instance = None
    _ins_dict ={}
    
    def __init__(self, detectorName):
        """
        | Summary：
        | arg    ： detectorName - Detector name to be set
        | Except :
        """
        try:          
            self.detector=None
            _detector = get_attached_detector()
            if _detector == None:
                print("FAILED")
                raise

            if(type(detectorName) is str):
                for i in _detector:     
                    if str(detectorName).lower() == str(i).lower():
                        self.detector = httplib2.urllib.parse.quote(detectorName, safe="")
                        self.url = "{0}/{1}".format(_connect.url, self.detector)
#                        self.setting = Setting()
                        self.connect = Connect("detectorrestservice", "Detector/" + self.detector)
#                        print(self.connect)
                        print("{0} is Correct.".format(i))
                        break

                if(self.detector == None):
                    print("{0} is not Correct!".format(detectorName))
                    raise 
                
            elif(type(detectorName) is int):
                if (detectorName < len(_detector)):
                    self.detector = httplib2.urllib.parse.quote(_detector[detectorName], safe="")
                    self.url = "{0}/{1}".format(_connect.url, self.detector)
                    self.connect = Connect("detectorrestservice", "Detector/" + self.detector)
                    print("{0} is Correct.".format(_detector[detectorName]))
                else:
                    self.detector = None
                    print("{0} is not Correct!".format(_detector[detectorName]))
                    raise 
        except:
            self.detector = None
#            print("Catch Exception!")
            raise("[PyJEM Exception] The input detector can not be used.")

    def __new__(cls, det):
        # Singleton function 
        # 同一検出器に対してインスタンスの使いまわし処理
        
        if type(det) is int:
            det = detectors[det]
        
        if len(cls._ins_dict) == 0:     # 初回起動時
            if cls._instance is None:       # 一応instanceの有無の確認 → いらない可能性
                cls._instance = super().__new__(cls)
#                print("{0} is Correct!".format(det))
                cls._ins_dict.update({det:cls._instance})       
        else:
            if not det in cls._ins_dict:        # instanceを1回も作成しておらずdictにない。
                cls._instance = super().__new__(cls)
#                print("{0} is Correct!".format(det))
                cls._ins_dict.update({det:cls._instance})
            else:
                cls._instance = cls._ins_dict[det]    
                
        return cls._instance   
    
    
    def livestart(self):
        """
        | **Summary**
        |  Live View Start
        | **return**
        | Execute Result
        | type : json.Dict
        """
#        url = self.url + "/LiveStart"
#        cont = connect.request(url, "POST")
        cont = self.connect.request("POST", url="LiveStart")
#        cont = json.loads(cont.decode("utf-8"))
        return cont

    def livestop(self):
        '''
        | **Summary**
        |  Live View Stop
        | **return**
        | Execute Result
        | type : json.Dict
        '''
#        url = self.url + "/LiveStop"
#        cont = connect.request(url, "POST")
        cont = self.connect.request("POST", url="LiveStop")
#        cont = json.loads(cont.decode("utf-8"))
        return cont

    def snapshot(self, extention, save=False, filename=None, show=False):
        """
        | **Summary**
        |  Take an image with the specified extension. The captured image is returned as a file stream.
        | Select whether to save the image file with flag.
        | **arg**
        |  extention: "jpg", "bmp", "tiff"
        |  save: 'True' is save capture file.
        |  filename: Name of file to save. It is possible to include an absolute path. (Only available when 'save' is True.)
        |  show: show the Image file.
        | **return**
        |  File stream saved with the selected extension. (If there is 
        | an input in an argument other than 'extention', None is returned.)
        | type   : Stream
        """  
#        url = self.url + "/SnapShot/" + extention
#        cont = connect.request(url, "GET")
        cont = self.connect.request("GET", url="SnapShot/" + extention)
#        if (cont == None):
#            return "[Failed] Snapshot Error"
        return self._savefile(cont, extention, save, filename, show)
        
    def snapshotframe(self, extention, save=False, filename=None, show=False):
        """
        | **Summary**
        |  Take an image with the specified extension. The captured image is returned as a file stream.
        | **arg**
        |  extention: "jpg", "png", "bmp", "tiff"
        | **return**
        |  File stream saved with the selected extension
        |  type   : Stream
        """
#        url = self.url + "/SnapShotFrame/" + extention
#        cont = connect.request(url, "GET")
        cont = self.connect.request("GET", url="SnapShotFrame/" + extention)
#        return cont
        return self._savefile(cont, extention, save, filename, show)

    def livesnapshot(self, extention, save=False, filename=None, show=False):
        '''
        | **Summary**
        |  Take an image with the specified extension. Obtaining images faster than "snapshot".
        | **arg**
        |  extention: "jpg", "png", "bmp", "tiff"
        | **return**
        |  File stream saved with the selected extension
        |  type   : Stream
        '''
#        url = self.url + "/LiveSnapShot/" + extention
#        cont = connect.request(url, "GET")
        cont = self.connect.request("GET", url="LiveSnapShot/" + extention)
#        return cont
        return self._savefile(cont, extention, save, filename, show)

    def snapshot_rawdata(self):
        """
        | **Summary**
        | Raw data of the image acquired by the specified detector. the raw data is returned as a byte array.
        | **arg**
        |  extention: "jpg", "png", "bmp", "tiff"
        | **return**
        |  2 dimensional byte array of acquired image data.
        |  type   : Stream
        """
#        url = self.url + "/CreateRawData"
#        cont = connect.request(url, "GET")
        cont = self.connect.request("GET", url="CreateRawData")
        return cont


    def _savefile(self, cont, extention, save=False, filename=None, show=False):
        """
        If there is an argument other than extension, the return value is the file path.
        If there is no value other than extention in the argument, the returned file stream obtained from TEMCenter.
        Corresponding absolute path of filename → If there is no directory up to file name, PyJEM default path.
        """
        # 画像データが取得できていなかった場合は、そのまま出力
        if type(cont) == dict:
            return cont 
        
        fileext = ""        
        # filenameの作成
        if(filename==None):
            if(save==True):
                f = datetime.datetime.today()
                filename = f.strftime("%Y%m%d_%H%M_%S_") + self.detector
            elif(show==True):   # save==False
                filename = "Snapshot"
        
        if(save==True or show==True or filename!=None):
#            print(filename)
            _file = filename.rsplit("\\", 1)
            if os.path.isdir(_file[0]):
                fileext = "{0}.{1}" .format(filename, extention)
            elif len(_file) is 2:
                fileext = "{0}\\{1}.{2}" .format(_setting.imagefilepath(), _file[1], extention)
            else:
                fileext = "{0}\\{1}.{2}" .format(_setting.imagefilepath(), filename, extention)
#            fileext = _setting.imagefilepath + "\\" + filename + "." + extention
            file = open(fileext, "wb")
            file.write(cont)
            file.close()
            if(show==True):
                img = cv2.imread(fileext, cv2.IMREAD_GRAYSCALE)
                plt.gray()
                plt.imshow(img)
            return fileext  #showのときのファイル名は返さないほうが混乱しない気もする
            
        return cont

    def get_detectorsetting(self):
        '''
        | **Summary**
        |  Obtaining setting information of selected detector.
        | **return**
        |  {"status Name":"value"}
        |  type   : json.Dict
        '''
#        url = self.url + "/Setting"
#        cont = connect.request(url, "GET")
        cont = self.connect.request("GET", url="Setting")
        return cont

############################# SetDetectorSetting ##########################
#
#    def set_detector(self, dictbody):
#        """
#        get dict 
#        """
#        if(type(dictbody) is dict):
#            body={}
#            for k in dictbody:
#                body.update({k:dictbody[k]})
#            if(body.__len__()>=0):
#                cont = self.connect.request("POST", url="Setting", body=body)
#                return cont
#            
#        return 

    def set_detectorsetting(self, key, value):
        '''
        | **Summary**
        |  Wild card method.
        | **arg**
        |  key: Function name you want to use
        |  value: Value to change
        | **return**
        |  The value set to TEM.
        |  type   : json.Dict
        '''
        body = {key:value}
        cont = self.connect.request("POST", url="Setting", body=body)
        return cont
    
    def set_frameintegration(self, value):
        '''
        | **Summary**
        |  Set the accumulation count.
        | **arg**
        |  value: 0-255 (It depends on TEM model)
        | **return**
        |  The value set to TEM.
        |  type   : json.Dict
        '''
#        url = self.url + "/Setting"
        body = {"frameIntegration":value}
#        cont = connect.request(url, "POST", body)
        cont = self.connect.request("POST", url="Setting", body=body)
        return cont

    def set_exposuretime_index(self, value):
        '''
        | **Summary**
        |  Set the exposure time as index.
        | **arg**
        |  value: 0 - 65535 (It depends on TEM model)
        | **return**
        |  The value set to TEM.
        |  type   : json.Dict
        '''
#        url = self.url + "/Setting"
        body = {"ExposureTimeIndex":value}
        cont = self.connect.request("POST", url="Setting", body=body)
        return cont
#        return connect.request(url, "POST", body)

    def set_gainindex(self, value):
        '''
        | **Summary**
        |  Set the gain value as index.
        | **arg**
        |  value: 0- 4095 (It depends on TEM model)
        | **return**
        |  The value set to TEM.
        |  type   : json.Dict
        '''
#        url = self.url + "/Setting"
        body = {"GainIndex":value}
        cont = self.connect.request("POST", url="Setting", body=body)
        return cont
#        return connect.request(url, "POST", body)

    def set_offsetindex(self, value):
        '''
        | **Summary**
        |  Set the offset value as index.
        | **arg**
        |  value: 0- 4095 (It depends on TEM model)
        | **return**
        |  The value set to TEM.
        |  type   : json.Dict
        '''
#        url = self.url + "/Setting"
        body = {"OffsetIndex":value}
        cont = self.connect.request("POST", url="Setting", body=body)
        return cont
#        return connect.request(url, "POST", body)

#    def set_horizontal_lineNo(self, value):
#        """
#        | Summary: Set the Horizontal Line number.
#        |          Can not be executed at present.(2017/11)
#        | arg    : value -
#        | return : The value set to TEM.
#        | type   : json.Dict
#        | Except :
#        """
#        url = self.url + "/Setting"
#        body = json.dumps({"HorizontalLineNo":value})
#        cont = connect.rest_temp(url, "POST", body)
#        return cont
#
#    def set_vertical_lineNo(self, value):
#        """
#        | Summary: Set the Vertical Line number.
#        |          Can not be executed at present.(2017/11)
#        | arg    : value -
#        | return : The value set to TEM.
#        | type   : json.Dict
#        | Except :
#        """
#        url = self.url + "/Setting"
#        body = json.dumps({"VerticalLineNo":value})
#        cont = connect.rest_temp(url, "POST", body)
#        return cont

    def set_exposuretime_value(self, value):
        '''
        | **Summary**
        |  Set the exposure time as usec value.
        | **arg**
        |  value: 0-1000[μsec] (It depends on TEM model)
        | **return**
        |  The value set to TEM.
        |  type   : json.Dict
        '''
#        url = self.url + "/Setting"
        body = {"ExposureTimeValue":value}
        cont = self.connect.request("POST", url="Setting", body=body)
        return cont
#        return connect.request(url, "POST", body)

    def set_scanrotation(self, value):
        '''
        | **Summary**
        |  Set the scanRotation angle as absolute value.
        | **arg**
        |  value: 0-360
        | **return**
        |  The value set to TEM.
        |  type   : json.Dict
        '''
#        url = self.url + "/Setting"
        body = {"ScanRotation":value}
        cont = self.connect.request("POST", url="Setting", body=body)
        return cont
#        return connect.request(url, "POST", body)

    def set_scanrotation_step(self, value):
        '''
        | **Summary**
        |  Set the minimum variation of scanRotation.
        | **arg**
        |  value: 0-20
        | **return**
        |  The value set to TEM.
        |  type   : json.Dict
        '''
#        url = self.url + "/Setting"
        body = {"scanRotationStep":value}
        cont = self.connect.request("POST", url="Setting", body=body)
        return cont
#        return connect.request(url, "POST", body)

    #引数は、RectAngleに対応RectAngle(X, Y, Width, Height)
#    def set_imaging_area(self, X=None, Y=None, Width=None, Height=None):
    def set_imaging_area(self, Width, Height, X=None, Y=None):
        '''
        | **Summary**
        |  Set the number of pixels of the live image. 
          x and y are the coordinates of the starting pixel of the read image. 
          width and height are the coordinates of the end pixel of the read image.
        | If no value is entered for the argument, the value is not changed.
        | **arg**
        |  x: 0-4096
        |  y: 0-4096
        | 　Width: 0-4096
        | 　Height: 0-4096
        | **return**
        |  The value set to TEM.
        |  type   : json.Dict
        '''
        # なぜかX,YをNoneにしていた。
#        X = None
#        Y = None
#        url = self.url + "/Setting"
        body = {"ImagingArea":{"X":X, "Y":Y, "Width":Width, "Height":Height}}
        cont = self.connect.request("POST", url="Setting", body=body)
        return cont
#        return connect.request(url, "POST", body)

    def set_spotposition(self, X, Y):
        '''
        | **Summary**
        |  Set the beam position when ScanMode is "Spot".
          Sets which part of the scanning range set by ImagingArea is scanned.
          The top left vertex is (0, 0).
        | If no value is entered for the argument, the value is not changed.
        | **arg**
        |  x: 0-4096
        |  y: 0-4096
        | **return**
        |  The value set to TEM.
        |  type   : json.Dict
        '''
#        url = self.url + "/Setting"
        body = {"SpotPosition":{"X":X, "Y":Y}}
        cont = self.connect.request("POST", url="Setting", body=body)
        return cont
#        return connect.request(url, "POST", body)

    #引数は、RectAngleに対応RectAngle(X, Y, Width, Height)
    def set_areamode_imagingarea(self, Width, Height, X=None, Y=None):
        '''
        | **Summary**
        |  Set the beam position when ScanMode is "Area".
          Sets which part of the scanning range set by ImagingArea is scanned.
          The top left vertex is (0, 0).
        | If no value is entered for the argument, the value is not changed.
        | **arg**
        |  x: 0-4096
        |  y: 0-4096
        | 　Width: 0-4096
        | 　Height: 0-4096
        | **return**
        |  The value set to TEM.
        |  type   : json.Dict
        '''
#        url = self.url + "/Setting"
        body = {"AreaModeImagingArea":{"X":X, "Y":Y, "Width":Width, "Height":Height}}
        cont = self.connect.request("POST", url="Setting", body=body)
        return cont
#        return connect.request(url, "POST", body)

    def set_scanmode(self, value):
        '''
        | **Summary**
        |  Set the scanMode.
        | **arg**
        |  value: 0:Scan, 1:Area, 3:Spot
        | **return**
        |  The value set to TEM.
        |  type   : json.Dict
        '''
#        url = self.url + "/Setting"
        body = {"scanMode":value}
        cont = self.connect.request("POST", url="Setting", body=body)
        return cont
#        return connect.request(url, "POST", body)

#    def set_syncmode(self, value):
#        '''
#        | Summary: 
#        | arg    : value -
#        | return : The value set to TEM.
#        | type   : json.Dict
#        | Except :
#        '''
#        url = self.url + "/Setting"
#        body = json.dumps({"SyncMode":value})
#        cont = connect.rest_temp(url, "POST", body)
#        return cont
#
#    def set_multidetectormode(self, value):
#        '''
#        | Summary: Change the detector display screen.
#        | arg    : value - 1:Single, 2:Dual, 4:Quad
#        | return : The value set to TEM.
#        | type   : json.Dict
#        | Except :
#        '''
#        url = self.url + "/Setting"
#        body = json.dumps({"MultiDetectorMode":value})
#        cont = connect.rest_temp(url, "POST", body)
#        return cont

    def set_binningindex(self, value):
        '''
        | **Summary**
        |  Set the Binning value as index.
          (This function corresponds to camera only.)
        | **arg**
        |  value: 0-4 (It depends on TEM model)
        | **return**
        |  The value set to TEM.
        |  type: json.Dict
        '''
#        url = self.url + "/Setting"
        body = {"BinningIndex":value}
        cont = self.connect.request("POST", url="Setting", body=body)
        return cont
#        return connect.request(url, "POST", body)

############################## Auto function #####################################
    def AutoFocus(self):
        '''
        | **Summary**
        |  Execute AutoFocus
        | **return**
        |  Execution Result
        |  type   ： json.Dict
        '''
#        url = self.url + "/AutoFocus"
        cont = self.connect.request("POST", url="AutoFocus")
        return cont
#        return connect.request(url, "POST")

    def AutoContrastBrightness(self):
        '''
        | **Summary**
        |  Execute AutoContrastBrightness
        | **return**
        |  Execution Result
        |  type   ： json.Dict
        '''
#        url = self.url + "/AutoContrastBrightness"
#        return connect.request(url, "POST")
        cont = self.connect.request("POST", url="AutoContrastBrightness")
        return cont

    def AutoStigmator(self):
        '''
        | **Summary**
        |  Execute AutoStigmator
        | **return**
        |  Execution Result
        |  type   ： json.Dict
        '''
#        url = self.url + "/AutoStigmator"
#        return connect.request(url, "POST")
        cont = self.connect.request("POST", url="AutoStigmator")
        return cont

    def AutoOrientation(self):
        '''
        | **Summary**
        |  Execute AutoOrientation
        | **return**
        |  Execution Result
        |  type   ： json.Dict
        '''
#        url = self.url + "/AutoOrientation"
#        return connect.request(url, "POST")
        cont = self.connect.request("POST", url="AutoOrientation")
        return cont

    def AutoZ(self):
        '''
        | **Summary**
        |  Execute AutoZ
        | **return**
        |  Execution Result
        |  type   ： json.Dict
        '''
#        url = self.url + "/AutoZ"
#        return connect.request(url, "POST")
        cont = self.connect.request("POST", url="AutoZ")
        return cont
   
############## 第2版 ###################   
   
#    def AutoFocusSetting_log(self, value):
#        """
#        [Autoの設定の案1]
#        とりあえずLogのOn/Offの実行。
#        Autoの設定変更についてはどのように公開するのか考えないといけない
#        ちなみにこれはAutoで設定できるパラメータの一つ一つを関数１つとして定義していくやり方
#        → この方法だと関数がすごい増えるのと、複数設定を行う際にコマンドラインが長くなる + 通信負荷がかかる
#        """
##        url = self.url + "/AutoFocus/Setting"
#        body = {"AFCLog":value}
##        cont = connect.request(url, "POST", body)
#        cont = self.connect.request("POST", url="AutoFocus/Setting", body=body)
#        return cont
        
    def AutoFocusSetting(self, key, value):
        """
        [Autoの設定の案2]
        keyとvalueで設定するやり方
        Enumとして設定できるパラメータをもって、valueで実行
        → 全ての設定をできてしまっても困るから、PyJEM側で利用できるKeyをEnumで持てばOK?
        """        
        
        if(key in auto_param.AFC.__members__):            
#            url = self.url + "/AutoFocus/Setting"
            body = {key:value}
#            cont = connect.request(url, "POST", body)
            cont = self.connect.request("POST", url="AutoFocus/Setting", body=body)
            return cont
        return ("Fail")

#    def AutoZSetting(self, key, value):
#        """
#        [Autoの設定の案2]
#        keyとvalueで設定するやり方
#        Enumとして設定できるパラメータをもって、valueで実行
#        → 全ての設定をできてしまっても困るから、PyJEM側で利用できるKeyをEnumで持てばOK?
#        """        
        
#        if(key in auto_param.AFC.__members__):            
#            url = self.url + "/AutoFocus/Setting"
#        body = {key:value}
#            cont = connect.request(url, "POST", body)
#        cont = self.connect.request("POST", url="AutoZ/Setting", body=body)
#        return cont
#        return ("Fail")

#    def AutoContrastBrightnessSetting_log(self, value):
#        "test code"
##        url = self.url + "/AutoContrastBrightness/Setting"
#        body = {"ACBLog":value}
#        cont = self.connect.request("POST", url="AutoContrastBrightness/Setting", body=body)
#        return cont
##        return connect.request(url, "POST", body)
#        
#    def AutoStigmatorSetting_log(self, value):
#        "test code"
##        url = self.url + "/AutoStigmator/Setting"
#        body = {"ASTGLog":value}
##        return connect.request(url, "POST", body)
#        cont = self.connect.request("POST", url="AutoStigmator/Setting", body=body)
#        return cont
#        
#    def AutoOrientationSetting_log(self, value):
#        "test code"
##        url = self.url + "/AutoOrientation/Setting"
#        body = {"AOLog":value}
##        return connect.request(url, "POST", body)
#        cont = self.connect.request("POST", url="AutoOrientation/Setting", body=body)
#        return cont
#       
#    def AutoZSetting_log(self, value):
#        "test code"
##        url = self.url + "/AutoZ/Setting"
#        body = {"AZLog":value}
##        return connect.request(url, "POST", body)
#        cont = self.connect.request("POST", url="AutoZ/Setting", body=body)
#        return cont

#    def BeamAutoCentering(self):
#        """
#        F200のみ        
#        """
##        url = self.url + "/BeamAutoCentering"
##        return connect.request(url, "POST") 
#        cont = self.connect.request("POST", url="BeamAutoCentering")
#        return cont



########################## add function #####################################
# SETEM Intel向け作業に伴い追加
# ver 1.0.1では未対応
#    def get_insert_state(self):
#        '''
#        | **Summary**
#        |  Get Detector in/out status. 
#        |  type   ： json.Dict
#        '''   
#        cont = self.connect.request("GET", url="GetInserted")
#        return cont
#        
#    def insert(self):
#        '''
#        | **Summary**
#        |  Insert a select detector.
#        |  type   ： json.Dict
#        '''   
#        cont = self.connect.request("GET", url="Insert")
#        return cont
#
#    def retract(self):
#        '''
#        | **Summary**
#        |  Retract a select detector.
#        |  type   ： json.Dict
#        '''   
#        cont = self.connect.request("GET", url="Retract")
#        return cont
#        
#def get_assignChannels():
#    '''
#    | **Summary**
#    |  Get activate detectors list.
#    |  type   ： json.Dict
#    '''   
#    cont = _connect.request("GET", url="GetAssignChannels")
#    return cont

############################## Specific function ############################
# #ChangeImageSelectorの対応。TEMCenterに接続は確認済み
def imageselector_kind(selector):
    '''
    | **Summary**
    |  Change ImageMode（only JEM-2800）
    | **arg**
    |  selector: 0= , 1=SEI, 2= , 3=BEI, 4=DF, 5=TEM, 6=DIFF
    |  type   ： json.Dict
    '''
#    url = _url + "/ImageSelectorKind/" + str(selector)
#    connect.request(url, "POST")
    cont = _connect.request("POST", url="ImageSelectorKind/" + str(selector))
    return cont

def imageselector_subkind(selector):
    '''
    | **Summary**
    |  Change ImageSelector SubKind (JEM-2800, SETEM)
    | **arg**
    |  selector: 
    |  type   ： json.Dict
    '''
#    url = _url + "/ImageSelectorSubKind/" + selector
#    connect.rest_temp(url, "POST")
    cont = _connect.request("POST", url="ImageSelectorSubKind/" + str(selector))
    return cont


############################ Extent function ##################################






