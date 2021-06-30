# -*- coding: utf-8 -*-
"""
 stage movement 
 Just x- and y-movement (not z-movement). 
 The first step in this script is to get current x- and y- stage positions. 
 Then move x- and y-directions +/- 5 microns (μm)(motor) and 0.5 micron(piezo) each way.
"""
from PyJEM.offline.TEM3 import stage3

"""
  #####                                        #     #                                                    
 #     # #       ####  #####    ##   #         #     #   ##   #####  #   ##   #####  #      ######  ####  
 #       #      #    # #    #  #  #  #         #     #  #  #  #    # #  #  #  #    # #      #      #      
 #  #### #      #    # #####  #    # #         #     # #    # #    # # #    # #####  #      #####   ####  
 #     # #      #    # #    # ###### #          #   #  ###### #####  # ###### #    # #      #           # 
 #     # #      #    # #    # #    # #           # #   #    # #   #  # #    # #    # #      #      #    # 
  #####  ######  ####  #####  #    # ######       #    #    # #    # # #    # #####  ###### ######  ####                                                                                                  

"""
upperLimit = 90000 # 90,000 nm
lowerLimit = -90000 # 90,000 nm
currentXPos = 0
currentYPos = 0

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
    print("/ Hi, welcome to the OFFLINE stage movement   / ")
    print("/   It uses stage3 from PyJEM.offline.TEM3.   / ")
    print("/                                             / ")
    print("/ / / / / / / / / / / / / / / / / / / / / / / /")
    # create a stage object 
    stage = stage3.Stage3()
    # print current stage info
    getCurrentStageInfo(stage)
    # move x and y stage in +/- 5 microns (μm)in motor and 0.5 micron in piezo each way
    # 1 microns = 1000 nm
    while True:   
        # select movement in piezo/motor
        selectDriveMode(stage)
        # get selected mode 
        drvMode = getDrvMode(stage) 
        userInput = input("Would you like to move the stage?(Y/N): ")
        if userInput == "Y":
            moveStage(stage, drvMode)
        else: 
            print("\n")
            break
        print("\n Updated stage info: ")
        getCurrentStageInfo(stage)
    print("Stopping all the drivers....")
    stage.Stop()
    print("Stopped")
    print("--------THE END-------")

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
"type: list 
        | [0]= float: X Range:+-100000.0(nm)
        | [1]= float: Y Range:+-100000.0(nm)
"""
def getCurrentStageInfo(stage):
    print("Get current stage info (in nm): ")
    currentXPos = (stage.GetPos())[0]
    currentYPos = (stage.GetPos())[1]
    #available movement in x 
    postiveX = upperLimit - currentXPos
    negativeX = lowerLimit - currentXPos
    #available movement in x 
    postiveY = upperLimit - currentYPos
    negativeY = lowerLimit - currentYPos
    print('{:<20} X(nm): {:<20} Y(nm): {:<20}'.format("Stage Position(Motor) ",  currentXPos, currentYPos))
    print('{:<20} -X(nm): {:<20} xPos(nm): {:<20} +X(nm): {:<20}'.format("Availavle X movement(Motor) ",  negativeX, currentXPos, postiveX))
    print('{:<20} -Y(nm): {:<20} yPos(nm): {:<20} +X(nm): {:<20}'.format("Availavle Y movement(Motor) ",  negativeY, currentYPos, postiveY))

    

"""

  #####                          #####  
 #     # ##### ###### #####     #     # 
 #         #   #      #    #          # 
  #####    #   #####  #    #     #####  
       #   #   #      #####     #       
 #     #   #   #      #         #       
  #####    #   ###### #         ####### 
                                        

Get current driving mode
GetDrvMode(): Get selection on motor/piezo.
"type: int 
        | 0=Motor, 1=Piezo
