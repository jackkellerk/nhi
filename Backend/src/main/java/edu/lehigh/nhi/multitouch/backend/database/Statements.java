package edu.lehigh.nhi.multitouch.backend.database;

import java.sql.PreparedStatement;
import java.sql.SQLException;

class Statements {
    protected final MySQLConnection mMySQLConnection;
    protected Common common;
    protected Project project;
    protected Window window;
    protected User user;

    protected class Common {
        protected final PreparedStatement selectLastInsertion;

        private Common() throws SQLException {
            selectLastInsertion = mMySQLConnection.prepareStatement("select last_insert_id()");
        }
    }

    protected class Project {
        protected final PreparedStatement selectProjectByPid, insertProject, selectProjectsByUid;

        private Project() throws SQLException {
            selectProjectByPid = mMySQLConnection.prepareStatement("select * from project_t natural join user_project where pid = ? and uid = ?");
            insertProject = mMySQLConnection.prepareStatement(
                    "insert into project_t(name, date_creation, canvas_width, canvas_height) values(?, ?, ?, ?)");
            selectProjectsByUid = mMySQLConnection.prepareStatement("select * from user_project natural join project_t where uid = ?");
        }
    }

    protected class Window {
        protected final PreparedStatement selectWindowByPid, selectWindowByWid, insertWindow, updateWindowPosition;

        private Window() throws SQLException {
            selectWindowByWid = mMySQLConnection.prepareStatement("select * from window_t where wid = ?");
            insertWindow = mMySQLConnection
                    .prepareStatement("insert into window_t(iid, pid, img_pos_x, img_pos_y, img_width, img_height, "
                            + "canvas_pos_x, canvas_pos_y, canvas_width, canvas_height, date_creation)"
                            + "values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            selectWindowByPid = mMySQLConnection.prepareStatement("select * from window_t where pid = ?");
            updateWindowPosition = mMySQLConnection.prepareStatement(
                    ("update window_t set canvas_pos_x = ?, canvas_pos_y = ?, canvas_width = ?, canvas_height = ? where wid = ?"));
        }
    }

    protected class User {
        protected final PreparedStatement selectUserByUsername, insertUserSimple, insertUserFull, selectPidByUid,
                checkProjectOwnership;

        private User() throws SQLException {
            selectUserByUsername = mMySQLConnection.prepareStatement("select * from users where username = ?");
            insertUserSimple = mMySQLConnection
                    .prepareStatement("INSERT INTO users (username, password, email) VALUES (?, ?, ?)");
            insertUserFull = mMySQLConnection.prepareStatement(
                    "INSERT INTO users (username, password, legalname, email, profilepicture, institution) VALUES (?, ?, ?,?,?,?)");
            selectPidByUid = mMySQLConnection.prepareStatement("select pid from user_project where uid = ?");
            checkProjectOwnership = mMySQLConnection
                    .prepareStatement("select uid from user_project where uid = ? and pid = ?");
        }
    }

    private static Statements INSTANCE;

    private Statements() throws SQLException {
        mMySQLConnection = MySQLConnection.getInstance();

        // load prepared statements
        common = new Common();
        project = new Project();
        user = new User();
        window = new Window();
    }

    protected synchronized static Statements getInstance() throws SQLException {
        if (INSTANCE == null) {
            INSTANCE = new Statements();
        }
        return INSTANCE;
    }

}