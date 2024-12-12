const products = [
    { name: '极限竞速：地平线4', price: 188, description: '竞速 开放世界', image: './images/地平线4.jpg' },
    { name: '黑神话悟空', price: 268, description: '动作 冒险', image: './images/黑神话悟空.jpg' },
    { name: '艾尔登法环', price: 239, description: '角色扮演 开放世界', image: './images/艾尔登法环.jpg' },
    { name: '赛博朋克2077', price: 298, description: '角色扮演 赛博朋克', image: './images/赛博朋克2077.jpg' },
    { name: '绝地求生：大逃杀', price: 128, description: '射击 生存', image: './images/绝地求生.jpg' },
    { name: '英雄联盟', price: 0, description: '多人在线竞技', image: './images/英雄联盟.jpg' },
    { name: '魔兽世界', price: 199, description: 'MMORPG', image: './images/魔兽世界.jpg' },
    { name: '只狼：影逝二度', price: 358, description: '动作 冒险', image: './images/只狼.jpg' },
    { name: '全面战争：三国', price: 299, description: '策略 战争', image: './images/全面战争三国.jpg' },
    { name: '地铁：离去', price: 179, description: '射击 生存', image: './images/地铁离去.jpg' },
    { name: '巫师3：狂猎', price: 229, description: '角色扮演 动作', image: './images/巫师3.jpg' },
    { name: '刺客信条：奥德赛', price: 199, description: '动作 角色扮演', image: './images/刺客信条奥德赛.jpg' },
    { name: '死亡岛：经典版', price: 168, description: '生存 恐怖', image: './images/死亡岛.jpg' },
    { name: '使命召唤：现代战争', price: 279, description: '射击 战争', image: './images/现代战争.jpg' },
    { name: 'GTA V', price: 249, description: '开放世界 动作', image: './images/GTA V.jpg' },
    { name: '反恐精英：全球攻势', price: 88, description: '射击 战术', image: './images/CSGO.jpg' },
    { name: '荒野大镖客2', price: 399, description: '开放世界 动作', image: './images/荒野大镖客2.jpg' },
    { name: '植物大战僵尸：花园战争2', price: 98, description: '策略 动作', image: './images/植物大战僵尸.jpg' },
    { name: '辐射4', price: 169, description: '角色扮演 生存', image: './images/辐射4.jpg' },
    { name: '生化危机2：重制版', price: 259, description: '恐怖 动作', image: './images/生化危机2重制版.jpg' }
];

// 通用存储操作函数
function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

// 函数用于将商品卡片添加到页面
function renderProducts(filteredProducts) {
    const $productContainer = $('.product-container');
    $productContainer.empty(); // 在添加新元素前清空容器

    filteredProducts.forEach(product => {
        const cardHTML = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-name">${product.name}</div>
                <div class="product-price">${product.price} 元</div>
                <div class="product-description">${product.description}</div>
                <button class="add-to-cart-btn" data-name="${product.name}" data-price="${product.price}">加入购物车</button>
            </div>
        `;
        $productContainer.append(cardHTML); // 将卡片添加到容器中
    });

    // 重新绑定“加入购物车”按钮事件
    bindAddToCartEvents();
}

// 绑定加入购物车事件
function bindAddToCartEvents() {
    $('.add-to-cart-btn').on('click', function () {
        const productName = $(this).data('name');
        const productPrice = $(this).data('price');

        // 获取当前购物车
        let cart = getFromStorage('cart');

        // 添加商品到购物车
        cart.push({ name: productName, price: productPrice });

        // 保存到本地存储
        saveToStorage('cart', cart);

        alert(`${productName} 已加入购物车`);
    });
}

// 更新按钮状态的函数
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

// 页面加载完成后的初始化操作
$(document).ready(function () {
    // 初始显示所有商品
    renderProducts(products);

    // 更新登录状态按钮
    updateAuthButton();

    // 搜索框过滤功能
    $('.search-box').on('input', function () {
        const searchQuery = $(this).val().toLowerCase();
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchQuery)
        );
        renderProducts(filteredProducts);
    });

    // 价格筛选功能
    $('#apply-filter').on('click', function () {
        const minPrice = parseFloat($('#min-price').val()) || 0; // 默认最小价格为0
        const maxPrice = parseFloat($('#max-price').val()) || Infinity; // 默认最大价格为无限大
        const filteredProducts = products.filter(product =>
            product.price >= minPrice && product.price <= maxPrice
        );
        renderProducts(filteredProducts);
    });

    // 退出功能
    $('#logout').click((event) => {
        event.preventDefault();
        sessionStorage.clear(); // 清除当前登录用户信息
        updateAuthButton(); // 更新按钮状态
        alert('您已成功退出系统！');
    });
});
