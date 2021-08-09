# -*- coding: utf-8 -*-


class Apt3:
    def __init__(self):
#        self.sizelist = ["Open", "1", "2", "3", "4"]
#        self.kindlist = ["Nothing", "CLA", "OLA", "HCA", "SAA", "ENTA", "EDS"]
        self.kind = 0
#        self.x = 0
#        self.y = 0
        self.position = [128, 128]
        self.size = 0
    
    def GetKind(self):
        '''
        | **Summary**
        | Get the type of selected Aperture. Below is the Aperture indicated by the Return.
        | **return**
        | type: int
        | 0=Nothing, 1=CLA, 2=OLA, 3=HCA, 4=SAA, 5=ENTA, 6=EDS
        '''
        return self.kind 
        
    def GetPosition(self):
        '''
        | **Summary**
        | Get Aperture position. The Selected Aperture is the Reading Target.
        | **return**
        | type: list
        | [0]=x, [1]=y
        '''
        return self.position
        
    def GetSize(self, sel_kind):
        '''
        | **Summary**
        | Get Aperture number.
        | **return**
        | type： int
        | 0=Open, 1-4=Number
        '''
        return self.size
        
    def SelectKind(self, kind):
        '''
        | **Summary**
        | SelectKindSelect Aperture type.
        | **arg**
        | type: int
        | kind: 0=Nothing 1=CLA, 2=OLA, 3=HCA, 4=SAA, 5=ENTA, 6=EDS
        '''
        if (type(kind) is int):
            #raise TypeError()
#            if (0 <= kind and kind <= len(self.kindlist)):
            self.kind = kind
        return 
        
    def SetPosition(self, x, y):
        '''
        | **Summary**
        | Set Aperture position. The Selected Aperture is the Operation Target.
        | **arg**
        | type: int
        | x: 0-4095, y: 0-4095 
        '''
        if((type(x) is int) and (type(y) is int)):
            self.position = [x, y]
        return 
        
    def SetSize(self, size):
        '''
        | **Summary**
        | Set Aperture number. The Selected Aperture is the Operation Target.
        | **arg**
        | type: int
        | size: 0=Open, 1-4=Number
        '''
        if(type(size) is int):
#            if (0 <= size and size <= len(self.size)):
            self.size = size
        return