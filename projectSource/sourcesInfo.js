class Source {
    constructor(name, image, info1, info2) {
        this.name = name;
        this.image = image;
        this.info1 = info1;
        this.info2 = info2;
    }
}

var insTile = "Images/institution/cmu.png";
var insImages = ['Images/institution/cmu.png', 'Images/institution/drexel.png', 'Images/institution/lehigh.png', 'Images/institution/ohio.png',
            'Images/institution/pennstate.jpg', 'Images/institution/TempleUniversity.png', 'Images/institution/StonyBrook.png','Images/institution/JohnHopkins.jpg'];
var insNames = ['CMU', 'Drexel', 'Lehigh', 'Ohio', 'Penn State'];
var sourceImages = [];
var sourceTEMNames = ['JEOL JEM-1200EX', 'JEOL JEM-2000FX', 'JEOL JEM-2200FS', 'JEOL JEM-ARM200CF'];
var sourceSEMNames = ['Hitachi 4300 SE/N', 'ZEISS 1550', 'FEI SCIOS FIB', 'FEI XL30 ESEM', 'JEOL JSM-840', 'JEOL JXA-8900'];
var defaultSources = [];
var source1 = new Source("FEI Tecnai G2 Spirit BioTWIN",
    "Images/Sources/yale_microscope.jpg",
    "80 kV microscope, optimized for examining biological specimen",
    "Equipped with a SIS Morada 11 megapixel CCD camera");

var source2 = new Source("FEI Tecnai G2 F20 XT (TF20 TOMO)",
    "Images/Sources/yale_microscope_002.jpg",
    "Contains a Schottky field emitter is designed to produce high resolution performance",
    "Features a 4k x 4k FEI Eagle CCD and an AMT NanoSprint1200 CMOS camera");

var source3 = new Source("FEI Tecnai F20 Cryo EM ",
    "Images/Sources/yale_microscope_003.jpg",
    "Has a Schottky Field Emission source, operates at 200 kV and is equipped with a Gatan K2 Summit Direct Detector",
    "Is dedicated for high-resolution single particle imaging and cryo electron tomography");

var source4 = new Source("JEOL JEM-ARM200CF",
    "Images/Sources/yale_microscope_002.jpg",
    "is an atomic resolution transmission electron microscope operating at a maximum accelerating potential of 200kV that features a cold field emission source",
    "potentials, allowing a wider range of materials to be examined with atomic level resolution");

var source5 = new Source("JEOL JEM-2000FX",
    "Images/Sources/yale_microscope_002.jpg",
    "This is a standard research TEM operating at up to 200kV; it has a lanthanum hexa-boride filament for high resolution work",
    "Is equipped with XEDS for point analysis and has two digitalcameras. Best image resolution is about 0.35nm.");

var source6 = new Source("JEOL JEM-2200FS",
    "Images/Sources/yale_microscope_002.jpg",
    "This 200kV FEG-TEM/STEM is fitted with a Cs aberration corrector to achieve an ultimate probe-size of 0.15nm and maximize the spatial resolution of the image and spectroscopic data.",
    "..");

var source7 = new Source("FEI Image Corrected Titan3™ G2 60-300 S/TEM",
    "Images/Sources/yale_microscope_002.jpg",
    "provides superior performance, stability, and flexibility when utilizing the C s  image-corrector and electron monochromator technology for atomic resolution imaging and spectroscopy",
    "..");

var source8 = new Source("FEI Tecnai F20 S/TEM",
    "Images/Sources/yale_microscope_002.jpg",
    "The Tecnai F20 system is a field emission 200kV S/TEM with an X-TWIN lens and high brightness field emission electron gun (FEG)",
    "..");

var source9 = new Source("FEI Tecnai G2 30",
    "Images/Sources/yale_microscope_002.jpg",
    "The relatively large pole-piece gap allows for a variety of stages and detectors to be fitted in this instrument.",
    "..");

var source10 = new Source("Philips/FEI BioTwin CM120 Transmission Electron Microscope",
    "Images/Sources/yale_microscope_002.jpg",
    "20-120 kV operating voltage; Gatan Orius high-resolution cooled digital camera (2kx2k); AMT XR80 high-resolution (16-bit) 8 Mpixel camera",
    "Low dose features for minimizing beam damage; Liquid nitrogen cooled anticontamination device; Goniometer stage");

var source11 = new Source("LEO/Zeiss Field-emission SEM",
    "Images/Sources/yale_microscope_002.jpg",
    "Field-emission tip for high-contrast, high-resolution imaging; 1-20 kV operating voltage reduces damage; Backscatter detector for imaging secondary electrons",
    "Chromium and platinum evaporators; Critical point drying accessories; Resolution 40-50 times better than conventional SEM");

var source12 = new Source("Hitachi 7600 TEM",
    "Images/Sources/yale_microscope_002.jpg",
    "Dual AMT CCD camera system; XR50 high-resolution high-speed (5 Mpixel, 16-bit) camera; 2K x 2K 16-bit low-noise camera for high-quality digital micrographs",
    "Film camera also available; 20-120 kV operating voltage; High-contast and high-resolution imaging modes");

defaultSources.push(source1);
defaultSources.push(source2);
defaultSources.push(source3);
defaultSources.push(source4);
defaultSources.push(source5);
defaultSources.push(source6);
defaultSources.push(source7);
defaultSources.push(source8);
defaultSources.push(source9);
defaultSources.push(source10);
defaultSources.push(source11);
defaultSources.push(source12);