package edu.lehigh.nhi.multitouch.backend;

import spark.Spark;
import org.json.*;

public class App {
    public static void main(String[] args) {

        final MySQLConnection db = MySQLConnection.getConnection();

		Spark.staticFileLocation("/web");
        // The first column needs to be the address we are attempting to access the information from
        // enableCORS("http://localhost:8080", "*", "*");

        // Get the port on which to listen for requests
        // Spark.port(getIntFromEnv("PORT", 4567));

        // Set up the location for serving static files
        // Spark.staticFileLocation("/web");

        // Set up a route for serving the main page
		Spark.get("/", (req, res) -> {
			res.redirect("/master.html");
			return "";
		});

        Spark.post("/login", (request, response) -> {
            // ensure status 200 OK, with a MIME type of JSON
            JSONObject jsRequest = new JSONObject(request.body());
            String username = jsRequest.getString("username");
            String password = jsRequest.getString("password");
            System.out.println(username + " , " + password);
            response.status(200);
            response.type("application/json");
            if (db.login(username, password)) {
                StructuredResponse retval = new StructuredResponse(0, null, null);
                return retval.toJson().toString();
            }
            StructuredResponse retval = new StructuredResponse(100, "Login failed", null);
            return retval.toJson().toString();
        });
    }

    // private static void enableCORS(final String origin, final String methods, final String headers) {

    //     Spark.options("/*", (request, response) -> {
    
    //         String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
    //         if (accessControlRequestHeaders != null) {
    //             response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
    //         }
    
    //         String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
    //         if (accessControlRequestMethod != null) {
    //             response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
    //         }
    
    //         return "OK";
    //     });
    
    //     Spark.before((request, response) -> {
    //         response.header("Access-Control-Allow-Origin", origin);
    //         response.header("Access-Control-Allow-Credentials", "true");
    //         //response.header("Access-Control-Request-Method", methods);
    //         //response.header("Access-Control-Allow-Headers", headers);
    //         // Note: this may or may not be necessary in your particular application
    //         response.type("application/json");
    //     });
    // }
}