package edu.lehigh.nhi.multitouch.backend.route;

import org.json.JSONException;
import org.json.JSONObject;

import edu.lehigh.nhi.multitouch.backend.Encryption;
import edu.lehigh.nhi.multitouch.backend.JSONValueGetter.Type;
import edu.lehigh.nhi.multitouch.backend.database.DatabaseManager;
import edu.lehigh.nhi.multitouch.backend.StructuredResponse;
import edu.lehigh.nhi.multitouch.backend.ErrorHandler;


/***
 * This class is used to add additional users to a project. The relationship of creator and its project is added
 * in ProjectManager.createProject()
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
        // Adds current user to project
        RouteSetter.setRoute(RequestType.POST, "/p/:pid/add_self_project", (request, response) -> {
            return RouteSetter.preprocessSessionCheck(request, response, encryption, (uid, sessionKey) -> {
                return RouteSetter.preprocessPathParam(request, response, new String[] { "pid" }, (params) -> {
                    int pid = params[0];
                    if(db.uprelationship.relationshipExist(uid,pid)){
                        return StructuredResponse.getErrorResponse(ErrorHandler.EXISTANSE.USER_PROJECT_EXISTANCE);
                    }
                    int num_rows_updated = db.uprelationship.createRelationship(uid,pid);
                    JSONObject retval = new JSONObject();
                    retval.put("num_rows_updated", num_rows_updated);
                    return new StructuredResponse(retval).toJson().toString();
                });
            });
        });

         // create new user and project relationship.
         RouteSetter.setRoute(RequestType.POST, "/p/:pid/add_user_project", (request, response) -> {
            return RouteSetter.preprocessSessionCheck(request, response, encryption, (uid, sessionKey) -> {
                return RouteSetter.preprocessPathParam(request, response, new String[] { "pid" }, (params) -> {
                    int pid = params[0];
                    if (!db.checkProjectOwnership(uid, pid)) {
                        return StructuredResponse.getErrorResponse(ErrorHandler.PRIVILAGE.NO_RIGHT_TO_ACCESS_PROJECT);
                    }
                    return RouteSetter.preprocessJSONValueGet(request, response, new String[] { "email"}, new Type[] { Type.STRING }, (vals) -> {
                            String email = (String) vals[0];
                            int other_uid = db.user.getUidByEmail(email);
                        if(other_uid < 1){
                            if(!db.uprelationship.relationshipExist(other_uid,pid)){
                                int num_rows_updated = db.uprelationship.createRelationship(other_uid,pid);
                                JSONObject retval = new JSONObject();
                                retval.put("num_rows_updated", num_rows_updated);
                                return new StructuredResponse(retval).toJson().toString();
                            }
                            else{
                                return StructuredResponse.getErrorResponse(ErrorHandler.EXISTANSE.USER_PROJECT_EXISTANCE);
                            }
                        }
                        else{
                            return StructuredResponse.getErrorResponse(ErrorHandler.EXISTANSE.USER_EXISTANCE);
                        }
                    });
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