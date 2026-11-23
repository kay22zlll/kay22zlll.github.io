/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Waterfall (masonry) layout for the portfolio grid
    initWaterfall();

});

function initWaterfall() {
    const containers = document.querySelectorAll('.waterfall-container');

    containers.forEach(container => {
        const items = container.querySelectorAll('.waterfall-item');

        const layout = () => {
            container.classList.add('is-masonry');
            const gap = parseFloat(getComputedStyle(container).getPropertyValue('--waterfall-gap')) || 0;
            items.forEach(item => {
                // 每張卡片跨越的列數 = 卡片高度 + 底部間距（列高為 1px）
                const height = item.getBoundingClientRect().height;
                item.style.gridRowEnd = 'span ' + Math.ceil(height + gap);
            });
        };

        // 圖片 / 影片載入前高度未知，載入完成後重新排版
        container.querySelectorAll('img').forEach(img => {
            if (!img.complete) {
                img.addEventListener('load', layout);
                img.addEventListener('error', layout);
            }
        });
        container.querySelectorAll('video').forEach(video => {
            if (video.readyState < 1) {
                video.addEventListener('loadedmetadata', layout);
                video.addEventListener('error', layout);
            }
        });

        // 欄寬改變（視窗縮放、側邊欄切換）時重新計算
        if ('ResizeObserver' in window) {
            let lastWidth = 0;
            new ResizeObserver(entries => {
                const width = entries[0].contentRect.width;
                if (width !== lastWidth) {
                    lastWidth = width;
                    layout();
                }
            }).observe(container);
        } else {
            window.addEventListener('resize', layout);
        }

        layout();
        // 網路字型載入後文字高度可能改變
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(layout);
        }
    });
}
