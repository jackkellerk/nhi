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
import java.util.ArrayList;

import com.google.gson.Gson;

import org.apache.commons.io.FileUtils;

import org.json.JSONArray;
import org.json.JSONObject;

public class SourceManager {
    @SuppressWarnings("unused")
    private final DatabaseManager mManager;
    private final Statements mStatements;
    private final Gson gson;
    Date date_creation;
    

    /** Project structure class being traslated into Json by Gson. */
    @SuppressWarnings("unused")
    private class Image {
        int image_id;
        Date time_created;
        String file_path;
        String description;
        int project_id;
    }

    protected SourceManager(final DatabaseManager manager) throws SQLException {
        gson = new Gson();
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

    public JSONObject insertProjectImagePaths(final String source, final int projectId) throws SQLException {
        final PreparedStatement ps = mStatements.source.insertImagePath;
        ps.setTimestamp(1, new Timestamp(System.currentTimeMillis()));
        ps.setString(2, source);
        ps.setInt(3, projectId);
        final ResultSet rs = ps.executeQuery();
        final JSONObject retval = DatabaseManager.convertToJSONObject(rs);
        rs.close();
        return retval;
    }

    public JSONArray getImagesByProject( final int projectId) throws SQLException{
        // JSONArray jsonArray = new JSONArray(); 
        // //ArrayList<Integer> projectId = new ArrayList<Integer>();
        // final PreparedStatement ps = mStatements.source.selectImagesByProject;
        // ps.setInt(1, projectId);
        // final ResultSet rs = ps.executeQuery();
        // while(rs.next()){//Get one user's all of projects
        //     //int userId = rs.getInt("uid");
        //     jsonArray.put(rs);
        // }
        // rs.close();
        // return jsonArray;

        JSONArray jsonArray = new JSONArray(); 
        ArrayList<Integer> imageId = new ArrayList<Integer>();
        PreparedStatement statement = mStatements.source.selectImagesByProject;
        statement.setInt(1, projectId);
        ResultSet rs = statement.executeQuery();
        while(rs.next()){//Get one user's all of projects
            //int userId = rs.getInt("uid");
            int image_index = rs.getInt("image_id");
            imageId.add(image_index);
        }
        for(int i = 0; i < imageId.size(); ++i){
            jsonArray.put(getImage(imageId.get(i)));
        }
        rs.close();
        return jsonArray;
    }

    public JSONObject getImage(int pid) throws SQLException {
        mStatements.source.selectImageByIid.setInt(1, pid);
        ResultSet projectRS = mStatements.source.selectImageByIid.executeQuery();
        JSONObject retval = null;
        if (projectRS.next()) {
            Image image = new Image();
            image.image_id = projectRS.getInt("image_id");
            image.time_created = projectRS.getDate("time_created");
            image.file_path = projectRS.getString("file_path");
            image.description = projectRS.getString("description");
            image.project_id = projectRS.getInt("project_id");

            retval = new JSONObject(gson.toJson(image));
        }
        projectRS.close();
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
