package pl.galakpizza.pizzaservice.model;

import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(name = "user-service")
public interface UserServiceClient {
}
