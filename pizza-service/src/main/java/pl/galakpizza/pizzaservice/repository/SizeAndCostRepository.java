package pl.galakpizza.pizzaservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.galakpizza.pizzaservice.model.SizeAndCost;

@Repository
public interface SizeAndCostRepository extends JpaRepository<SizeAndCost, Long> {
}
