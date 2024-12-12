$(document).ready(function () {
    $("#register-form").submit(function (e) {
        e.preventDefault(); // 阻止表单默认提交

        // 获取表单输入值
        const name = $("#name").val().trim();
        const email = $("#email").val().trim();
        const password = $("#password").val().trim();
        const confirmPassword = $("#confirm-password").val().trim();

        // 验证姓名字段
        if (name.length < 3 || name.length > 50) {
            alert("姓名必须在3到50个字符之间！");
            $("#name").val(""); // 清空输入
            return;
        }

        // 密码匹配检查
        if (password !== confirmPassword) {
            alert("密码不匹配，请重试。");
            $("#password, #confirm-password").val(""); // 清空输入
            return;
        }

        // 检查电子邮件格式
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("请输入有效的电子邮件地址！");
            $("#email").val(""); // 清空输入
            return;
        }

        // 密码格式检查
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            alert("密码必须包含至少8个字符，包括一个大写字母、一个小写字母、一个数字和一个特殊字符（!@#$%^&*）！");
            $("#password, #confirm-password").val(""); // 清空输入
            return;
        }

        // 获取存储在 localStorage 中的用户数据
        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

        // 检查姓名是否已被注册
        const nameExists = existingUsers.some(user => user.name === name);
        if (nameExists) {
            alert("该姓名已被注册，请重新输入！");
            $("#name").val(""); // 清空姓名输入
            return;
        }

        // 检查邮箱是否已被注册
        const emailExists = existingUsers.some(user => user.email === email);
        if (emailExists) {
            alert("该邮箱已被注册，请重新填写表单！");
            $("#name, #email, #password, #confirm-password").val(""); // 清空所有输入
            return;
        }

        // 创建新用户对象
        const newUser = { name, email, password };

        // 将新用户添加到现有用户列表并保存
        existingUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(existingUsers));

        // 注册成功，跳转到登录页面
        alert("注册成功！您可以登录系统了。");
        window.location.href = "../auth/auth.html";
    });
});
