package edu.lehigh.nhi.multitouch.backend.route;

import org.json.JSONArray;
import org.json.JSONObject;

import edu.lehigh.nhi.multitouch.backend.Encryption;
import edu.lehigh.nhi.multitouch.backend.ErrorHandler;
import edu.lehigh.nhi.multitouch.backend.JSONValueGetter;
import edu.lehigh.nhi.multitouch.backend.JSONValueGetter.Type;
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
        RouteSetter.setRoute(RequestType.GET, "/project", (request, response) -> {
            return RouteSetter.preprocessSessionCheck(request, response, encryption, (uid, sessionkey) -> {
                JSONArray projectList = db.project.getProjectList(uid);
                return StructuredResponse.getResponse(projectList);
            });
        });

        // get a specific project. The response is more detailed with information of all
        // the windows this project contains.
        RouteSetter.setRoute(RequestType.GET, "/p/:pid", (request, response) -> {
            return RouteSetter.preprocessSessionCheck(request, response, encryption, (uid, sessionKey) -> {
                int pid = -1;
                try {
                    pid = Integer.parseInt(request.params("pid"));
                } catch (NumberFormatException e) {
                    e.printStackTrace();
                    return StructuredResponse.getErrorResponse(ErrorHandler.PATH.PATH_NUM_FORMAT);
                }

                JSONObject retval = db.project.getProject(pid);
                if (retval == null)
                    return StructuredResponse.getErrorResponse(ErrorHandler.EXISTANSE.PROJECT_EXISTANCE);

                if (!db.checkProjectOwnership(uid, pid))
                    return StructuredResponse.getErrorResponse(ErrorHandler.PRIVILAGE.NO_RIGHT_TO_ACCESS_PROJECT);

                return StructuredResponse.getResponse(retval);
            });
        });

        // create a project.
        // TODO: Not available now. update the statement to be a procedure call after
        // procedure privilage is granted.
        RouteSetter.setRoute(RequestType.POST, "/project/create", (request, response) -> {

            return RouteSetter.preprocessSessionCheck(request, response, encryption, (uid, sessionkey) -> {
                return RouteSetter.preprocessJSONValueGet(request, response,
                        new String[] { "name", "canvas_width", "canvas_height", "properties", "institution", "sources" },
                        new Type[] { Type.STRING, Type.FLOAT, Type.FLOAT, Type.JSONOBJ, Type.STRING, Type.JSONARR }, (vals) -> {

                            String name = (String) vals[0];
                            float canvas_width = (float) vals[1];
                            float canvas_height = (float) vals[2];
                            JSONObject properties = (JSONObject) vals[3];
                            String institution = (String) vals[4];
                            JSONArray sources = (JSONArray) vals[5];
                            JSONObject retval = db.project.createProject(uid, name, canvas_width, canvas_height);

                            if (retval == null)
                                return StructuredResponse
                                        .getErrorResponse(ErrorHandler.UNKOWN.INSERTION_NO_UPDATE_UNKNOWN);

                            return StructuredResponse.getResponse(retval);
                        });

            });
        });
    }
}