# coding: utf-8

import os
#import socket
import httplib2
import configparser
#from enum import Enum
import json
import webbrowser
import time
#from configparser import SafeConfigParser
#from .connect import Host, Port

"""
Functions not to be directly disclosed to users.
"""

FILE_EXTENTION = ["jpg", "tif", "bmp"]
CONFIG_FILE = os.path.dirname(__file__) + '\config.ini'

def read(fname):
    return open(os.path.join(os.path.dirname(__file__), fname)).read()

def doc():
    """
    | Summary： Show the PyJEM Manual on the Browser.
    | arg    : 
    | return :　
    | type   ： 
    | Except ： 
    """
    _path = os.path.dirname(__file__)
    
    webbrowser.open(_path + "/doc/interface/index.html")
    time.sleep(2) # webbrowserパッケージの仕様で確実にtabで開くにはこれしかないらしい
    webbrowser.open_new_tab(_path + "/doc/usermanual/index.html")

    
#def capturefilepath(path):
#    """
#    path is Absolute path. 
#    指定したファイルパスが存在する場合のみ
#    """
#    if(os.path.exists(path)):
##        os.makedirs(path)
#        _change_config("path", "imagepath", path)
#        global imagefilepath
#        imagefilepath = path
#        return path
#    else:
#        print("File path is not found.")
#        return _get_config("path", "imagepath")
#
    

class BaseConfig(object): #objectクラスを継承するのを忘れない
    """
    Class for accessing config.in.
    Information of config.in is acquired and set via this class.
    """

    def __init__(self):
        self.config = configparser.ConfigParser()
        self.config.read(CONFIG_FILE)

        self.settingInfo = self.get_config()
        
#        self.usersetting = self.settingInfo["usersetting"]
#        self.host = self.settingInfo["host"]
        self.path = self.settingInfo["path"]
        # とりあえず
#        self.service = self.settingInfo["port_temcenter"]  
#        self.service2 = self.settingInfo["port_sightx"]  

        
    def get_config(self):
        """
        Getting information on config.in  
        Currently the option name obtained from config.in is specified in the list, 
        but all acquired options will be added to the list in future.
        """

        _dict = {}
        for i in self.config.sections():
            _dict_section = {}
            for k,v in self.config.items(i, self.config.options(i)):
                _dict_section.update({k:v})
        #    print(config.items(i, config.options(i)))
            _dict.update({i:_dict_section})
        return _dict


    def change_config(self, section, key, value):
#        config_write = configparser.SafeConfigParser()
#        config_write.read(CONFIG_FILE)
#        config_write.optionxform = str        # 大文字・小文字を判断
        
        try:
            self.config.set(section, key, value)

            with open(CONFIG_FILE, "w+") as file:
                self.config.write(file)
            # reload呼ぶ
        except:
            raise    

    def status(self):
        """PyJEMで利用できるサービス一覧と、Ip、画像等の保存場所等の一括取得"""


class Setting(BaseConfig): #SuperClassを継承する
    """
    BaseConfigで取得したconfigの設定、取得を行う。
    このクラスでは、取得した設定情報からURLの作成を主に行う。 -> 別クラスに分けたあため、このクラスでは設定のみ
    その一環に、portの変更やlocal\remoteの切り替え等も含む
    """   
    def __init__(self):
        self.get = super(Setting, self).__init__() #super()を使ってスーパークラスの__init__()を呼び出す
        self.serviceapp = self.settingInfo["usersetting"]["connect"]
        self.service = self.settingInfo[self.serviceapp]
        self.host = self.settingInfo["usersetting"]["hostpc"]

    def reload(self):
        """BaseConfigクラスのリロード"""
        super(Setting, self).__init__()     # BaseSettingクラスのreload
        self.serviceapp = self.settingInfo["usersetting"]["connect"]
        self.service = self.settingInfo[self.serviceapp]
        self.host = self.settingInfo["usersetting"]["hostpc"]

    def change_service(self, appName):
        """port_temcenter or port_sightx"""
        super(Setting, self).change_config("usersetting", "connect", appName)
        self.reload()

    def change_ip(self, ipname):
        """ipname: local, remote, custom"""
        super(Setting, self).change_config("host", "status", ipname)    
        self.reload()

