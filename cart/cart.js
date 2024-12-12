$(document).ready(function () {
    // 商品图片地址映射表
    const productImages = {
        "极限竞速：地平线4": "../images/地平线4.jpg",
        "黑神话悟空": "../images/黑神话悟空.jpg",
        "艾尔登法环": "../images/艾尔登法环.jpg",
        "赛博朋克2077": "../images/赛博朋克2077.jpg",
        "绝地求生：大逃杀": "../images/绝地求生.jpg",
        "英雄联盟": "../images/英雄联盟.jpg",
        "魔兽世界": "../images/魔兽世界.jpg",
        "只狼：影逝二度": "../images/只狼.jpg",
        "全面战争：三国": "../images/全面战争三国.jpg",
        "地铁：离去": "../images/地铁离去.jpg",
        "巫师3：狂猎": "../images/巫师3.jpg",
        "刺客信条：奥德赛": "../images/刺客信条奥德赛.jpg",
        "死亡岛：经典版": "../images/死亡岛.jpg",
        "使命召唤：现代战争": "../images/现代战争.jpg",
        "GTA V": "../images/GTA V.jpg",
        "反恐精英：全球攻势": "../images/CSGO.jpg",
        "荒野大镖客2": "../images/荒野大镖客2.jpg",
        "植物大战僵尸：花园战争2": "../images/植物大战僵尸.jpg",
        "辐射4": "../images/辐射4.jpg",
        "生化危机2：重制版": "../images/生化危机2重制版.jpg",


    };

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateTotalPrice() {
        const totalPrice = cart.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);
        $('#total-price').text(totalPrice.toFixed(2) + ' 元');
    }

    function renderCartItems() {
        const $cartItems = $('.cart-items');
        $cartItems.empty();

        if (cart.length === 0) {
            $cartItems.html('<p>购物车为空</p>');
        } else {
            cart.forEach((item, index) => {
                // 根据商品名称从映射表中获取图片路径
                const imagePath = productImages[item.name] || '../images/default.jpg';

                $cartItems.append(`
                    <div class="cart-item">
                        <img src="${imagePath}" alt="${item.name}">
                        <div class="cart-item-info">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">${item.price.toFixed(2)} 元</div>
                        </div>
                        <div class="cart-item-actions">
                            <div class="cart-item-quantity">
                                <button class="decrease-btn" data-index="${index}">-</button>
                                <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-index="${index}">
                                <button class="increase-btn" data-index="${index}">+</button>
                            </div>
                            <button class="delete-btn" data-index="${index}">删除</button>
                        </div>
                    </div>
                `);
            });
        }

        updateTotalPrice();
    }

    $(document).on('click', '.increase-btn', function () {
        const index = $(this).data('index');
        cart[index].quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
    });

    $(document).on('click', '.decrease-btn', function () {
        const index = $(this).data('index');
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCartItems();
        }
    });

    $(document).on('input', '.quantity-input', function () {
        const index = $(this).data('index');
        const newQuantity = parseInt($(this).val());
        if (newQuantity > 0) {
            cart[index].quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCartItems();
        }
    });

    $(document).on('click', '.delete-btn', function () {
        const index = $(this).data('index');
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
    });

    renderCartItems();

    // 结算按钮弹窗功能
    $('.checkout-btn').on('click', function () {
        $('body').append(`
            <div class="checkout-modal">
                <div class="modal-content">
                    <img src="../images/微信支付.jpg" alt="结算成功">
                    <button class="close-modal">已支付</button>
                </div>
            </div>
        `);

        $('.close-modal').on('click', function () {
            // 清空购物车数据
            localStorage.removeItem('cart');
            renderCartItems();

            // 显示支付成功提示
            $('.checkout-modal').html(`
                <div class="modal-content">
                    <p style="font-size: 20px; color: #28a745;">支付成功！</p>
                    <button class="final-close">关闭</button>
                </div>
            `);

            // 关闭支付成功提示并刷新页面
            $('.final-close').on('click', function () {
                $('.checkout-modal').remove();
                location.reload(); // 刷新当前页面
            });
        });
    });
});