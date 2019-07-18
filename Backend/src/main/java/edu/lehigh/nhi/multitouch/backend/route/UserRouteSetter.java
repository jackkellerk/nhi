package edu.lehigh.nhi.multitouch.backend.route;

import org.json.JSONObject;

import edu.lehigh.nhi.multitouch.backend.Encryption;
import edu.lehigh.nhi.multitouch.backend.StructuredResponse;
import edu.lehigh.nhi.multitouch.backend.database.DatabaseManager;
import spark.Spark;

/**
 * Static class for creating routes related to user. Routes include login,
 * signup, usersettings, etc.
 */
public final class UserRouteSetter {
    private UserRouteSetter() {
    }

    /**
     * Currently available routes: log in, sign up, get user settings. TODO: Update
     * this comment after changes.
     */
    public static void setRoutes(DatabaseManager db, Encryption encryption) {
        /**
         * IMPORTANT: check documentations of RouteSetter and setRoute before use.
         */

        // log in
        RouteSetter.setRoute(RequestType.POST, "/login", (request, response) -> {
            JSONObject jsRequest = new JSONObject(request.body());
            String username = jsRequest.getString("username");
            String password = jsRequest.getString("password");
            System.out.println(username + " , " + password);
            if (db.user.login(username, password)) {
                int uid = db.user.getUidByUsername(username);
                String sessionKey = encryption.addSessionkey(uid);
                JSONObject dataJs = new JSONObject();
                dataJs.put("session_key", sessionKey);
                dataJs.put("uid", uid);
                return StructuredResponse.getStringifiedResponse(0, null, dataJs);
            }
            StructuredResponse retval = new StructuredResponse(100, "Login failed", null);
            return retval.toJson().toString();
        });

        // sign up
        RouteSetter.setRoute(RequestType.POST, "signup", (request, response, jsBody) -> {
            // Gather incoming info (ignore profilepicture for now)
            String username = jsBody.getString("username");
            String password = jsBody.getString("password");
            String email = jsBody.getString("email");
            String institution = jsBody.getString("institution");
            String legalName = jsBody.getString("legalname");
            response.status(200);
            if (db.user.signup(username, password, email, legalName, institution)) {
                return StructuredResponse.getStringifiedResponse(0, null, null);
            }
            return StructuredResponse.getStringifiedResponse(100, "signup failed", null);
        });

        // get user settings
        RouteSetter.setRoute(RequestType.POST, "/usersettings", (request, response) -> {
            // Gather information from request
            JSONObject jsRequest = new JSONObject(request.body());
            String username = jsRequest.getString("username");

            // This grabs the informatin about the user settings
            return db.user.userSettings(username);
        });
    }
}