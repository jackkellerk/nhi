package edu.lehigh.nhi.multitouch.backend;

import spark.Spark;
import org.json.*;

public class App {
    public static void main(String[] args) {

        final MySQLConnection db = MySQLConnection.getConnection();

        // Get the port on which to listen for requests
        // Spark.port(getIntFromEnv("PORT", 4567));

        // Set up the location for serving static files
        // Spark.staticFileLocation("/web");

        // Set up a route for serving the main page
        Spark.get("/", (req, res) -> {
            return "hello";
        });

        Spark.post("/login", (request, response) -> {
            // ensure status 200 OK, with a MIME type of JSON
            JSONObject jsRequest = new JSONObject(request.body());
            String username = jsRequest.getString("username");
            String password = jsRequest.getString("password");
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
}