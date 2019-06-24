// To access phpMyAdmin (Web Client for MySQL Server) goto: https://remotemysql.com/phpmyadmin/index.php (username: 1Iz28Ynucw and password: nUAiAivff5)

// Locate to the directory of the mysql-connector.jar and the MySQLConnectionTest java file
// Then run this command to compile the code: 'javac -cp .;mysql-connector.jar MySQLConnectionTest.java'
// Then run this command to run this code: 'java -cp .;mysql-connector.jar MySQLConnection'
import java.sql.*;

// Something like this needs to be constantly running in the backend to wait for a response from the user in order to query
public class MySQLConnectionTest
{   
    // Information of the SQL Server
    private static String SQL_url = "jdbc:mysql://remotemysql.com:3306/1Iz28Ynucw";
    private static String SQL_username = "1Iz28Ynucw";
    private static String SQL_password = "nUAiAivff5";

    public static void main(String[] args)
    {
        System.out.println("Loading driver...");

        try 
        {
            Class.forName("com.mysql.cj.jdbc.Driver");
            System.out.println("Driver loaded!");
        } 
        catch (ClassNotFoundException e) 
        {
            throw new IllegalStateException("Cannot find the driver in the classpath!", e);
        }

        System.out.println(login("admin", "password"));

    }

    public static boolean login(String username, String password)
    {
        String actualPassword = null;

        try (Connection connection = DriverManager.getConnection(SQL_url, SQL_username, SQL_password)) 
        {
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT password FROM `users` WHERE username = '" + username + "'");
            while(rs.next())
            {
                actualPassword = rs.getString("password");
            }
            rs.close();
            stmt.close();
            connection.close();
        } 
        catch (SQLException e) 
        {
            return false;
        }

        if(actualPassword.equals(password))
        {
            return true;
        }

        return false;
    }
}
