window.addEventListener('load', () => {
    initObserver()

    window.addEventListener('scroll', scrollEvent => {
        const navBar = document.querySelector('.header__nav-bar')

        if(window.innerWidth > 977) {
            if(window.scrollY > 200) {
                navBar.classList.add('header__nav-bar_sticky')
            }
            else if(window.scrollY <= 200) {
                navBar.classList.remove('header__nav-bar_sticky')
            }
        }
        else if(window.innerWidth <= 977) {
            const showMenuButton = document.querySelector('.header__show-menu-button')

            if(window.scrollY > 200) {
                showMenuButton.classList.add('header__show-menu-button_visible')
            }
            else if(window.scrollY <= 200) {
                showMenuButton.classList.remove('header__show-menu-button_visible')
            }
        }
    })
})

function initObserver() {
    const menuIntroObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const menuIntro = document.querySelector('.menu__intro')

                document.querySelector('.menu__heading').classList.add('menu__heading_loaded')
                document.querySelector('.menu__icon').classList.add('menu__icon_loaded')

                window.setTimeout(() => {
                    menuIntro.classList.add('menu__intro_hiding')

                    window.setTimeout(() => {
                        menuIntro.classList.add('menu__intro_hidden')
                    }, 1100)
                }, 1100)
            }
        })
    }, { threshold: 0.3 })

    menuIntroObserver.observe(document.querySelector('.menu__intro'))
}


let indicatorHideTimeoutID

function goTo(elementClassName) {
    document.querySelector(`.${elementClassName}`).scrollIntoView({ behavior: 'smooth' })
}

function showIndicator(event) {
    clearTimeout(indicatorHideTimeoutID)

    if(window.innerWidth > 854) {
        const indicator = document.querySelector('.header__hover-indicator')
        const targetElement = event.target
        const targetElementText = targetElement.textContent.trim()
        const targetPosition = targetElement.getBoundingClientRect()

        indicator.classList.add('header__hover-indicator_visible')
        
        if(targetElementText == 'About' || targetElementText == 'Home'
            || targetElementText == 'Menu') {
            indicator.style.left = `${targetPosition.left - 15}px`
        }
        else if(targetElementText == 'Ingredients' || targetElementText == 'Reservations') {
            indicator.style.left = `${targetPosition.left + 10}px`
        }
        else if(targetElementText == 'Reviews') {
            indicator.style.left = `${targetPosition.left - 5}px`
        }
    }
}

function hideIndicator() {
    indicatorHideTimeoutID = window.setTimeout(() => {
        document.querySelector('.header__hover-indicator').classList.remove('header__hover-indicator_visible')
    }, 1000)
}

function toggleMenu() {
    const navBar = document.querySelector('.header__nav-bar')
    const showMenuButton = document.querySelector('.header__show-menu-button')

    navBar.classList.toggle('header__nav-bar_sticky')
    
    if(!navBar.classList.contains('header__nav-bar_sticky')) {
        showMenuButton.style.transform = 'rotate(0deg)'
    }
    else if(navBar.classList.contains('header__nav-bar_sticky')) {
        showMenuButton.style.transform = 'rotate(180deg)'
    }
}