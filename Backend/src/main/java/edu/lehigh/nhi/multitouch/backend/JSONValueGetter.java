package edu.lehigh.nhi.multitouch.backend;

import org.json.JSONObject;

public class JSONValueGetter {

    public enum Type {
        INT, DOUBLE, FLOAT, STRING, JSONOBJ, JSONARR
    }

    public static Object getVal(JSONObject jsObj, String key, Type type) {
        switch (type) {
        case INT:
            return jsObj.getInt(key);
        case DOUBLE:
            return jsObj.getDouble(key);
        case FLOAT:
            return jsObj.getFloat(key);
        case STRING:
            return jsObj.getString(key);
        case JSONOBJ:
            return jsObj.getJSONObject(key);
        case JSONARR:
            return jsObj.getJSONArray(key);
        }
        return null;
    }

    public static Object[] getValues(JSONObject jsObj, String[] keys, Type[] types) {
        Object[] retval = new Object[keys.length];
        for (int i = 0; i < keys.length; i++) {
            retval[i] = getVal(jsObj, keys[i], types[i]);
        }
        return retval;
    }

}