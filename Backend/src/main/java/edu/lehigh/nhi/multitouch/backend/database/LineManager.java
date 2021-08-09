package edu.lehigh.nhi.multitouch.backend.database;

import com.google.gson.Gson;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class LineManager {

    private final Gson gson;
    private final Statements mStatements;
    private final DatabaseManager mManager;
    private final PreparedStatement mInsertLinePS, mDeleteLinePS, mSelectLinePs, mSelectAllLinePS, mUpdateLinePS;

    /** Project structure class being traslated into Json by Gson. */
    @SuppressWarnings("unused")
    private class Line {
        int lid;
        int wid;
        double x1;
        double y1;
        double x2;
        double y2;

        Line() {

        }

        Line(int lid, int wid, double x1, double y1, double x2, double y2) {
            this.lid = lid;
            this.wid = wid;
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 = y2;
        }
    }

    protected LineManager(DatabaseManager manager) throws SQLException {
        gson = new Gson();
        mStatements = Statements.getInstance();
        mManager = manager;
        mInsertLinePS = mStatements.line.insertLine;
        mDeleteLinePS = mStatements.line.deleteLine;
        mSelectLinePs = mStatements.line.selectLineByLidWid;
        mSelectAllLinePS = mStatements.line.selectLineByWid;
        mUpdateLinePS = mStatements.line.updateLine;
    }

    public int createLine(int lid, int wid, double x1, double y1, double x2, double y2) throws SQLException {
        mInsertLinePS.setFloat(1, lid);
        mInsertLinePS.setFloat(2, wid);
        mInsertLinePS.setDouble(3, x1);
        mInsertLinePS.setDouble(4, y1);
        mInsertLinePS.setDouble(5, x2);
        mInsertLinePS.setDouble(6, y2);
        return mInsertLinePS.executeUpdate();
    }

    public JSONObject getLine(int lid, int wid) throws JSONException, SQLException  {
        mSelectLinePs.setInt(1, lid); 
        mSelectLinePs.setInt(2, wid);
        ResultSet rs = mSelectLinePs.executeQuery();
        JSONObject retval = new JSONObject();
        if (rs.next()) {
            Line line = new Line(
                    rs.getInt("lid"),
                    rs.getInt("wid"),
                    rs.getDouble("x1"),
                    rs.getDouble("y1"),
                    rs.getDouble("x2"),
                    rs.getDouble("y2")
            );
            retval = new JSONObject(gson.toJson(line));
        }
        return retval;
    }

    public JSONArray getAllLines(int wid) throws JSONException, SQLException  {
        mSelectAllLinePS.setInt(1, wid);
        ResultSet rs = mSelectLinePs.executeQuery();
        ArrayList list = new ArrayList<Line>();
        JSONArray retval = new JSONArray();
        while (rs.next()) {
            Line line = new Line(
                    rs.getInt("lid"),
                    rs.getInt("wid"),
                    rs.getDouble("x1"),
                    rs.getDouble("y1"),
                    rs.getDouble("x2"),
                    rs.getDouble("y2")
            );
            list.add(line);
        }
        Line[] lines = (Line[]) list.toArray(new Line[list.size()]);
        retval = new JSONArray(gson.toJson(lines));
        return retval;
    }

    public int updateLine(int lid, int wid, double x1, double y1, double x2, double y2) throws SQLException {
        mUpdateLinePS.setFloat(1, lid);
        mUpdateLinePS.setFloat(2, wid);
        mUpdateLinePS.setDouble(3, x1);
        mUpdateLinePS.setDouble(4, y1);
        mUpdateLinePS.setDouble(5, x2);
        mUpdateLinePS.setDouble(6, y2);
        int retval = mUpdateLinePS.executeUpdate();
        mUpdateLinePS.close();
        return retval;
    }

    public int deleteLine(int lid, int wid) throws SQLException {
        mDeleteLinePS.setFloat(1, lid);
        mDeleteLinePS.setFloat(2, wid);
        return mDeleteLinePS.executeUpdate();
    }
}