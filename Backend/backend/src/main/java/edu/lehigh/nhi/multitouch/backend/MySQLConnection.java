package edu.lehigh.nhi.multitouch.backend;

import java.sql.*;

class MySQLConnection {
    // Information of the SQL Server
    private static final String SQL_url = "jdbc:mysql://remotemysql.com:3306/1Iz28Ynucw";
    private static final String SQL_username = "1Iz28Ynucw";
    private static final String SQL_password = "nUAiAivff5";
    private static MySQLConnection CONNECTION_INSTANCE = null;
    private Connection connection;

    private MySQLConnection() {
        try {
            connection = DriverManager.getConnection(SQL_url, SQL_username, SQL_password);
        } catch (SQLException e) {
            System.err.println("Connection error occured.");
        }
    }

    public synchronized static MySQLConnection getConnection() {
        if (CONNECTION_INSTANCE == null) {
            CONNECTION_INSTANCE = new MySQLConnection();
        }
        return CONNECTION_INSTANCE;
    }

    public static void main(String[] args) {
        MySQLConnection connection = MySQLConnection.getConnection();
        System.out.println(connection.login("admin", "password"));

    }

    public boolean login(String username, String password) {
        String actualPassword = null;
        try {
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT password FROM `users` WHERE username = '" + username + "'");
            while (rs.next()) {
                actualPassword = rs.getString("password");
            }
            rs.close();
            stmt.close();
            connection.close();
        } catch (SQLException e) {
            System.err.println("Login error occured.");
            return false;
        }

        if (actualPassword.equals(password)) {
            return true;
        }

        return false;
    }
}