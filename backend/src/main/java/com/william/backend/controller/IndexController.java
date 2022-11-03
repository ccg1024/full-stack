package com.william.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;

import com.william.backend.repository.*;
import com.william.backend.exception.ResourceNotFoundException;
import com.william.backend.model.Note;

/**
 * @author ccg
 *
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class IndexController {

    // private static final Logger LOGGER = LoggerFactory.getLogger(IndexController.class.getName());
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

    /**
     * @author get note entry from id
     * @return note
     */
    @GetMapping("/markdown/{id}")
    public String getMarkdownContent(@PathVariable Long id) {
        Note note = noteRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Note not exist with id: " + id));
        return note.getNotePath().split("notes")[1];
    }
    
}
