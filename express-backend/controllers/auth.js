const User = require("../model/User");
const bcrypt = require("bcrypt"); // Phương thức mã hóa mật khẩu
const jwt = require("jsonwebtoken"); // Tạo jwt cho từng user để lưu đăng nhập
const jwtSceret = require("../config/jwtSceret");
// Kiểm tra đăng nhập
exports.loginUser = async (req, res) => {
    const { email, passWord } = req.body;

    const user = await User.findOne({ email });// Kiểm tra email có tồn tại chưa

    if (user) {
        const isPasswordCorrect = await bcrypt.compare(passWord, user.passWord); // So sánh 2 mật khẩu có giống nhau không
        if (isPasswordCorrect) {
            const token = jwt.sign(user.email, jwtSceret); // Tạo token với email và 1 phần key được đưa vào

            return res.json({ token: token });
        } else {
            return res.send("Wrong password");
        }
    } else {
        return res.send(`This email ${email} does not exist`);

    }
}

//Tạo 1 user
exports.createUser = async (req, res) => {
    try {

        const { email, passWord } = req.body;

        const user = await User.findOne({ email });// Kiểm tra email có tồn tại chưa

        if (user) {
            return res.status(409).send("email exist");
        } else {


            const hashedPassword = await bcrypt.hash(passWord, 12);// Mã hóa mật khẩu

            const user = new User({

                email,
                passWord: hashedPassword,
            });
            const result = await user.save();
            return res.send(result);
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
}