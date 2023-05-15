package pl.galakpizza.userservice.controller;

import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class PaymentController {

    Gson gson = new Gson();

    @PostMapping({"/create-payment-intent/{amount}"})
    public String createPaymentIntent(@PathVariable double amount) throws StripeException {
        Stripe.apiKey = "YOUR_STRIPE_KEY";
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder().setAmount((long)amount).setCurrency("pln").build();
        PaymentIntent paymentIntent = PaymentIntent.create(params);
        Map<String, Object> responseData = new HashMap();
        responseData.put("clientSecret", paymentIntent.getClientSecret());
        return this.gson.toJson(responseData);
    }
}
