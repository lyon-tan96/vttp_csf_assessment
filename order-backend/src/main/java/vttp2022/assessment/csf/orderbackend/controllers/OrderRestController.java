package vttp2022.assessment.csf.orderbackend.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vttp2022.assessment.csf.orderbackend.models.Order;
import vttp2022.assessment.csf.orderbackend.models.OrderSummary;
import vttp2022.assessment.csf.orderbackend.models.Response;
import vttp2022.assessment.csf.orderbackend.repositories.OrderRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping(path = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class OrderRestController {

    @Autowired
    private OrderRepository orderRepo;

    @PostMapping(path="/order", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> submitOrder(@RequestBody String payload) {
        //TODO: process POST request

        Order order;
        Response resp;

        
        try {
            order = Order.create(payload);
            System.out.println(order);
        } catch (Exception e) {
            // TODO: handle exception
            resp = new Response();
            resp.setCode(400);
            resp.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(resp.toJson().toString());
        }
        

        resp = new Response();

        resp.setCode(201);
        resp.setMessage("order created.");
        resp.setData(order.toJson().toString());
        
        return ResponseEntity.status(HttpStatus.CREATED).body(resp.toJson().toString());
    }
    

    @GetMapping(path="/order/${email}/all")
    public ResponseEntity<String> getOrders(@PathVariable String email) {
        Optional<OrderSummary> opt = orderRepo.getOrder(email);
        OrderSummary o = opt.get();
        return ResponseEntity.status(HttpStatus.OK).body(o.getAmount().toString());
    }

}
