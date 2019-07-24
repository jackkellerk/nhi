package edu.lehigh.nhi.multitouch.backend.database;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;

public class UserManager {
    @SuppressWarnings("unused")
    private final DatabaseManager mManager;
    private final Statements mStatements;
    private final PreparedStatement mSelectUserByUsernamePS, mInsertUserSimplePS, mInsertUserFullPS, mSelectPidByUidPS;

    protected UserManager(DatabaseManager manager) throws SQLException {
        mManager = manager;
        mStatements = Statements.getInstance();
        mSelectUserByUsernamePS = mStatements.user.selectUserByUsername;
        mInsertUserSimplePS = mStatements.user.insertUserSimple;
        mInsertUserFullPS = mStatements.user.insertUserFull;
        mSelectPidByUidPS = mStatements.user.selectPidByUid;
    }

    public String getPassword(String username) throws SQLException {
        // TODO: use hashed password
        String actualPassword = null;
        mSelectUserByUsernamePS.setString(1, username);
        ResultSet rs = mSelectUserByUsernamePS.executeQuery();
        if (rs.next())
            actualPassword = rs.getString("password");
        rs.close();
        return actualPassword;
    }

    public int getUidByUsername(String username) throws SQLException {
        mSelectUserByUsernamePS.setString(1, username);
        ResultSet rs = mSelectUserByUsernamePS.executeQuery();
        int retval = -1;
        if (rs.next())
            retval = rs.getInt("id");
        rs.close();
        return retval;
    }

    public JSONObject userSettings(int uid) throws JSONException, SQLException {
        PreparedStatement statement = mStatements.user.selectUserByUid;
        statement.setInt(1, uid);
        ResultSet rs = statement.executeQuery();
        JSONObject retval = DatabaseManager.convertToJSONObject(rs);
        rs.close();
        return retval;
    }

    // Returns user info
    public int insertUser(String username, String password, String email) throws SQLException {
        mInsertUserSimplePS.setString(1, username);
        mInsertUserSimplePS.setString(2, password);
        mInsertUserSimplePS.setString(3, email);
        return mInsertUserSimplePS.executeUpdate();
    }

    // Returns user info
    public int insertUser(String username, String password, String email, String legalName, String institution)
            throws SQLException {
        mInsertUserFullPS.setString(1, username);
        mInsertUserFullPS.setString(2, password);
        mInsertUserFullPS.setString(3, legalName);
        mInsertUserFullPS.setString(4, email);
        // TODO:
        mInsertUserFullPS.setString(5, "TODO");
        mInsertUserFullPS.setString(6, institution);
        mInsertUserFullPS.executeUpdate();
        return mInsertUserFullPS.executeUpdate();
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
}