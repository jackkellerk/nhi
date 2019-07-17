package edu.lehigh.nhi.multitouch.backend.database;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.json.JSONObject;

public class User extends DatabaseObject {

    protected User(MySQLConnection mySQLConnection) {
        super(mySQLConnection);
        // TODO Auto-generated constructor stub
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

    public JSONObject userSettings(String username) {
        // Stores the data to return
        JSONObject response = new JSONObject();
        String passwordLength, legalName, email, profilePicture, institution, id;
        response.put("username", username);

        try {
            Statement stmt = connection.createStatement();

            // Gathers passwordLength
            ResultSet rs = stmt.executeQuery("SELECT password FROM `users` WHERE username = '" + username + "'");
            while (rs.next()) {
                response.put("passwordLength", rs.getString("password").length());
            }
            rs.close();

            // Gathers legalName
            rs = stmt.executeQuery("SELECT legalname FROM `users` WHERE username = '" + username + "'");
            while (rs.next()) {
                response.put("legalName", rs.getString("legalname"));
            }
            rs.close();

            // Gathers email
            rs = stmt.executeQuery("SELECT email FROM `users` WHERE username = '" + username + "'");
            while (rs.next()) {
                response.put("email", rs.getString("email"));
            }
            rs.close();

            // Gathers profilepicture
            rs = stmt.executeQuery("SELECT profilepicture FROM `users` WHERE username = '" + username + "'");
            while (rs.next()) {
                response.put("profilePicture", rs.getString("profilepicture"));
            }
            rs.close();

            // Gathers institution
            rs = stmt.executeQuery("SELECT institution FROM `users` WHERE username = '" + username + "'");
            while (rs.next()) {
                response.put("institution", rs.getString("institution"));
            }
            rs.close();

            // Gathers id
            rs = stmt.executeQuery("SELECT id FROM `users` WHERE username = '" + username + "'");
            while (rs.next()) {
                response.put("id", rs.getString("id"));
            }
            rs.close();

            stmt.close();
        } catch (SQLException e) {
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

    // Returns true if it was successful, returns false otherwise // Ask if the
    // email must be an edu email specifically from one of the partnering
    // universities
    public boolean signup(String username, String password, String email, String legalName, String institution) {
        try {
            Statement stmt = connection.createStatement();
            // perhaps i should check if the same username already exists, but it shouldnt
            // interfere with the code as of right now
            stmt.executeUpdate(
                    "INSERT INTO users (username, password, legalname, email, profilepicture, institution) VALUES ('"
                            + username + "', '" + password + "', '" + legalName + "', '" + email + "', 'TODO', '"
                            + institution + "')");
            stmt.close();

            return login(username, password);
        } catch (SQLException e) {
            System.out.println(e);
            return false;
        }
    }
}