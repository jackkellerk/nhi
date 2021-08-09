# -*- coding: utf-8 -*-



class Lens3:
    def __init__(self):
        self.lensID_count = 26
        self.value_range = [0, 65535]
        self.flc_info = []
        for i in range(self.lensID_count):
            self.flc_info.append([0,0])   
            
        self.cl1 = 0
        self.cl2 = 1
        self.cl3 = 2
        self.cm = 3
        self.olc = 6
        self.olf = 7
        self.om = 8
        self.om2 = 9
        self.il1 = 10
        self.il2 = 11
        self.il3 = 12
        self.il4 = 13
        self.pl1 = 14
        self.pl2 = 15
        self.pl3 = 16
        self.flc = 19
        self.flf = 20
        self.flc1 = 21
        self.flc2 = 21
        self.olsuperfine_sw = 0
        self.olsuperfine_value = 0
        self.om2_flag = 0
        self.diff = 0
            
################################ GET ##########################################

    def GetCL1(self):
        '''
        | **Summary**
        | Get CL1 value. This returns I/O output value. Range:0-FFFF(H)
        | **return**
        | type: int
        | 0-65535
        '''
        return self.flc_info[self.cl1] 
        
    def GetCL2(self):
        '''
        | **Summary**
        | Get CL2 value. This returns I/O output value. Range:0-FFFF(H)
        | **return**
        | type: int
        | 0-65535
        '''
        return self.flc_info[self.cl2]

    def GetCL3(self):
        '''
        | **Summary**
        | Get CL3 value. This returns I/O output value. Range:0-FFFF(H)
        | **return**
        | type: int
        | 0-65535
        '''
        return self.flc_info[self.cl3]
        
    def GetCM(self):
        '''
        | **Summary**
        | Get CM value. This returns I/O output value. Range:0-FFFF(H)
        | **return**
        | type: int
        | 0-65535
        '''
        return self.flc_info[self.cm]

    def GetFLCInfo(self, lensID):
        '''
        | **Summary**
        | Get Free Lens Control information. 
        | **arg**
        | type: int 
        | lensID: 0=CL1,1=CL2,2=CL3,3=CM,4=reserve,5=reserve, 6=OL Coarse, 7=OLFine,
          8= OM1, 9=OM2,10=IL1,11=IL2,12=IL3,13=IL4,14=PL1,15=PL2,16=PL3,17=reserve,
          18=reserve,19=FLCoarse,20=FLFine,21=FLRatio,22=reserve,23=reserve,24=reserve,25=reserve
        | **return**
        | type: int
        | 0=OFF, 1=ON
        '''
        if(type(lensID) is int):
            if(lensID < len(self.flc_info)):
                return self.flc_info[lensID]    
        return 
        
    def GetFLc(self):
        '''
        | **Summary**
        | Get FL Coarse value. This returns I/O output value. Range:0-FFFF(H)
        | **return**
        | type: int
        | 0-65535
        '''
        return self.flc_info[self.flc]

    def GetFLcomp1(self):
        '''
        | **Summary**
        | Get FL Compo1 value. This returns I/O output value. Range:0-FFFF(H)
        | **return**
        | type: int
        | 0-65535
        '''
        return self.flc_info[self.flc1]
        
    def GetFLcomp2(self):
        '''
        | **Summary**
        | Get FL Compo2 value. This returns I/O output value. Range:0-FFFF(H)
        | **return**
        | type: int
        | 0-65535
        '''
        return self.flc_info[self.flc2]

    def GetFLf(self):
        '''
        | **Summary**
        | Get FL Fine value. This returns I/O output value. Range:0-FFFF(H)
        | **return**
        | type: int
        | 0-65535
        '''
        return self.flc_info[self.flf]
                
    def GetIL1(self):
        '''
        | **Summary**
        | Get IL1 value. This returns I/O output value. Range:0-FFFF(H)
        | **return**
        | type: int
        | 0-65535
        '''
        return self.flc_info[self.il1]

    def GetIL2(self):
        '''
        | **Summary**
        | Get IL2 value. This returns I/O output value. Range:0-FFFF(H)
        | **return**
        | type: int
        | 0-65535
        '''
        return self.flc_info[self.il2]
                
    def GetIL3(self):
        '''
        | **Summary**
        | Get IL3 value. This returns I/O output value. Range:0-FFFF(H)
        | **return**
        | type: int
        | 0-65535
        '''
        return self.flc_info[self.il3]

    def GetIL4(self):
        '''
        | **Summary**
        | Get IL4 value. This returns I/O output value. Range:0-FFFF(H)
        | **return**
        | type: int
        | 0-65535
        '''
        return self.flc_info[self.flc1]
                
    def GetOLSuperFineSw(self):
        '''
        | **Summary**
        | Get OL Super fine status. 
        | **return**
        | type: int
        | 0=OFF, 1=ON
        '''
        return self.olsuperfine_sw

    def GetOLSuperFineValue(self):
        '''
        | **Summary**
        | Get OL Super fine value. Range:0-FFFF(H)
        | **return**
        | type: int
        | 0-65535
        '''
        return self.olsuperfine_value

    def GetOLc(self):
        '''
        | **Summary**
        | Get OL Coarse value. This returns I/O output value. Range:0-FFFF(H)
        | **return**
        | type: int
        | 0-65535
        '''
        return self.flc_info[self.olc]

    def GetOLf(self):
        '''
        | **Summary**
        | Get OL Fine value. This returns I/O output value. Range:0-FFFF(H)
        | **return**
        | type: int
        | 0-65535
        '''
        return self.flc_info[self.flc1]

    def GetOM(self):
        '''
        | **Summary**
        | Get OM value. This returns I/O output value. Range:0-FFFF(H)
        | **return**
        | type: int
        | 0-65535
        '''
        return self.flc_info[self.om]

    def GetOM2(self):
        '''
        | **Summary**
        | Get OM2 value. This returns I/O output value. Range:0-FFFF(H)
        | **return**
        | type: int
        | 0-65535
        '''
        return self.flc_info[self.flc1]

    def GetOM2Flag(self):
        '''
        | **Summary**
        | Get OM2 polarity.
        | **return**
        | type: int
        | 0=The same polarity as OM1, 1=The contrary to OM1
        '''
        return self.om2_flag

    def GetPL1(self):
        '''
        | **Summary**
        | Get PL1 value. This returns I/O output value. Range:0-FFFF(H)
        | **return**
        | type: int
        | 0-65535
        '''
        return self.flc_info[self.pl1]

    def GetPL2(self):
        '''
        | **Summary**
        | Get PL2 value. This returns I/O output value. Range:0-FFFF(H)
        | **return**
        | type: int
        | 0-65535
        '''
        return self.flc_info[self.pl2]

    def GetPL3(self):
        '''
        | **Summary**
        | Get PL3 value. This returns I/O output value. Range:0-FFFF(H)
        | **return**
        | type: int
        | 0-65535
        '''
        return self.flc_info[self.pl3]

