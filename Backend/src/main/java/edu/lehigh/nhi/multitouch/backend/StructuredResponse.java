package edu.lehigh.nhi.multitouch.backend;

import org.json.JSONArray;
import org.json.JSONObject;

public class StructuredResponse {
    private int mErrorCode = 0;

    private String mMessage;

    private JSONObject mData;

    public StructuredResponse(int errorCode, String message) {
        mErrorCode = errorCode;
        mMessage = message;
    }

    public StructuredResponse(JSONObject data) {
        mData = data;
    }

    public StructuredResponse(JSONArray data) {
        mData = new JSONObject();
        mData.put("array", data);
    }

    public JSONObject toJson() {
        JSONObject retval = new JSONObject();
        retval.put("errorCode", mErrorCode);
        retval.put("message", mMessage);
        retval.put("data", mData);
        return retval;
    }

    @Override
    /** Covert to String representation of the Json response. */
    public String toString() {
        return toJson().toString();
    }

    public static String getErrorResponse(int errorCode, String message) {
        return new StructuredResponse(errorCode, message).toString();
    }

    public static String getResponse(JSONObject data) {
        return new StructuredResponse(data).toString();
    }

    public static String getResponse(JSONArray data) {
        return new StructuredResponse(data).toString();
    }
}
