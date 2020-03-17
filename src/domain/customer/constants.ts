'use strict';
let queries = {
    select: "select * from customer",
    selectById: "select * from customer where customer_id=($1)",
    insert: "insert into customer(customer_name,customer_email,customer_phone,customer_address,customer_password) values($1,$2,$3,$4,$5)",
    update: "update customer set customer_name=($1),customer_email=($2),customer_phone=($3),customer_address=($4),customer_password=($5) where customer_id=($6)",
    delete: "delete from customer where customer_id = ($1)",
    FIND_USER: "SELECT customer_id FROM customer WHERE customer_email = ($1)"
};
export = Object.freeze(queries);