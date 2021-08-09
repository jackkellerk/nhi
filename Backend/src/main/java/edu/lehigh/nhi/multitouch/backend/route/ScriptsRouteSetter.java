package edu.lehigh.nhi.multitouch.backend.route;

import org.json.JSONObject;

import edu.lehigh.nhi.multitouch.backend.Encryption;
import edu.lehigh.nhi.multitouch.backend.ErrorHandler;
import edu.lehigh.nhi.multitouch.backend.JSONValueGetter.Type;
import edu.lehigh.nhi.multitouch.backend.StructuredResponse;
import edu.lehigh.nhi.multitouch.backend.database.DatabaseManager;

public class ScriptsRouteSetter {
    private ScriptsRouteSetter() {
    }

    /**
     * Currently available routes: scriptTest. TODO: Update
     * this comment after changes.
     */
    public static void setRoutes(DatabaseManager db, Encryption encryption) {
        /**
         * IMPORTANT: check documentations of RouteSetter and setRoute before use.
         */

        RouteSetter.setRoute(RequestType.POST, "/scripts", (request, response) -> {
            return RouteSetter.preprocessSessionCheck(request, response, encryption, (uid, sessionkey) -> {
                return RouteSetter.preprocessJSONValueGet(request, response, new String[] { "email", "password" },
                        new Type[] { Type.STRING, Type.STRING }, (vals) -> {
                            /**
                             * TO DO: In the future a list of available scripts
                             *        The proper thing to do would be to either iterate 
                             *        through the directory where we store the scrpts
                             *        or store the names on our database. 
                             *        Meanwhile, this will run the same code as the test script
                             */
                            String path = "../scripts/whileLoop.py";
                            String script_output = db.scripts.testScript(path);
                            JSONObject dataJs = new JSONObject();
                            dataJs.put("script_output", script_output);
                            return StructuredResponse.getResponse(dataJs);
                            
                        });
                });
        });


        RouteSetter.setRoute(RequestType.POST, "/scripts/select/:scriptName", (request, response) -> {
            return RouteSetter.preprocessSessionCheck(request, response, encryption, (uid, sessionkey) -> {
                return RouteSetter.preprocessJSONValueGet(request, response, new String[] { "email", "password" },
                        new Type[] { Type.STRING, Type.STRING }, (vals) -> {

                            String scriptName = null;
                            try {
                                scriptName = request.params("scriptName");
                            } catch (NumberFormatException e) {
                                e.printStackTrace();
                                return StructuredResponse.getErrorResponse(ErrorHandler.PATH.PATH_STRING_FORMAT);
                            }
                            
                            String path = "../scripts/" + scriptName;
                            String script_output = db.scripts.testScript(path);
                            JSONObject dataJs = new JSONObject();
                            dataJs.put("script_output", script_output);
                            return StructuredResponse.getResponse(dataJs);

                        });
                });
        });


        RouteSetter.setRoute(RequestType.POST, "/scripts/offGetInfo", (request, response) -> {
            return RouteSetter.preprocessSessionCheck(request, response, encryption, (uid, sessionkey) -> {
                return RouteSetter.preprocessJSONValueGet(request, response, new String[] { "email", "password" },
                        new Type[] { Type.STRING, Type.STRING }, (vals) -> {
                            String path = "../scripts/offline_get_info_only.py";
                            String script_output = db.scripts.testScript(path);
                            JSONObject dataJs = new JSONObject();
                            dataJs.put("script_output", script_output);
                            return StructuredResponse.getResponse(dataJs);
                        });
                });
        });
        
        // RouteSetter.setRoute(RequestType.POST, "/scripts/move", (request, response) -> {
        //     return RouteSetter.preprocessJSONValueGet(request, response, new String[] { "number" },
        //             new Type[] { Type.INT}, (vals) -> {
        //                 int number = (int) vals[0];

        //                 String[] pathnames;
        //                 // Creates a new File instance by converting the given pathname string
        //                 // into an abstract pathname
        //                 File f = new File("../scripts");

        //                 // Populates the array with names of files and directories
        //                 pathnames = f.list();

        //                 // For each pathname in the pathnames array
        //                 for (String pathname : pathnames) {
        //                     // Print the names of files and directories
        //                     System.out.println(pathname);
        //                 }
        //                 return number;
        //             });
        // });

        RouteSetter.setRoute(RequestType.POST, "/scripts/test", (request, response) -> {
            return RouteSetter.preprocessSessionCheck(request, response, encryption, (uid, sessionkey) -> {
                return RouteSetter.preprocessJSONValueGet(request, response, new String[] { "number" },
                        new Type[] { Type.INT}, (vals) -> {

                            String path = "../scripts/whileLoop.py";
                            String script_output = db.scripts.testScript(path);
                            JSONObject dataJs = new JSONObject();
                            dataJs.put("script_output", script_output);
                            return StructuredResponse.getResponse(dataJs);
                        });
                });
        });


        ///Helper 
    }
}
