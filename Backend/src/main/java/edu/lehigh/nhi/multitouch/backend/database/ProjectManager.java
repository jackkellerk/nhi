package edu.lehigh.nhi.multitouch.backend.database;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;

import com.google.gson.Gson;

import org.json.JSONArray;
import org.json.JSONException;
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
    private final PreparedStatement mSelectProjectByPidPS, mSelectProjectsByUidPS, mInsertProjectPS, mUpdateProjectPS,
            mDeleteProjectByPidPS;

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
        mSelectProjectByPidPS = mStatements.project.selectProjectByPid;
        mSelectProjectsByUidPS = mStatements.project.selectProjectsByUid;
        mInsertProjectPS = mStatements.project.insertProject;
        mUpdateProjectPS = mStatements.project.updateProjectByPid;
        mDeleteProjectByPidPS = mStatements.project.deleteProjectByPid;
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
        mSelectProjectByPidPS.setInt(1, pid);
        mStatements.window.selectWindowByPid.setInt(1, pid);
        ResultSet projectRS = mSelectProjectByPidPS.executeQuery();
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
        mInsertProjectPS.setString(1, name);
        mInsertProjectPS.setTimestamp(2, DatabaseManager.convertDateToTimestamp(new Date()));
        mInsertProjectPS.setFloat(3, canvas_width);
        mInsertProjectPS.setFloat(4, canvas_height);
        if (mInsertProjectPS.executeUpdate() > 0) {
            int pid;
            if ((pid = mManager.getLastInsertedId()) > 0)
                return getProject(pid);
        }
        return null;
    }

    public int updateProject(int pid, String name, String thumbnail, float width, float height) throws SQLException {
        mUpdateProjectPS.setString(1, name);
        mUpdateProjectPS.setString(2, thumbnail);
        mUpdateProjectPS.setFloat(3, width);
        mUpdateProjectPS.setFloat(4, height);
        mUpdateProjectPS.setInt(5, pid);
        int retval = mUpdateProjectPS.executeUpdate();
        mUpdateProjectPS.close();
        return retval;
    }

    //TODO: Incomplete until relationships are complete
    public int deleteProject(int pid) throws JSONException, SQLException{
        int retval = 0;

        mStatements.window.selectWindowByPid.setInt(1, pid);
        ResultSet windowRS = mStatements.window.selectWindowByPid.executeQuery();
        while (windowRS.next()) {
            mStatements.window.deleteWindowByWid.setInt(1, windowRS.getInt("wid"));
            retval += mStatements.window.deleteWindowByWid.executeUpdate();
        }
        mStatements.window.deleteWindowByWid.close();
        windowRS.close();

        mDeleteProjectByPidPS.setInt(1, pid);
        retval += mDeleteProjectByPidPS.executeUpdate();
        mDeleteProjectByPidPS.close();

        return retval;
    }
}