package edu.lehigh.nhi.multitouch.backend.database;

import com.google.gson.Gson;

import java.sql.PreparedStatement;
import java.sql.SQLException;

public class ProjectSourceManager {

    private final Gson mGson;
    private final DatabaseManager mManager;
    private final Statements mStatements;
    private final PreparedStatement mInsertProjectSourcePS;

    /** Window structure class being traslated into Json by Gson. */
    @SuppressWarnings("unused")
    private class ProjectSource {
        int pid;
        int sid;

        ProjectSource() {

        }

        ProjectSource(int pid, int sid) {
            this.pid = pid;
            this.sid = sid;
        }
    }

    protected ProjectSourceManager(DatabaseManager manager) throws SQLException {
        mManager = manager;
        mGson = new Gson();
        mStatements = Statements.getInstance();
        mInsertProjectSourcePS = mStatements.projectSource.insertProjectSource;
    }

    public int insertProjectSource(int pid, int sid) throws SQLException {
        ProjectSource projectSource = new ProjectSource();
        projectSource.pid = pid;
        projectSource.sid = sid;

        this.mInsertProjectSourcePS.setInt(1, pid);
        this.mInsertProjectSourcePS.setInt(2, sid);
        return mInsertProjectSourcePS.executeUpdate();
    }

}
