package edu.lehigh.nhi.multitouch.backend.route;

import java.sql.SQLException;

import org.json.JSONException;
import org.json.JSONObject;

import edu.lehigh.nhi.multitouch.backend.Encryption;
import edu.lehigh.nhi.multitouch.backend.ErrorHandler;
import edu.lehigh.nhi.multitouch.backend.JSONValueGetter;
import edu.lehigh.nhi.multitouch.backend.StructuredResponse;
import spark.Request;
import spark.Response;
import spark.Route;
import spark.Spark;

/** static class for creating routes. */
final class RouteSetter {

    /**
     * interface used to pass method as parameter. Method for processing simplist
     * request.
     */
    public interface SimpleRoute {
        Object processRequest(Request request, Response response) throws Exception;
    }

    /**
     * interface used to pass method as parameter. Method for processing request
     * with header containing login information.
     */
    public interface SessionKeyCheckRoute {
        Object processRequest(int uid, String sessionKey) throws Exception;
    }

    public interface PathParamCheckRoute {
        Object processRequest(int[] params) throws Exception;
    }

    /**
     * interface used to pass method as parameter. Method for processing request
     * with json request body.
     */
    public interface RequestBodyCheckRoute {
        Object processRequest(JSONObject jsBody) throws Exception;
    }

    public interface JSONValueGetterRoute {
        Object processRequest(Object[] jsonVals) throws Exception;
    }

    private RouteSetter() {
    }

    /**
     * Set route specified with default actions. Actions: 1. catch all Exceptions
     * (error code 100), print to error console, and send it as response; 2. set the
     * response status to 200 (success by REST definition), and set the response
     * type to JSON. 3: print relavent information to the console.
     * 
     * 
     * @param requestType    one of the following: GET, POST, PUT, DELETE.
     * @param path           the path of the route. Omit the root url, and always
     *                       start with "/".
     * @param routeProcedure best practice would pass this interface in by a lambda
     *                       expression. signiture: (Request request, Response
     *                       response) -> Object
     * 
     */
    public static void setRoute(RequestType requestType, String path, SimpleRoute routeProcedure) {
        final Route route = (request, response) -> {
            printRequest(request);
            setResponseToSuccess(response);
            Object retval = checkExceptions(request, response, routeProcedure);
            System.out.print("RESPONSE: " + retval);
            return retval;
        };
        hostRoute(requestType, path, route);
    }

    private static Object checkExceptions(Request request, Response response, SimpleRoute routeProcedure) {
        try {

            return routeProcedure.processRequest(request, response);

        } catch (SQLException e1) {
            e1.printStackTrace();
            return StructuredResponse.getErrorResponse(ErrorHandler.UNKOWN.UNSPECIFIED_ERROR, e1.getMessage() + ". ");

        } catch (Exception e) {
            e.printStackTrace();
            return StructuredResponse.getErrorResponse(ErrorHandler.UNKOWN.UNSPECIFIED_ERROR, e.getMessage() + ". ");
        }
    }

    public static Object preprocessPathParam(Request request, Response response, String[] paramNames, PathParamCheckRoute routeProcedure) {
        return checkExceptions(request, response, (newRequest, newResponse) -> {

            int[] retval = new int[paramNames.length];
            for (int i = 0; i < paramNames.length; i++) {
    
                try {
                    retval[i] = Integer.parseInt(request.params(paramNames[i]));
                } catch (NumberFormatException e) {
                    return StructuredResponse.getErrorResponse(ErrorHandler.PATH.PATH_NUM_FORMAT);
                }
            }
            
            return routeProcedure.processRequest(retval);
        });
    }

    /**
     * Set route specified with default actions. Actions: 1. catch all Exceptions
     * (error code 100), print to error console, and send it as response; 2. set the
     * response status to 200 (success by REST definition), and set the response
     * type to JSON. 3: print relavent information to the console. Additional: 4.
     * parse request body into json object and catch error if failed.
     * 
     * @param routeProcedure best practice would pass this interface in by a lambda
     *                       expression. signiture: (JsonObject requestBody) ->
     *                       Object
     * 
     */
    public static Object preprocessJSONCheck(Request request, Response response, RequestBodyCheckRoute routeProcedure) {
        return checkExceptions(request, response, (newRequest, newResponse) -> {

            JSONObject jsBody = null;
            try {
                jsBody = new JSONObject(request.body());
            } catch (JSONException e) {
                e.printStackTrace();
                return StructuredResponse.getErrorResponse(ErrorHandler.INVALID_JSON.INVALID_JSON,
                        e.getMessage() + ". ");
            }

            return routeProcedure.processRequest(jsBody);

        });
    }

