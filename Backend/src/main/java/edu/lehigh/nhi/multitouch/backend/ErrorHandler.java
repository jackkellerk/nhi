package edu.lehigh.nhi.multitouch.backend;

import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;

import com.opencsv.CSVReader;

/** Handle common Exceptions/Errors. */
public class ErrorHandler {

    // TODO: Create/paste error code used here. Make the name specific. This would
    // be a great reference.
    public static final int UNSPECIFIED_ERROR = 100;
    public static final int INVALID_JSON = 200, INVALID_JSON_FROM_REQUEST = 201;
    public static final int MISSING_FIELD = 300, MISSING_FIELD_IN_SQUARE = 301, MISSING_FIELD_IMAGE_BOX = 302,
            MISSING_FIELD_WINDOW_BOX = 303;

    // TODO: Create/paste your error code and massage to "error_message.csv" under
    // "backend/src/resources".
    private static final HashMap<Integer, String> MESSAGE_MAP = loadCSVFileToMap("error_message.csv");

    public static String processError(int errno, Exception e) {
        printMessage(errno);
        e.printStackTrace();
        return getErrorResponse(errno);
    }

    public static String getErrorResponse(int errno) {
        return new StructuredResponse(errno, getMessage(errno), null).toString();
    }

    public static void printMessage(int errno) {
        System.err.println(errno + ": " + getMessage(errno));
    }

    public static String getMessage(int errno) {
        String message = MESSAGE_MAP.get(errno);
        if (message == null)
            System.err.println("Error: no message specified with errno = " + errno);
        return message;
    }

    private static HashMap<Integer, String> loadCSVFileToMap(String directory) {
        System.out.print("loading error messages ...     ");

        try {
            CSVReader reader = new CSVReader(new FileReader(directory));
            Iterator<String[]> iterator = reader.iterator();
            HashMap<Integer, String> map = new HashMap<>();

            while (iterator.hasNext()) {
                String[] pair = iterator.next();
                int key = Integer.parseInt(pair[0]);
                map.put(key, pair[1]);
            }

            reader.close();
            System.out.print("success\n");
            return map;
        } catch (IOException e) {
            System.err.println("Error Ocurred while loading error messages.");
            e.printStackTrace();
            System.err.println("Quiting... ");
            System.exit(1);
        }
        return null;
    }

}