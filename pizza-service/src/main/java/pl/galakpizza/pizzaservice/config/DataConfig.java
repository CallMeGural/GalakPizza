package pl.galakpizza.pizzaservice.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import pl.galakpizza.pizzaservice.model.Ingredient;
import pl.galakpizza.pizzaservice.model.Ingredient.Type;
import pl.galakpizza.pizzaservice.model.Pizza;
import pl.galakpizza.pizzaservice.model.SizeAndCost;
import pl.galakpizza.pizzaservice.repository.IngredientRepository;
import pl.galakpizza.pizzaservice.repository.PizzaRepository;
import pl.galakpizza.pizzaservice.repository.SizeAndCostRepository;

import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataConfig implements CommandLineRunner{
    private final PizzaRepository pizzaRepository;
    private final IngredientRepository ingredientRepository;
    private final SizeAndCostRepository sizeAndCostRepository;

    @Override
    public void run(String... args) {
        this.ingredientRepository.save(new Ingredient("Szynka", Type.PROTEIN));
        this.ingredientRepository.save(new Ingredient("Kurczak", Type.PROTEIN));
        this.ingredientRepository.save(new Ingredient("Ananas", Type.VEGGIES));
        this.ingredientRepository.save(new Ingredient("Papryka", Type.VEGGIES));
        this.ingredientRepository.save(new Ingredient("Pomidor", Type.VEGGIES));
        this.ingredientRepository.save(new Ingredient("Pieczarki", Type.VEGGIES));
        this.ingredientRepository.save(new Ingredient("Parmezan", Type.CHEESE));
        this.ingredientRepository.save(new Ingredient("Mozarella", Type.CHEESE));
        this.ingredientRepository.save(new Ingredient("Chilli", Type.VEGGIES));
        this.ingredientRepository.save(new Ingredient("Cebula", Type.VEGGIES));
        this.ingredientRepository.save(new Ingredient("Pepperoni", Type.PROTEIN));
        this.ingredientRepository.save(new Ingredient("Tuńczyk", Type.PROTEIN));
        this.sizeAndCostRepository.save(new SizeAndCost(25.0D, 30));
        this.sizeAndCostRepository.save(new SizeAndCost(35.0D, 40));
        this.sizeAndCostRepository.save(new SizeAndCost(55.0D, 50));
        this.sizeAndCostRepository.save(new SizeAndCost(21.0D, 30));
        this.sizeAndCostRepository.save(new SizeAndCost(35.0D, 40));
        this.sizeAndCostRepository.save(new SizeAndCost(50.0D, 50));
        this.sizeAndCostRepository.save(new SizeAndCost(21.0D, 30));
        this.sizeAndCostRepository.save(new SizeAndCost(21.0D, 30));
        this.sizeAndCostRepository.save(new SizeAndCost(31.0D, 40));
        this.sizeAndCostRepository.save(new SizeAndCost(56.0D, 50));
        this.sizeAndCostRepository.save(new SizeAndCost(27.0D, 30));
        this.sizeAndCostRepository.save(new SizeAndCost(37.0D, 40));
        this.sizeAndCostRepository.save(new SizeAndCost(57.0D, 50));
        this.pizzaRepository.save(new Pizza("Fungi", this.ingredientRepository.findAllById(List.of(17L)), this.sizeAndCostRepository.findAllById(Arrays.asList(4L, 5L, 6L))));
        this.pizzaRepository.save(new Pizza("Hawajska", this.ingredientRepository.findAllById(Arrays.asList(1L, 11L, 3L, 5L)), this.sizeAndCostRepository.findAllById(List.of(7L))));
        this.pizzaRepository.save(new Pizza("Pepperoni", this.ingredientRepository.findAllById(Arrays.asList(1L, 11L, 13L, 14L, 15L)), this.sizeAndCostRepository.findAllById(Arrays.asList(8L, 9L, 10L))));
        this.pizzaRepository.save(new Pizza("Z rybą", this.ingredientRepository.findAllById(Arrays.asList(1L, 11L, 6L, 7L, 16L)), this.sizeAndCostRepository.findAllById(Arrays.asList(11L, 12L, 13L))));
    }
}
