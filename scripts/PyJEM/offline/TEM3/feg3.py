# -*- coding: utf-8 -*-



class FEG3:
    def __init__(self):
#        self.sizelist = ["Open", "1", "2", "3", "4"]
#        self.kindlist = ["Nothing", "CLA", "OLA", "HCA", "SAA", "ENTA", "EDS"]
        self.beamvalve = 0  # 0:Open, 1:Close
        self.v1ready = 1
        self.size = 0
        self.emissionoff = 0    #　なぜSetで引数が必要なのか分からないがあるので変数作成
    
    def GetBeamValve(self):
        '''
        | **Summary**
        | Get FEGUN valve status. This works for FEG and 3100EF.
        | **return**
        | type: int
        | 0=Close, 1=Open
        '''
        return self.beamvalve 
        
    def GetV1Ready(self):
        '''
        | **Summary**
        | Get V1 Ready status. This works for ARM200F
        | **return**
        | type: int
        | 0=Not Ready, 1=Ready
        '''
        return self.v1ready
        
    def SetBeamValve(self, mode):
        '''
        | **Summary**
        | Open/Close FEGUN valve. This works for FEG and 3100EF.
        | **arg**
        | type: int
        | mode: 0=Close, 1=Open
        '''
        if (type(mode) is int):
            if (mode == 0 or mode == 1):
                self.beamvalve = mode
        return 
        
    def SetFEGEmissionOff(self, value):
        '''
        | **Summary**
        | Set FEG Emission OFF. This works for ARM200F
        | **arg**
        | type: int
        | value: 0=Close, 1=Open
        '''
        if(type(value) is int):
#            if (0 <= size and size <= len(self.size)):
            self.emissionoff = value
        return