#    def to_temcenter(self):
#        super(Setting, self).change_config("usersetting", "connect", "port_temcenter")
#        self.reload()
#       
#    def to_sightx(self):
#        super(Setting, self).change_config("usersetting", "connect", "port_sightx")
#        self.reload()

    def serviceList(self):
        """service名と使用しているport番号一覧を取得/表示する"""        
#        service = self.settingInfo[self.settingInfo["usersetting"]["connect"]]
        _list = []
        for i in sorted(self.service):
#        for i in sorted(service):
            if type(i) is None:
                pass
            _service = self.service[i].split("/")
#            _service = service[i].split("/")
            print("Port: {0}, Service: {1}," .format(_service[0], _service[1]))
            _list.append(_service)
        return _list
#        return _list#self.get_url_parts()

    def get_state(self):
        """
        # V1.0.1
        list型で、設定情報の取得
        [0]: hostname
        [1]: TEMCenter/SightX
        [2]:　利用可能なサービス
        # V1.0.2
        dict型に変更した。
        | key: value |        
        --------------
        | app: temcenter/sightx | 
        | ip : local |
        """
        ret = []
        ret.append(self.host)
        ret.append(self.serviceapp)
        return ret
       

    def change_port(self, service, port):
        """port番号の変更"""
        service = service.lower()
        
        _curport = self.service[service]
        _curport = _curport.split("/")
        _curport[0] = str(port)
        _curport = "/".join(_curport)
        
        _serviceName = self.serviceapp
        super(Setting, self).change_config(_serviceName, service, _curport)
        # とりあえずの修正 → configでtemcenter/sightxかの取得をしてからarg1にport_***を入れる。
#        super(Setting, self).change_config("port_temcenter", service, _curport)
        self.reload()
#        super(MakeURL, self).__init__()     # Baseクラスのreload

#    def remote(self):
#        super(Setting, self).change_config("host", "status", "remote")
#        self.reload()
#    
#    def local(self):
#        super(Setting, self).change_config("host", "status", "local")
#        self.reload()
           
    def custom_ip(self, _ip=None):
        """
        localhost, 172.16.41.1以外のIPAddressへの変更
        """
        super(Setting, self).change_config("host", "status", "custom")
        if(_ip != None):
    #    if(_ip.count(".") == 3):   // .が3個あった場合の条件文
            super(Setting, self).change_config("host", "custom", _ip)
        self.reload()
        
    def imagefilepath(self, path=None):
        if path is not None:
            if(os.path.exists(path)):
        #        os.makedirs(path)  # 指定したファイルパスが無い場合、作成する
                super(Setting, self).change_config("path", "imagepath", path)
                global imagefilepath
                imagefilepath = path
                return path
        else:
            return self.settingInfo["path"]["imagepath"]
            

class UserSetting(BaseConfig): #SuperClassを継承する
    """
    BaseConfigで取得したconfigの設定、取得を行う。
    このクラスでは、取得した設定情報からURLの作成を主に行う。 -> 別クラスに分けたあため、このクラスでは設定のみ
    その一環に、portの変更やlocal\remoteの切り替え等も含む
    """
    def __init__(self):
        self.get = super(Setting, self).__init__() #super()を使ってスーパークラスの__init__()を呼び出す

    def imagefilepath(self, path=None):
        if path is not None:
            if(os.path.exists(path)):
        #        os.makedirs(path)  # 指定したファイルパスが無い場合、作成する
                super(Setting, self).change_config("path", "imagepath", path)
                global imagefilepath
                imagefilepath = path
                return path
        else:
            return self.path["imagepath"]

        
