package edu.lehigh.nhi.multitouch.backend.route;

import org.json.JSONException;
import org.json.JSONObject;

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
        Object processRequest(Request request, Response response, int uid) throws Exception;
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
        Object processRequest(Request request, Response response, JSONObject jsBody, int uid) throws Exception;
    }

    private RouteSetter() {
    }

    /**
     * Use Spark to set route specified with default actions. Default actions: 1.
     * catch all Exceptions (error code 100), print to error console, and send it as
     * response; 2. set the response status to 200 (success by REST definition), and
     * set the response type to JSON. 3: print relavent information to the console.
     * Additional action with type BODY: check if request body is a valid Json
     * object.
     * 
     * 
     * @param requestType    one of the following: GET, POST, PUT, DELETE.
     * @param path           the path of the route. Omit the root url, and always
     *                       start with "/".
     * @param routeProcedure check parameters of different procedures before use.
     * @param type           one of the following: SIMPLE, BODY.
     * 
     */
    public static void setRoute(RequestType requestType, String path, SimpleRoute routeProcedure) {
        final Route route = (request, response) -> {
            printRequest(request);
            setResponseToSuccess(response);
            Object retval = executeRouteProcedure(routeProcedure, request, response);
            System.out.print("RESPONSE: " + retval);
            return retval;
        };
        hostRoute(requestType, path, route);
    }

    public static void setRoute(RequestType requestType, String path, RouteWithRequestBody routeProcedure) {
        final Route route = (request, response) -> {
            printRequest(request);
            setResponseToSuccess(response);
            Object retval = executeRouteProcedure(routeProcedure, request, response);
            System.out.print("RESPONSE: " + retval);
            return retval;
        };
        hostRoute(requestType, path, route);
    }

    static Object executeRouteProcedure(SimpleRoute routeProcedure, Request request, Response response) {
        try {
            return routeProcedure.processRequest(request, response);
        } catch (Exception e) {
            return ErrorHandler.processError(ErrorHandler.UNSPECIFIED_ERROR, e);
        }
    }

    static Object executeRouteProcedure(RouteWithRequestBody routeProcedure, Request request, Response response) {
        return executeRouteProcedure((newRequest, newResponse) -> {
            try {
                JSONObject jsBody = new JSONObject(newRequest.body());
                return routeProcedure.processRequest(newRequest, newResponse, jsBody);
            } catch (JSONException e) {
                return ErrorHandler.processError(ErrorHandler.INVALID_JSON, e);
            }
        }, request, response);
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