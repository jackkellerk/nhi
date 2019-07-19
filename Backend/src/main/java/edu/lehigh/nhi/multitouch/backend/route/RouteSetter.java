package edu.lehigh.nhi.multitouch.backend.route;

import org.json.JSONException;
import org.json.JSONObject;

import edu.lehigh.nhi.multitouch.backend.Encryption;
import edu.lehigh.nhi.multitouch.backend.ErrorHandler;
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
    public interface RouteWithUid {
        Object processRequest(Request request, Response response, int uid, String sessionKey) throws Exception;
    }

    /**
     * interface used to pass method as parameter. Method for processing request
     * with json request body.
     */
    public interface RouteWithRequestBody {
        Object processRequest(Request request, Response response, JSONObject jsBody) throws Exception;
    }

    /**
     * interface used to pass method as parameter. Method for processing request
     * with body and sessionKey.
     */
    public interface RouteWithRequestBodyAndUid {
        Object processRequest(Request request, Response response, JSONObject jsBody, int uid, String sessionKey)
                throws Exception;
    }

    private RouteSetter() {
    }

    /**
     * Set route specified with default actions. Actions: 1. catch all Exceptions
     * (error code 100), print to error console, and send it as response; 2. set the
     * response status to 200 (success by REST definition), and set the response
     * type to JSON. 3: print relavent information to the console. Additional action
     * with type BODY: check if request body is a valid Json object.
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
            Object retval = executeSimpleRoute(routeProcedure, request, response);
            System.out.print("RESPONSE: " + retval);
            return retval;
        };
        hostRoute(requestType, path, route);
    }

    /**
     * Set route specified with default actions. Actions: 1. catch all Exceptions
     * (error code 100), print to error console, and send it as response; 2. set the
     * response status to 200 (success by REST definition), and set the response
     * type to JSON. 3: print relavent information to the console. Additional: 4.
     * parse request body into json object and catch error if failed.
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
    public static void setRoutePreprocessJSONRequestBody(RequestType requestType, String path, RouteWithRequestBody routeProcedure) {
        final Route route = (request, response) -> {
            printRequest(request);
            setResponseToSuccess(response);
            Object retval = executeJSBodyRoute(routeProcedure, request, response);
            System.out.print("RESPONSE: " + retval);
            return retval;
        };
        hostRoute(requestType, path, route);
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
    public static void setRoutePreprocessSessionCheck(RequestType requestType, String path, Encryption encryption,
            RouteWithUid routeProcedure) {
        final Route route = (request, response) -> {
            printRequest(request);
            setResponseToSuccess(response);
            Object retval = executeUIDRoute(routeProcedure, request, response, encryption);
            System.out.print("RESPONSE: " + retval);
            return retval;
        };
        hostRoute(requestType, path, route);
    }

    /**
     * Set route specified with default actions. Actions: 1. catch all Exceptions
     * (error code 100), print to error console, and send it as response; 2. set the
     * response status to 200 (success by REST definition), and set the response
     * type to JSON. 3: print relavent information to the console. Additional: 4.
     * parse request body into json object and catch error if failed. 5. parse the
     * request header, and check if the uid and sessionkey matches.
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
    public static void setRoutePreprocessJSONRequestBodyAndSessionCheck(RequestType requestType, String path, Encryption encryption,
            RouteWithRequestBodyAndUid routeProcedure) {
        final Route route = (request, response) -> {
            printRequest(request);
            setResponseToSuccess(response);
            Object retval = executeJSBodyAndUIDRoute(routeProcedure, request, response, encryption);
            System.out.print("RESPONSE: " + retval);
            return retval;
        };
        hostRoute(requestType, path, route);
    }

    private static Object executeSimpleRoute(SimpleRoute routeProcedure, Request request, Response response) {
        try {
            return routeProcedure.processRequest(request, response);
        } catch (Exception e) {
            return ErrorHandler.processError(ErrorHandler.OTHER.UNSPECIFIED_ERROR, e);
        }
    }

    private static Object executeJSBodyRoute(RouteWithRequestBody routeProcedure, Request request, Response response) {
        return executeSimpleRoute((newRequest, newResponse) -> {
            try {
                JSONObject jsBody = new JSONObject(newRequest.body());
                return routeProcedure.processRequest(newRequest, newResponse, jsBody);
            } catch (JSONException e) {
                return ErrorHandler.processError(ErrorHandler.INVALID_JSON.INVALID_JSON, e);
            }
        }, request, response);
    }

    private static Object executeUIDRoute(RouteWithUid routeProcedure, Request request, Response response,
            Encryption encryption) {
        return executeSimpleRoute((newRequest, newResponse) -> {
            int uid = -1;
            String sessionKey = null;
            try {
                String uidStr = request.headers("uid");
                sessionKey = request.headers("session_key");
                if(uidStr == null || sessionKey == null)
                    return ErrorHandler.processError(ErrorHandler.HEADER.MISSING_HEADER_FOR_SESSION_CHECK);
                uid = Integer.parseInt(uidStr);
                if (!encryption.checkSessionKey(uid, sessionKey))
                    return ErrorHandler.processError(ErrorHandler.OTHER.INVALID_SESSION_KEY);
            } catch (NumberFormatException e1) {
                return ErrorHandler.processError(ErrorHandler.HEADER.UID_NOT_INT, e1);
            }
            return routeProcedure.processRequest(newRequest, newResponse, uid, sessionKey);
        }, request, response);
    }

    private static Object executeJSBodyAndUIDRoute(RouteWithRequestBodyAndUid routeProcedure, Request request,
            Response response, Encryption encryption) {
        return executeUIDRoute((requestA, responseA, uid, sessionkey) -> {
            return executeJSBodyRoute((requestB, responseB, jsBody) -> {
                return routeProcedure.processRequest(requestB, responseB, jsBody, uid, sessionkey);
            }, request, response);
        }, request, response, encryption);
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