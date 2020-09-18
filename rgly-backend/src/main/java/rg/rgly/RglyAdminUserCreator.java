package rg.rgly;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import rg.rgly.domain.RglyUser;
import rg.rgly.repositories.RglyUserRepository;

import javax.annotation.PostConstruct;

@Component
public class RglyAdminUserCreator {
    private final RglyUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private String username;
    private String password;

    public RglyAdminUserCreator(RglyUserRepository userRepository, PasswordEncoder passwordEncoder,
                                @Value("${rgly.admin.username}") String username,
                                @Value("${rgly.admin.password}") String password) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.username = username;
        this.password = password;
    }

    @PostConstruct
    public void createUser(){
        userRepository.save(new RglyUser(username, passwordEncoder.encode(password)));
    }
}
