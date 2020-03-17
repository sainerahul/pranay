'use strict';
let queries={
    select: "select * from store",
    selectById: "select * from store where store_id=($1)",
    insert: "insert into store(store_branch,store_phone,store_address) values($1,$2,$3)",  
    update: "update store set store_branch=($1),store_phone=($2),store_address=($3) where store_id=($4)",
    delete: "delete from store where store_id = ($1)"
};
export = Object.freeze(queries);