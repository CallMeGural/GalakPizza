package pl.galakpizza.pizzaservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.galakpizza.pizzaservice.model.Pizza;
import pl.galakpizza.pizzaservice.model.User;

import java.util.List;

@Repository
public interface PizzaRepository extends JpaRepository<Pizza, Long> {
    @Query("Select p from Pizza p")
    List<Pizza> findAll();

    @Query("select p from Pizza p where p.custom=false")
    List<Pizza> findAllByCustomIsFalse();

    List<Pizza> findAllByUserId(long userId);
}
