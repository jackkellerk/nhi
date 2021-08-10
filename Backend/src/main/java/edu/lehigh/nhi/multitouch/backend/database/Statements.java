package edu.lehigh.nhi.multitouch.backend.database;

import java.sql.PreparedStatement;
import java.sql.SQLException;

class Statements {
    protected final MySQLConnection mMySQLConnection;
    protected Common common;
    protected Project project;
    protected Window window;
    protected User user;
    protected Source source;
    protected UPRelationship uprelationship;
    protected PWRelationship pwrelationship;
    protected ProjectSource projectSource;
    protected Line line;
    protected Scripts scripts;

    protected class Common {
        protected final PreparedStatement selectLastInsertion, checkProjectOwnership, getPidByWid;

        private Common() throws SQLException {
            selectLastInsertion = mMySQLConnection.prepareStatement("select last_insert_id()");
            checkProjectOwnership = mMySQLConnection
                    .prepareStatement("select uid from user_project where uid = ? and pid = ?");
            getPidByWid = mMySQLConnection.prepareStatement("select pid from window_t where wid = ?");
        }
    }

    protected class Project {
        protected final PreparedStatement selectProjectByPid, insertProject, selectProjectsByUid, updateProjectByPid, 
                deleteProjectByPid;

        private Project() throws SQLException {
            selectProjectByPid = mMySQLConnection.prepareStatement("select * from project_t where pid = ?");
            insertProject = mMySQLConnection.prepareStatement(
                    "insert into project_t(name, date_creation, canvas_width, canvas_height, properties, institution) values(?, ?, ?, ?, ?, ?)");
            selectProjectsByUid = mMySQLConnection
                    .prepareStatement("select * from user_project natural join project_t where uid = ?");
            updateProjectByPid = mMySQLConnection.prepareStatement(
                ("update project_t set name = ?, thumbnail = ?, canvas_width = ?, canvas_height = ?, properties = ?, institution = ? where pid = ?"));
            deleteProjectByPid = mMySQLConnection.prepareStatement("delete from project_t where pid = ?");       
                
        }
    }

    protected class Window {
        protected final PreparedStatement selectWindowsByPid, selectWindowByWid, createWindow, updateWindowPosition,
                updateImagePosition, updateMinimized, updateTools, deleteWindowByWid;

        private Window() throws SQLException {
            selectWindowByWid = mMySQLConnection.prepareStatement("select * from window_t where wid = ?");
            createWindow = mMySQLConnection
                    .prepareStatement("insert into window_t(thumbnail, iid, img_pos_x, img_pos_y, img_width, img_height, "
                            + "pid, canvas_pos_x, canvas_pos_y, canvas_width, canvas_height, date_creation, minimized, spectrum_color)"
                            + "values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            selectWindowsByPid = mMySQLConnection.prepareStatement("select * from window_t where pid = ?");
            updateWindowPosition = mMySQLConnection.prepareStatement(
                    ("update window_t set canvas_pos_x = ?, canvas_pos_y = ?, canvas_width = ?, canvas_height = ? where wid = ?"));
            updateImagePosition = mMySQLConnection.prepareStatement(
                    ("update window_t set img_pos_x = ?, img_pos_y = ?, img_width = ?, img_height = ? where wid = ?"));
            updateMinimized = mMySQLConnection.prepareStatement(("update window_t set minimized = ? where wid = ?"));
            updateTools = mMySQLConnection.prepareStatement(("update window_t set spectrum_color = ? where wid = ?"));
            deleteWindowByWid = mMySQLConnection.prepareStatement("delete from window_t where wid = ?");       

        }
    }

    protected class Line {
        protected final PreparedStatement insertLine, deleteLine, selectLineByWid, selectLineByLidWid, updateLine;
        
        private Line() throws SQLException{
            insertLine = mMySQLConnection.prepareStatement("insert into line_t (lid, wid, x1, y1, x2, y2) values (?, ?, ?, ?, ?, ?)");
            deleteLine = mMySQLConnection.prepareStatement("delete from line_t where lid = ? and wid = ?");
            selectLineByWid = mMySQLConnection.prepareStatement("select * from line_t where wid = ?");
            selectLineByLidWid = mMySQLConnection.prepareStatement("select * from line_t where lid = ? and wid = ?");
            updateLine = mMySQLConnection.prepareStatement("update line_t set x1 = ?, y1 = ?, x2 = ?, y2 = ? where wid = ? and lid = ?");
        }
    }

