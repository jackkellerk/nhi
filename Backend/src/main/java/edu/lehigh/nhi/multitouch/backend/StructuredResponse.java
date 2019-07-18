package edu.lehigh.nhi.multitouch.backend;

import org.json.JSONObject;

public class StructuredResponse {
    public int mErrorCode;

    public String mMessage;

    public JSONObject mData;

    public StructuredResponse(int errorCode, String message, JSONObject data) {
        mErrorCode = errorCode;
        mMessage = message;
        mData = data;
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

    public static String getStringifiedResponse(int errorCode, String message, JSONObject data){
        return new StructuredResponse(errorCode, message, data).toString();
    }
}
