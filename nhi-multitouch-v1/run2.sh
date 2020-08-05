#port num
PORT=80
#get current time
TIME=$(date "+%Y.%m.%d-%H.%M.%S")

ERRLOG=err.out
STDLOG=std.out
LOGFOLDER=log_$TIME

cd executable;
mkdir $LOGFOLDER;
#kill whatever that might run on the port (no process on this port will give you an error message. no worry):
kill $(lsof -t -i:$PORT);
#run the server persistently: 
nohup java -jar backend-1.0-SNAPSHOT-jar-with-dependencies.jar port:$PORT mode:deploy dbpass:multitouch 1>$LOGFOLDER/$STDLOG 2>$LOGFOLDER/$ERRLOG &
