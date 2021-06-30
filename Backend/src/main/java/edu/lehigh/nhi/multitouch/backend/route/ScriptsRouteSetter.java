package edu.lehigh.nhi.multitouch.backend.route;

import java.io.File;

import org.json.JSONException;
import org.json.JSONObject;

import edu.lehigh.nhi.multitouch.backend.Encryption;
import edu.lehigh.nhi.multitouch.backend.ErrorHandler;
import edu.lehigh.nhi.multitouch.backend.JSONValueGetter.Type;
import edu.lehigh.nhi.multitouch.backend.StructuredResponse;
import edu.lehigh.nhi.multitouch.backend.database.DatabaseManager;

public class ScriptsRouteSetter {
    private ScriptsRouteSetter() {
    }

    /**
     * Currently available routes: scriptTest. TODO: Update
     * this comment after changes.
     */
    public static void setRoutes(DatabaseManager db, Encryption encryption) {
        /**
         * IMPORTANT: check documentations of RouteSetter and setRoute before use.
         */

        // log in
        RouteSetter.setRoute(RequestType.POST, "/sripts/test", (request, response) -> {
            return RouteSetter.preprocessJSONValueGet(request, response, new String[] { "number" },
                    new Type[] { Type.INT}, (vals) -> {
                        int number = (int) vals[0];

                        if (number < 1) {
                            return StructuredResponse.getErrorResponse(ErrorHandler.PRIVILAGE.LOGIN_FAILED,
                                    "number not in range: " + number);
                        }

                        String script_output = db.scripts.testScript("test");
                        JSONObject dataJs = new JSONObject();
                        dataJs.put("script_output", script_output);
                        return StructuredResponse.getResponse(dataJs);
                    });
        });


        ///Helper 
    }
}
