package edu.lehigh.nhi.multitouch.backend.database;

import java.sql.*;

public class MySQLConnection {
    /**
     *
     */

    private static final String CONNECTION_ERROR_OCCURED = "Connection error occured.";
    // Information of the SQL Server
    private static final String SQL_url = "jdbc:mysql://remotemysql.com:3306/1Iz28Ynucw";
    private static final String SQL_username = "1Iz28Ynucw";
    private static final String SQL_password = "nUAiAivff5";
    private static MySQLConnection CONNECTION_INSTANCE = null;
    Connection connection;

    public final User user;
    public final Project project;

    private MySQLConnection() {
        try {
            connection = DriverManager.getConnection(SQL_url, SQL_username, SQL_password);
        } catch (SQLException e) {
            System.err.println(CONNECTION_ERROR_OCCURED);
        }
        user = new User(this);
        project = new Project(this);
    }

    public synchronized static MySQLConnection getConnection() {
        if (CONNECTION_INSTANCE == null) {
            CONNECTION_INSTANCE = new MySQLConnection();
        }
        return CONNECTION_INSTANCE;
    }
}