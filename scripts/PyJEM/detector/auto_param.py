# -*- coding: utf-8 -*-
"""
Created on Thu Mar  8 17:50:12 2018

@author: dmaekawa
"""

"TESt Code 消すかどうかは検討"

from enum import Enum

"""
F2のコードを見てパラメータを追加したため、使えないパラメータがあるかもしれない
"""

class AFC(Enum):
    #Image
#    MagRangeName	       = 1
#    MagRangeMax	       = 2
#    ImageWidth          = 3
#    ImageHeight	 = 4
    TrimmingX	 = 5 #
    TrimmingY	 = 6 #
    TrimmingWidth	 = 7 #
    TrimmingHeight	 = 8 #
#    ImageCut	 = 9
#    SearchDirect	 = 10
    ImageNum	 = 11 #
    AFCWidth	 = 12 #
#    OLWaitLong	 = 13
#    OLWait	         = 14
#    Calculate	 = 15
#    DegreePolynomial	 = 16
#    AFCJudgeP	 = 17
#    PeakRatio	 = 18
#    JudgeKind	 = 19
#    SearchStep	 = 20
#    EnableOUF	 = 21
#    Timeout	 = 22
#    RepeatNum	 = 23
#    DispSquare	 = 24
#    AFCLog	 = 25
#    ImageLogBrightness	 = 26
#    ImageLogGauss	 = 27
#    ImageLogSobel	 = 28
#    ImageLogJustFocus   = 29
#    ImageLogOrg	 = 30
#    ImageLogOrgTrimming = 31
#    ImageLogOUF	 = 32
    DetectorSetting	 = 33 #
#    CanUpdateView	 = 34
    AutoFocusType = 35  #Image/BeamTilt
    
##    BeamTilt
#    CmagMaxlimit	=	36
#    CmagMinlimit	=	37
#    CmagMinlimitAlpha0	=	38
#    CmagMinlimitAlpha1	=	39
#    CoLMAG	=	40
#    CoLLowMAG	=	41
#    CtiltMAG	=	42
#    CtiltLowMAG	=	43
#    Csleeptilt	=	44
#    Chmin	=	45
#    Chmax	=	46
#    CccdArea	=	47
#    CbinningIndex	=	48
#    CcorrReduceFactor	=	49
#    CcorrHPF	=	50
#    Cthre	=	51
#    Cdebug	=	52
#    Method	=	53
##    CanUpdateView	=	54
#    CoLmax	=	55
#    Csleepfocus	=	56
#    CZMAG	=	57
#    CZLowMAG	=	58
#    CZmax	=	59
#    CsleepZ	=	60
    
class ACBParam(Enum):
##開発者用
##    CaptureWait =	1
##    ScanSpeedSelect =	2
##    ScanSpeed =	3
##    ScanSpeedLevel =	4
##    ExposureTimeValue =	5
##    ACBLog =	6
##    ACBOrgnLog =	7
##    ACBHistogramLog =	8
##    ACBAccumHistLog =	9
##    ImageLogOrg =	10
##    CanUpdateView =	11
#
##    Name =	12
##    Comment =	13
##    IsEditable =	14
##    Items =	15
#    SelectedUsage =	16
##    Items =	17
#    TargetContrastMin =	18
#    TargetContrastMax =	19
#    TargetBrightnessMin =	20
#    TargetBrightnessMax =	21
#    BrightnessAccuracyMin =	22
#    BrightnessAccuracyMax =	23
    TargetContrast =	24 #
    TargetBrightness =	25 #
    BrightnessAccuracy =	26 #
#    SamplingCountMin =	27
#    SamplingCountMax =	28
#    InitialBrightnessMin =	29
#    InitialBrightnessMax =	30
#    BrightnessCoefficientMin =	31
#    BrightnessCoefficientMax =	32
    SamplingCount =	33 #
#   BrightnessCoefficient =	34
    
class ASTGParam(Enum):
    #↓共通
#    MagRangeName =	1
#    MagRangeMax =	2
#    ImageWidth =	3
#    ImageHeight =	4
#    ImageCut =	5
#    SearchDirect =	6
#    ImageNum =	7
    AFCWidth =	8 #
#    Calculate =	9
#    DegreePolynomial =	10
#    ASTGJudgeP =	11
#    AFCPeakRatio =	12
#    JudgeKind =	13
#    AFCSearchStep =	14
#    Timeout =	15
    ASTGRepeatNum =	16 #
#    DispSquare =	17
#    ASTGLog =	18
#    ImageLogBrightness =	19
#    ImageLogGauss =	20
#    ImageLogSobel =	21
#    ImageLogJustStigma =	22
#    ImageLogOrg =	23
#    Exec2ndAFC =	24
    ASTGImageNum_X =	25 #
    ASTGWidth_X =	26 #
    ASTGImageNum_Y =	27 #
    ASTGWidth_Y =	28 #
#    StigmaX_Wait_Long =	29
#    StigmaY_Wait_Long =	30
#    StigmaX_Wait =	31
#    StigmaY_Wait =	32
#    ASTGSearchStep =	33
    ASTGRepeatNum_X =	34 #
    ASTGRepeatNum_Y =	35 #
