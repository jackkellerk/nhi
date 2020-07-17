package edu.lehigh.nhi.multitouch.backend.route;

import org.json.JSONArray;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;
import java.security.GeneralSecurityException;
import java.io.FileOutputStream;
import java.io.*;
import javax.xml.bind.DatatypeConverter;
// import sun.misc.BASE64Decoder;
//import sun.misc.BASE64Encoder;

import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServletResponse;

import edu.lehigh.nhi.multitouch.backend.Encryption;
import edu.lehigh.nhi.multitouch.backend.ErrorHandler;
import edu.lehigh.nhi.multitouch.backend.StructuredResponse;
import edu.lehigh.nhi.multitouch.backend.JSONValueGetter.Type;
import edu.lehigh.nhi.multitouch.backend.database.DatabaseManager;
import spark.utils.IOUtils;


@MultipartConfig
public final class SourceRouteSetter {
    private SourceRouteSetter() {
    }

    public static void setRoutes(final DatabaseManager db, final Encryption encryption) {
        // get object list by sid
        RouteSetter.setRoute(RequestType.GET, "/s/:sid/object", (request, response) -> {
            return RouteSetter.preprocessSessionCheck(request, response, encryption, (uid, sessionkey) -> {
                int sid = -1;
                try {
                    sid = Integer.parseInt(request.params("sid"));
                } catch (final NumberFormatException e) {
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
                } catch (final NumberFormatException e) {
                    e.printStackTrace();
                    return StructuredResponse.getErrorResponse(ErrorHandler.PATH.PATH_NUM_FORMAT);
                }
                return StructuredResponse.getResponse(db.source.getDetailedObject(oid));

            });
        });

        // serve image files
        RouteSetter.setRoute(RequestType.GET, "/i/:userName/:projectName/:fileName", (request, response) -> {
            // We directly request uid and sessionkey from the query parametesr. This is
            // special because put them in headers requires an ajax call.
            // Browsers are bad directly dealing with byte arrays, and ajax call returns a
            // string representation of byte arrage, so ajax call would be a bad practice.
            final String uidStr = request.queryParams("uid");
            final String sesStr = request.queryParams("session_key");
            if (uidStr == null || sesStr == null) {
                return StructuredResponse.getErrorResponse(ErrorHandler.PATH.MISSING_QUERY_PARAM,
                        "Query parameters needed: uid INT, session_key STRING. ");
            }
            int uid = -1;
            try {
                uid = Integer.parseInt(uidStr);
            } catch (final NumberFormatException e) {
                return StructuredResponse.getErrorResponse(ErrorHandler.PATH.PATH_NUM_FORMAT,
                        "The query parameter uid should be a integer. ");
            }
            if (!encryption.checkSessionKey(uid, sesStr)) {
                return StructuredResponse.getErrorResponse(ErrorHandler.PRIVILAGE.INVALID_SESSION_KEY);
            }
            //final String institutionName = request.params("institutionName");
            final String filename = request.params("fileName");
            final String projectName = request.params("projectName");
            final String username = request.params("userName");
            final HttpServletResponse rawResponse = response.raw();
            rawResponse.reset();
            try {
                System.out.println("Sending image ...");
                final FileInputStream in = new FileInputStream("../images/" + username + "/" + projectName + "/" + filename);
                final OutputStream out = rawResponse.getOutputStream();
                final long bytesCopyed = IOUtils.copyLarge(in, out);
                out.flush();
                out.close();
                in.close();
                System.out.println("success. " + bytesCopyed + " bytes sent.");
                return rawResponse;
            } catch (final FileNotFoundException e) {
                return StructuredResponse.getErrorResponse(ErrorHandler.EXISTANSE.IMAGE_FILE_EXISTANCE, e.getMessage());
            } catch (final IOException e) {
                e.printStackTrace();
                return StructuredResponse.getErrorResponse(ErrorHandler.IO.SERVING_IMAGE_FILE);
            }
        });

        // save image files
        RouteSetter.setRoute(RequestType.POST, "/i/upload", (request, response) -> {
            return RouteSetter.preprocessJSONValueGet(request, response, new String[] { "fileName", "fileData", "user", "project" },
                    new Type[] { Type.STRING, Type.STRING, Type.STRING, Type.STRING }, (vals) -> {
                // We directly request uid and sessionkey from the query parametesr. This is
                // special because put them in headers requires an ajax call.
                // Browsers are bad directly dealing with byte arrays, and ajax call returns a
                // string representation of byte arrage, so ajax call would be a bad practice.
                final String uidStr = request.queryParams("uid");
                final String sesStr = request.queryParams("session_key");
                final String fileName= (String) vals[0];
                final String fileData= (String) vals[1];
                final String user= (String) vals[2];
                final String project = (String) vals[3];
                if (uidStr == null || sesStr == null) {
                    return StructuredResponse.getErrorResponse(ErrorHandler.PATH.MISSING_QUERY_PARAM,
                            "Query parameters needed: uid INT, session_key STRING. ");
                }
                int uid = -1;
                try {
                    uid = Integer.parseInt(uidStr);
                } catch (final NumberFormatException e) {
                    return StructuredResponse.getErrorResponse(ErrorHandler.PATH.PATH_NUM_FORMAT,
                            "The query parameter uid should be a integer. ");
                }
                if (!encryption.checkSessionKey(uid, sesStr)) {
                    return StructuredResponse.getErrorResponse(ErrorHandler.PRIVILAGE.INVALID_SESSION_KEY);
                }

                final String imageURL = uploadFile(fileName, fileData, user, project);
                //return fileName;
                System.out.println("-------------------------------------" );
                System.out.println(fileName );
                System.out.println(user);
                System.out.println(project );
                return fileName;
            });
        });

        // check images ****TESTING PURPOSES*****
        RouteSetter.setRoute(RequestType.POST, "/i/checkimages", (request, response) -> {
            // We directly request uid and sessionkey from the query parametesr. This is
            // special because put them in headers requires an ajax call.
            // Browsers are bad directly dealing with byte arrays, and ajax call returns a
            // string representation of byte arrage, so ajax call would be a bad practice.
            final String uidStr = request.queryParams("uid");
            final String sesStr = request.queryParams("session_key");
            if (uidStr == null || sesStr == null) {
                return StructuredResponse.getErrorResponse(ErrorHandler.PATH.MISSING_QUERY_PARAM,
                        "Query parameters needed: uid INT, session_key STRING. ");
            }
            int uid = -1;
            try {
                uid = Integer.parseInt(uidStr);
            } catch (final NumberFormatException e) {
                return StructuredResponse.getErrorResponse(ErrorHandler.PATH.PATH_NUM_FORMAT,
                        "The query parameter uid should be a integer. ");
            }
            if (!encryption.checkSessionKey(uid, sesStr)) {
                return StructuredResponse.getErrorResponse(ErrorHandler.PRIVILAGE.INVALID_SESSION_KEY);
            }
            final HttpServletResponse rawResponse = response.raw();
            rawResponse.reset();

            // printing out the system directory 
            System.out.println("Working Directory = " + System.getProperty("user.dir"));
            try { 
                
                String names = " ";
                // Create a file object 
                final File f = new File("C:/Users/agust/Documents/nhi/images/demo"); 
      
                // Get all the names of the files present 
                // in the given directory 
                final File[] files = f.listFiles(); 
      
                System.out.println("Files are:"); 
      
                // Display the names of the files 
                for (int i = 0; i < files.length; i++) { 
                    System.out.println(files[i].getName()); 
                    names = names +" " + files[i].getName();
                } 
                return names;
            } 
            catch (final Exception e) { 
                System.err.println(e.getMessage()); 
            } 
            return("Working Directory = " + System.getProperty("user.dir"));
            
        });

        RouteSetter.setRoute(RequestType.GET, "/sources", ((request, response) -> {
            return RouteSetter.preprocessSessionCheck(request, response, encryption, (uid, sessionKey) -> {
                final JSONArray sourceList = db.source.getSourceList();
               return StructuredResponse.getResponse(sourceList);
           });
        }));

    }

    public static String uploadFile(final String fileName, final String user, final String project, final String source) throws IOException, GeneralSecurityException{
        String base64String = source;
        String[] strings = base64String.split(",");
        String extension;
        switch (strings[0]) {//check image's extension
            case "data:image/jpeg;base64":
                extension = "jpeg";
                break;
            case "data:image/png;base64":
                extension = "png";
                break;
            default://should write cases for more images types
                extension = "jpg";
                break;
        }
        //convert base64 string to binary data
        byte[] data = DatatypeConverter.parseBase64Binary(strings[1]);
        String path = "C:/Users/agust/Documents/nhi/images/" +user+ "/" + project+ "/" + fileName +"." + extension;
        File file = new File(path);
        try (OutputStream outputStream = new BufferedOutputStream(new FileOutputStream(file))) {
            outputStream.write(data);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return path;
        }
}