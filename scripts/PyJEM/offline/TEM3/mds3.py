# -*- coding: utf-8 -*-



class MDS3:
    def __init__(self):
        self.mode = 0
    
    def EndMdsMode(self):
        '''
        | **Summary**
        | Unset MDS mode.
        '''
        self.mode = 0
        return 
        
    def GetMdsMode(self):
        '''
        | **Summary**
        | Get MDS mode.
        | **return**
        | type: int
        | 0=OFF, 1=Search, 2=Focus, 3=Photoset
        '''
        return self.mode
        
    def SetFocusMode(self):
        '''
        | **Summary**
        | Set to MDS focus mode.
        '''
        self.mode = 2
        return 

    def SetPhotosetMode(self):
        '''
        | **Summary**
        | Set to MDS photoset mode.
        '''
        self.mode = 3
        return 

    def SetSearchMode(self):
        '''
        | **Summary**
        | Set toMDS search mode.
        '''
        self.mode = 1
        return 
