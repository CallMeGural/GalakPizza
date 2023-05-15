package pl.galakpizza.pizzaservice.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import pl.galakpizza.pizzaservice.model.Pizza;
import pl.galakpizza.pizzaservice.model.User;
import pl.galakpizza.pizzaservice.model.UsersCustomPizza;
import pl.galakpizza.pizzaservice.repository.PizzaRepository;

@RestController
@RequestMapping({"/custom-pizza"})
@RequiredArgsConstructor
@Slf4j
public class UserCustomPizzaController {
    private final PizzaRepository pizzaRepository;
//    private final UserRepository userRepository;
    @Autowired
    private RestTemplate restTemplate;
    private String userServiceUrl = "http://localhost:8081";

    @PostMapping
    public Pizza saveCustomPizza(@RequestBody UsersCustomPizza customPizza) {
        User user = restTemplate.getForObject(userServiceUrl+"/auth/{username}",User.class,customPizza.getUsername());//userRepository.findByUsername(customPizza.getUsername()).orElseThrow();
        customPizza.getPizza().setUserId(user.getId());
        return this.pizzaRepository.save(customPizza.getPizza());
    }
}
