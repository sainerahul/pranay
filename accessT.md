|      ENTITY       | CUSTOMER | EMPLOYEE | ADMIN |             COMMENT             |
|:-----------------:|:--------:|:--------:|:-----:|:-------------------------------:|
| GET_CUSTOMER/:ID  |    T     |    F     |   T   | LOGGED IN CUSTOMER DETAILS ONLY |
| POST_CUSTOMER/:ID |    T     |    F     |   T   |                                 |
| PUT_CUSTOMER/:ID  |    T     |    F     |   T   |                                 |
| DEL_CUSTOMER/:ID  |    T     |    F     |   T   |                                 |
|   GET_CUSTOMER/   |    F     |    F     |   T   |      ALL CUSTOMER DETAILS       |
|  POST_CUSTOMER/   |    F     |    F     |   T   |                                 |
|   PUT_CUSTOMER/   |    F     |    F     |   T   |                                 |
|   DEL_CUSTOMER/   |    F     |    F     |   T   |                                 |
| GET_MEDICINE/:ID  |    T     |    T     |   T   |                                 |
|   GET_MEDICINE/   |    T     |    T     |   T   |                                 |
|  POST_MEDICINE/   |    F     |    F     |   T   |                                 |
|   PUT_MEDICINE/   |    F     |    F     |   T   |                                 |
|   DEL_MEDICINE/   |    F     |    F     |   T   |                                 |
| GET_EMPLOYEE/:ID  |    F     |    T     |   T   |                                 |
| POST_EMPLOYEE/:ID |    F     |    T     |   T   |                                 |
| PUT_EMPLOYEE/:ID  |    F     |    T     |   T   |                                 |
| DEL_EMPLOYEE/:ID  |    F     |    F     |   T   |                                 |
|   GET_EMPLOYEE/   |    F     |    F     |   T   |                                 |
|  POST_EMPLOYEE/   |    F     |    F     |   T   |                                 |
|   PUT_EMPLOYEE/   |    F     |    F     |   T   |                                 |
|   DEL_EMPLOYEE/   |    F     |    F     |   T   |                                 |
|    GET_STORE/     |    T     |    T     |   T   |                                 |
|    POST_STORE/    |    F     |    F     |   T   |                                 |
|    PUT_STORE/     |    F     |    F     |   T   |                                 |
|    DEL_STORE/     |    F     |    F     |   T   |                                 |