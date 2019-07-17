package edu.lehigh.nhi.multitouch.backend.database;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONArray;
import org.json.JSONObject;

public class Project extends DatabaseObject {

    protected Project(MySQLConnection mySQLConnection) {
        super(mySQLConnection);
        // TODO Auto-generated constructor stub
    }

    public JSONArray getProjectListing() throws SQLException {
        PreparedStatement stmt = connection.prepareStatement("select * from project_t");
        ResultSet rs = stmt.executeQuery();
        JSONArray retval = convertToJSONArray(rs);
        rs.close();
        stmt.close();
        return retval;
        // JSONArray retval = new JSONArray();
        // while (rs.next()) {
        // JSONObject project = new JSONObject();
        // project.put("date_creation", rs.getDate("date_creation"));
        // project.put("name", rs.getString("name"));
        // project.put("pid", rs.getInt("pid"));
        // project.put("thumbnail", rs.getString("thumbnail"));
        // retval.put(project.toString());
        // }
    }

    public JSONObject getProject(int pid) throws SQLException {
        PreparedStatement projectStmt = connection.prepareStatement("select * from project_t where pid = ?");
        PreparedStatement windowStmt = connection.prepareStatement("select * from window_t where pid = ?");
        projectStmt.setInt(1, pid);
        windowStmt.setInt(1, pid);
        ResultSet projectRS = projectStmt.executeQuery();
        ResultSet windowRS = windowStmt.executeQuery();
        JSONObject pjs = convertToJSONObject(projectRS);
        pjs.put("window", convertToJSONArray(windowRS));
        projectStmt.close();
        windowStmt.close();
        projectRS.close();
        windowRS.close();
        return pjs;
    }

    public int updateWindowPosition(int wid, float pos_x, float pos_y, float width, float height) throws SQLException {
        PreparedStatement stmt = connection.prepareStatement(
                "update window_t set canvas_pos_x = ?, canvas_pos_y = ?, canvas_width = ?, canvas_height = ? where wid = ?");
        stmt.setFloat(1, pos_x);
        stmt.setFloat(2, pos_y);
        stmt.setFloat(3, width);
        stmt.setFloat(4, height);
        stmt.setInt(5, wid);
        int retval = stmt.executeUpdate();
        stmt.close();
        return retval;
    }
}