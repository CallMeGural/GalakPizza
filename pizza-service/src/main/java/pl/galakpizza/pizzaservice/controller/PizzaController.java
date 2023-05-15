package pl.galakpizza.pizzaservice.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.galakpizza.pizzaservice.model.Pizza;
import pl.galakpizza.pizzaservice.model.User;
import pl.galakpizza.pizzaservice.model.UsersCustomPizza;
import pl.galakpizza.pizzaservice.model.dto.PizzaDto;
import pl.galakpizza.pizzaservice.service.PizzaService;

import java.util.List;

@RestController
@RequestMapping("/pizza")
@RequiredArgsConstructor
@Slf4j
public class PizzaController {
    private final PizzaService pizzaService;

    @GetMapping({"/{id}"})
    public ResponseEntity<Pizza> findPizzaById(@PathVariable long id) {
        return ResponseEntity.ok(this.pizzaService.findPizzaById(id));
    }

    @GetMapping
    public ResponseEntity<List<Pizza>> findAllPizza() {
        return ResponseEntity.ok(this.pizzaService.findAllPizzas());
    }

    @GetMapping({"/custom/{username}"})
    public ResponseEntity<List<Pizza>> findUsersPizza(@PathVariable String username) {
        return ResponseEntity.ok(this.pizzaService.findPizzaByUser(username));
    }

    @DeleteMapping({"/{id}"})
    public void deletePizza(@PathVariable long id) {
        this.pizzaService.deletePizza(id);
    }

    @PostMapping
    public ResponseEntity<Pizza> addPizza(@RequestBody PizzaDto pizza) {
        return ResponseEntity.ok(this.pizzaService.addPizza(pizza));
    }

    @PutMapping
    public ResponseEntity<Pizza> editPizza(@RequestBody Pizza pizza) {
        return ResponseEntity.ok(this.pizzaService.editPizza(pizza));
    }

    @PostMapping("/custom")
    public Pizza saveCustomPizza(@RequestBody UsersCustomPizza pizza) {
        return pizzaService.saveCustomPizza(pizza);

    }

}
