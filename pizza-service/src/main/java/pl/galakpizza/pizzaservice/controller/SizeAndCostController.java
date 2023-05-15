package pl.galakpizza.pizzaservice.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.galakpizza.pizzaservice.model.SizeAndCost;
import pl.galakpizza.pizzaservice.repository.SizeAndCostRepository;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/size-and-cost")
@RequiredArgsConstructor
public class SizeAndCostController {
    private final SizeAndCostRepository sizeAndCostRepository;

    @GetMapping
    public List<SizeAndCost> getCustomPizzaSizeAndCost() {
        return sizeAndCostRepository.findAllById(Arrays.asList(1L, 2L, 3L));
    }
}
