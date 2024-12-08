package com.group.project.entities;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class FriendRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "sender_id", referencedColumnName = "id")
    private User user1;

    @ManyToOne
    @JoinColumn(name = "receiver_id", referencedColumnName = "id")
    private User user2;

    private Date created_at;

    public FriendRequest() {
    }

    public FriendRequest(User user1, User user2) {
        this.user1 = user1;
        this.user2 = user2;
        this.created_at = new Date();
    }

    public User getUser1() {
        return user1;
    }

    public User getUser2() {
        return user2;
    }

    public Date getCreated_at() {
        return created_at;
    }
}