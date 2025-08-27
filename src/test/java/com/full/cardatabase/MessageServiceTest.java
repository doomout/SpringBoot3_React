package com.full.cardatabase;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import com.full.cardatabase.service.*;

@SpringBootTest
public class MessageServiceTest {
    @Test
    public void testAddMessage() {
        MessageService messageService = new MessageService();
        String msg = "Hello world";

        Message newMsg = messageService.addMsg(msg);
        assertEquals(msg, newMsg.getMessage());
    }
}
