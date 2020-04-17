package edu.lehigh.nhi.multitouch.backend.route;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import edu.lehigh.nhi.multitouch.backend.Encryption;
import edu.lehigh.nhi.multitouch.backend.ErrorHandler;
import edu.lehigh.nhi.multitouch.backend.StructuredResponse;
import edu.lehigh.nhi.multitouch.backend.JSONValueGetter.Type;
import edu.lehigh.nhi.multitouch.backend.database.DatabaseManager;
import edu.lehigh.nhi.multitouch.backend.database.Square;

public final class LineRouteSetter {
    private LineRouteSetter() {
    }

    /**
     * Currently available routes: new window, update position. TODO: Update this
     * comment after changes.
     */
    public static void setRoutes(DatabaseManager db, Encryption encryption) {
        // create a new line object in database
        RouteSetter.setRoute(RequestType.POST, "/w/:wid/new_line", (request, response) -> {
            return RouteSetter.preprocessSessionCheck(request, response, encryption, (uid, sessionKey) -> {
                return RouteSetter.preprocessPathParam(request, response, new String[] { "wid" }, (params) -> {
                    int wid = (int)params[0];
                    if (!db.checkWindowOwnership(uid, wid)) {
                        return StructuredResponse.getErrorResponse(ErrorHandler.PRIVILAGE.NO_RIGHT_TO_ACCESS_PROJECT);
                    }
                    return RouteSetter.preprocessJSONValueGet(request, response,
                            new String[] { "lid", "x1", "y1", "x2", "y2" },
                            new Type[] { Type.INT, Type.DOUBLE, Type.DOUBLE, Type.DOUBLE, Type.DOUBLE}, (vals) -> {
                            int lid = (int) vals[0];
                            double x1 = (double) vals[1];
                            double y1 = (double) vals[2];
                            double x2 = (double) vals[3];
                            double y2 = (double) vals[4];
                            int num_rows_updated = db.line.createLine(lid, wid, x1, y1, x2, y2);
                            JSONObject retval = new JSONObject();
                            retval.put("num_rows_updated", num_rows_updated);
                            return new StructuredResponse(retval).toJson().toString();
                    });
                });
            });
        });

        // get all lines for a window.
        RouteSetter.setRoute(RequestType.GET, "/w/:wid/all_lines", (request, response) -> {
            return RouteSetter.preprocessSessionCheck(request, response, encryption, (uid, sessionKey) -> {
                return RouteSetter.preprocessPathParam(request, response, new String[] { "wid" }, (params) -> {
                    int wid = (int)params[0];
                    if (!db.checkWindowOwnership(uid, wid)) {
                        return StructuredResponse.getErrorResponse(ErrorHandler.PRIVILAGE.NO_RIGHT_TO_ACCESS_PROJECT);
                    }
                    JSONArray lineArray = db.line.getAllLines(wid);
                    return StructuredResponse.getResponse(lineArray);
                });
            });
        });

        // get a specific line for a window.
        RouteSetter.setRoute(RequestType.GET, "/w/:wid/line", (request, response) -> {
            return RouteSetter.preprocessSessionCheck(request, response, encryption, (uid, sessionKey) -> {
                return RouteSetter.preprocessPathParam(request, response, new String[] { "wid" }, (params) -> {
                    int wid = (int)params[0];
                    if (!db.checkWindowOwnership(uid, wid)) {
                        return StructuredResponse.getErrorResponse(ErrorHandler.PRIVILAGE.NO_RIGHT_TO_ACCESS_PROJECT);
                    }
                    return RouteSetter.preprocessJSONValueGet(request, response,
                            new String[] { "lid" },
                            new Type[] { Type.INT }, (vals) -> {
                            int lid = (int) vals[0];
                            JSONObject lineObject = db.line.getLine(lid, wid);
                            return StructuredResponse.getResponse(lineObject);
                    });
                });
            });
        });

        // update the information for a selected line object
        RouteSetter.setRoute(RequestType.PUT, "/w/:wid/update_line", (request, response) -> {
            return RouteSetter.preprocessSessionCheck(request, response, encryption, (uid, sessionKey) -> {
                return RouteSetter.preprocessPathParam(request, response, new String[] { "wid" }, (params) -> {
                    int wid = (int)params[0];
                    if (!db.checkWindowOwnership(uid, wid)) {
                        return StructuredResponse.getErrorResponse(ErrorHandler.PRIVILAGE.NO_RIGHT_TO_ACCESS_PROJECT);
                    }
                    return RouteSetter.preprocessJSONValueGet(request, response,
                            new String[] { "lid", "x1", "y1", "x2", "y2" },
                            new Type[] { Type.INT, Type.DOUBLE, Type.DOUBLE, Type.DOUBLE, Type.DOUBLE}, (vals) -> {
                            int lid = (int) vals[0];
                            double x1 = (double) vals[1];
                            double y1 = (double) vals[2];
                            double x2 = (double) vals[3];
                            double y2 = (double) vals[4];
                            int num_rows_updated = db.line.updateLine(lid, wid, x1, y1, x2, y2);
                            JSONObject retval = new JSONObject();
                            retval.put("num_rows_updated", num_rows_updated);
                            return new StructuredResponse(retval).toJson().toString();
                    });
                });
            });
        });

        //deletes line
        RouteSetter.setRoute(RequestType.DELETE, "/w/:wid/remove_line", (request, response) -> {
            return RouteSetter.preprocessSessionCheck(request, response, encryption, (uid, sessionKey) -> {
                return RouteSetter.preprocessPathParam(request, response, new String[] { "wid" }, (params) -> {
                    int wid = (int)params[0];
                    if (!db.checkWindowOwnership(uid, wid)) {
                        return StructuredResponse.getErrorResponse(ErrorHandler.PRIVILAGE.NO_RIGHT_TO_ACCESS_PROJECT);
                    }
                    return RouteSetter.preprocessJSONValueGet(request, response,
                            new String[] { "lid" },
                            new Type[] { Type.INT }, (vals) -> {
                            int lid = (int) vals[0];
                            int num_rows_deleted = db.line.deleteLine(lid, wid);
                            JSONObject retval = new JSONObject();
                            retval.put("num_rows_deleted", num_rows_deleted);
                            return new StructuredResponse(retval).toJson().toString();
                    });
                });
            });
        });
    }
}