package edu.lehigh.nhi.multitouch.backend.route;

import org.json.JSONArray;
import org.json.JSONObject;

import edu.lehigh.nhi.multitouch.backend.Encryption;
import edu.lehigh.nhi.multitouch.backend.ErrorHandler;
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
                //
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
                            
                            // Add to ProjectSource after pid is known.
                            int pid = retval.getInt("pid");
                            for (int i = 0; i < sources.length(); i++) {
                                db.projectSourceManager.insertProjectSource(pid, sources.getInt(i));
                            }

                            return StructuredResponse.getResponse(retval);
                        });

            });
        });


        // update projects.
        RouteSetter.setRoute(RequestType.PUT, "/p/:pid/update", (request, response) -> {
            return RouteSetter.preprocessSessionCheck(request, response, encryption, (uid, sessionKey) -> {
                return RouteSetter.preprocessPathParam(request, response, new String[] { "pid" }, (params) -> {
                    int pid = (int)params[0];
                    if (!db.checkProjectOwnership(uid, pid)) {
                        return StructuredResponse.getErrorResponse(ErrorHandler.PRIVILAGE.NO_RIGHT_TO_ACCESS_PROJECT);
                    }
                    return RouteSetter.preprocessJSONValueGet(request, response,
                            new String[] { "name", "thumbnail", "width","height" },
                            new Type[] { Type.STRING, Type.STRING, Type.FLOAT, Type.FLOAT}, (vals) -> {
                            String name = (String) vals[0];
                            String thumbnail = (String) vals[1];
                            float width = (float) vals[2];
                            float height = (float) vals[3];
                            int num_rows_updated = db.project.updateProject(pid, name, thumbnail, width, height);
                            JSONObject retval = new JSONObject();
                            retval.put("num_rows_updated", num_rows_updated);
                            return new StructuredResponse(retval).toJson().toString();
                    });
                });
            });
        });

        // update projects.
        RouteSetter.setRoute(RequestType.POST, "/p/:pid/copy", (request, response) -> {
            return RouteSetter.preprocessSessionCheck(request, response, encryption, (uid, sessionKey) -> {
                return RouteSetter.preprocessPathParam(request, response, new String[] { "pid" }, (params) -> {
                    int pid = (int)params[0];
                    if (!db.checkProjectOwnership(uid, pid)) {
                        return StructuredResponse.getErrorResponse(ErrorHandler.PRIVILAGE.NO_RIGHT_TO_ACCESS_PROJECT);
                    }
                    JSONObject retval = db.project.copyProject(pid,uid);
                    if (retval == null){
                        return StructuredResponse.getErrorResponse(ErrorHandler.UNKOWN.INSERTION_NO_UPDATE_UNKNOWN);
                    }
                    return StructuredResponse.getResponse(retval);
                    });
                });
            });

            // delete project.
            RouteSetter.setRoute(RequestType.DELETE, "/p/:pid", (request, response) -> {
                return RouteSetter.preprocessSessionCheck(request, response, encryption, (uid, sessionKey) -> {
                    return RouteSetter.preprocessPathParam(request, response, new String[] { "pid" }, (params) -> {
                        int pid = (int)params[0];
                        if (!db.checkProjectOwnership(uid, pid)) {
                            return StructuredResponse.getErrorResponse(ErrorHandler.PRIVILAGE.NO_RIGHT_TO_ACCESS_PROJECT);
                        }
                        int num_items_deleted = db.project.deleteProject(pid);
                        JSONObject retval = new JSONObject();
                        retval.put("num_itemss_deleted", num_items_deleted);
                        return new StructuredResponse(retval).toJson().toString();
                    });
                });
            });
    }
}