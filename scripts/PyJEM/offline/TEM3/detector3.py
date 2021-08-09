# -*- coding: utf-8 -*-


class Detector3:
    def __init__(self):
#        self.sizelist = ["Open", "1", "2", "3", "4"]
#        self.kindlist = ["Nothing", "CLA", "OLA", "HCA", "SAA", "ENTA", "EDS"]
        self.contbrt_range = [0,4095]
        self.brt = {}
        self.cont = {}
        self.sw = {}
        self.position = {}
        self.screen = 0     #Getが無いのでいらないかも
    
    def GetBrt(self, detectID):
        '''
        | **Summary**
        | Get Brightness of detector.
        | **arg**
        | type: int
        | detectID: DetectorID
        | **return**
        | type: int
        | 0-4095
        '''
        if(type(detectID) is int):
            if (detectID not in self.brt):
                self.brt.update({detectID:0})            
            return self.brt[detectID]
        return #typeError
        
    def GetCont(self, detectID):
        '''
        | **Summary**
        | Get Contrast of detector.
        | **arg**
        | type: int
        | detectID: DetectorID
        | **return**
        | type: int
        | 0-4095
        '''
        if(type(detectID) is int):
            if (detectID not in self.cont):
                self.cont.update({detectID:0})            
            return self.cont[detectID]
        return #typeError
        
    def GetImageSw(self, detectID):
        '''
        | **Summary**
        | Get input status from detector.
        | **arg**
        | type: int
        | detectID: DetectorID
        | **return**
        | type: int
        | 0=OUT, 1=IN
        '''
        if(type(detectID) is int):
            if (detectID not in self.sw):
                self.sw.update({detectID:0})            
            return self.sw[detectID]
        return #typeError
        
    def GetPosition(self, detectID):
        '''
        | **Summary**
        | Get Detector control.
        | **arg**
        | type: int
        | detectID: DetectorID
        | **return**
        | type: int
        | 0=OUT, 1=IN
        '''
        if(type(detectID) is int):
            if (detectID not in self.position):
                self.position.update({detectID:0})            
            return self.position[detectID]
        return #typeError
        
    def SetBrt(self, detectID, value):
        '''
        | **Summary**
        | Set Brightness of detector.
        | **arg**
        | type: int
        | detectID: DetectorID, value: 0-4095
        '''
        if((type(detectID) is int) and (type(value) is int)):
            if(self.contbrt_range[0] <= value and value <= self.contbrt_range[1]):
                if (detectID not in self.brt):
                    self.brt.update({detectID:value})  
                else:
                    self.brt[detectID] = value               
        return 
        
    def SetCont(self, detectID, value):
        '''
        | **Summary**
        | Set Contrast of detector.
        | **arg**
        | type: int
        | detectID: DetectorID, value: 0-4095
        '''
        if((type(detectID) is int) and (type(value) is int)):
            if (detectID not in self.cont):
                self.cont.update({detectID:value})  
            else:
                self.cont[detectID] = value               
        return 
        
    def SetImageSw(self, detectID, value):
        '''
        | **Summary**
        | ON/OFF input signal from detector.
        | **arg**
        | type: int
        | detectID: DetectorID, value:0=OUT, 1=IN
        '''
        if((type(detectID) is int) and (type(value) is int)):
            if(self.contbrt_range[0] <= value and value <= self.contbrt_range[1]):
                if (detectID not in self.sw):
                    self.sw.update({detectID:value})  
                else:
                    self.sw[detectID] = value               
        return 
        
    def SetPosition(self, detectID, sw):
        '''
        | **Summary**
        | Detector control.
        | **arg**
        | type: int
        | detectID: DetectorID, value: 0=OUT, 1=IN
        '''
        if((type(detectID) is int) and (type(sw) is int)):
            if(sw == 0 or sw ==1):
                if (detectID not in self.position):
                    self.position.update({detectID:sw})  
                else:
                    self.position[detectID] = sw               
        return 
        
    def SetScreen(self, value):
        '''
        | **Summary**
        | Screen control.
        | **arg**
        | type: int
        | value: [Select Angle]0=0(deg), 1=7(deg), 2=90(deg)
        '''
        if(type(value) is int):
            self.screen = value
        return