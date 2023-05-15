package pl.galakpizza.userservice.controller;


import com.stripe.exception.StripeException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.galakpizza.userservice.model.Order;
import pl.galakpizza.userservice.model.Pizza;
import pl.galakpizza.userservice.model.dto.OrderDto;
import pl.galakpizza.userservice.service.OrderService;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/current")
    public ResponseEntity<Order> confirmOrder(@RequestBody OrderDto order) throws StripeException {
        return ResponseEntity.ok(orderService.confirmOrder(order));
    }

    @GetMapping("/users")
    public ResponseEntity<List<Order>> getUserOrders(@RequestParam String username) {
        return ResponseEntity.ok(orderService.showUserOrders(username));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @PutMapping("/update")
    public ResponseEntity<Order> updateOrder(@RequestBody Order order) {
        return ResponseEntity.ok(orderService.updateOrder(order));
    }

    @PostMapping({"/order"})
    public ResponseEntity<Pizza> addPizzaToOrder(Pizza pizza, Order order) {
        return ResponseEntity.ok(orderService.addPizzaToOrder(pizza, order));
    }
}
