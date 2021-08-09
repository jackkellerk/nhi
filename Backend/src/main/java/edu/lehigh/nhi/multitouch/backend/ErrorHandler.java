package edu.lehigh.nhi.multitouch.backend;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;

import com.opencsv.CSVReader;

/** Handle common Exceptions/Errors. */
public class ErrorHandler {

    // TODO: Create/paste error code used here. Make the name specific. This would
    // be a great reference.

    public static final class UNKOWN {
        public static final int UNSPECIFIED_ERROR = 100, SQL_ERROR_UNKOWN = 101, INSERTION_NO_UPDATE_UNKNOWN = 102,
                FAILED_TO_FETCH_DATA_UNKNOWN = 103;
    }

    public static final class INVALID_JSON {
        public static final int INVALID_JSON = 200, INVALID_JSON_FROM_REQUEST = 201;
    }

    public static final class MISSING_FIELD_JSON {
        public static final int DEFAULT = 300, MISSING_FIELD_IN_SQUARE = 301;
    }

    public static final class HEADER {
        public static final int MISSING_HEADER = 401, MISSING_HEADER_FOR_SESSION_CHECK = 402, UID_NOT_INT = 403;
    }

    public static final class PATH {
        public static final int PATH_NUM_FORMAT = 501, MISSING_QUERY_PARAM = 502, PATH_STRING_FORMAT =503;
    }

    public static final class PRIVILAGE {
        public static final int INVALID_SESSION_KEY = 601, NO_RIGHT_TO_ACCESS_PROJECT = 602, LOGIN_FAILED = 603;
    }

    public static final class EXISTANSE {
        public static final int PROJECT_EXISTANCE = 701, IMAGE_FILE_EXISTANCE = 702, USER_EXISTANCE = 703, USER_PROJECT_EXISTANCE = 704;
    }

    public static final class IO{
        public static final int SERVING_IMAGE_FILE = 801;
    }

    // TODO: Create/paste your error code and massage to "error_message.csv" under
    // "backend/src/resources".
    private static final HashMap<Integer, String> MESSAGE_MAP = loadCSVFileToMap();

    public static String getMessage(int errno) {
        String message = MESSAGE_MAP.get(errno);
        if (message == null)
            System.err.println("Error: no message specified with errno = " + errno);
        return message;
    }

    // empty method for envoking this class, which would load the global variable
    // MESSAGE_MAP.
    public static void setup() {

    }

    private static HashMap<Integer, String> loadCSVFileToMap() {
        System.out.println("loading error table ...     ");
        ErrorHandler eh = new ErrorHandler();
        InputStream inputStream = eh.getClass().getClassLoader().getResourceAsStream("error_messages.csv");
        if (inputStream == null) {
            System.err.println("Fatal: cannot find resource: error_messages.csv" + "\n" + "Quiting..");
            System.exit(1);
        }

        try {
            CSVReader reader = new CSVReader(new InputStreamReader(inputStream));
            Iterator<String[]> iterator = reader.iterator();
            HashMap<Integer, String> map = new HashMap<>();
            while (iterator.hasNext()) {
                String[] pair = iterator.next();
                int key = Integer.parseInt(pair[0]);
                map.put(key, pair[1]);
                // System.out.println(key + ": " + pair[1]);
            }

            reader.close();
            System.out.println("Success.");
            return map;

        } catch (IOException e) {
            System.err.println("Error Ocurred while loading error messages.");
            e.printStackTrace();
            System.err.println("Quiting... ");
            System.exit(1);
        }
        return null;
    }

    // for a simple test
    public static void main(String args[]) throws IOException {
        Enumeration<URL> a = ErrorHandler.class.getClassLoader().getResources("resources");
        while (a.hasMoreElements()) {
            System.out.println(a.nextElement());
        }

    }

    private ErrorHandler() {
    }
}