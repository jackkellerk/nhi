# -*- coding: utf-8 -*-



class Filter3:
    def __init__(self):
        self.energyshift_value = 0.0
        self.energyshift_range = [3000.0, 0.2]  # [max,min]
        self.energyshift_sw = 0
        self.slitposition = 0
        self.slitwidth_value = 0.0
        self.slitwidth_range = [48.0, 0.2]
    
    def GetEnergyShift(self):
        '''
        | **Summary**
        | Get energy shift voltage(V). Variable range and unit can be obtained with GetEnergyShiftRange()
        | **return**
        | type: int
        '''
        return self.energyshift_value 
        
    def GetEnergyShiftRange(self):
        '''
        | **Summary**
        | Get maximum and minimum valve.
        | **return**
        | type: int
        '''
        return self.energyshift_range
        
    def GetEnergyShiftSw(self):
        '''
        | **Summary**
        | Get energy shift status(ON or OFF)
        | **return**
        | type: int
        | 0=OFF, 1=ON
        '''
        return self.energyshift_sw
        
    def GetSlitPosition(self):
        '''
        | **Summary**
        | Get slit status(IN or OUT)
        | **return**
        | type: int
        | 0=OUT, 1=IN
        '''
        return self.slitposition 
        
    def GetSlitWidth(self):
        '''
        | **Summary**
        | Get slit width(eV). Variable range and unit can be obtained with GetSlitWidthRange()
        | **return**
        | type: int
        '''
        return self.slitwidth_value
        
    def GetSlitWidthRange(self):
        '''
        | **Summary**
        | Get maximum and minimum value(eV).
        | **return**
        | type: int
        '''
        return self.slitwidth_range
        
    def SetEnergyShift(self, value):
        '''
        | **Summary**
        | Set energy shift voltage(V). Variable range and unit can be obtained with GetEnergyShiftRange()
        | **arg**
        | type: int
        | value:
        '''
        if (type(value) is int):
            value = float(value)
        if(type(value) is float):
            if(self.energyshift_range[0] <= value and value <= self.energyshift_range[1]):
                self.energyshift_value = value
        return 

    def SetEnergyShiftSw(self, sw):
        '''
        | **Summary**
        | ON/OFF energy shift.
        | **arg**
        | type: int
        | sw: 0=OFF, 1=ON
        '''
        if (type(sw) is int):
            if(sw == 0 or sw == 1):
                self.energyshift_sw = sw
        return 

    def SetSlitPosition(self, sw):
        '''
        | **Summary**
        | IN/OUT slit.
        | **arg**
        | type: int
        | sw: 0=OUT, 1=IN
        '''
        if (type(sw) is int):
            if(sw == 0 or sw == 1):
                self.slitposition = sw
        return 

    def SetSlitWidth(self, value):
        '''
        | **Summary**
        | Set slit width(eV). Variable range and unit can be obtained with GetSlitWidthRange()
        | **arg**
        | type: int
        | value:
        '''
        if (type(value) is int):
            value = float(value)
        if(type(value) is float):
            if(self.slitwidth_range[0] <= value and value <= self.slitwidth_range[1]):
                self.slitwidth_value = value
        return 
                
