package edu.lehigh.nhi.multitouch.backend.database;

import java.sql.PreparedStatement;
import java.sql.SQLException;

class StatementLoader {
    protected final MySQLConnection mMySQLConnection;
    
    // common
    protected final PreparedStatement mLastInsertionPS;

    // project
    protected final PreparedStatement mSelectAllProjects, mProjectByPidPS, mCreateProjectPS;

    // window
    protected final PreparedStatement mWindowByProjectPS, mWindowByWidPS, mCreateWindowPS, mUpdateWindowPosition;

    // user
    protected final PreparedStatement mSelectUserByUsername, mInsertUserSimple, mInsertUserFull;
    
    private static StatementLoader INSTANCE;

    private StatementLoader() throws SQLException {
        mMySQLConnection = MySQLConnection.getInstance();
   
        // load prepared statements
        /**
         * Common
         */
        mLastInsertionPS = mMySQLConnection.prepareStatement("select last_insert_id()");

        /**
         * PROJECT
         */
        mSelectAllProjects = mMySQLConnection.prepareStatement("select * from project_t");
        mProjectByPidPS = mMySQLConnection.prepareStatement("select * from project_t where pid = ?");
        mCreateProjectPS = mMySQLConnection.prepareStatement(
                "insert into project_t(name, date_creation, canvas_width, canvas_height) values(?, ?, ?, ?)");

        /**
         * WINDOW
         */
        mWindowByWidPS = mMySQLConnection.prepareStatement("select * from window_t where wid = ?");
        mCreateWindowPS = mMySQLConnection
                .prepareStatement("insert into window_t(iid, pid, img_pos_x, img_pos_y, img_width, img_height, "
                        + "canvas_pos_x, canvas_pos_y, canvas_width, canvas_height, date_creation)"
                        + "values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        mWindowByProjectPS = mMySQLConnection.prepareStatement("select * from window_t where pid = ?");
        mUpdateWindowPosition = mMySQLConnection.prepareStatement((
            "update window_t set canvas_pos_x = ?, canvas_pos_y = ?, canvas_width = ?, canvas_height = ? where wid = ?"));

        /**
         * USER
         */
        mSelectUserByUsername = mMySQLConnection.prepareStatement("select * from users where username = ?");
        mInsertUserSimple = mMySQLConnection
                .prepareStatement("INSERT INTO users (username, password, email) VALUES (?, ?, ?)");
        mInsertUserFull = mMySQLConnection.prepareStatement(
                "INSERT INTO users (username, password, legalname, email, profilepicture, institution) VALUES (?, ?, ?,?,?,?)");
    }

    protected synchronized static StatementLoader getInstance() throws SQLException {
        if (INSTANCE == null) {
            INSTANCE = new StatementLoader();
        }
        return INSTANCE;
    }

}