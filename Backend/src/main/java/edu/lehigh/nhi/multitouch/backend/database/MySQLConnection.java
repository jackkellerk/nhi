package edu.lehigh.nhi.multitouch.backend.database;

import java.sql.*;
import org.apache.commons.dbcp2.BasicDataSource;

import edu.lehigh.nhi.multitouch.backend.App;

/**
 * Singleton class wraps the SQL Connection class to prevent a) multiple
 * connections b) the usage of unsafe queries.
 */
public class MySQLConnection {

    // Information of the SQL Server
    private static final String SQL_URL = "jdbc:mysql://nhitest.lehigh.edu:3306/nhi";
    private static final String SQL_USERNAME = "remoteConnect";
    private static final String SQL_PASSWORD = "password";
    private static final String NHITEST_SQL_URL = "jdbc:mariadb://127.0.0.1:3306/nhi";
    private static final String NHITEST_SQL_USERNAME = "root";
    private static MySQLConnection INSTANCE = null;
    private Connection mConnection;
    private static BasicDataSource bds = null;
    private static final int CONN_POOL_SIZE = 5;

    private MySQLConnection() throws SQLException {
        if(App.isTestingMode){
            bds = new BasicDataSource();
                bds.setDriverClassName("org.mariadb.jdbc.Driver");
                bds.setUrl(SQL_URL);
                bds.setUsername(SQL_USERNAME);
                bds.setPassword(SQL_PASSWORD);
                bds.setInitialSize(CONN_POOL_SIZE);
                bds.setValidationQuery("select 1 ");
                bds.setTestWhileIdle(true);
                bds.setTestOnBorrow(true);
                mConnection = bds.getConnection();
            //mConnection = DriverManager.getConnection(SQL_URL, SQL_USERNAME, SQL_PASSWORD);
        }else{
            try {
                bds = new BasicDataSource();
                bds.setDriverClassName("org.mariadb.jdbc.Driver");
                bds.setUrl(NHITEST_SQL_URL);
                bds.setUsername(NHITEST_SQL_USERNAME);
                bds.setPassword(App.NHITEST_SQL_PASSWORD);
                bds.setInitialSize(CONN_POOL_SIZE);
                bds.setValidationQuery("select 1 ");
                bds.setTestWhileIdle(true);
                bds.setTestOnBorrow(true);
                mConnection = bds.getConnection();
            }catch(Exception e){
                e.printStackTrace();
            }
        }
    }

    /** Get the unique connection, or create if not created. */
    protected synchronized static MySQLConnection getInstance() throws SQLException {
        if (INSTANCE == null) {
            INSTANCE = new MySQLConnection();
        }
        return INSTANCE;
    }

    /**
     * Same as prepareStatement method from sql.Connection.
     * 
     * @param sql
     * @throws SQLException
     */
    protected synchronized PreparedStatement prepareStatement(String sql) throws SQLException {
        return mConnection.prepareStatement(sql);
    }
}