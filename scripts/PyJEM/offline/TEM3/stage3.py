# -*- coding: utf-8 -*-



class Stage3:
    def __init__(self):
        self.position = [0.0,0.0,0.0,0.0,0.0]   #[x,y,z,tx,ty]
        self.piezoposi = [0.0,0.0]
        self.direction = [0,0,0,0,0]
        self.drvmode = 0    # 0:Motor, 1:Piezo
        self.holderstate = 0
        self.stagestatus = [0,0,0,0,0]
        self.tilt_range = [-90.0, 90.0]
        self.motor_range = [-100000.0, 100000.0]
        self.piezo_range = [-10000.00, 10000.00]
        
    def GetDirection(self):
        '''
        | **Summary**
        | Get driving direction. 0:-direction, 1:+direction
        | **return**
        | type: list 
        | [0]= int: X
        | [1]= int: Y
        | [2]= int: Z
        | [3]= int: TiltX
        | [4]= int: TiltY
        '''
        return self.direction 
        
    def GetDrvMode(self):
        '''
        | **Summary**
        | Get selection on motor/piezo.
        | **return**
        | type: int 
        | 0=Motor, 1=Piezo
        '''
        return self.drvmode
        
    def GetHolderStts(self):
        '''
        | **Summary**
        | Get holder status(inserted or not).
        | **return**
        | type: int 
        | 0=OUT, 1=IN
        '''
        return self.holderstate
 
    def GetPiezoPosi(self):
        '''
        | **Summary**
        | Get piezo position. 
        | **return**
        | type: list 
        | [0]= float: X Range:+-100000.0(nm)
        | [1]= float: Y Range:+-10000.00(nm) 
        '''
        return self.piezoposi 
        
    def GetPos(self):
        '''
        | **Summary**
        | Get motor position. 
        | **return**
        | type: list 
        | [0]= float: X Range:+-100000.0(nm)
        | [1]= float: Y Range:+-100000.0(nm)
        | [2]= float: Z Range:+-100000.0(nm)
        | [3]= float: TiltX Range:+-90.00(degree)
        | [4]= float: TiltY Range:+-180.00(degree)
        '''
        return self.position
        
    def GetStatus(self):
        '''
        | **Summary**
        | Get driving status. 
        | **return**
        | type: list 
        | 0=Rest, 1=Moving, 2=Hardware limiter error.
        | [0]->int: X
        | [1]->int: Y
        | [2]->int: Z
        | [3]->int: TiltX
        | [4]->int: TiltY
        '''
        return self.stagestatus
        
    def SelDrvMode(self, sw):
        '''
        | **Summary**
        | Select motor/piezo.
        | **arg**
        | type: int 
        | sw: 0=Motor, 1=Piezo
        '''
        if (type(sw) is int):
            if(sw == 0 or sw == 1):
                self.drvmode = sw
        return 
    
    def SetOrg(self):
        #動作が分からないため未実装
        '''
        | **Summary**
        | Move to origin. Moving order: TiltY, TiltX, X, Z, Y
        '''
        return 
        
    def SetPosition(self, x, y):
        '''
        | **Summary**
        | Set X-Y axis drive(with rotation compensation)
        | **arg**
        | type: int 
        | x: float, x Range:+-100000.0(nm)
        | y: float, y Range:+-100000.0(nm)
        '''
        if(type(x) is int):
            x = float(x)
        if(type(y) is int):
            y = float(y)
        if(type(x) is float and type(y) is float):
            self.position[0] = self.position[0] + x
            self.position[1] = self.position[1] + y
            
            self.direction[0] = _direction(self.position[0])
            self.direction[1] = _direction(self.position[1])
        return            

    def SetX(self, value):
        '''
        | **Summary**
        | Set X axis drive. 
        | **arg**
        | type: int 
        | value: 
        |  For motor drive Range: +-100000.0(nm)
        |  For piezo Range: +-10000.00(nm)
        '''
        if(type(value) is int):
            value = float(value)
        if(type(value) is float):
            if(self.drvmode == 0):
                if(self.motor_range[0] <= value and value <= self.motor_range[1]):
                    self.position[0] = value
                    self.direction[0] = _direction(self.position[0])

            elif(self.drvmode == 1):
                if(self.piezo_range[0] <= value and value <= self.piezo_range[1]):
                    self.piezoposi[0] = value
                    self.direction[0] = _direction(self.piezoposi[0])

        return 
        
    def SetY(self, value):
        '''
        | **Summary**
        | Set Y axis drive. 
        | **arg**
        | type: int 
        | value: 
        |  For motor drive Range: +-100000.0(nm)
        |  For piezo Range: +-10000.00(nm)
        '''
        if(type(value) is int):
            value = float(value)
        if(type(value) is float):
            if(self.drvmode == 0):
                if(self.motor_range[0] <= value and value <= self.motor_range[1]):
                    self.position[1] = value
                    self.direction[1] = _direction(self.position[1])
            elif(self.drvmode == 1):
                if(self.piezo_range[0] <= value and value <= self.piezo_range[1]):
                    self.piezoposi[1] = value
                    self.direction[1] = _direction(self.piezoposi[1])
        return    
        
    def SetZ(self, value):
        '''
        | **Summary**
        | Set Z axis drive. 
        | **arg**
        | type: int 
        | value: 
        |  For motor drive Range: +-100000.0(nm)
        |  For piezo Range: +-10000.00(nm)
        '''
        if(type(value) is int):
            value = float(value)
        if(type(value) is float):
            if(self.motor_range[0] <= value and value <= self.motor_range[1]):
                self.position[2] = value
                self.direction[2] = _direction(self.position[2])
        return             
    
    def SetTiltXAngle(self, value):
        '''
        | **Summary**
        | Set TiltX
        | **arg**
        | type: int 
        | value: +-90.00 (degree)
        '''
        if(type(value) is int):
            value = float(value)
        if(type(value) is float):
            if(self.tilt_range[0] <= value and value <= self.tilt_range[1]):
                self.position[3] = value
                self.direction[3] = _direction(self.position[3])
        return 
        
    def SetTiltYAngle(self, value):
        '''
        | **Summary**
        | Set TiltY
        | **arg**
        | type: int 
        | value: +-90.00 (degree)
        '''
        if(type(value) is int):
            value = float(value)
        if(type(value) is float):
            if(self.tilt_range[0] <= value and value <= self.tilt_range[1]):
                self.position[4] = value
                self.direction[4] = _direction(self.position[4])
        return    
                                            
    def SetXRel(self, value):
        '''
        | **Summary**
        | Relative move along X axis.
        | **arg**
        | type: int 
        | value: 
        |  For motor drive Range: +-100000.0(nm)
        |  For piezo Range: +-10000.00(nm)
        '''
        if(type(value) is int):
            value = float(value)
        if(type(value) is float):
            if(self.drvmode == 0):
                temp_value = self.position[0] + value
                if(self.motor_range[0] <= temp_value and temp_value <= self.motor_range[1]):
                    self.position[0] = temp_value
                    self.direction[0] = _direction(self.position[0])
            elif(self.drvmode == 1):
                temp_value = self.piezoposis[0] + value
                if(self.piezo_range[0] <= temp_value and temp_value <= self.piezo_range[1]):
                    self.piezoposi[0] = temp_value                
                    self.direction[0] = _direction(self.piezoposi[0])
        return 
         
    def SetYRel(self, value):
        '''
        | **Summary**
        | Relative move along Y axis.
        | **arg**
        | type: int 
        | value: 
        |  For motor drive Range: +-100000.0(nm)
        |  For piezo Range: +-10000.00(nm)
        '''
        if(type(value) is int):
            value = float(value)
        if(type(value) is float):
            if(self.drvmode == 0):
                temp_value = self.position[1] + value
                if(self.motor_range[0] <= temp_value and temp_value <= self.motor_range[1]):
                    self.position[1] = temp_value
                    self.direction[1] = _direction(self.position[1])
            elif(self.drvmode == 1):
                temp_value = self.piezoposis[1] + value
                if(self.piezo_range[0] <= temp_value and temp_value <= self.piezo_range[1]):
                    self.piezoposi[1] = temp_value                
                    self.direction[1] = _direction(self.piezoposi[1])
        return 
         
    def SetZRel(self, value):
        '''
        | **Summary**
        | Relative move along Z axis.
        | **arg**
        | type: int 
        | value: 
        |  For motor drive Range: +-100000.0(nm)
        |  For piezo Range: +-10000.00(nm)
        '''
        if(type(value) is int):
            value = float(value)
        if(type(value) is float):
            temp_value = self.position[2] + value
            if(self.motor_range[0] <= temp_value and temp_value <= self.motor_range[1]):
                self.position[2] = temp_value
                self.direction[2] = _direction(self.position[2])
        return 
               
    def SetTXRel(self, value):
        '''
        | **Summary**
        | Relative tilt around TiltX.
        | **arg**
        | type: int 
        | value: +-90.00 (degree)
        '''
        if(type(value) is int):
            value = float(value)
        if(type(value) is float):
            temp_value = self.position[3] + value
            if(self.tilt_range[0] <= temp_value and temp_value <= self.tilt_range[1]):
                self.position[3] = temp_value
                self.direction[3] = _direction(self.position[3])
        return 
                 
    def SetTYRel(self, value):
        '''
        | **Summary**
        | Relative tilt around TiltY.
        | **arg**
        | type: int 
        | value: +-90.00 (degree)
        '''
        if(type(value) is int):
            value = float(value)
        if(type(value) is float):
            temp_value = self.position[4] + value
            if(self.tilt_range[0] <= temp_value and temp_value <= self.tilt_range[1]):
                self.position[4] = temp_value
                self.direction[4] = _direction(self.position[4])
        return 
        
    def Stop(self):
        '''
        | **Summary**
        | Stop all the drives.
        '''
        self.stagestatus = [0,0,0,0,0]
        return
        
            
        
def _direction(value):
    if(value > 0):
        return 1
    else:
        return 0
        
    
