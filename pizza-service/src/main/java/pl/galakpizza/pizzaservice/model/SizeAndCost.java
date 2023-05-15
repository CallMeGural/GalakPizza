package pl.galakpizza.pizzaservice.model;

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
public class SizeAndCost {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private double cost;
    private int size;

    public SizeAndCost(double cost, int size) {
        this.cost = cost;
        this.size = size;
    }

    @Override
    public String toString() {
        return "SizeAndCost{" +
                "cost=" + cost +
                ", size=" + size +
                '}';
    }
}
