package edu.lehigh.nhi.multitouch.backend.database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.Date;

import com.google.gson.Gson;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * Supper class for all Database Managers. Acess point for all
 * database related methods. Provides constractors and common methods for all
 * subclasses.
 */
public class DatabaseManager {

    
    /**
     * Setup Statement Loader
     * 
     * @throws SQLException
     */

    private final StatementLoader mLoader;
    
    //provides access point for relavent methods.
    public final UserManager user;
    public final WindowManager window;
    public final ProjectManager project;

    public DatabaseManager() throws SQLException {
        mLoader = StatementLoader.getInstance();
        user = new UserManager(this);
        window = new WindowManager(this);
        project = new ProjectManager(this);
    }

    protected int getLastInsertedId() throws SQLException {
        ResultSet rs = mLoader.mLastInsertionPS.executeQuery();
        if (rs.next()) {
            int index = rs.getInt("last_insert_id()");
            return index;
        }
        return -1;
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