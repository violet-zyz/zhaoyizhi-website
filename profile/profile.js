$(document).ready(function () {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

    // 未授权用户重定向
    if (!currentUser) {
        alert("您未授权，请登录。");
        window.location.href = "../auth/auth.html";
        return;
    }

    // 显示用户信息
    $("#user-name").text(currentUser.name);
    $("#user-email").text(currentUser.email);

    // 更改密码表单提交
    $("#change-password-form").submit(function (e) {
        e.preventDefault();

        const currentPassword = $("#current-password").val().trim();
        const newPassword = $("#new-password").val().trim();
        const confirmNewPassword = $("#confirm-new-password").val().trim();

        // 检查当前密码是否正确
        if (currentPassword !== currentUser.password) {
            alert("当前密码输入错误，请重试！");
            $("#current-password").val("");
            return;
        }

        // 检查新密码和确认密码是否匹配
        if (newPassword !== confirmNewPassword) {
            alert("新密码与确认密码不匹配，请重试！");
            $("#new-password, #confirm-new-password").val("");
            return;
        }

        // 检查新密码格式
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            alert("新密码必须包含至少8个字符，包括一个大写字母、一个小写字母、一个数字和一个特殊字符（!@#$%^&*）！");
            $("#new-password, #confirm-new-password").val("");
            return;
        }

        // 更新本地存储中的用户信息
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const userIndex = users.findIndex(user => user.email === currentUser.email);
        if (userIndex !== -1) {
            users[userIndex].password = newPassword;
            localStorage.setItem("users", JSON.stringify(users));
        }

        // 更新 sessionStorage 中的当前用户信息
        currentUser.password = newPassword;
        sessionStorage.setItem("currentUser", JSON.stringify(currentUser));

        alert("密码已成功更改！");
        $("#current-password, #new-password, #confirm-new-password").val("");
    });
});
