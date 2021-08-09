# -*- coding: utf-8 -*-


import time

class Camera3:
    def __init__(self):
#        self.filmload_mode_list = ["Manual", "Auto1", "Auto2"]
#        self.shutterspeed_mode_list = ["Manual", "Automatic", "BULB"]
#        self.photomode_list = ["Normal", "Bulb", "Multi Exposure", "TF", "AMS", "MDS"]
#        self.shutterposition_list = ["Open", "Close", "Expose"]
#        self.status_list = ["Rest", "Imaging"]
        self.expshutter_range = [0.1, 180.0]
        self.exptime = 0.0
        self.electric_density = 0.0
        self.filmload_mode = 0
        self.shutterspeed_mode = 0
        self.photomode = 0
        self.shutterposition = 0
        self.status = 0
        self.unused = 50
    
    def ExposeShutter(self, value):
        '''
        | **Summary**
        | Open shutter and close it after wait. (sec)
        | **arg**
        | type: int
        | value: 0.1-180.0 (sec)
        '''
        if(type(value) is int):
            if(self.expshutter_range[0] <= value and value <= self.expshutter_range[1]):
                time.sleep(2)
        return 
        
    def GetCurrentDensity(self):
        '''
        | **Summary**
        | Get electric current density. Converted value to film plane.(pA/cm2)
        | **return**
        | type: int
        '''
        return self.electric_density
        
    def GetExpTime(self):
        '''
        | **Summary**
        | Get exposure time(sec).
        | **return**
        | type: int
        | 0-180.0 (sec)
        '''
        return self.exptime
      
    def GetFilmLoadingMode(self):
        '''
        | **Summary**
        | Get film loading mode.
        | **return**
        | type: int
        | 0=Manual, 1=Auto(Load film to imaging position before photography), 2=Auto(Load film to imaging position after photography)
        '''
        return self.filmload_mode 
        
    def GetMode(self):
        '''
        | **Summary**
        | Get the way to set shutter speed.
        | **return**
        | type: int
        | 0=Manual exposure, 1=Automatic exposure, 2=BULB
        '''
        return self.shutterspeed_mode
        
    def GetPhotoMode(self):
        '''
        | **Summary**
        | Get photo mode.
        | **return**
        | type: int
        | 0=Normal, 1=Bulb, 2=Multi Exposure, 3=TF, 4=AMS, 5=MDS
        '''
        return self.photomode
        
    def GetShutterPosition(self):
        """
        | **Summary**
        | Get shutter status.
        | **return**
        | type: int
        | 0=Open, 1=Close, 2=Expose
        """
        return self.shutterposition
        
    def GetStatus(self):
        """
        | **Summary**
        | Get Photography status.
        | **return**
        | type: int
        | 0=Rest, 1=Imaging
        """
        return self.status
        
    def GetUnused(self):
        return self.unused
        
    def SelectFilmLoadingMode(self, mode):
        '''
        | **Summary**
        | Select film loading mode.
        | **arg**
        | type: int
        | mode: 0=Manual, 1=Auto(Load film to imaging position before photography), 2=Auto(Load film to imaging position after photography)
        '''
        if (type(mode) is int):
            #raise TypeError()
#            if (0 <= kind and kind <= len(self.kindlist)):
            self.filmload_mode = mode
        return 
        
    def SelectMode(self, mode):
        '''
        | **Summary**
        | Select the way to set Shutter Speed.
        | **arg**
        | type: int
        | mode: 0=Manual exposure, 1=Automatic exposure, 2=BULB   
        '''
        if (type(mode) is int):
#            if (0 <= kind and kind <= len(self.kindlist)):
            self.shutterspeed_mode = mode
        return 
        
    def SetExpTime(self, exp_time):
        '''
        | **Summary**
        | Set exposure time(sec). 
        | **arg**
        | type: int
        | exp_time: 0-180.0 (sec) 
        '''
        if(type(exp_time) is int):
            exp_time = float(exp_time)
        if(type(exp_time) is float):
            if(self.expshutter_range[0] <= exp_time and exp_time <= self.expshutter_range[1]):
                self.exptime = exp_time
        return
        
    def SetShutterPosition(self, sw):
        '''
        | **Summary**
        | Open/Close shutter. This does not work while imaging. Time out error occurs after 1 minute closing.
        | **arg**
        | type: int
        | sw: 0=Open, 1=Close
        '''
        if(type(sw) is int):
            if(sw == 0 or sw == 1):
                self.shutterposition = sw
        return