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
        } catch (SQLException e) {
            System.err.println("Login error occured.");
            return false;
        }

        if (actualPassword.equals(password)) {
            return true;
        }

        return false;
    }

    public int getUidByUsername(String username) throws SQLException {
        PreparedStatement stmt = connection.prepareStatement("select id from users where username = ?");
        stmt.setString(1, username);
        ResultSet rs = stmt.executeQuery();
        rs.next();
        int retval = rs.getInt("id");
        rs.close();
        stmt.close();
        return retval;
    }

    public JSONObject userSettings(String username)
    {
        // Stores the data to return
        JSONObject response = new JSONObject();
        String passwordLength, legalName, email, profilePicture, institution, id;
        response.put("username", username);

        try 
        {
            Statement stmt = connection.createStatement();

            // Gathers passwordLength
            ResultSet rs = stmt.executeQuery("SELECT password FROM `users` WHERE username = '" + username + "'");
            while (rs.next()) 
            {
                response.put("passwordLength", rs.getString("password").length());
            }
            rs.close();

            // Gathers legalName
            rs = stmt.executeQuery("SELECT legalname FROM `users` WHERE username = '" + username + "'");
            while (rs.next()) 
            {
                response.put("legalName", rs.getString("legalname"));
            }
            rs.close();

            // Gathers email
            rs = stmt.executeQuery("SELECT email FROM `users` WHERE username = '" + username + "'");
            while (rs.next()) 
            {
                response.put("email", rs.getString("email"));
            }
            rs.close();

            // Gathers profilepicture
            rs = stmt.executeQuery("SELECT profilepicture FROM `users` WHERE username = '" + username + "'");
            while (rs.next()) 
            {
                response.put("profilePicture", rs.getString("profilepicture"));
            }
            rs.close();

            // Gathers institution
            rs = stmt.executeQuery("SELECT institution FROM `users` WHERE username = '" + username + "'");
            while (rs.next()) 
            {
                response.put("institution", rs.getString("institution"));
            }
            rs.close();

            // Gathers id
            rs = stmt.executeQuery("SELECT id FROM `users` WHERE username = '" + username + "'");
            while (rs.next()) 
            {
                response.put("id", rs.getString("id"));
            }
            rs.close();

            stmt.close();
        } 
        catch (SQLException e) 
        {
            e.printStackTrace();
            JSONObject error = new JSONObject();
            error.put("Error", "Error");
            return error;
        }

        return response;
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

     // Returns true if it was successful, returns false otherwise // Ask if the email must be an edu email specifically from one of the partnering universities
     public boolean signup(String username, String password, String email, String legalName, String institution)
     {
         try
         {
             Statement stmt = connection.createStatement();
             // perhaps i should check if the same username already exists, but it shouldnt interfere with the code as of right now
             stmt.executeUpdate("INSERT INTO users (username, password, legalname, email, profilepicture, institution) VALUES ('" + username + "', '" + password + "', '" + legalName + "', '" + email + "', 'TODO', '" + institution + "')");
             stmt.close();
 
             return login(username, password);
         }
         catch(SQLException e)
         {
             System.out.println(e);
             return false;
         }
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

    public int updateWindowPosition(int wid, float pos_x, float pos_y, float width, float height) throws SQLException{
        PreparedStatement stmt = connection.prepareStatement("update window_t set canvas_pos_x = ?, canvas_pos_y = ?, canvas_width = ?, canvas_height = ? where wid = ?");
        stmt.setFloat(1, pos_x);
        stmt.setFloat(2, pos_y);
        stmt.setFloat(3, width);
        stmt.setFloat(4, height);
        stmt.setInt(5, wid);
        int retval = stmt.executeUpdate();
        stmt.close();
        return retval;
    }

    // public JSONObject addProject(String projectName, ) throws

    private static JSONArray convertToJSONArray(ResultSet resultSet) throws JSONException, SQLException {
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

    private static JSONObject convertToJSONObject(ResultSet resultSet) throws JSONException, SQLException {
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