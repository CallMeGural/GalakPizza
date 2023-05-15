package pl.galakpizza.pizzaservice.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import pl.galakpizza.pizzaservice.model.User;

@Configuration
@EnableCaching
//@RequiredArgsConstructor
public class ApplicationConfig {

//    @Autowired
//    private RestTemplate restTemplate;
    private String userServiceUrl = "http://localhost:8081";

    @Bean
    public UserDetailsService userDetailsService() {
//        return (username) -> (UserDetails)this.userRepository.findByUsername(username).orElseThrow(() -> {
//            throw new UsernameNotFoundException("User not found !");
//        });
        return (username) -> restTemplate().getForObject(userServiceUrl+"/auth/{username}", User.class,username);
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(this.userDetailsService());
        authProvider.setPasswordEncoder(this.passwordEncoder());
        return authProvider;
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("http://localhost:4200").allowedMethods("*");
//                registry.addMapping("/pizza").allowedOrigins("http://localhost:4200").allowedMethods("*");
//                registry.addMapping("/pizza/custom/**").allowedOrigins("http://localhost:4200").allowedMethods("*");
//                registry.addMapping("/ingredients").allowedOrigins("http://localhost:4200").allowedMethods("*");
//                registry.addMapping("/size-and-cost").allowedOrigins("http://localhost:4200").allowedMethods("*");
//                registry.addMapping("/custom-pizza").allowedOrigins("http://localhost:4200").allowedMethods("*");
//                registry.addMapping("/orders/**").allowedOrigins("http://localhost:4200").allowedMethods("*");
//                registry.addMapping("/create-payment-intent/**").allowedOrigins("http://localhost:4200").allowedMethods("*");
//                registry.addMapping("/auth/**").allowedOrigins("http://localhost:4200").allowedMethods("*").exposedHeaders("*");
//                registry.addMapping("/").allowedOrigins("http://localhost:4200").allowedMethods("*").exposedHeaders("*");
            }
        };
    }
}
