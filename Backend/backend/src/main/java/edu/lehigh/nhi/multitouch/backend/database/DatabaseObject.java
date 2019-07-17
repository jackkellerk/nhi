package edu.lehigh.nhi.multitouch.backend.database;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

class DatabaseObject {

    protected MySQLConnection mMySQLConnection;
    protected Connection connection;

    protected DatabaseObject(MySQLConnection mySQLConnection) {
        mMySQLConnection = mySQLConnection;
        connection = mySQLConnection.connection;
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
}