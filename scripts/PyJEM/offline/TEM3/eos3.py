# -*- coding: utf-8 -*-


import os 
import json

offline_path = os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir))
eosdata_file = str(offline_path) + r"\resource\offline_tem3eos_data.json"

try:
    f = open(eosdata_file, "r")
    offlinedata = json.load(f)
    f.close()
except:
    print("Fail") 
    
tem_funcmodelist = ["MAG", "MAG2", "LowMAG", "SAMAG", "DIFF"]
stem_funcmodelist = ["Align", "SM-LMAG", "SM-MAG", "AMAG", "uuDIFF", "Rocking"]
listnamelist = ["MagList", "SpctrList", "StemCamList"]  


class EOS3:
    def __init__(self):
        self.alpha_list = ["TEM-S", "1", "2", "3", "4", "5","6","7","8"]
        self.probemode_list = ["TEM","EDS","NBD","CBD"]
        self.mag_index = 0
        self.spctr_index = 0
        self.stemcam_index = 0
        self.alpha_index = 0
        self.funcmode_index_tem = 0
        self.funcmode_index_stem = 0
        self.temstemmode = 0    # 0:TEM, 1:STEM
        self.probemode = 0
        self.spctrmode = 0
        self.spotsize = 0
        self.brightness = 0
        self.difffocus = 0
        self.gifmode = 0    #Get無いからいらない?
        self.objfocus = 0
            
    
    def DownSelector(self):
        '''
        | **Summary**
        | Decrement Magnification/Camera length/Rocking angle number. Down the magnification selector.
        '''
        if (self.mag_index != 0):
            self.mag_index -= 1
        return 
        
    def DownSpctrSelector(self):
        '''
        | **Summary**
        | Decrement spectrum magnification number. Down the energy spectrometer selector.
        '''
        if (self.spctr_index != 0):
            self.spctr_index -= 1
        return 

    def DownStemCamSelector(self):
        '''
        | **Summary**
        | Decrement imaging side camera length(magnification) number for STEM. Down the camera length selector.
        '''
        if (self.stemcam_index != 0):
            self.stemcam_index -= 1
        return 
        
    def GetAlpha(self):
        '''
        | **Summary**
        | Get alpha number.
        | **return**
        | type: int
        | 0-8
        '''
        return self.alpha_index
        
    def GetAlphaSelectorEx(self):
        '''
        | **Summary**
        | Get alpha number and string.
        | **return**
        | type: list
        | [0]= Alpha number, int
        | [1]= Alpha Name, string 
        '''
        return [self.alpha_index, self.alpha_list[self.alpha_index]]
        
    def GetCurrentMagSelectorID(self):
        '''
        | **Summary**
        | Get MAG selector UD and Magnification value.
        | **return**
        | type: list
        | [0]= MAG selector ID, int
        | [1]= Magnification value, int
        '''
        return self.mag_index 
        
    def GetFunctionMode(self):
        '''
        | **Summary**
        | Get imaging FUNCTION mode.
        | **return**
        | type: list
        | [0]= int
        |   <On TEM Observation>:  0=MAG, 1=MAG2, 2=LowMAG, 3=SAMAG, 4=DIFF 
        |   <On STEM Observation>: 0=Align, 1=SM-LMAG, 2=SM-MAG, 3=AMAG, 4=uuDIFF, 5=Rocking
        | [1]= FUNCTION mode explanation string. string
        '''
        if (self.temstemmode == 0):
            _index = self.funcmode_index_tem
            return [_index, tem_funcmodelist[_index]]
        elif (self.temstemmode == 1):
            _index = self.funcmode_index_stem
            return [_index, stem_funcmodelist[_index]]
        return
        
    def GetMagValue(self):
        #まだ
        '''
        | **Summary**
        | Get Magnification/Camera length/Rocking angle. 
        | **return**
        | type: list
        | [0]= Magnification value.(Magnification of scanning image for ASID), string
        | [1]= Unit string, string
        | [2]= Magnification label ,string
        '''
        if(self.temstemmode == 0):
            ret = get_offlinedata(self.temstemmode, self.funcmode_index_tem, "MagList", self.mag_index)
            return ret
        elif(self.temstemmode == 1):
            ret = get_offlinedata(self.temstemmode, self.funcmode_index_stem, "MagList", self.mag_index)
            return ret            
        return 
        
    def GetProbeMode(self):
        '''
        | **Summary**
        | Get irradiative PROBE mode.
        | **return**
        | type: int
        | 0=TEM, 1=EDS, 2=NBD, 3=CBD
        '''
        return [self.probemode, self.probemode_list[self.probemode]]
        
    def GetSpctrMode(self):
        '''
        | **Summary**
        | Get spectrum mode status.
        | **return**
        | type: int
        | 0=OFF, 1=ON
        '''
        return self.spctrmode 
        
    def GetSpctrValue(self):
        #まだ
        '''
        | **Summary**
        | Get spectrum magnification.
        | **return**
        | type: list
        | [0]= long: Magnification value (um/V)
        | [1]= string: Unit string
        | [2]= string: Magnification label
        '''
        if(self.temstemmode == 0):
            ret = get_offlinedata(self.temstemmode, self.funcmode_index_tem, "SpctrList", self.spctr_index)
            return ret
        elif(self.temstemmode == 1):
            ret = get_offlinedata(self.temstemmode, self.funcmode_index_stem, "SpctrList", self.spctr_index)
            return ret            
        return 
        
    def GetSpotSize(self):
        '''
        | **Summary**
        | Get SPOTSIZE number.
        | **return**
        | type: int
        | 0-7
        '''
        return self.spotsize
        
    def GetStemCamValue(self):
        #まだ
        '''
        | **Summary**
        | Get imaging side camera length(magnification) for STEM. 
        | **return**
        | type: int
        | [0]= long: Camera length value (cm)
        | [1]= string: Unit string.
        | [2]= string: Camera length string.
        '''
        if(self.temstemmode == 0):
            ret = get_offlinedata(self.temstemmode, self.funcmode_index_tem, "StemCamList", self.stemcam_index)
            return ret
        elif(self.temstemmode == 1):
            ret = get_offlinedata(self.temstemmode, self.funcmode_index_stem, "StemCamList", self.stemcam_index)
            return ret            
        return self.position
        
    def GetTemStemMode(self):
        '''
        | **Summary**
        | Get TEM/ASID mode.
        | **return**
        | type: int
        | 0=TEM, 1=ASID
        '''
        return self.temstemmode
  
    def SelectFunctionMode(self, mode):
        '''
        | **Summary**
        | Set imaging FUNCTION mode.
        | **arg**
        | type: int
        | mode: 
        |  [On TEM Observation]  0=MAG, 1=MAG2, 2=LowMAG, 3=SAMAG, 4=DIFF
        |  [On STEM Observation] 0=Align, 1=SM-LMAG, 2=SM-MAG, 3=AMAG, 4=uuDIFF, 5=Rocking
        '''
        if (type(mode) is int):
            if(self.temstemmode == 0):
                if((0 <= mode) and (mode <= len(tem_funcmodelist))):
                    self.funcmode_index_tem = mode
            elif(self.temstemmode == 1):
                if((0 <= mode) and (mode <= len(stem_funcmodelist))):
                    self.funcmode_index_stem = mode                
        return
        
    def SelectProbMode(self, mode):
        '''
        | **Summary**
        | Set irradiative PROBE mode.
        | **arg**
        | type: int
        | mode: 
        | 0=TEM, 1=EDS, 2=NBD, 3=CBD
        '''
        if (type(mode) is int):
            if((0 <= mode) and (mode <= len(self.probemode_list))):
                self.probemode_list = mode
        return
        
    def SelectSpotSize(self, size):
        '''
        | **Summary**
        | Set SPOTSIZE number.
        | **arg**
        | type: int
        | size: 
        | 0-7
        '''
        if(type(size) is int):
            self.spotsize = size
        return
        
    def SelectTemStem(self, mode):
        '''
        | **Summary**
        | Set TEM/ASID mode.
        | **arg**
        | type: int
        | mode: 
        | 0=TEM, 1=ASID
        '''
        if (type(mode) is int):
            if(mode == 0 or mode == 1):
                self.temstemmode = mode
        return
        
    def SetAlphaSelector(self, value):
        '''
        | **Summary**
        | Set Alpha number.
        | **arg**
        | type: int
        | value: 
        | 0-8
        '''
        if (type(value) is int):
            if((0 <= value) and (value <= len(self.alpha_list))):
                self.alpha_index = value
        return
                
    def SetBrightness(self, value):
        '''
        | **Summary**
        | Increase of decrease Lens value for BRIGHTNESS(MAG link). Same as BRIGHTNESS knob. 
          Although full range of short type variable can be accepted. 
          the value around +-1 to 50 is suitable because the range corresponds to that of the knob on the operation panel. 
        | **arg**
        | type: int
        | value: 
        '''
        if (type(value) is int):
            self.brightness = value
        return 
        
    def SetDiffFocus(self, value):
        '''
        | **Summary**
        | Increase of decrease Lens value for DIFFFOCUS(MAG link). Same as DIFFFOCUS knob.
          Although full range of short type variable can be accepted.
          the value around +-1 to 50 is suitable because the range corresponds to that of the knob on the operation panel. 
        | **arg**
        | type: int
        | value: 
        '''
        if (type(value) is int):
            self.difffocus = value
        return 
        
    def SetGIF(self, mode):
        '''
        | **Summary**
        | Set GIF-mode.
        | **arg**
        | type: int
        | mode: 
        | 0=OFF, 1=ON
        '''
        if(type(mode) is int):
            self.gifmode = mode
        return
        
    def SetObjFocus(self, value):
        '''
        | **Summary**
        | Increase of decrease Lens value for OBJ Focus(MAG link). Same as OBJ Focus knob. 
          Although full range of short type variable can be accepted. 
          the value around +-1 to 50 is suitable because the range corresponds to that of the knob on the operation panel.
        | **arg**
        | type: int
        | value: 
        '''
        if (type(value) is int):
            self.objfocus = value
        return 
        
    def SetSelector(self, value):
        '''
        | **Summary**
        | Set Magnification/Camera length/Rocking angle number.
        | **arg**
        | type: int
        | value: 
        '''
        if(type(value) is int):
            self.mag_index = value
        return

    def SetSpctrMode(self, mode):
        '''
        | **Summary**
        | ON/OFF spectrum mode.
        | **arg**
        | type: int
        | mode: 
        | 0=OFF, 1=ON
        '''
        if(type(mode) is int):
            self.spctrmode = mode
        return
        
    def SetSpctrSelector(self, value):
        '''
        | **Summary**
        | Set spectrum magnification number.
        | **arg**
        | type: int
        | value: 
        '''
        if (type(value) is int):
            self.spctr_index = value
        return 
        
    def SetStemCamSelector(self, value):
        '''
        | **Summary**
        | Set imaging side camera length(magnification) number for STEM.
        | **arg**
        | type: int
        | value: 
        '''
        if (type(value) is int):
            self.stemcam_index = value
        return 
        
    def UpSelector(self):
        '''
        | **Summary**
        | Increment Magnification/Camera length/Rocking angle number. Up the magnification selector.
        '''
        self.mag_index += 1
        return 
        
    def UpSpctrSelector(self):
        '''
        | **Summary**
        | Increment spectrum magnification number. Up the energy spectrometer selector.
        '''
        self.spctr_index += 1
        return 

    def UpStemCamSelector(self):
        '''
        | **Summary**
        | Increment imaging side camer a length(magnification) number for STEM. Up the camera length selector.
        '''
        self.stemcam_index += 1
        return
        
        

def get_offlinedata(temstemmode, funcmode, listname, index=None):
    '''
    this method is only here.
    online package dont have.
    '''
    if(type(funcmode) is int and type(temstemmode) is int):
        if((temstemmode == 0) and (listname in listnamelist)):
            if((0 <= funcmode and funcmode <= len(tem_funcmodelist))):
                ret = offlinedata["TEM"+ tem_funcmodelist[funcmode]][listname]
                if(index != None and type(index) is int and index <= len(ret)):
                    return ret[index]
                return ret
        elif((temstemmode == 0) and (listname in listnamelist)):
           if((0 <= funcmode and funcmode <= len(stem_funcmodelist))):
                ret = offlinedata["STEM"+ stem_funcmodelist[funcmode]][listname]
                if(index != None and type(index) is int and index <= len(ret)):
                    return ret[index]
                return ret       
    return
        
        