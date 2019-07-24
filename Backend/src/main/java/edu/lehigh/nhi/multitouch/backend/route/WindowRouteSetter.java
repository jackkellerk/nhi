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
        RouteSetter.setRoute(RequestType.POST, "/window/create", (request, response) -> {
            return RouteSetter.preprocessSessionCheck(request, response, encryption, (uid, sessionKey) -> {
                return RouteSetter.preprocessJSONCheck(request, response, (jsBody) -> {
                    int pid, iid;
                    try {
                        jsBody = new JSONObject(request.body());
                        pid = jsBody.getInt("pid");
                        iid = jsBody.getInt("iid");
                    } catch (JSONException e) {
                        return StructuredResponse.getErrorResponseJSONMissingFields(new String[] { "pid", "iid" },
                                new Type[] { Type.INT, Type.INT }, e);
                    }
                    JSONObject imageBoxJS = null, windowBoxJS = null;

                    try {
                        imageBoxJS = jsBody.getJSONObject("image_box");
                    } catch (JSONException e) {
                        System.out.println("'image_box' not specified/not a Json ojbect. Using default values.");
                    }

                    try {
                        windowBoxJS = jsBody.getJSONObject("window_box");
                    } catch (JSONException e) {
                        System.out.println("'window_box' not specified/not a Json object. Using default values.");
                    }

                    Square imageBox = Square.DEFAULT_IMAGE, windowBox = Square.DEFAULT_WINDOW;

                    if (imageBoxJS != null) {
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
                    }

                    if (db.window.insertWindow(pid, iid, imageBox, windowBox) < 1)
                        return StructuredResponse.getErrorResponse(ErrorHandler.UNKOWN.INSERTION_NO_UPDATE_UNKNOWN,
                                "Failed insert into table window_t. ");

                    JSONObject retval = db.window.getWindow(db.getLastInsertedId());
                    if (retval == null)
                        return StructuredResponse.getErrorResponse(ErrorHandler.UNKOWN.FAILED_TO_FETCH_DATA_UNKNOWN,
                                "Failed to fatch the newly created window. ");
                    return StructuredResponse.getResponse(retval);
                });
            });
        });
    }
}