#    #↓TEM固有
#    DifferenceStep =	36
#    SplineStep =	37
#    SplineSearchStep =	38
#    EvaluationSelect =	39
#    DispConfirm =	40
#    #↓Scan固有
#    ScanSpeedSelect =	41
#    ScanSpeed =	42
#    ScanSpeedLevel =	43
#    ExposureTimeValue =	44
#    Accumulation =	45
    
class AZParam(Enum):
#    Z_LIMIT_SW =	1
#    CORR =	2
#    CORR_STEP =	3
#    CORR_WAIT =	4
#    ACTIVE_TIMEOUT =	5
#    MOVE_TIMEOUT =	6
#    #MagRangeName =	7
#    #MagRangeMax =	8
#    ImageWidth =	9
#    ImageHeight =	10
    TrimmingX =	11 #
    TrimmingY =	12 #
    TrimmingWidth =	13 #
    TrimmingHeight =	14 #
#    ImageCut =	15
#    SearchDirect =	16
    ImageNum =	17 #
    AZWidth =	18 #
#    OLWaitLong =	19
#    OLWait =	20
#    Calculate =	21
#    DegreePolynomial =	22
#    AZJudgeP =	23
#    JudgeKind =	24
#    SearchStep =	25
#    Timeout =	26
#    RepeatNum =	27
#    AZLog =	28
#    ImageLogBrightness =	29
#    ImageLogGauss =	30
#    ImageLogSobel =	31
#    ImageLogJustFocus =	32
#    ImageLogOrg =	33
#    ImageLogOrgTrimming =	34
#    CORR_AT_RESET =	35
#    Z_FIRST_DIRECTION =	36
    DetectorSetting =	37 # 
#    CanUpdateView =	38
#    DifferenceStep =	40
#    SplineStep =	41
#    SplineSearchStep =	42
#    EvaluationSelect =	43
#    DispConfirm =	44
#    ScanSpeedSelect =	45
#    ScanSpeed =	46
#    ScanSpeedLevel =	47
#    ExposureTimeValue =	48
#    Accumulation =	49

class AOParam(Enum):
    THRESH =	1
    ENABLE_DEF_ANG =	2
    DEF_ANG =	3
    TILT_STEP =	4
    TILT_POS =	5
    TILT_NEG =	6
    ACTIVE_TIMEOUT =	7
    TILT_TIMEOUT =	8
    ANG_LIMIT_X =	9
    ANG_LIMIT_Y =	10
    SEARCH =	11
    REPEAT_X =	12
    REPEAT_Y =	13
    ANGLE_CORR =	14
    ANGLE_CORR_STEP =	15
    ANGLE_CORR_WAIT =	16
    ANGLE_CORR_AT_RESET =	17
    JUDGE_SELECT =	18
    IMG_WAIT =	19
    OFFSET_X =	20
    OFFSET_Y =	21
    ENABLE_OPT_SEARCH =	22
    STEP_AT_OPT_SEARCH =	23
    COUNT_AT_OPT_SEARCH =	24
    SPOT_COUNT_AT_OPT_SEARCH =	25
    PIXEL_WIDTH_AT_EDGE_DETECTION =	26
    THRESH_AT_EDGE_DETECTION =	27
    IGNORE_PIXEL_COUNT =	28
    TRIM_LEFT_RIGHT =	29
    LOG =	30
    IMG_LOG_MODE =	31
    OPT_SEARCH_ORG_IMG_LOG =	32
    OPT_SEARCH_THRESH_NR_IMG_LOG =	33
    DS_ORG_IMG_LOG =	34
    DS_THRESH_IMG_LOG =	35
    IMG_LOG =	36
    SOBEL_IMG_LOG =	37
    GAUSS_IMG_LOG =	38
    THRESH_IMG_LOG =	39
    THRESH_NR_IMG_LOG =	40
    THRESH_CIRCLE_IMG_LOG =	41
    OPTIMUM_IMG_LOG =	42
    ROBUST_THRESHOLD =	43
    RADIUS_RR_MIN =	44
    SECONDARY_COEF_MIN =	45
    TRY_CIRCLE_COUNT =	46
    TRY_CIRCLE_BEST_RADIUS_INDEX =	47
    SECONDARY_COEF_TRY_COUNT =	48
    SPOT_COUNT_MIN =	49
    ENABLE_RASTER_SEARCH =	50
    RASTER_STEP_ANGLE =	51
    RASTER_POS_X =	52
    RASTER_NEG_X =	53
    RASTER_POS_Y =	54
    RASTER_NEG_Y =	55
    LOOP_COUNT =	56
    IMAGE_WIDTH =	57
    IMAGE_HEIGHT =	58
    TRIMMING_X =	59
    TRIMMING_Y =	60
    TRIMMING_WIDTH =	61
    TRIMMING_HEIGHT =	62
    TRIMMING_IMG_LOG =	63
    CAN_UPDATE_VIEW =	64
