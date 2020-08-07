package edu.lehigh.nhi.multitouch.backend.database;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;

import org.apache.commons.io.FileUtils;

import org.json.JSONArray;
import org.json.JSONObject;

public class SourceManager {
    @SuppressWarnings("unused")
    private final DatabaseManager mManager;
    private final Statements mStatements;
    Date date_creation;

    protected SourceManager(final DatabaseManager manager) throws SQLException {
        mManager = manager;
        mStatements = Statements.getInstance();
    }

    public JSONArray getObjectList(final int sid) throws SQLException {
        final PreparedStatement ps = mStatements.source.selectObjectListBySid;
        ps.setInt(1, sid);
        final ResultSet rs = ps.executeQuery();
        final JSONArray retval = DatabaseManager.convertToJSONArray(rs);
        rs.close();
        return retval;
    }

    public JSONObject getSimpleObject(final int oid) throws SQLException {
        final PreparedStatement ps = mStatements.source.selectObjectByOid;
        ps.setInt(1, oid);
        final ResultSet rs = ps.executeQuery();
        final JSONObject retval = DatabaseManager.convertToJSONObject(rs);
        rs.close();
        return retval;
    }

    public JSONObject insertProjectImagePaths(final String source) throws SQLException {
        final PreparedStatement ps = mStatements.source.insertImagePath;
        ps.setTimestamp(1, new Timestamp(System.currentTimeMillis()));
        ps.setString(2, source);
        final ResultSet rs = ps.executeQuery();
        final JSONObject retval = DatabaseManager.convertToJSONObject(rs);
        rs.close();
        return retval;
    }

    public static void copyFile(String source, String dest) throws IOException {
        Path src = Paths.get(source); 
        Path destination = Paths.get(dest); 
        Files.copy(src, destination, StandardCopyOption.REPLACE_EXISTING);    
    }

    public JSONObject getDetailedObject(final int oid) throws SQLException {
        final JSONObject retval = getSimpleObject(oid);
        final JSONArray hitBoxList = getHitboxesByOid(oid);
        for (int i = 0; i < hitBoxList.length(); i++) {
            final JSONObject hitBox = hitBoxList.getJSONObject(i);
            final int iid = hitBox.getInt("iid");
            hitBox.put("image", getImageByIid(iid));
        }
        retval.put("hit_box_list", hitBoxList);
        return retval;
    }

    public JSONArray getHitboxesByOid(final int oid) throws SQLException {
        final PreparedStatement ps = mStatements.source.selectHitBoxesByOid;
        ps.setInt(1, oid);
        final ResultSet rs = ps.executeQuery();
        final JSONArray retval = DatabaseManager.convertToJSONArray(rs);
        rs.close();
        return retval;
    }

    public JSONObject getImageByIid(final int iid) throws SQLException {
        final PreparedStatement ps = mStatements.source.selectImageByIid;
        ps.setInt(1, iid);
        final ResultSet rs = ps.executeQuery();
        final JSONObject retval = DatabaseManager.convertToJSONObject(rs);
        rs.close();
        return retval;
    }
    
    
    public JSONObject getSourceBySid(final int sid) throws SQLException {
        final PreparedStatement ps = mStatements.source.selectSourceBySid;
        ps.setInt(1, sid);
        final ResultSet rs = ps.executeQuery();
        final JSONObject retval = DatabaseManager.convertToJSONObject(rs);
        rs.close();
        return retval;
    }
    
    public JSONArray getSourceList() throws  SQLException {
        final PreparedStatement ps = mStatements.source.selectSourceListBySid;
        final ResultSet rs = ps.executeQuery();
        final JSONArray retval = DatabaseManager.convertToJSONArray(rs);
        rs.close();
        return retval;
    }

    public Timestamp convertDateToTimestamp(final Date date) {
        return new Timestamp(date.getTime());
    }

}
