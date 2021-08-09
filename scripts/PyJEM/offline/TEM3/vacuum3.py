# -*- coding: utf-8 -*-



class VACUUM3:
    def __init__(self):
        self.camera_air = 0     #valve_status以外0/1
        self.camera_ready = 0
        self.column_air = 0
        self.column_ready = 0
        self.specimen_air = 0
        self.spec_evacstart = 0
        self.specimen_ready = 0
        self.valve_status = [17,3072,0] #取り合えず居室で出た値
    
    def GetCameraAir(self):
        '''
        | **Summary**
        | Get Camera Air status. This works for ARM200F and ARM300F
        | **return**
        | type: int
        | 0=Not Air, 1=Air
        '''
        return self.camera_air 
        
    def GetCameraReady(self):
        '''
        | **Summary**
        | Get Camera Ready status. This works for ARM200F and ARM300F
        | **return**
        | type: int
        | 0=Not Air, 1=Air
        '''
        return self.camera_ready
        
    def GetColumnAir(self):
        '''
        | **Summary**
        | Get Column Air status. This works for ARM200F and ARM300F
        | **return**
        | type: int
        | 0=Not Air, 1=Air
        '''
        return self.column_air
        
    def GetColumnReady(self):
        '''
        | **Summary**
        | Get Column Ready status. This works for ARM200F and ARM300F
        | **return**
        | type: int
        | 0=Not Air, 1=Air
        '''
        return self.column_ready 
        
    def GetSpecimenAir(self):
        '''
        | **Summary**
        | Get Specimen Air status. This works for ARM200F and ARM300F
        | **return**
        | type: int
        | 0=Not Air, 1=Air
        '''
        return self.specimen_air
        
    def GetSpecimenPreEvacStart(self):
        '''
        | **Summary**
        | Get Specimen previous evacuation Start status. This works for ARM200F and ARM300F
        | **return**
        | type: int
        | 0=Not Start, 1=Start
        '''
        return self.spec_evacstart
  
    def GetSpecimenReady(self):
        '''
        | **Summary**
        | Get Specimen Ready status. This works for ARM200F and ARM300F
        | **return**
        | type: int
        | 0=Not Air, 1=Air
        '''
        return self.specimen_ready
  
    def GetValveStatus(self):
        '''
        | **Summary**
        | Get valve status.
        | **return**
        | type: list
        | [0]= int: The number of the effective valves.
        | [1]= int: Bit the information represented in the OPEN/CLOSE of each valve.
        | [2]= int: Bit the information represented in the OPEN/CLOSE of each valve.

        '''
        return self.valve_status
        
   