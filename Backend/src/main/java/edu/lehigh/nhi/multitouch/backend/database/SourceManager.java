package edu.lehigh.nhi.multitouch.backend.database;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class SourceManager {
    @SuppressWarnings("unused")
    private final DatabaseManager mManager;
    private final Statements mStatements;
    
    protected SourceManager(DatabaseManager manager) throws SQLException {
        mManager = manager;
        mStatements = Statements.getInstance();
    }

    public JSONArray getObjectList(int sid) throws SQLException {
        PreparedStatement ps = mStatements.source.selectObjectListBySid;
        ps.setInt(1, sid);
        ResultSet rs = ps.executeQuery();
        return DatabaseManager.convertToJSONArray(rs);
    }
}
