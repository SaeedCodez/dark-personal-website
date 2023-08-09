class Element {

      constructor(selector) {
            if (selector == null) return;
            this.element = document.querySelector(selector);
      }

      innerHTML(HTML, delay = 0) {
            if (HTML == null) return;
            setTimeout(() => this.element.innerHTML = HTML, delay)
      }

      hide(delay = 0) {
            setTimeout(() => this.addClass('hide'), delay)
      }

      show(delay = 0) {
            setTimeout(() => this.removeClass('hide'), delay)
      }

      addClass(Class, delay = 0) {
            if (Class == null) return;
            setTimeout(() => this.element.classList.add(Class), delay)
      }

      removeClass(Class, delay = 0) {
            if (Class == null) return;
            setTimeout(() => this.element.classList.remove(Class), delay)
      }
}

const home = new Element('#home--content')
const Title = new Element('#title') // H1
const textTitle = new Element('.title--text') // H1 > SPAN
const pagesContent = new Element('.pages__content')
const Portfoliosfooter = new Element('.Portfolios')
let pageActive = 'Home';

class Page {

      constructor(contentID) {
            this.contentID = contentID;
            this.contentElement = document.querySelector('#' + this.contentID);
            this.pageName = this.contentElement.getAttribute('name')

            if (window.location.hash == '#' + this.pageName.replace(/\s/g, '')) {
                  this.ModeTopage()
                  textTitle.innerHTML(this.pageName)
                  Title.removeClass('hideAfterbefore', 1000)
                  Title.removeClass('FilterBlur', 1550)
                  pagesContent.innerHTML(this.contentElement.innerHTML, 1000)
                  pagesContent.show(2000)
                  pageActive = this.pageName;
            }
      }

      ModeTopage() {
            home.addClass('hidDec')
            home.addClass('small')
            Title.addClass('hideAfterbefore')
            Title.addClass('FilterBlur')
            Title.removeClass('hideAfterbefore', 1000)
            Title.removeClass('FilterBlur', 1550)
            Portfoliosfooter.hide(1000)
      }

      show() {
            this.ModeTopage()
            textTitle.innerHTML(this.pageName, 750)
            pagesContent.innerHTML(this.contentElement.innerHTML, 1600)
            Title.removeClass('hideAfterbefore', 1000)
            pagesContent.hide()
            pagesContent.show(1850)
            pa.track({name: 'Page: ' + this.pageName})
      }
}

class Home {
      show() {
            Title.addClass('hideAfterbefore')
            Title.addClass('FilterBlur')
            Title.removeClass('FilterBlur', 1550)
            pagesContent.hide()
            textTitle.innerHTML('Saeed Hassani', 750)
            Portfoliosfooter.show(750)
            home.removeClass('small', 350)
            home.removeClass('hidDec', 1550)
      }
}

// get pages frome HTML
let pages = {
      Home: new Home()
};
let pageElements = document.querySelectorAll('div[type=page]')
pageElements.forEach(page => pages[page.getAttribute('name')] = new Page(page.id));

// check hash for change page
addEventListener('hashchange', event => {
      let URLhash = window.location.hash.replace('#', '');
      let hash = URLhash.replace('#', '') // remove '#' from hash

      if (pages.hasOwnProperty(hash)) {
            pages[hash].show()
            pageActive = hash;

      }
});

// navBar Mobile 
let [header, navStatus] = [new Element('header'), false]
const followMeIcons = new Element('.followME .icons')

let changeStatusNav = () => {
      if (!navStatus) {
            header.removeClass('nav--dactive')
            header.addClass('nav--active')
            followMeIcons.removeClass('hideMobile')
            if (pageActive == 'Home') Portfoliosfooter.hide()
            pa.track({name: 'MenuMobileOpen'})
      } else {
            header.removeClass('nav--active')
            header.addClass('nav--dactive')
            followMeIcons.addClass('hideMobile')
            if (pageActive == 'Home') Portfoliosfooter.show()
      }
      navStatus = !navStatus;
}

document.querySelector('.menu--mobile')
.addEventListener('click',changeStatusNav)

document.querySelectorAll('.header__nav a').forEach(a => {
      a.addEventListener('click',changeStatusNav)
});

followMeIcons.element
.addEventListener('click',()=>pa.track({name: 'Shoshal icon Click'}))

// cursor 
const { gsap, CircleType } = window;

const cursorOuter = document.querySelector(".cursor--large");
const cursorInner = document.querySelector(".cursor--small");
const cursorTextContainerEl = document.querySelector(".cursor--text");
const cursorTextEl = cursorTextContainerEl.querySelector(".text");

