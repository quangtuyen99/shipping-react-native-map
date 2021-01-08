// const User = require("../model/User");
// const bcrypt = require("bcrypt"); // Phương thức mã hóa mật khẩu

const User = require("../model/User")

// Lấy tất cả user
exports.getUser = async (req, res) => {
    const userFromDB = await User.find({});

    // Trả về mảng user k có password
    const usersWithoutPassword = userFromDB.map(
        ({ email, firstName, lastName, phone }) => ({

            email,
            firstName,
            lastName,
            phone

        })
    );

    return res.json(usersWithoutPassword);
}


