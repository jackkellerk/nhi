package edu.lehigh.nhi.multitouch.backend.database;

import com.google.gson.Gson;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Manage user_project table in the database. 
 */
public class PWRelationshipManager {

    private final Gson gson;
    private final Statements mStatements;
    private final DatabaseManager mManager;
    private final PreparedStatement mInsertRelationshipPS, mDeleteRelationshipPS, mSelectRelationshipPs;

    /** Project structure class being traslated into Json by Gson. */
    @SuppressWarnings("unused")
    private class PWRelationship {
        int pid;
        int wid;
    }

    protected PWRelationshipManager(DatabaseManager manager) throws SQLException {
        gson = new Gson();
        mStatements = Statements.getInstance();
        mManager = manager;
        mInsertRelationshipPS = mStatements.pwrelationship.insertRelationship;
        mDeleteRelationshipPS = mStatements.pwrelationship.deleteRelationship;
        mSelectRelationshipPs = mStatements.pwrelationship.selectRelationshipByPidWid;
    }

    public int createRelationship(int pid, int wid) throws SQLException {
        mInsertRelationshipPS.setFloat(1, pid);
        mInsertRelationshipPS.setFloat(2, wid);
        return mInsertRelationshipPS.executeUpdate();
    }

    public boolean relationshipExist(int pid, int wid) throws SQLException {
        mSelectRelationshipPs.setInt(1, pid);
        mSelectRelationshipPs.setInt(2, wid);
        ResultSet rs = mSelectRelationshipPs.executeQuery();
        if (rs.next()){
            return true;
        }
        return false;
    }


    public int deleteRelationship(int pid, int wid) throws SQLException {
        mDeleteRelationshipPS.setFloat(1, pid);
        mDeleteRelationshipPS.setFloat(2, wid);
        return mDeleteRelationshipPS.executeUpdate();
    }
}