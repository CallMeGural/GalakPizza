package pl.galakpizza.pizzaservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.galakpizza.pizzaservice.model.Ingredient;
import pl.galakpizza.pizzaservice.repository.IngredientRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IngredientService {
    private final IngredientRepository ingredientRepository;

    public List<Ingredient> findAllIngredients() {
        return ingredientRepository.findAll();
    }

    public Ingredient addIngredient(Ingredient ingredient) {
        return ingredientRepository.save(ingredient);
    }

    public void deleteIngredient(long id) {
        ingredientRepository.deleteById(id);
    }
}
