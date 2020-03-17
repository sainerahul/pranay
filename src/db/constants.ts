export = {
    // medicine :table queries
    POST_MEDICINE:
        "INSERT INTO medicine(medicine_name,medicine_manufacturer,medicine_price) VALUES($1, $2, $3) RETURNING *",
    GET_MEDICINE:
        "SELECT * FROM medicine",
    GET_MEDICINE_WITH_ID:
        'SELECT * FROM medicine WHERE medicine_id = $1',
    PUT_MEDICINE:
        "UPDATE medicine SET medicine_name = $2, medicine_manufacturer = $3, medicine_price = $4 WHERE medicine_id = $1 RETURNING *",
    DELETE_MEDICINE:
        "DELETE FROM medicine WHERE medicine_id = $1",
    //status : status codes
    DB_SUCCESS: 1,
    DB_FAILURE: -1,
    // jwt :secret-token
    JWT_SECRET_TOKEN: "valar-morghulis-valar-dohaeris",

    //Orders table queries
    POST_ORDERS:
        "INSERT INTO orders(store_id,customer_id,amount,timestamp) VALUES($1,$2,$3,$4)",
    GET_MEDICINE_PRICE:
        "SELECT medicine_price FROM medicine where medicine_id = ($1)",
    GET_ORDER_ID:
        "SELECT order_id FROM orders where timestamp = ($1)",
    POST_ORDER_DETAILS:
        "INSERT INTO order_details(order_id, medicine_id, medicine_quantity, amount) VALUES($1, $2, $3, $4)",
    GET_ORDER_DETAILS_BY_ID:
        "SELECT od.medicine_id, med.medicine_name, od.medicine_quantity, od.amount FROM order_details od, medicine med where (od.order_id=$1 and od.medicine_id = med.medicine_id)",
    GET_TOTAL_AMOUNT:
        "SELECT amount FROM orders where order_id = ($1)",
    GET_ORDER_IDS:
        "SELECT order_id FROM orders",
    DELETE_ORDER:
        "DELETE FROM orders WHERE order_id = ($1)",
    GET_ORDER_BY_ID:
        "SELECT * FROM orders WHERE order_id = ($1)",
    GET_ORDERS_BY_CUSTOMER_ID:
        "SELECT * FROM orders WHERE customer_id = ($1)",

    //Admin table queries
    GET_ADMIN:
        "SELECT * FROM admin",
    GET_ADMIN_WITH_ID:
        "SELECT * FROM admin WHERE admin_id = $1",
    POST_ADMIN:
        "INSERT INTO admin(admin_name, admin_mail, admin_password_hash) VALUES($1, $2, $3) RETURNING *",
    PUT_ADMIN:
        "UPDATE admin SET admin_name = $2, admin_mail = $3 WHERE admin_id = $1 RETURNING *",//Doesn't support pwd change
    DELETE_ADMIN:
        "DELETE FROM admin WHERE admin_id = $1",
    FIND_USER:
        "SELECT admin_id FROM admin WHERE admin_mail = ($1)",
    SELECT_ADMIN_BY_ID:
        "SELECT * FROM admin WHERE admin_id=($1)",

    //Access table queries
    POST_ACCESS:
        "INSERT INTO access(route, customer, employee, admin) VALUES($1, $2, $3, $4) RETURNING *",
    GET_ACCESS:
        "SELECT * FROM access WHERE route = $1",

    // Store table queries
    GET_ORDERS_BY_STORE:
        "SELECT * FROM orders  WHERE store_id = $1",
    //Order details queries
    GET_ORDER_DETAILS_BY_EMPLOYEE_ID:
        // "SELECT * FROM orders where employee_id=$1",
        "SELECT * FROM orders where store_id=(select employee_store_id from employee where employee_id = ($1))",
    // Employee table queries
    GET_EMPLOYEE_STORE_ID:
        "SELECT employee_store_id FROM employee WHERE employee_id = $1",

    // Order_details table queries
    GET_ORDER_DETAILS:
        "SELECT * FROM order_details WHERE order_id = ($1)",

    // Store_medicine table queries
    GET_STORE_MEDICINES:
        "SELECT * FROM store_medicine WHERE store_id = ($1)",

    // Store_medicine table queries
    POST_STORE_MEDICINE: 
        "INSERT INTO store_medicine(store_id, medicine_id, medicine_quantity) VALUES($1, $2, $3) RETURNING *",

    // AUTHORIZATION STATUS
    UNAUTHORIZED_STATUS: -2,
    AUTHORIZED_STATUS: 2,
    //LOGIN STATUS
    LOGIN_SUCCESSFUL: 100,
    LOGIN_FAILED: 101,
    USER_ALREADY_EXITS: 102,
    USER_CREATED: 103,
    //hashing :bcryptjs 
    SALT_COUNT: 10
}