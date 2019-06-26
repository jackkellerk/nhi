package edu.lehigh.nhi.multitouch.backend;

import spark.Spark;
import java.io.IOException;
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
			res.redirect("/../index.html");
			return "";
        });
        
		Spark.post("/login", (request, response) -> {
            // ensure status 200 OK, with a MIME type of JSON
            JSONObject jsRequest = request.body();
			response.status(200);
			response.type("application/json");
		});
    }
}