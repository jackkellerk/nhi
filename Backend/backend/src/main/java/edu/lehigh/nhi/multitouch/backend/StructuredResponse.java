package edu.lehigh.nhi.multitouch.backend;

import org.json.JSONObject;

public class StructuredResponse {
    public int mErrorCode;

    public String mMessage;

    public  JSONObject mData;

    public StructuredResponse(int errorCode, String message, JSONObject data) {
        mErrorCode = errorCode;
        mMessage = message;
        mData = data;
    }

    public JSONObject toJson(){
        JSONObject retval = new JSONObject();
        retval.append("errorCode", mErrorCode);
        retval.append("message", mMessage);
        retval.append("data", mData);
    }
}
