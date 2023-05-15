package pl.galakpizza.userservice.service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentMethod;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.stereotype.Service;
import pl.galakpizza.userservice.model.Order;
import pl.galakpizza.userservice.model.Pizza;
import pl.galakpizza.userservice.model.User;
import pl.galakpizza.userservice.model.dto.OrderDto;
import pl.galakpizza.userservice.repository.OrderRepository;
import pl.galakpizza.userservice.repository.UserRepository;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@Log
public class OrderService {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    public Order confirmOrder(OrderDto dto) throws StripeException {
        Stripe.apiKey = "sk_test_51MvQE4KF6BtFLQH3mg8QEcWuDH3XXg6ttfkd2cLsbqjqZZjSrG2tjj6VoR6nN1KTOnpujCriiKxuSOj0f5JJoyXo00MOlC5wNS";
        PaymentMethod paymentMethod = PaymentMethod.retrieve(dto.getPaymentMethod());
        Order order = new Order();
        order.setClient(userRepository.findByUsername(dto.getUsername()).orElseThrow());
        order.setAddress(dto.getAddress());
        order.setPizzas(dto.getPizzas());
        order.setPlacedAt(new Date());
        order.setCreditCard(paymentMethod.getCard().getLast4());
        order.setExpiration(paymentMethod.getCard().getExpMonth()+"/"+paymentMethod.getCard().getExpYear());
        order.setStatus(Order.OrderStatus.OPLACONY);
        order.setCost(dto.getCost());
        return orderRepository.save(order);
    }
    @Transactional
    public List<Order> showUserOrders(String username) {
        User user = userRepository.findByUsername(username).orElseThrow();
        return orderRepository.findAllByClient(user);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order updateOrder(Order order) {
        return orderRepository.save(order);
    }

    public Pizza addPizzaToOrder(Pizza pizza, Order order) {
        order.addPizza(pizza);
        return pizza;
    }
}
