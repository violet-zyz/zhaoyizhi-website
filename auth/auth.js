$(document).ready(function () {
    // 登录表单提交事件
    $("#auth-form").on("submit", function (event) {
        event.preventDefault(); // 防止表单默认提交

        const email = $("#email").val().trim();
        const password = $("#password").val().trim();

        // 检查邮箱和密码不能为空
        if (!email || !password) {
            alert("邮箱和密码不能为空！");
            if (!email) $("#email").val(""); // 清空邮箱输入
            if (!password) $("#password").val(""); // 清空密码输入
            return;
        }

        // 检查邮箱格式
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("邮箱输入有误，请重新输入！");
            $("#email").val(""); // 清空邮箱输入
            return;
        }

        // 检查 Local Storage 中是否有已保存的用户数据
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email);

        // 验证用户信息
        if (user) {
            if (user.password === password) {
                alert("登录成功！");
                sessionStorage.setItem("currentUser", JSON.stringify(user));
                window.location.href = "../index.html"; // 登录成功后跳转至主页面
            } else {
                alert("密码输入有误，请重新输入！");
                $("#password").val(""); // 清空密码输入
            }
        } else {
            alert("邮箱或密码错误，请重新输入！");
            $("#email").val(""); // 清空邮箱输入
            $("#password").val(""); // 清空密码输入
        }
    });

    // 注册页面跳转
    $("#register-link").on("click", function (event) {
        event.preventDefault();
        window.location.href = "../register/register.html"; // 跳转到注册页面
    });

    // 更新登录/退出按钮的显示状态
    updateAuthButton();

    // 退出功能
    $('#logout').click((event) => {
        event.preventDefault();
        sessionStorage.clear(); // 清除当前登录用户信息
        updateAuthButton();
        alert('您已成功退出系统！');
    });
});

// 更新登录/退出按钮的显示状态
function updateAuthButton() {
    const user = sessionStorage.getItem('currentUser');
    if (user) {
        $('#logout').show();
        $('#login').hide();
    } else {
        $('#logout').hide();
        $('#login').show();
    }
}
