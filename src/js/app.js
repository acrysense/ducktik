document.addEventListener('DOMContentLoaded', function () {
    // HEIGHT 100VH FIX FOR IOS
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // RESIZE
    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
    
    let getScrollBarSize = (function() {
        var el = window.document.createElement('textarea'), style = {
            'visibility': 'hidden', 'position': 'absolute', 'zIndex': '-2147483647',
            'top': '-1000px', 'left': '-1000px', 'width': '1000px', 'height': '1000px',
            'overflow': 'scroll', 'margin': '0', 'border': '0', 'padding': '0'
        }, support = el.clientWidth !== undefined && el.offsetWidth !== undefined;

        for (var key in style) {
            if (style.hasOwnProperty(key)) {
                el.style[key] = style[key];
            }
        }

        return function() {
            var size = null;
            if (support && window.document.body) {
                window.document.body.appendChild(el);
                size = el.offsetWidth - el.clientWidth;
                window.document.body.removeChild(el);
            }
            return size;
        };
    })();
    
    // SMOOTH SCROLL
    function currentYPosition() {
        // Firefox, Chrome, Opera, Safari
        if (self.pageYOffset) return self.pageYOffset;

        // Internet Explorer 6 - standards mode
        if (document.documentElement && document.documentElement.scrollTop)
            return document.documentElement.scrollTop;
        
        // Internet Explorer 6, 7 and 8
        if (document.body.scrollTop) return document.body.scrollTop;

        return 0;
    } 
    
    function elmYPosition(eID) {
        let elm = document.getElementById(eID);
        let y = elm.offsetTop;
        let node = elm;
        while (node.offsetParent && node.offsetParent != document.body) {
            node = node.offsetParent;
            y += node.offsetTop;
        } return y;
    }
    
    function smoothScroll(eID) {
        let startY = currentYPosition();
        let stopY = elmYPosition(eID);
        let distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        let speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        let step = Math.round(distance / 25);
        let leapY = stopY > startY ? startY + step : startY - step;
        let timer = 0;
        if (stopY > startY) {
            for (let i = startY; i < stopY; i += step ) {
                setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for (let i = startY; i > stopY; i -= step ) {
            setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
    }

    // ALL LINKS SMOOTH SCROLL
    const allLinks = document.querySelectorAll('a[href^="#"]')

    if (allLinks) {
        allLinks.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault()
        
                setTimeout(() => {
                    if (item.getAttribute('href').length > 1) {
                        smoothScroll(item.getAttribute('href').slice(1))
                    }
                }, 500);
            })
        })
    }
    
    // MOBILE MENU
    const hamburger = document.getElementById('hamburger-toggle')
    const menu = document.querySelector('.menu')
    const menuClose = document.getElementById('menu-close')
    const menuOverlay = document.querySelector('.menu-overlay')

    if (hamburger) {
        hamburger.addEventListener('click', (event) => {
            event.preventDefault()

            if (hamburger.classList.contains('hamburger--active') && menu.classList.contains('menu--active')) {
                hamburger.classList.remove('hamburger--active')
                menu.classList.remove('menu--active')
                menuOverlay.classList.remove('menu-overlay--active')
                document.documentElement.classList.remove('scroll-disabled')
                document.body.style.marginRight = '0px'
            } else {
                hamburger.classList.add('hamburger--active')
                menu.classList.add('menu--active')
                menuOverlay.classList.add('menu-overlay--active')
                document.documentElement.classList.add('scroll-disabled')
                document.body.style.marginRight = getScrollBarSize() + 'px'
            }
        })
    }

    if (menuClose) {
        menuClose.addEventListener('click', (event) => {
            event.preventDefault()

            hamburger.classList.remove('hamburger--active')
            menu.classList.remove('menu--active')
            menuOverlay.classList.remove('menu-overlay--active')
            document.documentElement.classList.remove('scroll-disabled')
            document.body.style.marginRight = '0px'
        })
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', (event) => {
            event.preventDefault()

            hamburger.classList.remove('hamburger--active')
            menu.classList.remove('menu--active')
            menuOverlay.classList.remove('menu-overlay--active')
            document.documentElement.classList.remove('scroll-disabled')
            document.body.style.marginRight = '0px'
        })
    }

    // SEARCH
    const searchInput = document.querySelectorAll('.c-search__input')

    if (searchInput) {
        searchInput.forEach(item => {
            item.addEventListener('focus', () => {
                const searchParent = item.closest('.c-search')

                searchParent.classList.add('c-search--active')
            })
            item.addEventListener('blur', () => {
                const searchParent = item.closest('.c-search')

                searchParent.classList.remove('c-search--active')
            })
        })
    }

    // ACCORDIONs
    const accordionTrigger = document.querySelectorAll('.accordion-cart__trigger')

    if (accordionTrigger) {
        accordionTrigger.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault()

                if (item.parentNode.classList.contains('accordion-cart__item--active')) {
                    item.parentNode.classList.remove('accordion-cart__item--active')
                } else {
                    item.parentNode.classList.add('accordion-cart__item--active')
                }
            })
        })
    }

    // DROPDOWNs
    const dropdownDownloadInfo = document.querySelectorAll('.download-info__btn')
    const dropdownLanguage = document.querySelectorAll('.language__btn')

    const useItemChecker = (el, onClickOutside) => {
        const checkBodyClick = (e) => {
            let currentEl = e.target;

            while (currentEl) {
                if (currentEl === el) break;
                currentEl = currentEl.parentNode
            }

            if (!currentEl) {
                onClickOutside()
                removeBodyChecker()
            }
        }
        function setBodyChecker  ()  {
            document.documentElement.addEventListener('click', checkBodyClick)
        }
        function removeBodyChecker ()  {
            document.documentElement.removeEventListener('click', checkBodyClick)
        }
        return {setBodyChecker, removeBodyChecker}
    }

    if (dropdownDownloadInfo) {
        dropdownDownloadInfo.forEach(item => {
            const close = () => {
                item.closest('.download-info').classList.remove('download-info--active')
            }
            const itemChecker = useItemChecker(item.parentNode, close)

            item.addEventListener('click', (event) => {
                event.preventDefault()

                const canHover = window.matchMedia('(hover: none)').matches;
                const parent = item.closest('.download-info')

                if (canHover) {
                    if (!parent.classList.contains('download-info--active')) {
                        parent.classList.add('download-info--active')
                        itemChecker.setBodyChecker()
                    } else {
                        close()
                    }
                }
            })
        })
    }

    if (dropdownLanguage) {
        dropdownLanguage.forEach(item => {
            const close = () => {
                item.closest('.language').classList.remove('language--active')
            }
            const itemChecker = useItemChecker(item.parentNode, close)

            item.addEventListener('click', (event) => {
                event.preventDefault()

                const canHover = window.matchMedia('(hover: none)').matches;
                const parent = item.closest('.language')

                if (canHover) {
                    if (!parent.classList.contains('language--active')) {
                        parent.classList.add('language--active')
                        itemChecker.setBodyChecker()
                    } else {
                        close()
                    }
                }
            })
        })
    }
});