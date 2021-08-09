# coding: utf-8

#"""
#BSD License
#
#copyright © 2015, Anaconda, Inc.
#
#THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 
#“AS IS” AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, 
#THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE 
#ARE DISCLAIMED. IN NO EVENT SHALL ANACONDA, INC. BE LIABLE FOR ANY DIRECT, 
#INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, 
#BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, 
#DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF 
#LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE 
#OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, 
#EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

#"""

import sys
import os
from . import base
from .base import Setting


#def read(fname):
#    return open(os.path.join(os.path.dirname(__file__), fname)).read()

__version__ = base.read("VERSION")
# PyJEMパッケージに含めるモジュール名を以下に記入する
__all__ = ['detector', 'TEM3']


try:
    #snapshotで保存されるパスのデフォルトフォルダ
    if(os.path.isdir(os.path.dirname(__file__) + "\\image") == False):
        os.mkdir(os.path.dirname(__file__) + "\\image")

except:
    raise


def doc():
    base.doc()

_setting = Setting()

def remote():
    """
    It must be executed when the PC on which PyJEM is installed is other than TEM PC or SightX PC.
    """
    _setting.change_ip("remote")
        
def local():
    """
    It must be executed when PyJEM installed PC is TEM PC or SightX PC.  
    """
    _setting.change_ip("local")

def custom_ip(_ip=None):
    """
    When PyJEM's connected PC is not an IP PC running with remote (), 
    you can enter IPAddress
    """
    _setting.change_ip("custom")
    
def port_change(servicename, port):    
    """
    [Only Maintenance]
    When you need to change the PORT number of the service connected to PyJEM, 
    you can change the PORT number by specifying the service name to be changed with this function.
    """
    _setting.change_port(servicename, port)
    
def serviceList():
    """
    [Only Maintenance]
    Acquire a list of services PyJEM can connect
    Contents written in config.in
    """
    _setting.serviceList()
#
def imagefilepath(path=None):
    """
    Change and acquire the image storage path.
    """
    return _setting.imagefilepath(path)

def temcenter():
    """
    Switch PyJEM control target application to TEMCenter.
    """
    _setting.change_service("port_temcenter")
    
    # reload/detectors問題を解決
    if _submodule_connect("PyJEM.detector"):
        eval("detector._detlist_load")()
    
def sightx():
    """
    Switch PyJEM control target application to SightX.
    """
    _setting.change_service("port_sightx")
    
    # reload/detectors問題を解決
    if _submodule_connect("PyJEM.detector"):
        eval("detector._detlist_load")()

def get_state():
    """
    Acquisition of setting status of current PyJEM.
    """
    ret = []
    for i in _setting.get_state():
        if "port_" in i:
            i = i.split("port_")[1]
        ret.append(i)
    return ret

def _submodule_connect(mod):
    try:
        if not str(mod) in sys.modules:
            exec("import {0}".format(mod))
        return True
        
    except ImportError:
        return False

        

#if __name__ == '__main__':
#    get_state()
    
    
#get_state()