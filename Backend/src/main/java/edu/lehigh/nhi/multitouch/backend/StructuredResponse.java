package edu.lehigh.nhi.multitouch.backend;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class StructuredResponse {
    private int mErrorCode = 0;

    private String mMessage;

    private JSONObject mData;

    public StructuredResponse(int errorCode, String message) {
        mErrorCode = errorCode;
        mMessage = message;
    }

    public StructuredResponse(int errorCode) {
        this(errorCode, ErrorHandler.getMessage(errorCode));
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

    public static StructuredResponse getErrorResponseJSONMissingFields(String[] keys, JSONValueGetter.Type[] types,
            JSONException e) {
        StringBuilder sb = new StringBuilder();
        sb.append(e.getMessage());
        sb.append(" Fields needed for this Json Object: ");
        for (int i = 0; i < keys.length; i++) {
            sb.append("'" + keys[i] + "' : ");
            sb.append(types[i].name());
            if (i < keys.length - 1)
                sb.append(" ,");
            else
                sb.append(". ");
        }
        return getErrorResponse(ErrorHandler.MISSING_FIELD_JSON.DEFAULT, sb.toString());
    }

    public static StructuredResponse getErrorResponse(int errorCode, String additionalMessage) {
        return new StructuredResponse(errorCode, additionalMessage + ErrorHandler.getMessage(errorCode));
    }

    public static StructuredResponse getErrorResponse(int errorCode) {
        return getErrorResponse(errorCode, ErrorHandler.getMessage(errorCode));
    }

    public static String getResponse(JSONObject data) {
        return new StructuredResponse(data).toString();
    }

    public static String getResponse(JSONArray data) {
        return new StructuredResponse(data).toString();
    }
}
