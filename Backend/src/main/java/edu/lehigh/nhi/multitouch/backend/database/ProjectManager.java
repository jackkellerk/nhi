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
public class ProjectManager {

    private final Gson gson;
    private final Statements mStatements;
    private final DatabaseManager mManager;

    /** Project structure class being traslated into Json by Gson. */
    @SuppressWarnings("unused")
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
        mStatements = Statements.getInstance();
        mManager = manager;
    }

    public JSONArray getProjectList(int uid) throws SQLException {
        PreparedStatement statement = mStatements.project.selectProjectsByUid;
        statement.setInt(1, uid);
        ResultSet rs = statement.executeQuery();
        JSONArray retval = DatabaseManager.convertToJSONArray(rs);
        rs.close();
        return retval;
    }

    public JSONObject getProject(int pid) throws SQLException {
        mStatements.project.selectProjectByPid.setInt(1, pid);
        mStatements.window.selectWindowByPid.setInt(1, pid);
        ResultSet projectRS = mStatements.project.selectProjectByPid.executeQuery();
        ResultSet windowRS = mStatements.window.selectWindowByPid.executeQuery();
        JSONObject retval = null;
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

    public JSONObject createProject(int uid, String name, float canvas_width, float canvas_height) throws SQLException {
        PreparedStatement statement = mStatements.project.insertProject;
        statement.setString(1, name);
        statement.setTimestamp(2, DatabaseManager.convertDateToTimestamp(new Date()));
        statement.setFloat(3, canvas_width);
        statement.setFloat(4, canvas_height);
        if (statement.executeUpdate() > 0) {
            int pid;
            if ((pid = mManager.getLastInsertedId()) > 0)
                return getProject(pid);
        }
        return null;
    }
}