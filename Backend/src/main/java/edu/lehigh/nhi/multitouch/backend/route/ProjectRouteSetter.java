
package edu.lehigh.nhi.multitouch.backend.route;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.json.JSONArray;
import org.json.JSONObject;

import edu.lehigh.nhi.multitouch.backend.Encryption;
import edu.lehigh.nhi.multitouch.backend.ErrorHandler;
import edu.lehigh.nhi.multitouch.backend.JSONValueGetter.Type;
import edu.lehigh.nhi.multitouch.backend.StructuredResponse;
import edu.lehigh.nhi.multitouch.backend.database.DatabaseManager;
import edu.lehigh.nhi.multitouch.backend.database.SourceManager;


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
                            JSONObject propertiesObj = (JSONObject) vals[3];
                            String properties = propertiesObj.toString();
                            String institution = (String) vals[4];
                            JSONArray sources = (JSONArray) vals[5];
                            JSONObject retval = db.project.createProject(uid, name, canvas_width, canvas_height, properties, institution);
                            if (retval == null){
                                return StructuredResponse
                                        .getErrorResponse(ErrorHandler.UNKOWN.INSERTION_NO_UPDATE_UNKNOWN);
                            }
                            int projectId = retval.getInt("pid");
                            System.out.println(projectId);
                            //If row got inserted, make directory 
                            System.out.println("Project name: "+ name);
                            int lastInsertId =  db.getLastInsertedId();
                            String path = "../images/" + uid + "/" +  lastInsertId;
                            System.out.println("Path name: "+ path);
                            File file = new File(path);
                            boolean bool = file.mkdirs();
                            if(bool){

                                ///project directory got made, time to copy files and insert paths to table
                                System.out.println("Directory created successfully");
                                System.out.println("Starting Image Copying");
                                for (int i = 0; i < sources.length(); i++ ){
                                    
                                    ///Get right extensions and file paths from request 
                                    String sourcePath = (String) sources.get(i);
                                    System.out.println(sourcePath);
                                    String[] splitByExtension = sourcePath.split("\\.");
                                    for (int a=0; a < splitByExtension.length ; a ++){
                                        System.out.println(splitByExtension[a]);
                                    }
                                    String filePaths = splitByExtension[0];
                                    String[] splitPaths = filePaths.split("/");
                                    int tempLength = splitPaths.length;
                                    String imageFileName = splitPaths[tempLength-1];
                                    String imageExtension = splitByExtension[1];

                                    ///Create a string to represent the date
                                    String pattern = "MM-dd-yyyy_HH-mm-ss";
                                    
                                    DateFormat df = new SimpleDateFormat(pattern);
                                    Date today = new Date();        
                                    String todayAsString = df.format(today);
                                    // todayAsString.replaceAll("\\s", "");
                                    System.out.println(todayAsString);

                                    ///Creating our paths and files
                                    String newPath = "../images/" + uid + "/" + lastInsertId + "/" + imageFileName + "_" + i + "." + imageExtension;
                                    String origPath = "../images/" + splitByExtension[0] + "." + imageExtension ;
                                    // File origFile = new File(origPath);
                                    // File newFile = new File(newPath);
                                    System.out.println(newPath);
                                    System.out.println(origPath);

                                    ///Using our copying method from our SourceManager.java file
                                    try {
                                        SourceManager.copyFile(origPath, newPath); 
                                        ////Image was copied over, time to insert into the table of our paths
                                        System.out.println("Image copy created successfully");
                                        JSONObject imageRes = db.source.insertProjectImagePaths(newPath, projectId);
                                        //retval.put("Insert ImageRes", imageRes);   
                                    }
                                    catch (Exception e){
                                        System.out.println("Sorry couldn’t create image copy specified directory. Image index: " + i);
                                        System.out.println(e);
                                    }                   
                                }
                                System.out.println("End of Image Copying");
                            }else{
                                System.out.println("Sorry couldn’t create specified directory");
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
                            new String[] { "name", "thumbnail", "width","height", "properties", "institution" },
                            new Type[] { Type.STRING, Type.STRING, Type.FLOAT, Type.FLOAT, Type.STRING, Type.STRING}, (vals) -> {
                            String name = (String) vals[0];
                            String thumbnail = (String) vals[1];
                            float width = (float) vals[2];
                            float height = (float) vals[3];
                            String properties = (String) vals[4];
                            String institution = (String) vals[5];
                            int num_rows_updated = db.project.updateProject(pid, name, thumbnail, width, height, properties, institution);
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
