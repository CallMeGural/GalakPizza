package pl.galakpizza.userservice.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.galakpizza.userservice.model.Address;
import pl.galakpizza.userservice.model.Pizza;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderDto {
    private List<Pizza> pizzas;
    private Address address;
    private String username;
    private String paymentMethod;
    private double cost;
}
