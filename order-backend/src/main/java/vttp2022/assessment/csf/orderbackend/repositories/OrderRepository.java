package vttp2022.assessment.csf.orderbackend.repositories;

import java.sql.ResultSet;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import vttp2022.assessment.csf.orderbackend.models.Order;
import vttp2022.assessment.csf.orderbackend.models.OrderSummary;

@Repository
public class OrderRepository {
    
    private static final String SQL_POST_ORDER = "insert into orders(name, email, pizza_size, thick_crust, sauce, toppings, comments) values(?,?,?,?,?,?,?)";
    private static final String SQL_GET_ORDER = "select * from orders where email = ?";

    @Autowired
    private JdbcTemplate template;

    public boolean postOrder(String name, String email, Integer pizza_size, String thick_crust, String sauce, String[] toppings, String comments) {

        int updated = template.update(SQL_POST_ORDER, name, email, pizza_size,thick_crust,sauce,toppings, comments);
        return updated == 1;
    }

    public Optional<OrderSummary> getOrder(String email) {

        return template.query(SQL_GET_ORDER, (ResultSet rs) -> { 
            if(!rs.next()) 
                return Optional.empty();
            return Optional.of(Order.create(rs)); 
        }, email );   }

}
