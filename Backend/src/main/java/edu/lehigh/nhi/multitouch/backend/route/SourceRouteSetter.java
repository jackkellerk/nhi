package edu.lehigh.nhi.multitouch.backend.route;

import edu.lehigh.nhi.multitouch.backend.Encryption;
import edu.lehigh.nhi.multitouch.backend.ErrorHandler;
import edu.lehigh.nhi.multitouch.backend.StructuredResponse;
import edu.lehigh.nhi.multitouch.backend.database.DatabaseManager;

public final class SourceRouteSetter {
    private SourceRouteSetter() {
    }

    public static void setRoutes(DatabaseManager db, Encryption encryption) {

        // get object list by sid
        RouteSetter.setRoute(RequestType.GET, "/s/:sid/object", (request, response) -> {
            return RouteSetter.preprocessSessionCheck(request, response, encryption, (uid, sessionkey) -> {
                int sid = -1;
                try {
                    sid = Integer.parseInt(request.params("sid"));
                } catch (NumberFormatException e) {
                    e.printStackTrace();
                    return StructuredResponse.getErrorResponse(ErrorHandler.PATH.PATH_NUM_FORMAT);
                }
                return StructuredResponse.getResponse(db.source.getObjectList(sid));
            });
        });
    }
}