package edu.lehigh.nhi.multitouch.backend.route;

import org.json.JSONArray;
import org.json.JSONObject;

import edu.lehigh.nhi.multitouch.backend.Encryption;
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
            try {
                String uidStr = request.headers("uid");
                String sessionKey = request.headers("sessionKey");
                int uid = Integer.parseInt(uidStr);
                if (!encryption.checkSessionKey(uid, sessionKey))
                    return new StructuredResponse(200, "username and sessionkey do not match", null).toJson()
                            .toString();
            } catch (Exception e) {
                return new StructuredResponse(300, "header format fault: " + e.toString(), null).toJson().toString();
            }
            JSONArray projectList = db.project.getProjectListing();
            JSONObject js = new JSONObject();
            js.put("projectList", projectList);
            // System.err.println(js);
            return StructuredResponse.getStringifiedResponse(0, null, js);
        });

        // get a specific project. The response is more detailed with information of all
        // the windows this project contains.
        RouteSetter.setRoute(RequestType.GET, "/p/:pid", (request, response) -> {
            int pid = Integer.parseInt(request.params("pid"));
            response.status(200);
            response.type("application/json");
            return StructuredResponse.getStringifiedResponse(0, null, db.project.getProject(pid));
        });

        // create a project.
        RouteSetter.setRoute(RequestType.POST, "/project/create", (request, response, jsBody) -> {
            String name = jsBody.getString("name");
            float canvas_width = jsBody.getFloat("canvas_width");
            float canvas_height = jsBody.getFloat("canvas_height");
            return StructuredResponse.getStringifiedResponse(0, null,
                    db.project.createProject(name, canvas_width, canvas_height));
        });
    }
}