package edu.lehigh.nhi.multitouch.backend;

import java.sql.SQLException;

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
        ErrorHandler.setup();

        int port = 0;
        if (args.length < 1) {
            System.out.println("No argument read for port number, set port to default (4567).");
            port = 4567;
        } else {
            try {
                port = Integer.parseInt(args[0]);
            } catch (NumberFormatException e) {
                System.err.println("Fatal: first argument(port number) should be a Integer." + "\n" + "Quiting..");
                System.exit(1);
            }
        }
        final Encryption encryption = Encryption.getEncryption();
        // default port for http
        Spark.port(port);
        Spark.staticFileLocation("/web");
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
            // System.exit(1);
        }
    }
}