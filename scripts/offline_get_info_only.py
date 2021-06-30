# -*- coding: utf-8 -*-
"""
THis is only for getting stage info 
"""
from PyJEM.offline.TEM3 import stage3



"""

 #     #                                                                      
 ##   ##   ##   # #    #    ###### #    # #    #  ####  ##### #  ####  #    # 
 # # # #  #  #  # ##   #    #      #    # ##   # #    #   #   # #    # ##   # 
 #  #  # #    # # # #  #    #####  #    # # #  # #        #   # #    # # #  # 
 #     # ###### # #  # #    #      #    # #  # # #        #   # #    # #  # # 
 #     # #    # # #   ##    #      #    # #   ## #    #   #   # #    # #   ## 
 #     # #    # # #    #    #       ####  #    #  ####    #   #  ####  #    # 
                                                                              

Stop(): Stop all the drives. set self.stagestatus = [0,0,0,0,0]
"""
def main():
    print("/ / / / / / / / / / / / / / / / / / / / / / / /")
    print("/                                             / ")
    print("/   Getting stage information......           / ")
    print("/                                             / ")
    print("/ / / / / / / / / / / / / / / / / / / / / / / /")
    # create a stage object 
    stage = stage3.Stage3()
    # print current stage info
    getCurrentStageInfo(stage)
 

"""

  #####                           #   
 #     # ##### ###### #####      ##   
 #         #   #      #    #    # #   
  #####    #   #####  #    #      #   
       #   #   #      #####       #   
 #     #   #   #      #           #   
  #####    #   ###### #         ##### 
                                      

Get current x and y stage position
GetPos() Get motor position. 
GetPiezoPosi() Get Piezo Position
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
"""
def getCurrentStageInfo(stage):
    XPos = (stage.GetPos())[0]
    YPos = (stage.GetPos())[1]
    ZPos = (stage.GetPos())[2]
    tx = (stage.GetPos())[3]
    ty = (stage.GetPos())[4]
    print('{:<15} X(nm): {:<15} Y(nm): {:<15} Z(nm): {:<15}'.format("Stage Position(Motor) ",  XPos, YPos, ZPos))
    print('{:<15} X: {:<15} Y: {:<15} '.format("Stage tilt(degree) ",  tx, ty))


    


if __name__ == "__main__":
    main()



    
    
