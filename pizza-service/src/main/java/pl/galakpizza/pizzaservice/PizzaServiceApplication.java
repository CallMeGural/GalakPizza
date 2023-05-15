package pl.galakpizza.pizzaservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class PizzaServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(PizzaServiceApplication.class, args);
    }

}
