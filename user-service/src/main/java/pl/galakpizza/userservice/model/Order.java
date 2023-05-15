package pl.galakpizza.userservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "pizza_order")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String creditCard;
    private String expiration;
    private Date placedAt;
    @Embedded
    private Address address;
    @ManyToMany(
            targetEntity = Pizza.class
    )
    private List<Pizza> pizzas;
    @ManyToOne
    private User client;
    private OrderStatus status;
    private double cost;

    @PrePersist
    void placedAt() {
        this.placedAt = new Date();
    }

    public Order(String creditCard, String expiration, List<Pizza> pizzas, User client) {
        this.creditCard = creditCard;
        this.expiration = expiration;
        this.pizzas = pizzas;
        this.client = client;
    }

    public void addPizza(Pizza pizza) {
        this.pizzas.add(pizza);
    }

    public enum OrderStatus {
        OPLACONY,
        W_TRAKCIE_DOSTAWY,
        ZAKONCZONY
    }

}
