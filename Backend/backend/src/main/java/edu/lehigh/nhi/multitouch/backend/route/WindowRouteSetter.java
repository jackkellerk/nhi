package edu.lehigh.nhi.multitouch.backend.route;

import org.json.JSONException;
import org.json.JSONObject;

import edu.lehigh.nhi.multitouch.backend.Encryption;
import edu.lehigh.nhi.multitouch.backend.ErrorHandler;
import edu.lehigh.nhi.multitouch.backend.StructuredResponse;
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
            JSONObject jsRequest = new JSONObject(request.body());
            int pid = jsRequest.getInt("pid");
            int iid = jsRequest.getInt("iid");
            JSONObject imageBoxJS = null, windowBoxJS = null;
            try {
                imageBoxJS = jsRequest.getJSONObject("image_box");
            } catch (JSONException e) {
                System.out.println("'image_box' not specified. Using default settings.");
            }
            try {
                windowBoxJS = jsRequest.getJSONObject("window_box");
            } catch (JSONException e) {
                System.out.println("'window_box' not specified. Using default settings.");
            }

            Square imageBox, windowBox = null;
            try {
                imageBox = Square.getFromJson(imageBoxJS, Square.Type.image);
            } catch (JSONException e) {
                System.err.println("Missing field(s) in 'image_box'.");
                e.printStackTrace();
                return new StructuredResponse(ErrorHandler.MISSING_FIELD_IMAGE_BOX,
                        "Missing field(s) in 'image_box'.", null).toJson().toString();
            }

            try {
                windowBox = Square.getFromJson(windowBoxJS, Square.Type.window);
            } catch (JSONException e) {
                System.err.println("Missing field(s) in 'window_box'.");
                e.printStackTrace();
                return new StructuredResponse(ErrorHandler.MISSING_FIELD_IMAGE_BOX,
                        "Missing field(s) in 'window_box'.", null).toJson().toString();
            }
            return new StructuredResponse(0, null, db.window.createWindow(pid, iid, imageBox, windowBox)).toJson()
                    .toString();
        });

        // update the posion of the window.
        RouteSetter.setRoute(RequestType.POST, "/w/:wid/update_pos", (request, response) -> {
            JSONObject jsRequest = new JSONObject(request.body());
            float pos_x = jsRequest.getFloat("pos_x");
            float pos_y = jsRequest.getFloat("pos_y");
            float width = jsRequest.getFloat("width");
            float height = jsRequest.getFloat("height");
            int wid = Integer.parseInt(request.params("wid"));
            int num_rows_updated = db.window.updateWindowPosition(wid, pos_x, pos_y, width, height);
            JSONObject retval = new JSONObject();
            retval.put("num_rows_updated", num_rows_updated);
            return new StructuredResponse(0, null, retval).toJson().toString();
        });
    }
}