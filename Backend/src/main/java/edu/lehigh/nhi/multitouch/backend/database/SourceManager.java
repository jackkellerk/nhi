package edu.lehigh.nhi.multitouch.backend.database;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class SourceManager {
    @SuppressWarnings("unused")
    private final DatabaseManager mManager;
    private final Statements mStatements;
    Date date_creation;

    protected SourceManager(DatabaseManager manager) throws SQLException {
        mManager = manager;
        mStatements = Statements.getInstance();
    }

    public JSONArray getObjectList(int sid) throws SQLException {
        PreparedStatement ps = mStatements.source.selectObjectListBySid;
        ps.setInt(1, sid);
        ResultSet rs = ps.executeQuery();
        JSONArray retval = DatabaseManager.convertToJSONArray(rs);
        rs.close();
        return retval;
    }

    public JSONObject getSimpleObject(int oid) throws SQLException {
        PreparedStatement ps = mStatements.source.selectObjectByOid;
        ps.setInt(1, oid);
        ResultSet rs = ps.executeQuery();
        JSONObject retval = DatabaseManager.convertToJSONObject(rs);
        rs.close();
        return retval;
    }

    public JSONObject insertProjectImagePaths(String source) throws SQLException {
        PreparedStatement ps = mStatements.source.insertImagePath;
        ps.setTimestamp(1, new Timestamp(System.currentTimeMillis()));
        ps.setString(2, source);
        ResultSet rs = ps.executeQuery();
        JSONObject retval = DatabaseManager.convertToJSONObject(rs);
        rs.close();
        return retval;
    }

    public JSONObject getDetailedObject(int oid) throws SQLException {
        JSONObject retval = getSimpleObject(oid);
        JSONArray hitBoxList = getHitboxesByOid(oid);
        for (int i = 0; i < hitBoxList.length(); i++) {
            JSONObject hitBox = hitBoxList.getJSONObject(i);
            int iid = hitBox.getInt("iid");
            hitBox.put("image", getImageByIid(iid));
        }
        retval.put("hit_box_list", hitBoxList);
        return retval;
    }

    public JSONArray getHitboxesByOid(int oid) throws SQLException {
        PreparedStatement ps = mStatements.source.selectHitBoxesByOid;
        ps.setInt(1, oid);
        ResultSet rs = ps.executeQuery();
        JSONArray retval = DatabaseManager.convertToJSONArray(rs);
        rs.close();
        return retval;
    }

    public JSONObject getImageByIid(int iid) throws SQLException {
        PreparedStatement ps = mStatements.source.selectImageByIid;
        ps.setInt(1, iid);
        ResultSet rs = ps.executeQuery();
        JSONObject retval = DatabaseManager.convertToJSONObject(rs);
        rs.close();
        return retval;
    }
    
    
    public JSONObject getSourceBySid(int sid) throws SQLException {
        PreparedStatement ps = mStatements.source.selectSourceBySid;
        ps.setInt(1, sid);
        ResultSet rs = ps.executeQuery();
        JSONObject retval = DatabaseManager.convertToJSONObject(rs);
        rs.close();
        return retval;
    }
    
    public JSONArray getSourceList() throws  SQLException {
        PreparedStatement ps = mStatements.source.selectSourceListBySid;
        ResultSet rs = ps.executeQuery();
        JSONArray retval = DatabaseManager.convertToJSONArray(rs);
        rs.close();
        return retval;
    }

    public Timestamp convertDateToTimestamp(Date date) {
        return new Timestamp(date.getTime());
    }

}
