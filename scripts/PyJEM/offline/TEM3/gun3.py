# -*- coding: utf-8 -*-




class GUN3:
    def __init__(self):
        self.a1_value = 0.0
        self.a2_value = 0.0
        self.beam_sw = 0
        self.emission_value = 0.0
        self.filament_cur_value = 0.0
        self.filament_value = 0.0
        self.ht_status = 0
    
    def GetAnode1CurrentValue(self):
        '''
        | **Summary**
        | Get Anode1 current value(kV). This works for FEG.
        | **return**
        | type: int
        '''
        return self.a1_value 
        
    def GetAnode2CurrentValue(self):
        '''
        | **Summary**
        | Get Anode2 current value(kV). This works for FEG.
        | **return**
        | type: int
        '''
        return self.a2_value
        
    def GetBeamSw(self):
        '''
        | **Summary**
        | Get beam switch status. This does not work for FEG.
        | **return**
        | type: int
        | 0=OFF, 1=ON 
        '''
        return self.beam_sw
        
    def GetEmissionCurrentValue(self):
        '''
        | **Summary**
        | Get emission current value(uA).This works for FEG.
        | **return**
        | type: int
        '''
        return self.emission_value 
        
    def GetFilamentCurrentValue(self):
        '''
        | **Summary**
        | Get emission current value(uA). This works for FEG.
        | **return**:
        | type: int
        '''
        return self.filament_cur_value
        
    def GetFilamentVal(self):
        '''
        | **Summary**
        | Get filment current value. This does not work for FEG.
        | **return**
        | type: float
        | 0-4.095
        '''
        return self.filament_value
  
    def GetHtStts(self):
        '''
        | **Summary**
        | Get HT status. This does not work for FEG.
        | **return**
        | type: int
        | 0=OFF, 1=ON, 2=Increasing or Decreasing
        '''
        return self.ht_status
        
    def SetBeamSw(self, sw):
        '''
        | **Summary**
        | Set beam switch. Start heating filament. This does not work for FEG.
        | **arg**
        | type: int
        | sw: 0=OFF, 1=ON
        '''
        if (type(sw) is int):
            if(sw == 0 or sw == 1):
                self.beam_sw = sw
        return 

    def SetFilamentVal(self, value):
        '''
        | **Summary**
        | Set filment current value. This does not work for FEG.
        | **arg**
        | type: float
        | value: 0-4.095
        '''
        if (type(value) is int):
            value = float(value)
        if(type(value) is float):
            self.filament_value = value
#            self.filament_cur_value = value
        return 
                
