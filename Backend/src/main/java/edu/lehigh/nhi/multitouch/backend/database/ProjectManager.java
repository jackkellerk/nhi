package edu.lehigh.nhi.multitouch.backend.database;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;

import com.google.gson.Gson;

import org.json.JSONArray;
import org.json.JSONObject;

/**
 * Manage project_t table in the batabase. IMPORTANT: only include changes to
 * the project_t table. Update of windows, and user ownership of projects should
 * be in WindowManager and UserManager respectfully.
 */
public class ProjectManager{

    private final Gson gson;
    private final StatementLoader mLoader;
    private final DatabaseManager mManager;
    protected final PreparedStatement mSelectAllProjects, mProjectByPidPS, mCreateProjectPS;
    
    /** Project structure class being traslated into Json by Gson. */
    private class Project {
        int pid;
        String name;
        Date date_creation;
        String thumbnail;
        double canvas_width;
        double canvas_height;
    }

    protected ProjectManager(DatabaseManager manager) throws SQLException {
        gson = new Gson();
        mLoader = StatementLoader.getInstance();
        mManager = manager;
        mSelectAllProjects = mLoader.mSelectAllProjects;
        mProjectByPidPS = mLoader.mProjectByPidPS;
        mCreateProjectPS = mLoader.mCreateProjectPS;
    }

    public JSONArray getProjectListing() throws SQLException {
        ResultSet rs = mLoader.mSelectAllProjects.executeQuery();
        JSONArray retval = DatabaseManager.convertToJSONArray(rs);
        rs.close();
        return retval;
    }

    public JSONObject getProject(int pid) throws SQLException {
        mLoader.mProjectByPidPS.setInt(1, pid);
        mLoader.mWindowByProjectPS.setInt(1, pid);
        ResultSet projectRS = mLoader.mProjectByPidPS.executeQuery();
        ResultSet windowRS = mLoader.mWindowByProjectPS.executeQuery();
        JSONObject retval = new JSONObject();
        if (projectRS.next()) {
            Project project = new Project();
            project.pid = projectRS.getInt("pid");
            project.canvas_height = projectRS.getFloat("canvas_height");
            project.canvas_width = projectRS.getFloat("canvas_width");
            project.date_creation = projectRS.getDate("date_creation");
            project.name = projectRS.getString("name");
            project.thumbnail = projectRS.getString("thumbnail");

            retval = new JSONObject(gson.toJson(project));
            JSONArray windows = new JSONArray();
            while (windowRS.next()) {
                windows.put(mManager.window.getWindow(windowRS.getInt("wid")));
            }
            retval.put("windows", windows);
        }
        projectRS.close();
        windowRS.close();
        return retval;
    }


    public JSONObject createProject(String name, float canvas_width, float canvas_height) throws SQLException {
        mCreateProjectPS.setString(1, name);
        mCreateProjectPS.setTimestamp(2, DatabaseManager.convertDateToTimestamp(new Date()));
        mCreateProjectPS.setFloat(3, canvas_width);
        mCreateProjectPS.setFloat(4, canvas_height);
        if (mCreateProjectPS.executeUpdate() > 0) {
            int pid;
            if ((pid = mManager.getLastInsertedId()) > 0)
                return getProject(pid);
        }
        return new JSONObject();
    }
}