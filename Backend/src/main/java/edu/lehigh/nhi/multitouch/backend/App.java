package edu.lehigh.nhi.multitouch.backend;

import java.sql.SQLException;
import java.util.Arrays;
import java.util.HashMap;

import edu.lehigh.nhi.multitouch.backend.database.DatabaseManager;
import edu.lehigh.nhi.multitouch.backend.route.ProjectRouteSetter;
import edu.lehigh.nhi.multitouch.backend.route.SourceRouteSetter;
import edu.lehigh.nhi.multitouch.backend.route.UserRouteSetter;
import edu.lehigh.nhi.multitouch.backend.route.WindowRouteSetter;
import spark.Spark;

/**
 * Main class of the multi-touch project backend. The backend hosts HTTP REST
 * Protocol routes, and communicates with the database. Routes form APIs for the
 * frontend to query data from database, and to inquire the backend to perform
 * procedures and calculations.
 */
public class App {

    public static void main(String[] args) {
        // System.out.println(Arrays.toString(args));
        HashMap<String, String> argsMap = getArgs(args);
        int port = 4567;
        Boolean isTestingMode = true;

        if (!argsMap.containsKey("port")) {
            System.out.println("No argument read for port number, set port to default (4567).");
        } else {
            try {
                port = Integer.parseInt(argsMap.get("port"));
            } catch (NumberFormatException e) {
                printArgumentsErrorMessage();
            }
        }

        if (!argsMap.containsKey("mode")) {
            System.out.println("No argument read for mode, set mode to default ('test').");
        } else {
            String mode = argsMap.get("mode");
            if (mode.equals("test")) {
                isTestingMode = true;
            } else if (mode.equals("deploy")) {
                isTestingMode = false;
            } else {
                printArgumentsErrorMessage();
            }
        }

        ErrorHandler.setup();

        final Encryption encryption = Encryption.getEncryption();

        Spark.port(port);
        System.out.println("Set port to: " + port);

        if (!isTestingMode) {
            System.out.println("Deployment mode. Serving content from 'src/main/resources/web' inside jar.");
            Spark.staticFileLocation("/web");
        } else {
            System.out.println("Testing mode. Serving content from external foler '/web'.");
            Spark.externalStaticFileLocation("../web");
        }

        Spark.get("/", (req, res) -> {
            res.redirect("/master.html");
            return "";
        });

        DatabaseManager db;
        try {
            db = new DatabaseManager();
            ProjectRouteSetter.setRoutes(db, encryption);
            UserRouteSetter.setRoutes(db, encryption);
            WindowRouteSetter.setRoutes(db, encryption);
            SourceRouteSetter.setRoutes(db, encryption);

        } catch (SQLException e) {
            System.err.println("Unexpected Error Occured During Setup.");
            e.printStackTrace();
            System.err.println("quiting...");
            System.exit(1);
        }
    }

    private static HashMap<String, String> getArgs(String args[]) {
        HashMap<String, String> retval = new HashMap<>();
        for (String arg : args) {
            String[] pair = arg.split(":");
            if (pair.length != 2) {
                printArgumentsErrorMessage();
            }
            // System.out.println(pair[0] + ":" + pair[1]);
            retval.put(pair[0], pair[1]);
        }
        return retval;
    }

    private static void printArgumentsErrorMessage() {
        StringBuilder sb = new StringBuilder();
        sb.append("command line arguments is not valid.\n");
        sb.append("Optional args (ordering does not mater):\n");
        sb.append("mode:<mode>\tmode could be 'deploy' or 'test'. Default to 'test'.\n");
        sb.append("port:<port>\tport should be a integer. Default to 4567.\n");
        sb.append("quiting...\n");
        System.err.println(sb.toString());
        System.exit(1);
    }
}