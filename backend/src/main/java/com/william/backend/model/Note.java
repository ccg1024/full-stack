package com.william.backend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author ccg
 */
@Entity
@Table(name = "notes")
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "note_path")
    private String notePath;

    @Column(name = "note_name")
    private String noteName;

    public Note() {}

    public Note(Long id, String notePath, String noteName) {
        this.id = id;
        this.notePath = notePath;
        this.noteName = noteName;
    }

    public Long getId() {
        return id;
    }

    public String getNotePath() {
        return notePath;
    }

    public String getNoteName() {
        return noteName;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNotePath(String notePath) {
        this.notePath = notePath;
    }

    public void setNoteName(String noteName) {
        this.noteName = noteName;
    }
}
