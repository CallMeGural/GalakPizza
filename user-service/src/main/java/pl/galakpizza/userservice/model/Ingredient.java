package pl.galakpizza.userservice.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Ingredient {
    @Id
    @GeneratedValue(
            strategy = GenerationType.AUTO
    )
    private long id;
    private String name;
    private Type type;

    public Ingredient(String name, Type type) {
        this.name=name;
        this.type=type;
    }

    public enum Type {
        DOUGH,
        PROTEIN,
        VEGGIES,
        CHEESE,
        SAUCE;
    }

    @Override
    public String toString() {
        return "Ingredient{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", type=" + type +
                '}';
    }
}
