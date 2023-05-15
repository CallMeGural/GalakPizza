package pl.galakpizza.userservice.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.galakpizza.userservice.auth.AuthenticationRequest;
import pl.galakpizza.userservice.auth.AuthenticationResponse;
import pl.galakpizza.userservice.auth.RegisterRequest;
import pl.galakpizza.userservice.model.User;
import pl.galakpizza.userservice.repository.UserRepository;
import pl.galakpizza.userservice.service.AuthenticationService;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

//    @GetMapping("/me")
//    public ResponseEntity<User> getCurrentUser(@RequestParam String username) {
//        User user = userRepository.findByUsername(username).orElseThrow();
//        return ResponseEntity.ok(user);
//    }

    @GetMapping("/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        return ResponseEntity.ok(userRepository.findByUsername(username).orElseThrow());
    }
}
