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
    private final PreparedStatement mSelectWindowByWidPS, mCreateWindowPS, mUpdateWindowPositionPS,
            mDeleteWindowByWidPS, mUpdateImagePositionPS, mUpdateMinimizedPS, mUpdateToolsPS;

    /** Window structure class being traslated into Json by Gson. */
    @SuppressWarnings("unused")
    private class Window {
        int wid;
        String thumbnail;
        int iid;
        Square image_box;
        int pid;
        Square window_box;
        Date date_creation;
        boolean minimized;
        int spectrum_color;


        Window() {

        }

        Window(int wid,  String thumbnail, int iid, Square image_box, int pid, Square window_box, Date date_creation, boolean minimized, int spectrum_color) {
            this.wid = wid;
            this.thumbnail = thumbnail;
            this.iid = iid;
            this.image_box = image_box;
            this.pid = pid;
            this.window_box = window_box;
            this.date_creation = date_creation;
            this.minimized = minimized;
            this.spectrum_color = spectrum_color;
        }
    }

    protected WindowManager(DatabaseManager manager) throws SQLException {
        mManager = manager;
        mGson = new Gson();
        mStatements = Statements.getInstance();
        mSelectWindowByWidPS = mStatements.window.selectWindowByWid;
        mCreateWindowPS = mStatements.window.createWindow;
        mUpdateWindowPositionPS = mStatements.window.updateWindowPosition;
        mUpdateImagePositionPS = mStatements.window.updateImagePosition;
        mUpdateMinimizedPS = mStatements.window.updateMinimized;
        mUpdateToolsPS = mStatements.window.updateTools;
        mDeleteWindowByWidPS = mStatements.window.deleteWindowByWid;
    }

    public JSONObject getWindow(int wid) throws JSONException, SQLException {
        mSelectWindowByWidPS.setInt(1, wid);
        ResultSet rs = mSelectWindowByWidPS.executeQuery();
        JSONObject retval = new JSONObject();
        if (rs.next()) {
            Window window = new Window(
                    rs.getInt("wid"),
                    rs.getString("thumbnail"),
                    rs.getInt("iid"),
                    new Square(rs.getFloat("img_pos_x"), rs.getFloat("img_pos_y"), rs.getFloat("img_width"), rs.getFloat("img_height")),
                    rs.getInt("pid"),
                    new Square(rs.getFloat("canvas_pos_x"), rs.getFloat("canvas_pos_y"), rs.getFloat("canvas_width"), rs.getFloat("canvas_height")),
                    rs.getDate("date_creation"),
                    rs.getBoolean("minimized"),
                    rs.getInt("spectrum_color")
            );
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

    public int updateMinimized(int wid, boolean minimized) throws SQLException {
        mUpdateMinimizedPS.setBoolean(1, minimized);
        mUpdateMinimizedPS.setInt(2, wid);
        int retval = mUpdateMinimizedPS.executeUpdate();
        mUpdateMinimizedPS.close();
        return retval;
    }
    
    public int updateTools(int wid, int spectrum_color) throws SQLException {
        mUpdateToolsPS.setInt(1, spectrum_color);
        mUpdateToolsPS.setInt(2, wid);
        int retval = mUpdateToolsPS.executeUpdate();
        mUpdateToolsPS.close();
        return retval;
    }

    /** TODO: createWindow with no parameters, only default values? Set default values of columns in database,
     ** and call this function when frontend's create window button is clicked, then update everything when "save and exit" */
    public int createWindow(int pid, int iid, Square image_box, Square window_box, boolean minimized) throws SQLException {
        Window window = new Window();
        window.pid = pid;
        window.iid = iid;
        window.image_box = image_box;
        window.window_box = window_box;

        // mCreateWindowPS = mMySQLConnection.prepareStatement("insert into
        // window_t(iid, pid, img_pos_x, img_pos_y,img_width, img_height, "+
        // "canvas_pos_x, canvas_pos_y, canvas_width, canvas_height, date_creation)" +
        // "values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        mCreateWindowPS.setString(1, "thumbnail: TODO");
        mCreateWindowPS.setInt(1, iid);
        mCreateWindowPS.setInt(2, pid);
        mCreateWindowPS.setFloat(3, image_box.pos_x);
        mCreateWindowPS.setFloat(4, image_box.pos_y);
        mCreateWindowPS.setFloat(5, image_box.width);
        mCreateWindowPS.setFloat(6, image_box.height);
        mCreateWindowPS.setFloat(7, window_box.pos_x);
        mCreateWindowPS.setFloat(8, window_box.pos_y);
        mCreateWindowPS.setFloat(9, window_box.width);
        mCreateWindowPS.setFloat(10, window_box.height);
        mCreateWindowPS.setTimestamp(11, DatabaseManager.convertDateToTimestamp(new Date()));
        mCreateWindowPS.setBoolean(12, minimized);
        return mCreateWindowPS.executeUpdate();
    }

    public int deleteWindow(int wid) throws JSONException, SQLException {
        mDeleteWindowByWidPS.setInt(1, wid);
        int retval = mDeleteWindowByWidPS.executeUpdate();
        mDeleteWindowByWidPS.close();
        return retval;
    }
}