document.addEventListener('DOMContentLoaded', function() {
    const navCards = document.querySelectorAll('.nav-card');
    const chatPages = document.querySelectorAll('.chat-page');
    
    // 切换页面函数
    function switchToPage(pageId, navElement = null) {
        // 移除所有活跃状态
        navCards.forEach(function(c) {
            c.classList.remove('active');
        });
        chatPages.forEach(function(page) {
            page.classList.remove('active');
        });
        // 添加当前活跃状态
        if (navElement) {
            navElement.classList.add('active');
        }
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            // 滚动到顶部
            window.scrollTo(0, 0);
        }
    }
    
    // 导航点击事件
    navCards.forEach(function(card) {
        card.addEventListener('click', function() {
            switchToPage(this.dataset.page, this);
        });
    });
    
    // 下拉菜单功能
    function setupDropdown(dropdownId) {
        const dropdown = document.getElementById(dropdownId);
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item');
        let dropdownTimeout;
        
        // 鼠标悬停显示下拉菜单
        dropdown.addEventListener('mouseenter', function() {
            clearTimeout(dropdownTimeout);
            dropdownMenu.classList.add('show');
        });
        
        // 鼠标离开延迟隐藏下拉菜单
        dropdown.addEventListener('mouseleave', function() {
            dropdownTimeout = setTimeout(function() {
                dropdownMenu.classList.remove('show');
            }, 300);
        });
        
        // 下拉菜单鼠标进入时取消隐藏
        dropdownMenu.addEventListener('mouseenter', function() {
            clearTimeout(dropdownTimeout);
        });
        
        // 下拉菜单鼠标离开时隐藏
        dropdownMenu.addEventListener('mouseleave', function() {
            dropdownTimeout = setTimeout(function() {
                dropdownMenu.classList.remove('show');
            }, 300);
        });
        
        // 下拉菜单项点击
        dropdownItems.forEach(function(item) {
            item.addEventListener('click', function(e) {
                e.stopPropagation(); // 阻止事件冒泡
                const targetPage = this.getAttribute('data-page');
                switchToPage(targetPage, dropdown);
                dropdownMenu.classList.remove('show');
            });
        });
    }
    
    // 下拉菜单
    setupDropdown('first-year-dropdown');
    setupDropdown('second-year-dropdown');
    setupDropdown('third-year-dropdown');
    
    // 页面切换时重置滚动状态
    navCards.forEach(function(card) {
        card.addEventListener('click', function() {
            if (this.dataset.page === 'page-1') {
                homeScrolled = false;
                homeContent.style.display = 'none';
            }
        });
    });
    
    // 双击放大图片
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        cursor: zoom-out;
    `;
    const enlargedImg = document.createElement('img');
    enlargedImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 10px;
        box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
    `;
    overlay.appendChild(enlargedImg);
    document.body.appendChild(overlay);
    
    // 双击触发
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('dblclick', function() {
            enlargedImg.src = this.src;
            enlargedImg.alt = this.alt;
            overlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // 点击背景关闭放大的图片
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            overlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    //音乐块点击播放功能
    document.addEventListener('click', function() {
        var audio = document.getElementById('bgm');
            audio.play().then(() => {
            console.log('点击播放成功');
            }).catch(error => {
            console.log('播放失败:', error);
            });
    }, { once: true }); 

    //关音乐
    window.addEventListener('beforeunload', function() {
        var audio = document.getElementById('bgm');
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    });
});