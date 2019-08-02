# This is the resource folder where maven expects to find our files
TARGETFOLDER=backend/src/main/resources/web
#This is the name of our backend jar file.
BACKENDJAR=backend-1.0-SNAPSHOT-jar-with-dependencies.jar
#project folder name
PROJECTFOLDER=nhi-multitouch-v1
# step 1: make sure we have someplace to put everything. We will delete the
#         old folder tree, and then make it from scratch
rm -rf $TARGETFOLDER
mkdir $TARGETFOLDER
# step 2: copy the entire folder to its destination.
cp -a web/. $TARGETFOLDER
# step 3: install mvn dependencies.
(cd backend; mvn install; mvn package)
# step 4: copy over the images folder
rm -rf $PROJECTFOLDER/images
mkdir $PROJECTFOLDER/images
cp -a images/. $PROJECTFOLDER/images
# step 5: put the jar file to the right location.
rm -rf $PROJECTFOLDER/executable
mkdir $PROJECTFOLDER/executable
cp backend/target/$BACKENDJAR $PROJECTFOLDER/executable/$BACKENDJAR