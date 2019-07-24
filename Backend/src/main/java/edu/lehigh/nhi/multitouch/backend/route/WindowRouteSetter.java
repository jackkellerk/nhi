package edu.lehigh.nhi.multitouch.backend.route;

import org.json.JSONException;
import org.json.JSONObject;

import edu.lehigh.nhi.multitouch.backend.Encryption;
import edu.lehigh.nhi.multitouch.backend.ErrorHandler;
import edu.lehigh.nhi.multitouch.backend.StructuredResponse;
import edu.lehigh.nhi.multitouch.backend.JSONValueGetter.Type;
import edu.lehigh.nhi.multitouch.backend.database.DatabaseManager;
import edu.lehigh.nhi.multitouch.backend.database.Square;

/**
 * Static class to setup window related routes. Such as looking up/ changing the
 * window_t table, or routes related to tools that are used inside windows.
 */
public final class WindowRouteSetter {
    private WindowRouteSetter() {
    }

    /**
     * Currently available routes: new window, update position. TODO: Update this
     * comment after changes.
     */
    public static void setRoutes(DatabaseManager db, Encryption encryption) {
        /**
         * IMPORTANT: check documentations of RouteSetter and setRoute before use.
         */

        // create new window of a porject.
        RouteSetter.setRoute(RequestType.POST, "/p/:pid/new_window", (request, response) -> {
            return RouteSetter.preprocessSessionCheck(request, response, encryption, (uid, sessionKey) -> {
                return RouteSetter.preprocessPathParam(request, response, new String[] { "pid" }, (params) -> {
                    int pid = params[0];
                    if (!db.checkProjectOwnership(uid, pid)) {
                        return StructuredResponse.getErrorResponse(ErrorHandler.PRIVILAGE.NO_RIGHT_TO_ACCESS_PROJECT);
                    }
                    return RouteSetter.preprocessJSONValueGet(request, response,
                            new String[] { "iid", "image_box", "window_box" },
                            new Type[] { Type.INT, Type.JSONOBJ, Type.JSONOBJ }, (vals) -> {
                                int iid = (int) vals[0];
                                JSONObject imageBoxJS = (JSONObject) vals[1];
                                JSONObject windowBoxJS = (JSONObject) vals[2];
                                Square imageBox, windowBox;
                                try {
                                    imageBox = Square.getFromJson(imageBoxJS);
                                } catch (JSONException e) {
                                    e.printStackTrace();
                                    return StructuredResponse.getErrorResponse(
                                            ErrorHandler.MISSING_FIELD_JSON.MISSING_FIELD_IN_SQUARE,
                                            "Failed parsing 'image_box'.");
                                }

                                try {
                                    windowBox = Square.getFromJson(windowBoxJS);
                                } catch (JSONException e) {
                                    e.printStackTrace();
                                    return StructuredResponse.getErrorResponse(
                                            ErrorHandler.MISSING_FIELD_JSON.MISSING_FIELD_IN_SQUARE,
                                            "Failed parsing 'window_box'.");
                                }

                                if (db.window.insertWindow(pid, iid, imageBox, windowBox) < 1)
                                    return StructuredResponse.getErrorResponse(
                                            ErrorHandler.UNKOWN.INSERTION_NO_UPDATE_UNKNOWN,
                                            "Failed insert into table window_t. ");

                                JSONObject retval = db.window.getWindow(db.getLastInsertedId());
                                if (retval == null)
                                    return StructuredResponse.getErrorResponse(
                                            ErrorHandler.UNKOWN.FAILED_TO_FETCH_DATA_UNKNOWN,
                                            "Failed to fatch the newly created window. ");
                                return StructuredResponse.getResponse(retval);
                            });
                });
            });
        });

        // create new window with default values.
        RouteSetter.setRoute(RequestType.POST, "/p/:pid/new_window_default", (request, response) -> {
            return RouteSetter.preprocessSessionCheck(request, response, encryption, (uid, sessionKey) -> {
                return RouteSetter.preprocessPathParam(request, response, new String[] { "pid" }, (params) -> {
                    int pid = params[0];
                    return RouteSetter.preprocessJSONValueGet(request, response, new String[] { "iid" },
                            new Type[] { Type.INT }, (vals) -> {
                                int iid = (int) vals[0];
                                Square imageBox = Square.DEFAULT_IMAGE, windowBox = Square.DEFAULT_WINDOW;
                                if (db.window.insertWindow(pid, iid, imageBox, windowBox) < 1)
                                    return StructuredResponse.getErrorResponse(
                                            ErrorHandler.UNKOWN.INSERTION_NO_UPDATE_UNKNOWN,
                                            "Failed insert into table window_t. ");

                                JSONObject retval = db.window.getWindow(db.getLastInsertedId());
                                if (retval == null)
                                    return StructuredResponse.getErrorResponse(
                                            ErrorHandler.UNKOWN.FAILED_TO_FETCH_DATA_UNKNOWN,
                                            "Failed to fatch the newly created window. ");
                                return StructuredResponse.getResponse(retval);
                            });
                });
            });
        });
    }
}