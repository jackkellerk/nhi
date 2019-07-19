package edu.lehigh.nhi.multitouch.backend.route;

import org.json.JSONArray;
import org.json.JSONObject;

import edu.lehigh.nhi.multitouch.backend.Encryption;
import edu.lehigh.nhi.multitouch.backend.ErrorHandler;
import edu.lehigh.nhi.multitouch.backend.StructuredResponse;
import edu.lehigh.nhi.multitouch.backend.database.DatabaseManager;

/**
 * Static class for creating routes related to projects. IMPORTANT: routes only
 * include changes to the project_t table. Update of windows, and user ownership
 * of projects should be in WindowRouteSetter and UserRouteSetter respectfully.
 */
public final class ProjectRouteSetter {
    private ProjectRouteSetter() {
    }

    /**
     * Currently available routes: get project list, get single project, create
     * signle project. TODO: Update this comment after changes.
     */
    public static void setRoutes(DatabaseManager db, Encryption encryption) {
        /**
         * IMPORTANT: check documentations of RouteSetter and setRoute before use.
         */

        // get the listing of all projects.
        RouteSetter.setRoutePreprocessSessionCheck(RequestType.GET, "/project", encryption,
                (request, response, uid, sessionKey) -> {
                    JSONArray projectList = db.project.getProjectList(uid);
                    return StructuredResponse.getResponse(projectList);
                });

        // get a specific project. The response is more detailed with information of all
        // the windows this project contains.
        RouteSetter.setRoutePreprocessSessionCheck(RequestType.GET, "/p/:pid", encryption,
                (request, response, uid, sessionkey) -> {
                    int pid = -1;
                    try {
                        pid = Integer.parseInt(request.params("pid"));
                    } catch (NumberFormatException e) {
                        return ErrorHandler.processError(ErrorHandler.PATH.PATH_NUM_FORMAT, e);
                    }
                    return StructuredResponse.getResponse(db.project.getProject(uid, pid));
                });

        // create a project.
        RouteSetter.setRoutePreprocessJSONRequestBodyAndSessionCheck(RequestType.POST, "/project/create", encryption,
                (request, response, jsBody, uid, sessionkey) -> {
                    String name = jsBody.getString("name");
                    float canvas_width = jsBody.getFloat("canvas_width");
                    float canvas_height = jsBody.getFloat("canvas_height");
                    JSONObject retval = db.project.createProject(uid, name, canvas_width, canvas_height);
                    if (retval == null)
                        ErrorHandler.processError(ErrorHandler.OTHER.INSERTION_FAILED_UNKNOWN);
                    return StructuredResponse.getResponse(retval);
                });
    }
}