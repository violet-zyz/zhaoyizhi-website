$(document).ready(function () {
    const slider = $('.slider');
    const slides = $('.slide');
    const totalSlides = slides.length;
    let currentIndex = 0;
    
    //滑块位置更新
    function updateSlider() {
    const offset = -currentIndex * 100; //百分比变化
    slider.css('transform', `translateX(${offset}%)`);
    }
    
    //“Next”按钮处理程序
    $('.next').click(function () {
    if (currentIndex < totalSlides - 1) {
    currentIndex++;
    } else {
    currentIndex = 0; // 回到第一张幻灯片
    }
    updateSlider();
    });
    
    // 上一个按钮处理程序
    $('.prev').click(function () {
    if (currentIndex > 0) {
    currentIndex--;
    } else {
    currentIndex = totalSlides - 1; // 转到最后一张幻灯片
    }
    updateSlider();
    });
    });
    