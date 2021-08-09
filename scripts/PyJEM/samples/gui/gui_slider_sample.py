# -*- coding: utf-8 -*-

from PyQt4.QtGui import *
from PyQt4.QtCore import *
import sys
from PyJEM import detector

class App(QMainWindow):
#    def __init__(self):

#    def main(self):
#        self.w = QWidget()
#        self.w.resize(250, 150)
#        self.w.setWindowTitle('SliderSample')
#
#        slider_label = QLabel('Slider (%):')
#        self.slider = QSlider(Qt.Horizontal)  # スライダの向き
#        self.slider.setRange(0, 100)  # スライダの範囲
#        self.slider.setValue(20)  # 初期値
#        #スライダの目盛りを両方に出す
#        self.slider.setTickPosition(QSlider.TicksBothSides)
#        self.connect(self.slider, SIGNAL('valueChanged(int)'), self.on_draw)
#
#        hbox = QHBoxLayout()
#        hbox.addWidget(slider_label)
#        hbox.setAlignment(slider_label, Qt.AlignVCenter)
#        hbox.addWidget(self.slider)
#        hbox.setAlignment(self.slider, Qt.AlignVCenter)
#
#        self.textbox = QLineEdit()
#
#        vbox = QVBoxLayout()
#        vbox.addWidget(self.textbox)
#        vbox.addLayout(hbox)
#        self.w.setLayout(vbox)
#        self.w.show()

    def main(self):
        self.w = QWidget()
        self.w.resize(250, 150)
        self.w.setWindowTitle('Change GainIndex')

        slider_label = QLabel('GainIndex :')
        self.slider = QSlider(Qt.Horizontal)  # スライダの向き
        self.slider.setRange(int(self.sli_min), int(self.sli_max))  # スライダの範囲
        self.slider.setValue(int(self.sli_cur_value))  # 初期値
        #スライダの目盛りを両方に出す
        self.slider.setTickPosition(QSlider.TicksBothSides)
        self.connect(self.slider, SIGNAL('valueChanged(int)'), self.set_data)

        hbox = QHBoxLayout()
        hbox.addWidget(slider_label)
        hbox.setAlignment(slider_label, Qt.AlignVCenter)
        hbox.addWidget(self.slider)
        hbox.setAlignment(self.slider, Qt.AlignVCenter)

        self.textbox = QLineEdit()

        vbox = QVBoxLayout()
        vbox.addWidget(self.textbox)
        vbox.addLayout(hbox)
        self.w.setLayout(vbox)
        self.w.show()

    def on_draw(self):
        self.textbox.setText(str(self.slider.value()))
        
    def _get_detectordata(self, detectname=None):
        #とりあえず、検出器1番目の設定を作る
        self._detect = detector.Detector(detector.detectors[0])
        if(self._detect != None):
            det_data = self._detect.get_detectorsetting()
            self.sli_max = det_data["GainIndexMaximum"]
            self.sli_min = det_data["GainIndexMinimum"]
            self.sli_cur_value = det_data["GainIndex"]
            
    def set_data(self):
        if(self._detect != None):
            _ret = self._detect.set_gainindex(int(self.slider.value()))
            self.textbox.setText(str(_ret))
        

if __name__ == '__main__':
#    app = QApplication(sys.argv)
#    mainApp = App()
#    mainApp.main()
#    app.exec_()

    app = QApplication(sys.argv)
    mainApp = App()
    mainApp._get_detectordata()
    mainApp.main()
    app.exec_()