    /**
     * Set route specified with default actions. Actions: 1. catch all Exceptions
     * (error code 100), print to error console, and send it as response; 2. set the
     * response status to 200 (success by REST definition), and set the response
     * type to JSON. 3: print relavent information to the console. Additional: 4.
     * parse request body into json object and catch error if failed. 5. get fields
     * specified and handel errors automatically.
     * 
     * @param keys           a String array of keys, should match types.
     * @param types          a array of types, should match keys. Type is a enum
     *                       inside the class backend.JSONValueGetter.
     * @param routeProcedure best practice would pass this interface in by a lambda
     *                       expression. signiture: (Object[] vals) -> Object
     * 
     */
    public static Object preprocessJSONValueGet(Request request, Response response, String[] keys,
            JSONValueGetter.Type[] types, JSONValueGetterRoute routeProcedure) {
        return preprocessJSONCheck(request, response, (jsBody) -> {
            Object[] vals = null;
            try {
                vals = JSONValueGetter.getValues(jsBody, keys, types);
            } catch (JSONException e) {
                return StructuredResponse.getErrorResponseJSONMissingFields(keys, types, e);
            }
            return routeProcedure.processRequest(vals);
        });
    }

    /**
     * Set route specified with default actions. Actions: 1. catch all Exceptions
     * (error code 100), print to error console, and send it as response; 2. set the
     * response status to 200 (success by REST definition), and set the response
     * type to JSON. 3: print relavent information to the console. Additional: 5.
     * parse the request header, and check if the uid and sessionkey matches.
     * 
     * 
     * @param requestType    one of the following: GET, POST, PUT, DELETE.
     * @param path           the path of the route. Omit the root url, and always
     *                       start with "/".
     * @param routeProcedure best practice would pass this interface in by a lambda
     *                       expression. signiture: (Request request, Response
     *                       response, JsonObject requestBody) -> Object
     * 
     */
    public static Object preprocessSessionCheck(Request request, Response response, Encryption encryption,
            SessionKeyCheckRoute routeProcedure) {
        return checkExceptions(request, response, (newRequest, newResponse) -> {
            int uid = -1;
            String sessionKey = null;
            try {
                String uidStr = request.headers("uid");
                sessionKey = request.headers("session_key");
                if (uidStr == null || sessionKey == null)
                    return StructuredResponse.getErrorResponse(ErrorHandler.HEADER.MISSING_HEADER_FOR_SESSION_CHECK);
                uid = Integer.parseInt(uidStr);
                if (!encryption.checkSessionKey(uid, sessionKey))
                    return StructuredResponse.getErrorResponse(ErrorHandler.PRIVILAGE.INVALID_SESSION_KEY);
            } catch (NumberFormatException e1) {
                e1.printStackTrace();
                return StructuredResponse.getErrorResponse(ErrorHandler.HEADER.UID_NOT_INT, e1.getMessage() + ". ");
            }
            return routeProcedure.processRequest(uid, sessionKey);
        });
    }

    private static void setResponseToSuccess(Response response) {
        // 200 is the default success code.
        response.status(200);
        response.type("application/json");
    }

    private static void hostRoute(RequestType requestType, String path, Route route) {

        switch (requestType) {
        case GET:
            Spark.get(path, route);
            break;
        case POST:
            Spark.post(path, route);
            break;
        case PUT:
            Spark.put(path, route);
            break;
        case DELETE:
            Spark.delete(path, route);
            break;
        }
    }

    private static void printRequest(Request request) {
        System.out.print(
                "REQUEST from " + request.ip() + ": " + request.protocol() + " " + request.pathInfo() + "\n HEADER: ");
        int size = request.headers().size();
        int index = 0;
        for (String header : request.headers()) {
            System.out.print(header + ": " + request.headers(header));
            if (index++ < size - 1)
                System.out.print(", ");
        }
        System.out.print("\n BODY: " + request.body().toString() + "\n");
    }

}