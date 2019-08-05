package edu.lehigh.nhi.multitouch.backend.database;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;

import com.google.gson.Gson;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Manage window related tables in the batabase. Such as looking up/ changing
 * the window_t table, or table/ tasks related to tools that are used inside
 * windows.
 */
public class WindowManager {

    private final Gson mGson;
    private final DatabaseManager mManager;
    private final Statements mStatements;
    private final PreparedStatement mSelectWindowByWidPS, mInsertWindowPS, mUpdateWindowPositionPS,
            mDeleteWindowByWidPS, mUpdateImagePositionPS;

    /** Window structure class being traslated into Json by Gson. */
    @SuppressWarnings("unused")
    private class Window {
        int wid;
        int iid;
        int pid;
        String thumbnail;
        Square image_box;
        Square window_box;
        Date date_creation;

        Window() {

        }

        Window(int wid, int iid, int pid, String thumbnail, Date date_creation, Square image_box, Square window_box) {
            this.wid = wid;
            this.iid = iid;
            this.pid = pid;
            this.thumbnail = thumbnail;
            this.image_box = image_box;
            this.window_box = window_box;
        }
    }

    protected WindowManager(DatabaseManager manager) throws SQLException {
        mManager = manager;
        mGson = new Gson();
        mStatements = Statements.getInstance();
        mSelectWindowByWidPS = mStatements.window.selectWindowByWid;
        mInsertWindowPS = mStatements.window.insertWindow;
        mUpdateWindowPositionPS = mStatements.window.updateWindowPosition;
        mUpdateImagePositionPS = mStatements.window.updateImagePosition;
        mDeleteWindowByWidPS = mStatements.window.deleteWindowByWid;
    }

    public JSONObject getWindow(int wid) throws JSONException, SQLException {
        mSelectWindowByWidPS.setInt(1, wid);
        ResultSet rs = mSelectWindowByWidPS.executeQuery();
        JSONObject retval = new JSONObject();
        if (rs.next()) {
            Window window = new Window(rs.getInt("wid"), rs.getInt("iid"), rs.getInt("pid"), rs.getString("thumbnail"),
                    rs.getDate("date_creation"),
                    new Square(rs.getFloat("img_pos_x"), rs.getFloat("img_pos_y"), rs.getFloat("img_width"),
                            rs.getFloat("img_height")),
                    new Square(rs.getFloat("canvas_pos_x"), rs.getFloat("canvas_pos_y"), rs.getFloat("canvas_width"),
                            rs.getFloat("canvas_height")));
            retval = new JSONObject(mGson.toJson(window));
        }
        return retval;
    }

    public int updateWindowPosition(int wid, float pos_x, float pos_y, float width, float height) throws SQLException {
        mUpdateWindowPositionPS.setFloat(1, pos_x);
        mUpdateWindowPositionPS.setFloat(2, pos_y);
        mUpdateWindowPositionPS.setFloat(3, width);
        mUpdateWindowPositionPS.setFloat(4, height);
        mUpdateWindowPositionPS.setInt(5, wid);
        int retval = mUpdateWindowPositionPS.executeUpdate();
        mUpdateWindowPositionPS.close();
        return retval;
    }

    public int updateImagePosition(int wid, float pos_x, float pos_y, float width, float height) throws SQLException {
        mUpdateImagePositionPS.setFloat(1, pos_x);
        mUpdateImagePositionPS.setFloat(2, pos_y);
        mUpdateImagePositionPS.setFloat(3, width);
        mUpdateImagePositionPS.setFloat(4, height);
        mUpdateImagePositionPS.setInt(5, wid);
        int retval = mUpdateImagePositionPS.executeUpdate();
        mUpdateImagePositionPS.close();
        return retval;
    }

    public int insertWindow(int pid, int iid, Square image_box, Square window_box) throws SQLException {
        Window window = new Window();
        window.pid = pid;
        window.iid = iid;
        window.image_box = image_box;
        window.window_box = window_box;

        // mCreateWindowPS = mMySQLConnection.prepareStatement("insert into
        // window_t(iid, pid, img_pos_x, img_pos_y,img_width, img_height, "+
        // "canvas_pos_x, canvas_pos_y, canvas_width, canvas_height, date_creation)" +
        // "values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        mInsertWindowPS.setInt(1, iid);
        mInsertWindowPS.setInt(2, pid);
        mInsertWindowPS.setFloat(3, image_box.pos_x);
        mInsertWindowPS.setFloat(4, image_box.pos_y);
        mInsertWindowPS.setFloat(5, image_box.width);
        mInsertWindowPS.setFloat(6, image_box.height);
        mInsertWindowPS.setFloat(7, window_box.pos_x);
        mInsertWindowPS.setFloat(8, window_box.pos_y);
        mInsertWindowPS.setFloat(9, window_box.width);
        mInsertWindowPS.setFloat(10, window_box.height);
        mInsertWindowPS.setTimestamp(11, DatabaseManager.convertDateToTimestamp(new Date()));
        return mInsertWindowPS.executeUpdate();
    }

    public int deleteWindow(int wid) throws JSONException, SQLException {
        mDeleteWindowByWidPS.setInt(1, wid);
        int retval = mDeleteWindowByWidPS.executeUpdate();
        mDeleteWindowByWidPS.close();
        return retval;
    }
}