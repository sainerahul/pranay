'use strict';
let queries={
    //SELECT_EMPLOYEE: "select * from employee",
    SELECT_EMPLOYEE:"select employee.employee_id,employee.employee_name,employee.employee_mail,employee.employee_phone,employee.employee_address,employee.employee_password,employee.employee_store_id,store.store_branch from employee,store where employee.employee_store_id=store.store_id ",
    SELECT_EMPLOYEE_WITHID: "select employee.employee_id,employee.employee_name,employee.employee_mail,employee.employee_phone,employee.employee_address,employee.employee_password,employee.employee_store_id,store.store_branch from employee,store where employee.employee_id=($1) and employee.employee_store_id=store.store_id ",
    INSERT_EMPLOYEE: "insert into employee(employee_name,employee_mail,employee_phone,employee_address,employee_password,employee_store_id) values($1,$2,$3,$4,$5,(select store_id from store where store_branch=($6)))",  
    UPDATE_EMPLOYEE: "update employee set employee_name=($1),employee_mail=($2),employee_phone=($3),employee_address=($4),employee_password=($5),employee_store_id=(select store_id from store where store_branch=($6)) where employee_id=($7)",
    DELETE_EMPLOYEE: "delete from employee where employee_id = ($1)",
    FIND_EMPLOYEE: "SELECT employee_id FROM employee WHERE employee_mail = ($1)",
    SELECT_EMPLOYEE_BY_ID: "SELECT * from employee WHERE employee_id=($1)",
};
export = Object.freeze(queries);