const hoverItems = document.querySelectorAll(".CUHOVER");
const hoverEffectDuration = 0.3;
let isHovered = false;
let initialCursorHeight;

const cursorRotationDuration = 8;

let circleType = new CircleType(cursorTextEl);
circleType.radius(50);

setTimeout(() => initialCursorHeight = circleType.container.style.getPropertyValue("height"), 50);

hoverItems.forEach(item => {
      item.addEventListener("pointerenter", handlePointerEnter);
      item.addEventListener("pointerleave", handlePointerLeave);
});

let mouse = {
      x: -100,
      y: -100
};


document.body.addEventListener("pointermove", updateCursorPosition);

function updateCursorPosition(e) {
      mouse.x = e.pageX;
      mouse.y = e.pageY;
}

function updateCursor() {
      gsap.set([cursorInner, cursorTextContainerEl], {
            x: mouse.x,
            y: mouse.y
      });


      gsap.to(cursorOuter, {
            duration: 0.15,
            x: mouse.x,
            y: mouse.y
      });


      if (!isHovered) {
            gsap.to(cursorTextContainerEl, hoverEffectDuration * 0.5, {
                  opacity: 0
            });

            gsap.set(cursorTextContainerEl, {
                  rotate: 0
            });

      }

      requestAnimationFrame(updateCursor);
}

updateCursor();

function handlePointerEnter(e) {
      isHovered = true;

      const target = e.currentTarget;
      updateCursorText(target);

      gsap.set([cursorTextContainerEl, cursorTextEl], {
            height: initialCursorHeight,
            width: initialCursorHeight
      });


      gsap.fromTo(
            cursorTextContainerEl,
            {
                  rotate: 0
            },

            {
                  duration: cursorRotationDuration,
                  rotate: 360,
                  ease: "none",
                  repeat: -1
            });



      gsap.to(cursorInner, hoverEffectDuration, {
            scale: 2
      });


      gsap.fromTo(
            cursorTextContainerEl,
            hoverEffectDuration,
            {
                  scale: 1.2,
                  opacity: 0
            },

            {
                  delay: hoverEffectDuration * 0.75,
                  scale: 1,
                  opacity: 1
            });


      gsap.to(cursorOuter, hoverEffectDuration, {
            scale: 1.2,
            opacity: 0
      });

}

function handlePointerLeave() {
      isHovered = false;
      gsap.to([cursorInner, cursorOuter], hoverEffectDuration, {
            scale: 1,
            opacity: 1
      });

}

function updateCursorText(textEl) {
      const cursorTextRepeatTimes = textEl.getAttribute("DCTR");
      const cursorText = returnMultipleString(
            textEl.getAttribute("DCT"),
            cursorTextRepeatTimes);


      circleType.destroy();

      cursorTextEl.innerHTML = cursorText;
      circleType = new CircleType(cursorTextEl);
}

function returnMultipleString(string, count) {
      let s = "";
      for (let i = 0; i < count; i++) {
            s += ` ${string} `;
      }
      return s;
}

/* right click */
window.oncontextmenu = () => false;

/**
 * letteranimation.js 1.0.3
 **/
function animateSequence() { for (var n = document.getElementsByClassName("sequence"), a = 0; a < n.length; a++) { var e = n[a], t = e.innerHTML; t = t.trim(); var i = "", m = 100; for (l = 0; l < t.length; l++)" " != t[l] ? (i += '<span style="animation-delay:' + m + "ms; -moz-animation-delay:" + m + "ms; -webkit-animation-delay:" + m + 'ms; ">' + t[l] + "</span>", m += 150) : i += t[l]; e.innerHTML = i } } function animateRandom() { for (var n = document.getElementsByClassName("random"), a = 0; a < n.length; a++) { var e = n[a], t = e.innerHTML; t = t.trim(); var i = 70, m = new Array, o = new Array; for (j = 0; j < t.length; j++) { for (; ;) { var r = getRandomInt(0, t.length - 1); if (-1 == m.indexOf(r)) break } m[j] = r } for (l = 0; l < m.length; l++) { var s = "", d = m[l]; " " != t[d] ? (s = '<span style="animation-delay:' + i + "ms; -moz-animation-delay:" + i + "ms; -webkit-animation-delay:" + i + 'ms; ">' + t[d] + "</span>", o[d] = s) : o[d] = t[d], i += 80 } o = o.join(""), e.innerHTML = o } } function getRandomInt(n, a) { return Math.floor(Math.random() * (a - n + 1)) + n } window.onload = function () { animateSequence(), animateRandom() };