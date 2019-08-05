package edu.lehigh.nhi.multitouch.backend.route;

import org.json.JSONException;
import org.json.JSONObject;

import edu.lehigh.nhi.multitouch.backend.Encryption;
import edu.lehigh.nhi.multitouch.backend.JSONValueGetter.Type;
import edu.lehigh.nhi.multitouch.backend.database.DatabaseManager;
import edu.lehigh.nhi.multitouch.backend.StructuredResponse;
import edu.lehigh.nhi.multitouch.backend.ErrorHandler;



/**
 * Static class to setup window related routes. Such as looking up/ changing the
 * window_t table, or routes related to tools that are used inside windows.
 */
public final class UPRelationshipRouteSetter {
    private UPRelationshipRouteSetter() {
    }

    /**
     * Currently available routes: new window, update position. TODO: Update this
     * comment after changes.
     */
    public static void setRoutes(DatabaseManager db, Encryption encryption) {
        /**
         * IMPORTANT: check documentations of RouteSetter and setRoute before use.
         */

        // create new user and project relationship.
        RouteSetter.setRoute(RequestType.POST, "/p/:pid/add_to_project", (request, response) -> {
            return RouteSetter.preprocessSessionCheck(request, response, encryption, (uid, sessionKey) -> {
                return RouteSetter.preprocessPathParam(request, response, new String[] { "pid" }, (params) -> {
                    int pid = params[0];
                    int num_rows_updated = db.uprelationship.createRelationship(uid,pid);
                    JSONObject retval = new JSONObject();
                    retval.put("num_rows_updated", num_rows_updated);
                    return new StructuredResponse(retval).toJson().toString();
                });
            });
        });

         //deletes user and project relationship.
         RouteSetter.setRoute(RequestType.DELETE, "/p/:pid/remove_from_project", (request, response) -> {
            return RouteSetter.preprocessSessionCheck(request, response, encryption, (uid, sessionKey) -> {
                return RouteSetter.preprocessPathParam(request, response, new String[] { "pid" }, (params) -> {
                    int pid = params[0];
                    int num_rows_deleted = db.uprelationship.deleteRelationship(uid,pid);
                    JSONObject retval = new JSONObject();
                    retval.put("num_rows_deleted", num_rows_deleted);
                    return new StructuredResponse(retval).toJson().toString();
                });
            });
        });
    }
}