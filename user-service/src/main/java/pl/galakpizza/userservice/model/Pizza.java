package pl.galakpizza.userservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Pizza {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String name;
    private boolean custom;
    @ManyToMany(
            targetEntity = Ingredient.class,
            fetch = FetchType.EAGER
    )
    private List<Ingredient> ingredients;
    @ManyToMany(
            targetEntity = SizeAndCost.class,
            fetch = FetchType.EAGER
    )
    private List<SizeAndCost> sizeAndCosts;
    @OneToOne
    private User user;

    public Pizza(String name, List<Ingredient> ingredients, List<SizeAndCost> sizeAndCosts) {
        this.name = name;
        this.ingredients = ingredients;
        this.sizeAndCosts = sizeAndCosts;
        this.custom = false;
    }

}
