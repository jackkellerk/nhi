package edu.lehigh.nhi.multitouch.backend;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

class MySQLConnection {
    // Information of the SQL Server
    private static final String SQL_url = "jdbc:mysql://remotemysql.com:3306/1Iz28Ynucw";
    private static final String SQL_username = "1Iz28Ynucw";
    private static final String SQL_password = "nUAiAivff5";
    private static MySQLConnection CONNECTION_INSTANCE = null;
    private Connection connection;

    private MySQLConnection() {
        try {
            connection = DriverManager.getConnection(SQL_url, SQL_username, SQL_password);
        } catch (SQLException e) {
            System.err.println("Connection error occured.");
        }
    }

    public synchronized static MySQLConnection getConnection() {
        if (CONNECTION_INSTANCE == null) {
            CONNECTION_INSTANCE = new MySQLConnection();
        }
        return CONNECTION_INSTANCE;
    }

    public boolean login(String username, String password) {
        String actualPassword = null;
        try {
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT password FROM `users` WHERE username = '" + username + "'");
            while (rs.next()) {
                actualPassword = rs.getString("password");
            }
            rs.close();
            stmt.close();
            connection.close();
        } catch (SQLException e) {
            System.err.println("Login error occured.");
            return false;
        }

        if (actualPassword.equals(password)) {
            return true;
        }

        return false;
    }

    // Returns true if it was successful, returns false otherwise // Ask if the
    // email must be an edu email specifically from one of the partnering
    // universities
    public boolean signup(String username, String password, String email) {
        try {
            Statement stmt = connection.createStatement();
            stmt.executeUpdate("INSERT INTO users (username, password, email, profile_picture) VALUES ('" + username
                    + "', '" + password + "', '" + email + "', '')");
            stmt.close();

            return login(username, password);
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public JSONArray getProjectListing(int uid) throws SQLException {
        PreparedStatement stmt = connection.prepareStatement("select * from project_t where uid = ?");
        stmt.setInt(1, uid);
        ResultSet rs = stmt.executeQuery();
        return convertToJSONArray(rs);
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
        return pjs;
    }

    public static JSONArray convertToJSONArray(ResultSet resultSet) throws JSONException, SQLException {
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

    public static JSONObject convertToJSONObject(ResultSet resultSet) throws JSONException, SQLException {
        JSONObject obj = new JSONObject();
        if (resultSet.next()) {
            int total_rows = resultSet.getMetaData().getColumnCount();
            for (int i = 0; i < total_rows; i++) {
                obj.put(resultSet.getMetaData().getColumnLabel(i + 1).toLowerCase(), resultSet.getObject(i + 1));
            }
        }
        return obj;

    }

    public static void main(String[] args) {
        MySQLConnection connection = MySQLConnection.getConnection();
        // System.out.println(connection.login("admin", "password"));
        try {
            System.out.println(connection.getProject(1));
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

    }
}