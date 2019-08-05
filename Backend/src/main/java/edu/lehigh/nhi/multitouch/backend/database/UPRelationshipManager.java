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
    private final PreparedStatement mInsertRelationshipPS, mDeleteRelationshipPS;

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
    }

    public int createRelationship(int uid, int pid) throws SQLException {
        mInsertRelationshipPS.setFloat(1, uid);
        mInsertRelationshipPS.setFloat(2, pid);
        return mInsertRelationshipPS.executeUpdate();
    }

    public int deleteRelationship(int uid, int pid) throws SQLException {
        mDeleteRelationshipPS.setFloat(1, uid);
        mDeleteRelationshipPS.setFloat(2, pid);
        return mDeleteRelationshipPS.executeUpdate();
    }
}