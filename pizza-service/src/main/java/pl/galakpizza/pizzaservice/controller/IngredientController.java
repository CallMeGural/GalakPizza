package pl.galakpizza.pizzaservice.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.galakpizza.pizzaservice.model.Ingredient;
import pl.galakpizza.pizzaservice.service.IngredientService;

import java.util.List;

@RestController
@RequestMapping("/ingredients")
@RequiredArgsConstructor
public class IngredientController {
    private final IngredientService ingredientService;

    @GetMapping
    public ResponseEntity<List<Ingredient>> findAllIngredients() {
        return ResponseEntity.ok(this.ingredientService.findAllIngredients());
    }

    @DeleteMapping({"/{id}"})
    public void deleteIngredient(@PathVariable long id) {
        this.ingredientService.deleteIngredient(id);
    }

    @PostMapping
    public ResponseEntity<Ingredient> addIngredient(@RequestBody Ingredient ingredient) {
        return ResponseEntity.ok(this.ingredientService.addIngredient(ingredient));
    }


}
