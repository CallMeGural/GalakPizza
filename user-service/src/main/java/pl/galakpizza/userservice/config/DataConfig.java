package pl.galakpizza.userservice.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import pl.galakpizza.userservice.model.Role;
import pl.galakpizza.userservice.model.User;
import pl.galakpizza.userservice.repository.UserRepository;

@Component
@RequiredArgsConstructor
public class DataConfig implements CommandLineRunner{

    private final UserRepository userRepository;
    private final ApplicationConfig appConfig;

    @Override
    public void run(String... args) {
        this.userRepository.save(
                new User("admin",
                        "super",
                        "admin",
                        this.appConfig.passwordEncoder().encode("hasloAdmina"),
                        "123123123",
                        Role.ADMIN));
            }
}
