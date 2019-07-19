package edu.lehigh.nhi.multitouch.backend.database;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class UserManager {

    private final DatabaseManager mManager;
    private final PreparedStatement mSelectUserByUsernamePS, mInsertUserSimplePS, mInsertUserFullPS, mSelectPidByUidPS,
            mCheckProjectOwnershipPS;

    protected UserManager(DatabaseManager manager) throws SQLException {
        mManager = manager;
        Statements loader = Statements.getInstance();
        mSelectUserByUsernamePS = loader.user.selectUserByUsername;
        mInsertUserSimplePS = loader.user.insertUserSimple;
        mInsertUserFullPS = loader.user.insertUserFull;
        mSelectPidByUidPS = loader.user.selectPidByUid;
        mCheckProjectOwnershipPS = loader.user.checkProjectOwnership;
    }

    public boolean login(String username, String password) {
        // TODO: use hashed password
        // TODO: check error for non-existing user
        String actualPassword = null;
        try {
            mSelectUserByUsernamePS.setString(1, username);
            ResultSet rs = mSelectUserByUsernamePS.executeQuery();
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
        mSelectUserByUsernamePS.setString(1, username);
        ResultSet rs = mSelectUserByUsernamePS.executeQuery();
        rs.next();
        int retval = rs.getInt("id");
        rs.close();
        return retval;
    }

    public JSONObject userSettings(String username) throws JSONException, SQLException {
        mSelectUserByUsernamePS.setString(1, username);
        ResultSet rs = mSelectUserByUsernamePS.executeQuery();
        JSONObject retval = DatabaseManager.convertToJSONObject(rs);
        rs.close();
        return retval;
    }

    // Returns true if it was successful, returns false otherwise // Ask if the
    // email must be an edu email specifically from one of the partnering
    // universities
    public boolean signup(String username, String password, String email) throws SQLException {
        mInsertUserSimplePS.setString(1, username);
        mInsertUserSimplePS.setString(2, password);
        mInsertUserSimplePS.setString(3, email);
        mInsertUserSimplePS.executeUpdate();
        return login(username, password);
    }

    // Returns true if it was successful, returns false otherwise // Ask if the
    // email must be an edu email specifically from one of the partnering
    // universities
    public boolean signup(String username, String password, String email, String legalName, String institution)
            throws SQLException {
        mInsertUserFullPS.setString(1, username);
        mInsertUserFullPS.setString(2, password);
        mInsertUserFullPS.setString(3, legalName);
        mInsertUserFullPS.setString(4, email);
        // TODO:
        mInsertUserFullPS.setString(5, "TODO");
        mInsertUserFullPS.setString(6, institution);
        mInsertUserFullPS.executeUpdate();

        return login(username, password);
    }

    public List<Integer> getPidList(int uid) throws SQLException {
        mSelectPidByUidPS.setInt(1, uid);
        ResultSet rs = mSelectPidByUidPS.executeQuery();
        List<Integer> retval = new ArrayList<>();
        while (rs.next()) {
            retval.add(rs.getInt("pid"));
        }
        rs.close();
        return retval;
    }

    public boolean checkProjectOwnership(int uid) throws SQLException {
        mCheckProjectOwnershipPS.setInt(1, uid);
        ResultSet rs = mCheckProjectOwnershipPS.executeQuery();
        if(rs.next())
            return true;
        return false;
    }
}