    protected class User {
        protected final PreparedStatement selectUserByUsername,  selectUserByEmail, selectUserByUid, insertUserSimple, insertUserFull,
                selectPidByUid, updateUserSettings;

        private User() throws SQLException {
            selectUserByUsername = mMySQLConnection.prepareStatement("select * from users where username = ?");
            selectUserByEmail = mMySQLConnection.prepareStatement("select * from users where email = ?");
            selectUserByUid = mMySQLConnection.prepareStatement("select * from users where id = ?");
            insertUserSimple = mMySQLConnection
                    .prepareStatement("INSERT INTO users (username, password, email) VALUES (?, ?, ?)");
            insertUserFull = mMySQLConnection.prepareStatement(
                    "INSERT INTO users (username, password, legalname, email, profilepicture, institution) VALUES (?, ?, ?,?,?,?)");
            selectPidByUid = mMySQLConnection.prepareStatement("select pid from user_project where uid = ?");
            updateUserSettings = mMySQLConnection.prepareStatement("update users set username = ?, password = ?, legalname = ?, email = ?, profilepicture = ?, institution = ? where id = ?");
        }
    }

    protected class Scripts {
        protected final PreparedStatement  selectScripts;

        private Scripts() throws SQLException {
            selectScripts = mMySQLConnection.prepareStatement("select * from scripts");
        }
    }

    // put request to institution/source/object/image table here.
    protected class Source {
        protected final PreparedStatement selectObjectListBySid, selectHitBoxesByOid, selectImageByIid,
                selectObjectByOid, selectSourceBySid, selectSourceListBySid, insertImagePath, selectImagesByProject;

        private Source() throws SQLException{
            selectObjectListBySid = mMySQLConnection.prepareStatement("select * from object where sid = ?");
            selectHitBoxesByOid = mMySQLConnection.prepareStatement("select * from object_hit_box where oid = ?");
            selectImageByIid = mMySQLConnection.prepareStatement("select * from images_table where image_id = ?");
            selectObjectByOid = mMySQLConnection.prepareStatement("select * from object where oid = ?");
            selectSourceBySid = mMySQLConnection.prepareStatement("select * from source_t where sid = ?");
            selectSourceListBySid = mMySQLConnection.prepareStatement("select * from source_t");
            insertImagePath = mMySQLConnection.prepareStatement("insert into images_table (time_created, file_path, project_id) values (?, ?,?)");
            selectImagesByProject = mMySQLConnection.prepareStatement("select * from images_table where project_id = ?");
        }
    }

    protected class UPRelationship {
        protected final PreparedStatement insertRelationship, deleteRelationship, selectRelationshipByPid, selectRelationshipByUidPid;

        private UPRelationship() throws SQLException{
            insertRelationship = mMySQLConnection.prepareStatement("insert into user_project (uid, pid) values (?, ?)");
            deleteRelationship = mMySQLConnection.prepareStatement("delete from user_project where uid = ? and pid = ?");
            selectRelationshipByPid = mMySQLConnection.prepareStatement("select * from user_project where pid = ?");
            selectRelationshipByUidPid = mMySQLConnection.prepareStatement("select * from user_project where uid = ? and pid = ?");

        }
    }
    
    protected class PWRelationship {
        protected final PreparedStatement insertRelationship, deleteRelationship, selectRelationshipByWid, selectRelationshipByPidWid;
        
        private PWRelationship() throws SQLException{
            insertRelationship = mMySQLConnection.prepareStatement("insert into project_window (pid, wid) values (?, ?)");
            deleteRelationship = mMySQLConnection.prepareStatement("delete from project_window where pid = ? and wid = ?");
            selectRelationshipByWid = mMySQLConnection.prepareStatement("select * from project_window where wid = ?");
            selectRelationshipByPidWid = mMySQLConnection.prepareStatement("select * from project_window where pid = ? and wid = ?");
            
        }
    }

    protected class ProjectSource {
        protected final PreparedStatement insertProjectSource;

        private ProjectSource() throws SQLException{
            insertProjectSource = mMySQLConnection.prepareStatement("insert into project_source (pid, sid) values (?, ?)");
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
        source = new Source();
        uprelationship = new UPRelationship();
        pwrelationship = new PWRelationship();
        projectSource = new ProjectSource();
        scripts = new Scripts();
    }

    protected synchronized static Statements getInstance() throws SQLException {
        if (INSTANCE == null) {
            INSTANCE = new Statements();
        }
        return INSTANCE;
    }

}