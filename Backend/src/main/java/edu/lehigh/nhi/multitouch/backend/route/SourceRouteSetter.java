package edu.lehigh.nhi.multitouch.backend.route;

import org.json.JSONArray;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.http.HttpServletResponse;

import edu.lehigh.nhi.multitouch.backend.Encryption;
import edu.lehigh.nhi.multitouch.backend.ErrorHandler;
import edu.lehigh.nhi.multitouch.backend.StructuredResponse;
import edu.lehigh.nhi.multitouch.backend.database.DatabaseManager;
import spark.utils.IOUtils;

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

        // get detailed info of a single object
        RouteSetter.setRoute(RequestType.GET, "/o/:oid", (request, response) -> {
            return RouteSetter.preprocessSessionCheck(request, response, encryption, (uid, sessionkey) -> {
                int oid = -1;
                try {
                    oid = Integer.parseInt(request.params("oid"));
                } catch (NumberFormatException e) {
                    e.printStackTrace();
                    return StructuredResponse.getErrorResponse(ErrorHandler.PATH.PATH_NUM_FORMAT);
                }
                return StructuredResponse.getResponse(db.source.getDetailedObject(oid));

            });
        });

        // serve image files
        RouteSetter.setRoute(RequestType.GET, "/i/:institutionName/:fileName", (request, response) -> {
            // We directly request uid and sessionkey from the query parametesr. This is
            // special because put them in headers requires an ajax call.
            // Browsers are bad directly dealing with byte arrays, and ajax call returns a
            // string representation of byte arrage, so ajax call would be a bad practice.
            String uidStr = request.queryParams("uid");
            String sesStr = request.queryParams("session_key");
            if (uidStr == null || sesStr == null) {
                return StructuredResponse.getErrorResponse(ErrorHandler.PATH.MISSING_QUERY_PARAM,
                        "Query parameters needed: uid INT, session_key STRING. ");
            }
            int uid = -1;
            try {
                uid = Integer.parseInt(uidStr);
            } catch (NumberFormatException e) {
                return StructuredResponse.getErrorResponse(ErrorHandler.PATH.PATH_NUM_FORMAT,
                        "The query parameter uid should be a integer. ");
            }
            if(!encryption.checkSessionKey(uid, sesStr)){
                return StructuredResponse.getErrorResponse(ErrorHandler.PRIVILAGE.INVALID_SESSION_KEY);
            }
            String institutionName = request.params("institutionName");
            String filename = request.params("fileName");
            HttpServletResponse rawResponse = response.raw();
            rawResponse.reset();
            try {
                System.out.println("Sending image ...");
                FileInputStream in = new FileInputStream("../images/" + institutionName + "/" + filename);
                OutputStream out = rawResponse.getOutputStream();
                long bytesCopyed = IOUtils.copyLarge(in, out);
                out.flush();
                out.close();
                in.close();
                System.out.println("success. " + bytesCopyed + " bytes sent.");
                return rawResponse;
            } catch (FileNotFoundException e) {
                return StructuredResponse.getErrorResponse(ErrorHandler.EXISTANSE.IMAGE_FILE_EXISTANCE, e.getMessage());
            } catch (IOException e) {
                e.printStackTrace();
                return StructuredResponse.getErrorResponse(ErrorHandler.IO.SERVING_IMAGE_FILE);
            }
        });
        
        RouteSetter.setRoute(RequestType.GET, "/sources", ((request, response) -> {
           return RouteSetter.preprocessSessionCheck(request, response, encryption, (uid, sessionKey) -> {
               JSONArray sourceList = db.source.getSourceList();
               return StructuredResponse.getResponse(sourceList);
           });
        }));
        
    }
}