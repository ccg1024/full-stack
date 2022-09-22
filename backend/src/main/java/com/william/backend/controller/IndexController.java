package com.william.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Scanner;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.william.backend.utils.*;
import com.william.backend.repository.*;
import com.william.backend.model.Note;

/**
 * @author ccg
 *
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class IndexController {

    private static final Logger LOGGER = LoggerFactory.getLogger(IndexController.class.getName());
    private final NoteRepository noteRepository;

    public IndexController(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    /**
     * just index url
     */
    @GetMapping("/")
    public String getIndexPage(){
        return "Hello, World";
    }

    @GetMapping("/markdown")
    public List<Note> getMarkdownList() {
        // initialDatabase();
        List<Note> notes = noteRepository.findAll();
        for (Note note: notes) {
            note.setNotePath("http://localhost:3000/markdown/" + note.getNoteName());
        }
        return notes;
    }

    @GetMapping("/markdown/*")
    public String getMarkdownContent() {
        return "Markdown content";
    }
    
    /**
     * current config file just one line
     */
    private void initialDatabase() {
        // read file
        try {
            File file = ResourceUtils.getFile("classpath:config.properties");
            Scanner scan = new Scanner(file);
            Map<String, String> configMap = new HashMap<>();
            String configContent = "";
            while (scan.hasNextLine()) {
                String configItem = scan.nextLine();
                String[] configArr = configItem.split("=");
                configMap.put(configArr[0], configArr[1]);
            }
            
            configContent = MyIOUtils.listDir(new File(configMap.get("root_dir")));
            String[] filePaths = configContent.split("\n");

            List<Note> notes = noteRepository.findAll();

            for (String filePath: filePaths) {
                boolean existFlag = false;
                for (Note note: notes) {
                    if (filePath.equals(note.getNotePath())) {
                        existFlag = true;
                        break;
                    }
                }
                if (existFlag == false) {
                    Note tempNote = new Note();
                    String[] tempList = filePath.split("/");
                    tempNote.setNotePath(filePath);
                    tempNote.setNoteName(tempList[tempList.length - 1]);
                    noteRepository.save(tempNote);
                }
            }

            // close resource
            scan.close();
        } catch (IOException e) {
            LOGGER.error(e.getMessage());
        }
    }
}