################################## SET ########################################
        
    def SetFLCAbs(self, lensID, value):
        '''
        | **Summary**
        | Set lens value for Free Lens Control.
        | **arg**
        | type: int
        | lensID: 0=CL1, 1=CL2, 2=CL3, 3=CM, 4=reserve, 5=reserve, 6=OL Coarse,
          7=OL Fine, 8=OM1, 9=OM2, 10=IL1, 11=IL2, 12=IL3, 13=IL4, 14=PL1, 15=PL2,
          16=PL3, 17=reserve, 18=reserve, 19=FL Coarse, 20=FL Fine, 21=FL Ratio,
          22=reserve, 23=reserve, 24=reserve, 25=reserve
        | value: absolute value, 0-65535
        '''
        if (type(lensID) is int and type(value) is int):               
            if((self.value_range[0] <= value and value <= self.value_range[1])
            and (0 <= lensID and lensID <= self.lensID_count)):
                self.flc_info[lensID] = [self.flc_info[lensID][0],value]
        return
        
    def SetFLCRel(self, lensID, value):
        '''
        | **Summary**
        | Increase or decrease lens value for Free Lens Control.
        | **arg**
        | type: int
        | lensID: 0=CL1, 1=CL2, 2=CL3, 3=CM, 4=reserve, 5=reserve, 6=OL Coarse,
          7=OL Fine, 8=OM1, 9=OM2, 10=IL1, 11=IL2, 12=IL3, 13=IL4, 14=PL1, 15=PL2,
          16=PL3, 17=reserve, 18=reserve, 19=FL Coarse, 20=FL Fine, 21=FL Ratio,
          22=reserve, 23=reserve, 24=reserve, 25=reserve
        | value: absolute value, 0-65535
        '''
        if (type(lensID) is int and type(value) is int):              
            if (0 <= lensID and lensID <= self.lensID_count):
                temp_value = self.flc_info[lensID][1] + value
                if(self.value_range[0] <= temp_value and temp_value <= self.value_range[1]):
                    self.flc_info[lensID] = [self.flc_info[lensID][0],temp_value]
        return
        
    def SetFLCSw(self, lensID, sw):
        '''
        | **Summary**
        | Set lens switch for Free lens Control.
        | **arg**
        | type: int
        | lensID: 0=CL1, 1=CL2, 2=CL3, 3=CM, 4=reserve, 5=reserve, 6=OL Coarse,
          7=OL Fine, 8=OM1, 9=OM2, 10=IL1, 11=IL2, 12=IL3, 13=IL4, 14=PL1, 15=PL2,
          16=PL3, 17=reserve, 18=reserve, 19=FL Coarse, 20=FL Fine, 21=FL Ratio,
          22=reserve, 23=reserve, 24=reserve, 25=reserve
        | sw: 0=OFF, 1=ON
        '''
        if (type(lensID) is int and type(sw) is int):               
            if((sw == 0 or sw == 1)
            and (0 <= lensID and lensID <= self.lensID_count)):
                self.flc_info[lensID] = [sw,self.flc_info[lensID][1]]
        return
        
    def SetFLCSwAllLens(self, sw):
        '''
        | **Summary**
        | Set Lens switch for Free Lens Control.
        | **arg**
        | type: int
        | sw: 0=OFF, 1=ON
        '''
        if (type(sw) is int):               
            if(sw == 0 or sw == 1):
                for i in range(self.lensID_count):
                    self.flc_info[i] = [sw,self.flc_info[i][1]]
        return


    def SetCL3(self, value):
        '''
        | **Summary**
        | Set CL3 value(without MAG link). The variable corresponds to I/O output value. Range:0-FFFF(H)
        | **arg**
        | type: int
        | value: 0-65535
        '''
        if (type(value) is int):
            if(self.value_range[0] <= value and value <= self.value_range[1]):
                self.flc_info[self.cl3] = [self.flc_info[self.cl3][0],value]
        return
        
    def SetDiffFocus(self, value):
        '''
        | **Summary**
        | Increase or decrease value for DIFF Focus(without MAG link). 
          The variable corresponds to I/O output value. Range:0-FFFF(H)
        | **arg**
        | type: int
        | value: 0-65535
        '''
        if(type(value) is int):
            if(self.value_range[0] <= value and value <= self.value_range[1]):
                self.diff = value
        return
    
    def SetFLc(self, value):
        '''
        | **Summary**
        | Increase or decrease value for FLC(without MAG link). 
          The variable corresponds to I/O output value. Range:0-FFFF(H)
        | **arg**
        | type: int
        | value: 0-65535
        '''
        if (type(value) is int):
            if(self.value_range[0] <= value and value <= self.value_range[1]):
                self.flc_info[self.flc] = [self.flc_info[self.flc][0],value]
        return
      
    def SetFLf(self, value):
        '''
        | **Summary**
        | Increase or decrease value for FLF(without MAG link). 
          The variable corresponds to I/O output value. Range:0-FFFF(H)
        | **arg**
        | type: int
        | value: 0-65535
        '''
        if (type(value) is int):
            if(self.value_range[0] <= value and value <= self.value_range[1]):
                self.flc_info[self.flf] = [self.flc_info[self.flf][0],value]
        return     
    
    def SetILFocus(self, value):
        '''
        | **Summary**
        | Increase or decrease value for IL Focus(without MAG link). 
          The variable corresponds to I/O output value. Range:0-FFFF(H)
        | **arg**
        | type: int
        | value: 0-65535
        '''
        if (type(value) is int):
            if(self.value_range[0] <= value and value <= self.value_range[1]):
                self.flc_info[self.il1] = [self.flc_info[self.il1][0],value]
        return     
    
    def SetNtrl(self, value):
        '''
        | **Summary**
        | NTRL within only value range. 
        | **arg**
        | type: int
        | value: 0=Brightness, 1=OBJ Focus, 2=DIFF Focus, 3=IL Focus, 4=PL Focus, 5=FL Focus
        '''
        if (type(value) is int):
            if(value == 5):
                self.flc_info[self.flf] = [self.flc_info[self.il1][0], 0]
            if(value == 2):
                self.diff = 0
        return     
    
    def SetOLSuperFineNeutral(self):
        '''
        | **Summary**
        | Set Neutral of OL Super Fine. Neutral:800(H)
        '''
        self.olsuperfine_value = 0
        return     
    
    def SetOLSuperFineSw(self, sw):
        '''
        | **Summary**
        | Set OL Super fine status. 
        | **arg**
        | type: int
        | sw: 0=OFF, 1=ON
        '''
        if (type(sw) is int):
            if(sw == 0 or sw == 1):
                self.olsuperfine_sw = sw
        return     
    
    def SetOLSuperFineValue(self, value):
        '''
        | **Summary**
        | Set OL Super fine value. Range:0-FFFF(H)
        | **arg**
        | type: int
        | value: 0-65535
        '''
        if (type(value) is int):
            if(self.value_range[0] <= value and value <= self.value_range[1]):
                self.olsuperfine_value= value
        return     
    
    def SetOLc(self, value):
        '''
        | **Summary**
        | Set OLC value(without MAG link). The variable corresponds to I/O output value without carry. Range:0-FFFF(H)
        | **arg**
        | type: int
        | value: 0-65535
        '''
        if (type(value) is int):
            if(self.value_range[0] <= value and value <= self.value_range[1]):
                self.flc_info[self.olc] = [self.flc_info[self.olc][0],value]
        return     
    
    def SetOLf(self, value):
        '''
        | **Summary**
        | Set OLF value(without MAG link). The variable corresponds to I/O output value without carry. Range:0-FFFF(H)
        | **arg**
        | type: int
        | value: 0-65535
        '''
        if (type(value) is int):
            if(self.value_range[0] <= value and value <= self.value_range[1]):
                self.flc_info[self.olf] = [self.flc_info[self.olf][0],value]
        return     
    
    def SetPLFocus(self, value):
        '''
        | **Summary**
        | Increase or decrease value for PL Focus(without MAG link). 
          The variable corresponds to I/O output value. Range:0-FFFF(H)
        | **arg**
        | type: int
        | value: 0-65535
        '''
        if (type(value) is int):
            if(self.value_range[0] <= value and value <= self.value_range[1]):
                self.flc_info[self.pl1] = [self.flc_info[self.pl1][0],value]
        return     
    
