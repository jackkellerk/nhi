# -*- coding: utf-8 -*-



class HT3:
    def __init__(self):
        self.ht_range = [200000.0, 10.0]
        self.ht_value = 0.0
    
    def GetHtRange(self):
        '''
        | **Summary**
        | Get accelarate voltage range. 
        | **return**
        | type: list
        | [0]= float: HT max value (V).
        | [1]= float: HT min value (V).
        '''
        return self.ht_range 
        
    def GetHtValue(self):
        '''
        | **Summary**
        | Get accelarate voltage(V). Variable range and unit can be obtained with GetHTRange()
        | **return**
        | type: float
        '''
        return self.ht_value
        
    def SetHtValue(self, value):
        '''
        | **Summary**
        | Set accelarate voltage(V). Variable range and unit can be obtained with GetHTRange().
        | **arg**
        | type: float
        | value:
        '''
        if (type(value) is int):
            value = float(value)
        if(type(value) is float):
            if(self.ht_range[1] <= value and value <= self.ht_range[0]):
                self.ht_value = value
        return