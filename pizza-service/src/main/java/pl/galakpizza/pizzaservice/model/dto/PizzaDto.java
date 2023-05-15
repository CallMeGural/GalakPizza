package pl.galakpizza.pizzaservice.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.galakpizza.pizzaservice.model.Ingredient;
import pl.galakpizza.pizzaservice.model.SizeAndCost;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PizzaDto {
    private String name;
    private boolean custom;
    private List<Ingredient> ingredients;
    private List<SizeAndCost> sizeAndCosts;
}
