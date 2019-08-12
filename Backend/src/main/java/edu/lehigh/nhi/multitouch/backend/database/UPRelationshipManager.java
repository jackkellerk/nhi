package edu.lehigh.nhi.multitouch.backend.database;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;

import com.google.gson.Gson;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * Manage user_project table in the database. 
 */
public class UPRelationshipManager {

    private final Gson gson;
    private final Statements mStatements;
    private final DatabaseManager mManager;
    private final PreparedStatement mInsertRelationshipPS, mDeleteRelationshipPS, mSelectRelationshipPs;

    /** Project structure class being traslated into Json by Gson. */
    @SuppressWarnings("unused")
    private class UPRelationship {
        int uid;        
        int pid;
    }

    protected UPRelationshipManager(DatabaseManager manager) throws SQLException {
        gson = new Gson();
        mStatements = Statements.getInstance();
        mManager = manager;
        mInsertRelationshipPS = mStatements.uprelationship.insertRelationship;
        mDeleteRelationshipPS = mStatements.uprelationship.deleteRelationship;
        mSelectRelationshipPs = mStatements.uprelationship.selectRelationshipByUidPid;
    }

    public int createRelationship(int uid, int pid) throws SQLException {
        mInsertRelationshipPS.setFloat(1, uid);
        mInsertRelationshipPS.setFloat(2, pid);
        return mInsertRelationshipPS.executeUpdate();
    }

    public int createRelationship(String email, int pid) throws SQLException {
        mStatements.user.selectUserByEmail.setString(1, email);
        ResultSet rs = mStatements.user.selectUserByEmail.executeQuery();
        int uid = -1;
        if (rs.next())
            uid = rs.getInt("id");

        mInsertRelationshipPS.setFloat(1, uid);
        mInsertRelationshipPS.setFloat(2, pid);
        return mInsertRelationshipPS.executeUpdate();
    }

    public boolean relationshipExist(int uid, int pid) throws SQLException {
        mSelectRelationshipPs.setInt(1, uid);
        mSelectRelationshipPs.setInt(2, pid);
        ResultSet rs = mSelectRelationshipPs.executeQuery();
        if (rs.next()){
            return true;
        }
        return false;
    }


    public int deleteRelationship(int uid, int pid) throws SQLException {
        mDeleteRelationshipPS.setFloat(1, uid);
        mDeleteRelationshipPS.setFloat(2, pid);
        return mDeleteRelationshipPS.executeUpdate();
    }
}