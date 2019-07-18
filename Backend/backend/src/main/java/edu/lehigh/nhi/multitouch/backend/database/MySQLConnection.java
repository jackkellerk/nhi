package edu.lehigh.nhi.multitouch.backend.database;

import java.sql.*;

/**
 * Singleton class wraps the SQL Connection class to prevent a) multiple
 * connections b) the usage of unsafe queries.
 */
public class MySQLConnection {

    // Information of the SQL Server
    private static final String SQL_URL = "jdbc:mysql://remotemysql.com:3306/1Iz28Ynucw";
    private static final String SQL_USERNAME = "1Iz28Ynucw";
    private static final String SQL_PASSWORD = "nUAiAivff5";
    private static MySQLConnection INSTANCE = null;
    private Connection mConnection;

    private MySQLConnection() throws SQLException {
        mConnection = DriverManager.getConnection(SQL_URL, SQL_USERNAME, SQL_PASSWORD);
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