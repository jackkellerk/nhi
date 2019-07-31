package edu.lehigh.nhi.multitouch.backend.database;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.Date;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * Supper class for all Database Managers. Acess point for all database related
 * methods. Provides constractors and common methods for all subclasses.
 */
public class DatabaseManager {

    /**
     * Setup Statement Loader
     * 
     * @throws SQLException
     */

    private final Statements mStatements;

    // provides access point for relavent methods.
    public final UserManager user;
    public final WindowManager window;
    public final ProjectManager project;
    public final SourceManager source;

    public DatabaseManager() throws SQLException {
        mStatements = Statements.getInstance();
        user = new UserManager(this);
        window = new WindowManager(this);
        project = new ProjectManager(this);
        source = new SourceManager(this);
    }

    public int getLastInsertedId() throws SQLException {
        ResultSet rs = mStatements.common.selectLastInsertion.executeQuery();
        if (rs.next()) {
            int index = rs.getInt("last_insert_id()");
            return index;
        }
        return -1;
    }

    public boolean checkProjectOwnership(int uid, int pid) throws SQLException {
        mStatements.common.checkProjectOwnership.setInt(1, uid);
        mStatements.common.checkProjectOwnership.setInt(2, pid);
        ResultSet rs = mStatements.common.checkProjectOwnership.executeQuery();
        if (rs.next()) {
            rs.close();
            return true;
        }
        rs.close();
        return false;
    }

    public boolean checkWindowOwnership(int uid, int wid) throws SQLException {
        PreparedStatement ps = mStatements.common.getPidByWid;
        ps.setInt(1, wid);
        ResultSet rs = ps.executeQuery();
        if (!rs.next()) {
            rs.close();
            return false;
        }
        int pid = rs.getInt("pid");
        rs.close();
        return checkProjectOwnership(uid, pid);
    }

    protected static JSONArray convertToJSONArray(ResultSet resultSet) throws JSONException, SQLException {
        JSONArray jsonArray = new JSONArray();
        while (resultSet.next()) {
            int total_rows = resultSet.getMetaData().getColumnCount();
            JSONObject obj = new JSONObject();
            for (int i = 0; i < total_rows; i++) {
                obj.put(resultSet.getMetaData().getColumnLabel(i + 1).toLowerCase(), resultSet.getObject(i + 1));
            }
            jsonArray.put(obj);

        }
        return jsonArray;
    }

    protected static JSONObject convertToJSONObject(ResultSet resultSet) throws JSONException, SQLException {
        JSONObject obj = new JSONObject();
        if (resultSet.next()) {
            int total_rows = resultSet.getMetaData().getColumnCount();
            for (int i = 0; i < total_rows; i++) {
                obj.put(resultSet.getMetaData().getColumnLabel(i + 1).toLowerCase(), resultSet.getObject(i + 1));
            }
        }
        return obj;

    }

    protected static Timestamp convertDateToTimestamp(Date date) {
        return new Timestamp(date.getTime());
    }
}