package edu.lehigh.nhi.multitouch.backend.route;

import org.json.JSONException;
import org.json.JSONObject;

import edu.lehigh.nhi.multitouch.backend.Encryption;
import edu.lehigh.nhi.multitouch.backend.ErrorHandler;
import edu.lehigh.nhi.multitouch.backend.JSONValueGetter.Type;
import edu.lehigh.nhi.multitouch.backend.StructuredResponse;
import edu.lehigh.nhi.multitouch.backend.database.DatabaseManager;

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
            return RouteSetter.preprocessJSONValueGet(request, response, new String[] { "email", "password" },
                    new Type[] { Type.STRING, Type.STRING }, (vals) -> {
                        String email = (String) vals[0];
                        String password = (String) vals[1];
                        String actualPassword = db.user.getPassword(email);

                        if (actualPassword == null) {
                            return StructuredResponse.getErrorResponse(ErrorHandler.PRIVILAGE.LOGIN_FAILED,
                                    "User does not exist. ");
                        }

                        if (!(actualPassword.equals(password))) {
                            return StructuredResponse.getErrorResponse(ErrorHandler.PRIVILAGE.LOGIN_FAILED,
                                    "Password invalid. ");
                        }

                        int uid = db.user.getUidByEmail(email);
                        String sessionKey = encryption.addSessionkey(uid);
                        JSONObject dataJs = new JSONObject();
                        dataJs.put("session_key", sessionKey);
                        dataJs.put("uid", uid);
                        return StructuredResponse.getResponse(dataJs);

                    });
        });

        // sign up
        RouteSetter.setRoute(RequestType.POST, "/signup", (request, response) -> {

            return RouteSetter.preprocessJSONValueGet(request, response,
                    new String[] { "password", "email", "legal_name", "institution" },
                    new Type[] { Type.STRING, Type.STRING, Type.STRING, Type.STRING }, (vals) -> {
                        String password = (String) vals[0], email = (String) vals[1],
                                legalName = (String) vals[2], institution = (String) vals[3];
                            if(db.user.getUidByEmail(email) < 1){
                                if (db.user.insertUser(password, email, legalName, institution) < 1) {
                                    return StructuredResponse.getErrorResponse(ErrorHandler.UNKOWN.INSERTION_NO_UPDATE_UNKNOWN);
                                }
                                int uid = db.user.getUidByEmail(email);
                                String sessionKey = encryption.addSessionkey(uid);
                                JSONObject dataJs = new JSONObject();
                                dataJs.put("session_key", sessionKey);
                                dataJs.put("uid", uid);
                                return StructuredResponse.getResponse(dataJs);
                            }
                            else{
                                return StructuredResponse.getErrorResponse(ErrorHandler.EXISTANSE.USER_EXISTANCE);
                            }
                    });
        });

        // get user settings
        RouteSetter.setRoute(RequestType.GET, "/user", (request, response) -> {
            return RouteSetter.preprocessSessionCheck(request, response, encryption, (uid, sessionKey) -> {
                JSONObject retval = db.user.userSettings(uid);
                if (retval == null)
                    return StructuredResponse.getErrorResponse(ErrorHandler.UNKOWN.FAILED_TO_FETCH_DATA_UNKNOWN);
                return StructuredResponse.getResponse(retval);
            });
        });

         // update user settings.
         RouteSetter.setRoute(RequestType.PUT, "/u/update_settings", (request, response) -> {
            return RouteSetter.preprocessSessionCheck(request, response, encryption, (uid, sessionKey) -> {
                    return RouteSetter.preprocessJSONValueGet(request, response,
                        new String[] { "username", "password", "email", "legal_name", "institution" },
                        new Type[] {Type.STRING, Type.STRING, Type.STRING, Type.STRING, Type.STRING }, (vals) -> {
                            String username = (String) vals[0], password = (String) vals[1], email = (String) vals[2],
                                    legalName = (String) vals[3], institution = (String) vals[4];
                            int num_rows_updated = db.user.updateUser(uid, username, password, email, legalName, institution);
                            JSONObject retval = new JSONObject();
                            retval = db.user.userSettings(uid);
                            retval.put("num_rows_updated", num_rows_updated);
                            return new StructuredResponse(retval).toJson().toString();
                    });
            });
        });
    }
}