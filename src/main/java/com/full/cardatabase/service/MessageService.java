package com.full.cardatabase.service;

import java.util.List;
import java.util.ArrayList;

import org.springframework.stereotype.Service;

@Service
public class MessageService {
    private List<Message> messages = new ArrayList<>();

    public Message addMsg(String msg) {
        Message newMsg = new Message(msg);
        messages.add(newMsg);

        return newMsg;
    }
}
