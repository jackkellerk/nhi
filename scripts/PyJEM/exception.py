"現状ErrorチェックはHttplib2ぐらいなので必要ないためコメントアウト"

# coding: utf-8

#import os
#import httplib2
#import json 

class ModuleExcept(Exception):
    def __init__(self, instr, ptn=None):
        self._instr, self._ptn = (instr, ptn)
    def __str__ (self):
        if(self._ptn==None):
            return ('An exception occurred in "{0}". Except is "{1}"'.format (self._instr, self._ptn))
        else:
            return ('An exception occurred in "{0}".'.format (self._instr))
            
class ClientExcept(Exception):
    def __init__(self, instr):
        self._instr = instr
    def __str__ (self):
#        return ('"{0}"'.format (self._instr))
        return (self._instr)
    
class ServerExcept(Exception):
    def __init__(self, instr, ptn):
        self._instr, self._ptn = (instr, ptn)
    def __str__ (self):
        return ('Pattern "{0}" not found in "{1}"'.format (self._ptn, self._instr))
    

#class ReturnStatus():
    



# class HttpCheck(Exception):
#     "HTTP Error"
#     pass
#
# """ … """
