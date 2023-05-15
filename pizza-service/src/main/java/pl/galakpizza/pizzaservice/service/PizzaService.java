package pl.galakpizza.pizzaservice.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import pl.galakpizza.pizzaservice.model.Pizza;
import pl.galakpizza.pizzaservice.model.User;
import pl.galakpizza.pizzaservice.model.UsersCustomPizza;
import pl.galakpizza.pizzaservice.model.dto.PizzaDto;
import pl.galakpizza.pizzaservice.repository.PizzaRepository;
import pl.galakpizza.pizzaservice.repository.SizeAndCostRepository;


import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Log
public class PizzaService {
    private final PizzaRepository pizzaRepository;
    private final SizeAndCostRepository sizeAndCostRepository;

    @Autowired
    private RestTemplate restTemplate;
    private String userServiceUrl = "http://localhost:8081";

    public Pizza addPizza(PizzaDto dto) {
        Pizza pizza = new Pizza();
        pizza.setCustom(dto.isCustom());
        pizza.setName(dto.getName());
        pizza.setIngredients(dto.getIngredients());
        log.info(dto.getIngredients().toString());
        pizza.setSizeAndCosts(dto.getSizeAndCosts());
        sizeAndCostRepository.saveAll(dto.getSizeAndCosts());
        pizza.setUserId(restTemplate.getForObject(userServiceUrl+"/auth/{username}", User.class,"admin").getId());
        return pizzaRepository.save(pizza);
    }

    @Transactional
    public Pizza editPizza(Pizza pizza) {
        Pizza update = pizzaRepository.findById(pizza.getId()).orElseThrow(() ->
            new NoSuchElementException("Pizza does not exist")
        );
        if (!pizza.getName().isEmpty()) {
            update.setName(pizza.getName());
        }

        if (!pizza.getIngredients().isEmpty())
            update.setIngredients(pizza.getIngredients());


        if(!pizza.getSizeAndCosts().isEmpty())
            update.setSizeAndCosts(pizza.getSizeAndCosts());


        log.info(pizza.getSizeAndCosts().toString());
        log.info(update.getSizeAndCosts().toString());
        return pizzaRepository.save(update);
    }

    public void deletePizza(long id) {
        this.pizzaRepository.deleteById(id);
    }

//    @Cacheable(cacheNames = {"defaultPizzaList"})
    public List<Pizza> findAllPizzas() {
        return this.pizzaRepository.findAllByCustomIsFalse();
    }

    public Pizza findPizzaById(long id) {
        return pizzaRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Pizza does not exist"));
    }

    @Transactional
    public List<Pizza> findPizzaByUser(String username) {
        User user = restTemplate.getForObject(userServiceUrl+"/auth/{username}", User.class,username);
        return this.pizzaRepository.findAllByUserId(user.getId());
    }

    public Pizza saveCustomPizza(UsersCustomPizza pizza) {
        User user = restTemplate.getForObject(userServiceUrl+"/auth/{username}",User.class,pizza.getUsername());//userRepository.findByUsername(customPizza.getUsername()).orElseThrow();
        pizza.getPizza().setUserId(user.getId());
        return this.pizzaRepository.save(pizza.getPizza());
    }
}
