# -*- coding: utf-8 -*-



class Scan3:
    def __init__(self):
        self.rotationangle_range = [0, 359]
        self.scanmode = 0
        self.noisecanceller_value = 0
        self.rotationangle = 0
        self.scandatamode = 0
        self.dataabs = 0
    
    def GetExtScanMode(self):
        '''
        | **Summary**
        | Get whether External scan is going on.
        | **return**
        | type: int
        | 0=OFF, 1=ON
        '''
        return self.scanmode 
        
    def GetNoiseCancellerVal(self):
        '''
        | **Summary**
        | Get Noise Canceller value. This works for ARM200F and ARM300F.
        | **return**
        | type: int
        '''
        return self.noisecanceller_value
        
    def GetRotationAngle(self):
        '''
        | **Summary**
        | Get Scan Rotation angle(degree).
        | **return**
        | type: int
        | 0-359 (degree)
        '''
        return self.rotationangle
        
    def SetExtScanMode(self, sw):
        '''
        | **Summary**
        | Allow External scan.
        | **arg**
        | type: int
        | sw: 0=OFF, 1=ON
        '''
        if (type(sw) is int):
            if(sw == 0 or sw == 1):
                self.scanmode = sw
        return 
        
    def SetRotationAngle(self, value):
        '''
        | **Summary**
        | Set Scan Rotation angle.(degree)
        | **arg**
        | type: int
        | value: 0-359 (degree)
        '''
        if (type(value) is int):
            if(self.rotationangle_range[0] <= value and value <= self.rotationangle_range[1]):
                self.rotationangle = value
        
    def SetScanDataAbs(self, mode, value):
        '''
        | **Summary**
        | "Set Scan Data Value. 
        | **arg**
        | type: int
        | mode: Scanning condition kind
        |  0=Mag Adjust H 1=Mag Adjust V, 2=Rotation H, 3=Rotation V, 4=Correction H, 5=Correction V, 6=Offset H, 7=Offset V 
        | value: long, absolute value 0-65535
        '''
        if(type(mode) is int and type(value) is int):
            self.dataabs = value
            self.scandatamode = mode
        return