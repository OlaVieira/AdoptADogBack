import {createPool} from "mysql2/promise";

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'dogs_for_adoption',
    namedPlaceholders: true,
    decimalNumbers: true,
});
