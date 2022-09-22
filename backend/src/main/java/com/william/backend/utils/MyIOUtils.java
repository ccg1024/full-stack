package com.william.backend.utils;

import java.io.File;

public class MyIOUtils {

    public static String listDir(File dir) {
        File[] elements = dir.listFiles();
        StringBuilder filesName = new StringBuilder();
        for (File element: elements) {
            if (element.isFile() && !".DS_Store".equals(element.getName())
                    && !".".equals(element.getName()) && !"..".equals(element.getName())
                    && !element.getName().startsWith(".") && element.getName().endsWith(".md")) {
                filesName.append(element);
                filesName.append("\n");
            } else if (element.isDirectory() && !element.getName().startsWith(".")) {
                filesName.append(listDir(element.getAbsoluteFile()));
            }
        }
        return filesName.toString();
    }
}
