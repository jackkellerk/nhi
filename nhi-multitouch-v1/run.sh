#port num
PORT=80
#get current time
TIME=$(date "+%Y.%m.%d-%H.%M.%S")

ERRLOG=err_log_$TIME
STDLOG=std_log_$TIME

mkdir log
#kill whatever that might run on the port (no process on this port will give you an error message. no worry):
kill $(lsof -t -i:$PORT)
#run the server persistently: 
nohup java -jar backend-1.0-SNAPSHOT-jar-with-dependencies.jar port:$PORT mode:deploy 1>log/$STDLOG 2>log/$ERRLOG &