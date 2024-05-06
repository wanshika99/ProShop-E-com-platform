import bcrypt from "bcryptjs";

const users = [
    {
        name: "Admin User",
        email: "admin@email.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true,
    },
    {
        name: "John Smith",
        email: "john@email.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true,
    },
    {
        name: "Alan Bob",
        email: "alan@email.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false,
    }
];

export default users;