"
"""
def getDrvMode(stage):
    mode = stage.GetDrvMode()
    if mode == 0:
        print("currently in Motor mode")
        return 0
    elif mode == 1:
        print("currently in Piezo mode")
        return 1
    else:
        print("mode unavailable")
        return -1


"""
select piezo/motor
SelDrvMode(sw)
"type: int 
        | sw: 0=Motor, 1=Piezo
"
"""
def selectDriveMode(stage):
    print("----------------------")
    while True:
        print("Piezo mode is currently disabled. Please select motor.")
        userInput = input("Select motor(0) or piezo(1): (0/1): ")
        if userInput == "0":
            print("motor selected")
            stage.SelDrvMode(0)
            break
        # elif userInput == "1":
        #     print("piezo selected")
        #     stage.SelDrvMode(1)
        #     break
        else:    
            print("please select your mode")

"""

  #####                          #####  
 #     # ##### ###### #####     #     # 
 #         #   #      #    #          # 
  #####    #   #####  #    #     #####  
       #   #   #      #####           # 
 #     #   #   #      #         #     # 
  #####    #   ###### #          #####  
                                        

move in x directions 
We decide to use relative movement to make it safer
functions used: 
    SetXRel(value): Relative move along X axis.
    SetYRel(Value): Relative move along Y axis.
    "type: int 
        | value: 
        |  For motor drive Range: +-100000.0(nm)
        |  For piezo Range: +-10000.00(nm)"
"""
def moveStage(stage, drvMode):
    while True:
        # get value 
        value = verifyInput(drvMode)
        userInput = input("Select your movement direction (x/y), or anything else to exit:")
        # x direction in motor mode 
        if (userInput == "x"):
            distance = value + currentXPos
            if((distance >= upperLimit) or (distance <= lowerLimit)):
                print("please enter a value within available range.")
            else:
                print(value, "nm move in X ")
                stage.SetXRel(value)
                break
        elif (userInput == "y"):
            distance = value + currentYPos
            if((distance >= upperLimit) or (distance <= lowerLimit)):
                print("please enter a value within available range.")
            else:
                print(value, " nm move in y ")
                stage.SetYRel(value)
                break
        else:
            print("exit stage movement.")
            break        
    print("----------------------")
    

"""

 #     #                                       #######                                                   
 #     # ###### #      #####  ###### #####     #       #    # #    #  ####  ##### #  ####  #    #  ####  
 #     # #      #      #    # #      #    #    #       #    # ##   # #    #   #   # #    # ##   # #      
 ####### #####  #      #    # #####  #    #    #####   #    # # #  # #        #   # #    # # #  #  ####  
 #     # #      #      #####  #      #####     #       #    # #  # # #        #   # #    # #  # #      # 
 #     # #      #      #      #      #   #     #       #    # #   ## #    #   #   # #    # #   ## #    # 
 #     # ###### ###### #      ###### #    #    #        ####  #    #  ####    #   #  ####  #    #  ####  
                                                                                                         

verifyInput() handles the digit entered, and convert input from microns to nm
1 microns = 1000 nm
"""
def verifyInput(drvMode):
    print("----------------------")
    print("Distance is restricted within +/- 5 microns (μm) for motor mode")
    print("And within +/- 0.5 microns (μm) for piezo mode")
    print("in both x and y directions")
    while True:
        digitInMicron = float(input("Please enter the distance you want to move in microns with sign (μm): "))
        # motor mode
        if (drvMode == 0):
            if((digitInMicron > 5) or (digitInMicron < -5)):
                print("Distance is restricted within +/- 5 microns (μm) for motor mode")
            else:
                break
        # elif (drvMode == 1):
        #     if((digitInMicron > 0.5) or (digitInMicron < -0.5)):
        #         print("Distance is restricted within +/- 0.5 microns (μm) for piezo mode")
        #     else:
        #         break
        else:
            print("\n")
    print(digitInMicron, " micron")
    # return value in nm 
    digitInNM = int(digitInMicron * 1000)
   # print(digitInNM, " nm")
    return digitInNM



if __name__ == "__main__":
    main()



    
    
