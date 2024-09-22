package com.ggul.application.user.domain;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.UUID;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void generateUser() {
        User user = new User();
        userRepository.save(user);
        System.out.println(user.getId().version());
    }

    @Test
    public void equals() {
        UUID uuid = UUID.fromString("31000000-0000-0000-0000-000000000000");
        User user2 = userRepository.getReferenceById(uuid);
        //User user = userRepository.findById(uuid).orElse(null);
        System.out.println(user2.getId().equals(uuid));

    }
}
