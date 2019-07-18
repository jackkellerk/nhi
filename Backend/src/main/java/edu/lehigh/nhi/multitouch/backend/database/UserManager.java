package edu.lehigh.nhi.multitouch.backend.database;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONException;
import org.json.JSONObject;

public class UserManager {

    private final DatabaseManager mManager;
    private final PreparedStatement mSelectUserByUsername, mInsertUserSimple, mInsertUserFull;

    protected UserManager(DatabaseManager manager) throws SQLException {
        mManager = manager;
        StatementLoader loader = StatementLoader.getInstance();
        mSelectUserByUsername = loader.mSelectUserByUsername;
        mInsertUserSimple = loader.mInsertUserSimple;
        mInsertUserFull = loader.mInsertUserFull;
    }

    public boolean login(String username, String password) {
        //TODO: use hashed password
        //TODO: check error for non-existing user
        String actualPassword = null;
        try {
            mSelectUserByUsername.setString(1, username);
            ResultSet rs = mSelectUserByUsername.executeQuery();
            if (rs.next()) {
                actualPassword = rs.getString("password");
            }
            rs.close();
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
        mSelectUserByUsername.setString(1, username);
        ResultSet rs = mSelectUserByUsername.executeQuery();
        rs.next();
        int retval = rs.getInt("id");
        rs.close();
        return retval;
    }

    public JSONObject userSettings(String username) throws JSONException, SQLException {
        mSelectUserByUsername.setString(1, username);
        ResultSet rs = mSelectUserByUsername.executeQuery();
        JSONObject retval = DatabaseManager.convertToJSONObject(rs);
        rs.close();
        return retval;
    }

    // Returns true if it was successful, returns false otherwise // Ask if the
    // email must be an edu email specifically from one of the partnering
    // universities
    public boolean signup(String username, String password, String email) throws SQLException {
        mInsertUserSimple.setString(1, username);
        mInsertUserSimple.setString(2, password);
        mInsertUserSimple.setString(3, email);
        mInsertUserSimple.executeUpdate();
        return login(username, password);
    }

    // Returns true if it was successful, returns false otherwise // Ask if the
    // email must be an edu email specifically from one of the partnering
    // universities
    public boolean signup(String username, String password, String email, String legalName, String institution)
            throws SQLException {
        mInsertUserFull.setString(1, username);
        mInsertUserFull.setString(2, password);
        mInsertUserFull.setString(3, legalName);
        mInsertUserFull.setString(4, email);
        // TODO:
        mInsertUserFull.setString(5, "TODO");
        mInsertUserFull.setString(6, institution);
        mInsertUserFull.executeUpdate();

        return login(username, password);
    }
}