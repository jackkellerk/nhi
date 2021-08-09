# coding: utf-8

"""
This package is detector control package.  

In order to use this package, it is necessary to satisfy the following...

* TEMCenter/SightX is running.
* An application for controlling Detector is running.
** (e.g.) DetectorService 

"""

#import httplib2
import socket
#import os
#import win32com.client

from . import function
from .function import *

from . import app_func

#from . import application_func
#from .application_func import *


############################### Initialize #####################################

# 作業必要　以下try/catchで弾かないとめんどくさい
#detectors = []
def _detlist_load():
    global detectors
    try:
        function.reload()
        detectors = function.detectors
        print("Connection with the service is completed.")
    except(ConnectionRefusedError):
        print("There is no link service.")

try:
    #reload
#    detectors = function.get_attached_detector()
    
    #    global detectors 
#    detectors = function.detectors
#    
#    function.get_attached_detector()
    
#    detectors = function.detectors
        
    detectors = function.get_attached_detector()
    for _i, _word in enumerate(detectors):
        print(str(_i) + " : " + _word)

except(httplib2.ServerNotFoundError, TimeoutError, socket.timeout):
#    print("Exception: The Port or IPAddress number is incorrect. Please change from the following.")
    raise("Exception: The Port or IPAddress number is incorrect. Please change from the following.")

except(ConnectionRefusedError):
#    print("PyJEM could not access TEMCenter. However, TEM3 can be used.")
    raise ImportError("PyJEM could not access TEMCenter. However, TEM3 can be used.")

