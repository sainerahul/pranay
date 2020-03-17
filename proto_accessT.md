|       ENTITY        | CUSTOMER | EMPLOYEE | ADMIN |                  COMMENT                  | STATUS |
|:-------------------:|:--------:|:--------:|:-----:|:-----------------------------------------:|:------:|
|    GET_CUSTOMER     |    T     |    F     |   T   |           ALL CUSTOMER DETAILS            |  DONE  |
|    POST_CUSTOMER    |    T     |    F     |   T   |                                           |  DONE  |
|    PUT_CUSTOMER     |    T     |    F     |   T   |                                           |  DONE  |
|   DELETE_CUSTOMER   |    T     |    F     |   T   |                                           |  DONE  |
|    GET_MEDICINE     |    T     |    T     |   T   |                                           |  DONE  |
|    POST_MEDICINE    |    F     |    F     |   T   |                                           |  DONE  |
|    PUT_MEDICINE     |    F     |    F     |   T   |                                           |  DONE  |
|   DELETE_MEDICINE   |    F     |    F     |   T   |                                           |  DONE  |
|    GET_EMPLOYEE     |    F     |    T     |   T   |                                           |  DONE  |
|    POST_EMPLOYEE    |    F     |    F     |   T   |                                           |  DONE  |
|    PUT_EMPLOYEE     |    F     |    F     |   T   |                                           |  DONE  |
|   DELETE_EMPLOYEE   |    F     |    F     |   T   |                                           |  DONE  |
|      GET_STORE      |    T     |    T     |   T   |                                           |  DONE  |
|     POST_STORE      |    F     |    F     |   T   |                                           |  DONE  |
|      PUT_STORE      |    F     |    F     |   T   |                                           |  DONE  |
|    DELETE_STORE     |    F     |    F     |   T   |                                           |  DONE  |
|      GET_ORDER      |    F     |    F     |   T   |     ADMIN - ALL ORDERS OF ALL STORES      |  DONE  |
|     POST_ORDER      |    T     |    F     |   T   |                                           |  DONE  |
|      PUT_ORDER      |    F     |    T     |   T   |                                           |  DONE  |
|    DELETE_ORDER     |    T     |    F     |   T   |                                           |  DONE  |
| GET_COSTUMER/ORDERS |    T     |    F     |   T   |      CUSTOMER - ONLY CUSTOMER ORDERS      |  DONE  |
| GET_EMPLOYEE/ORDERS |    F     |    T     |   T   | EMPLOYEE  - ALL ORDERS OF THE EMP'S STORE |  DONE  |
|  GET_STORE/ORDERES  |    F     |    F     |   T   |                                           | DONE*  |