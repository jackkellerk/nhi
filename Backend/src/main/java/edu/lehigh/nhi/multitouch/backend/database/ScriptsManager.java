package edu.lehigh.nhi.multitouch.backend.database;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.PreparedStatement;
import java.sql.SQLException;
//import java.util.Date;

public class ScriptsManager {

    public Long lastCommandTime;
    @SuppressWarnings("unused")
    private final DatabaseManager mManager;
    private final Statements mStatements;
    private final PreparedStatement mSelectScripts;
    
    protected ScriptsManager(DatabaseManager manager) throws SQLException {
        lastCommandTime = System.currentTimeMillis();
        mManager = manager;
        mStatements = Statements.getInstance();
        mSelectScripts = mStatements.scripts.selectScripts;
    }

    public int checkScriptTime(){
        /**
         * Return a 1 for enough seconds having passed since the last script command
         * Return a -1 for not enough time
         * Return 0 for neither case. This is for mechanical error but should be rare 
         */
        int status = 0;
        float timeElapsed = ((System.currentTimeMillis()-lastCommandTime)/1000F);
        if (timeElapsed > 3.0){
            return 1;
        } else if(timeElapsed < 3.0){
            return -1;
        } else {
            return status;
        }
    }

    public String testScript(String path) throws SQLException {
        String output = runPythonScript("py " + path + " 9");
        return output;
    }

    public String runPythonScript(String command) throws SQLException {
        //Variables
        String s = null; 
        String output= "";
        int checkElapsedTime = checkScriptTime();

        //Checking wether or not to run the script
        if ( checkElapsedTime == 1){
            try {
                // run the command from the function argument
                // using the Runtime exec method:
                Process p = Runtime.getRuntime().exec(command);
                lastCommandTime = System.currentTimeMillis();
                
                BufferedReader stdInput = new BufferedReader(new InputStreamReader(p.getInputStream()));
                BufferedReader stdError = new BufferedReader(new InputStreamReader(p.getErrorStream()));
    
                // read the output from the command
                System.out.println("Here is the standard output of the command:\n");
                while ((s = stdInput.readLine()) != null) {
                    output += s;
                    System.out.println(s);
                    output += "\n";
                }
                output += "     BREAKKKKKKKKKKK                -----------------";
                
                // read any errors from the attempted command
                System.out.println("Here is the standard error of the command (if any):\n");
                while ((s = stdError.readLine()) != null) {
                    output += s;
                    System.out.println(s);
                }
            }
            catch (IOException e) {
                System.out.println("exception happened - here's what I know: ");
                e.printStackTrace();
                System.exit(-1);
            }
            
            return output;
        }
        else if ( checkElapsedTime == -1){
            output = "Not enough time has passed. Try again in a few seconds";
        }
        else {
            output = "Checking the elapsed time retured 0. Something wrong when the function ran";
        }
        return output;
    }
}
