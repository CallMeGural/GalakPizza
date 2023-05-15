package pl.galakpizza.userservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.galakpizza.userservice.auth.AuthenticationRequest;
import pl.galakpizza.userservice.auth.AuthenticationResponse;
import pl.galakpizza.userservice.auth.RegisterRequest;
import pl.galakpizza.userservice.model.Role;
import pl.galakpizza.userservice.model.User;
import pl.galakpizza.userservice.repository.UserRepository;
import pl.galakpizza.userservice.security.JwtService;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        User user = new User(request.getFirstname(),
                request.getLastname(),
                request.getUsername(),
                passwordEncoder.encode(request.getPassword()),
                request.getPhoneNumber(),
                Role.USER);
        userRepository.save(user);
        String jwtToken = jwtService.generateToken(user);
        return new AuthenticationResponse(jwtToken);
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        User user = userRepository.findByUsername(request.getUsername()).orElseThrow();
        String jwtToken = jwtService.generateToken(user);
        return new AuthenticationResponse(jwtToken);
    }
}