class Connect(BaseConfig):
    """
    RESTサービスへの接続を行う   
    """
    def __init__(self, servicename, add_url=None): 
        """
        add_urlに値が無ければ、config.inのサービス名のみのURLを作成する       
        (例) Config.inにdetectorrestesrvice = 49226/DetectorRESTServiceとある場合
        1. Connect("DetectorRESTService")               => http://*:49226/DetectorRESTService
        2. Connect("DetectorRESTService", "Detector")   => http://*:49226/DetectorRESTService/Detector
        """                 
        # super()を使ってスーパークラスの__init__()を呼び出す →　正直この記述には意味が無いので決して問題ない
        self.get = super(Connect, self).__init__()
        
        self.unitName = "arg2"  # 出来れば、ここで機種名（F200, JEM1400とか)も入れれたらいいな
        
        
        # port
        self.service = self.settingInfo[self.settingInfo["usersetting"]["connect"]]

        # 入力したサービス名が正しいかのチェック
        servicename = servicename.lower()
        if servicename not in self.service:
            print("Failed")
            return       
        
        # usersettingを見て、現在の設定にする
        # host
        self.ip = self.settingInfo["host"][self.settingInfo["usersetting"]["hostpc"]]     
        # port
#        self.service = self.settingInfo[self.settingInfo["usersetting"]["connect"]]

        # port番号の取得
        self.cur_port = self.service[servicename]

        
        # IPAddressの取得
#        self.ip = self.host[self.host["status"]]
        
        # detectorRESTservice用（URLが多い場合）
        if add_url == None:        
            self.url = "http://{0}:{1}".format(self.ip, self.cur_port)
        else:
            self.url = "http://{0}:{1}/{2}".format(self.ip, self.cur_port, add_url)
#        print(self.url)
                
    def request(self, con_type, body=None, url=None):
        """urlはDetectorRESTServiceのようなURLが多いサービス用"""      
        try:
            # この辺は、クラスのinstanceにいれたい
            client = httplib2.Http(os.path.dirname(__file__) + "/.cache")
#            client = httplib2.Http()
    #        client.add_credentials("name", "password")
            header = {'connection':'close'}
            
            # URLの生成
            if(url != None):
                url = self.url + "/" + url
            else:
#                print(self.url)
                url = self.url
            #bodyの有無
            if(body==None):
                res, cont = client.request(url, con_type, headers=header)
            elif((body.__len__() == 0)):
                return
#                raise exception.ModuleExcept(sys._getframe().f_code.co_name, "body is Empty.")
            else:
                if(type(body) is dict):
                    body = json.dumps(body)
                res, cont = client.request(url, con_type, body, headers=header)
            
            # 実行結果のチェック
            if(cont == None):
                raise ConnectionRefusedError("Return value is None")
    #            raise httplib2.Httplib2Error("Return value is None")
            # ここでself.logstateとか作ってconfig.inにlogstateを追加し、stateのフラグが立っていたら、logファイルを作成するとかもあり
            cont = self._returnCheck(res,cont)
            return cont
            
        except: 
            raise

    def _returnCheck(self, res, cont):
        """
        | summary: 実行結果の判定
        | type: object?
        | return: 成功:実態, 失敗:None
        """
        #except.py実装?    
        
        # ReturnがImageStreamかの判断
    #    if ("content-type" in res):
    #    if("status" is res):
        _status = res["status"]
        _type = res["content-type"]
    #    _server = res["server"]
    #    _length = res["content-length"]
    #    _charset = res["charset"]
    #    _data = res["date"]
            
#        print(res.status)
        if (res.status):
            if(_status == '200'):
    #            if("image" in _type):   #戻り値がImageStream
    #                return cont
    #            elif("octet-stream" in _type):      #RawDataの場合、Content-typeがこうなるので
    #                return cont 
                
                # 画像の場合はjson.loadsしない
                if(cont != None 
                and "image" not in _type
                and "octet-stream" not in _type):
                    cont = json.loads(cont.decode("utf-8"))
    #        elif(_status == '500'):
    #            return None
            elif(_status == '400' or _status == '404'):
                raise httplib2.ServerNotFoundError
            else:
                cont = json.loads(cont.decode("utf-8"))
    
        return cont
