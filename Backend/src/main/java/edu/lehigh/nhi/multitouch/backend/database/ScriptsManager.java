package edu.lehigh.nhi.multitouch.backend.database;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;

public class ScriptsManager {
    @SuppressWarnings("unused")
    private final DatabaseManager mManager;
    private final Statements mStatements;
    private final PreparedStatement mSelectScripts;
    
    protected ScriptsManager(DatabaseManager manager) throws SQLException {
        mManager = manager;
        mStatements = Statements.getInstance();
        mSelectScripts = mStatements.scripts.selectScripts;
    }

    public String testScript(String pythonCommand) throws SQLException {
        String output = runPythonScript("py whileLoop.py 9");
        return output;
    }

    public String runPythonScript(String command) throws SQLException {
        String s = null; 
        try {
            // run the command from the function argument
            // using the Runtime exec method:
                Process p = Runtime.getRuntime().exec(command);
                
                BufferedReader stdInput = new BufferedReader(new InputStreamReader(p.getInputStream()));
                BufferedReader stdError = new BufferedReader(new InputStreamReader(p.getErrorStream()));
    
                // read the output from the command
                System.out.println("Here is the standard output of the command:\n");
                while ((s = stdInput.readLine()) != null) {
                    System.out.println(s);
                }
                
                // read any errors from the attempted command
                System.out.println("Here is the standard error of the command (if any):\n");
                while ((s = stdError.readLine()) != null) {
                    System.out.println(s);
                }
                System.exit(0);
            }
            catch (IOException e) {
                System.out.println("exception happened - here's what I know: ");
                e.printStackTrace();
                System.exit(-1);
            }
        return s;
    }
}
