# -*- coding: utf-8 -*-

from PyJEM import detector
from PyJEM import TEM3

_eos = TEM3.EOS3()
_stage = TEM3.Stage3()



if __name__ == '__main__':
    
    _detector = detector.Detector("STEM BF")   #画像取得する検出器の指定
    _eos.SetSelector(3)    #倍率(～k)の選択

    _curpos = _stage.GetPos()   #現在位置の取得
    print("X: " + str(_curpos[0])+" Y: "+str(_curpos[1])+" Z: "+_curpos[2])

    #1回目 
    _detector.AutoFocus()   #AutoFocus実行
    detector.make_imagefile(_detector, "tif")
    print("[1st] Image File Created")               
          
    #2回目
    _stage.SetPosition((_curpos[0]+1000), (_curpos[1]+1000))    #ステージ移動
    _detector.AutoFocus()   #AutoFocus実行
    detector.make_imagefile(_detector, "tif")
    print("[2nd] Image File Created")       
    
    #3回目
    _stage.SetPosition((_curpos[0]-1000), (_curpos[1]-1000))    #ステージ移動
    _detector.AutoFocus()   #AutoFocus実行
    _detector.AutoContrastBrightness()  #AutoCB
    detector.make_imagefile(_detector, "tif")
    print("[3rd] Image File Created")           

