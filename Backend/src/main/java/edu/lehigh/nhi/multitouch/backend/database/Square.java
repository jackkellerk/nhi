package edu.lehigh.nhi.multitouch.backend.database;

import org.json.JSONObject;

public class Square {
    public enum Type {
        window, image
    }

    final float pos_x, pos_y, width, height;

    // default values
    private final static Square DEFAULT_WINDOW = new Square(0, 0, 400, 300);
    private final static Square DEFAULT_IMAGE = new Square(0, 0, 1600, 900);

    public Square(float img_pos_x, float img_pos_y, float img_width, float img_height) {
        this.pos_x = img_pos_x;
        this.pos_y = img_pos_y;
        this.width = img_width;
        this.height = img_height;
    }

    public static Square getFromJson(JSONObject jsObject, Type type) {
        if (jsObject == null) {
            switch (type) {
            case window:
                return DEFAULT_WINDOW;
            case image:
                return DEFAULT_IMAGE;
            default:
                return null;
            }
        }
        return new Square(jsObject.getFloat("img_pos_x"), jsObject.getFloat("img_pos_y"),
                jsObject.getFloat("img_width"), jsObject.getFloat("img_height"));
    }
}