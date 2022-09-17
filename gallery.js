const imgsArray = [
  `https://images.pexels.com/photos/3998429/pexels-photo-3998429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
  `https://images.pexels.com/photos/3993304/pexels-photo-3993304.jpeg?auto=compress&cs=tinysrgb&w=400`,
  `https://images.pexels.com/photos/2068672/pexels-photo-2068672.jpeg?auto=compress&cs=tinysrgb&w=400`,
  `https://images.pexels.com/photos/3992855/pexels-photo-3992855.jpeg?auto=compress&cs=tinysrgb&w=400`,
  `https://images.pexels.com/photos/331989/pexels-photo-331989.jpeg?auto=compress&cs=tinysrgb&w=400`,
  `https://images.pexels.com/photos/7389078/pexels-photo-7389078.jpeg?auto=compress&cs=tinysrgb&w=400`,
];

const imgsWrapper = document.querySelector(".gallery-imgs-wrapper");
const navWrapper = document.querySelector(".gallery-navigation");

const galleryNumbersWrapper = document.querySelector(".gallery-numbers");

class Gallery {
  constructor({ imgsWrapper, navWrapper, imgsArray, galleryNumbersWrapper }) {
    this.navWrapper = navWrapper;
    this.imgsWrapper = imgsWrapper;
    this.imgsArray = imgsArray;

    this.galleryNumbersWrapper = galleryNumbersWrapper;
    this.allContainersArray = [];
    this.allContainersUI =
      galleryNumbersWrapper.querySelector(".current-number");

    this.index = 0;
    this.createAndAppendImgs();
    this.initNavBtns();
    this.initMaxIndicator();
    this.createAllDigitsWrapper(imgsArray.length);

    this.showImg(0);
  }

  createAndAppendImgs() {
    const imgsElements = [];
    let degToAdd = 2;
    let deg = degToAdd;
    const maxDeg = 4;
    imgsArray.forEach((imgSrc, i) => {
      const img = new Image();
      img.src = imgSrc;
      deg += degToAdd;
      img.style.setProperty("--deg", deg + "deg");
      imgsElements.push(img);
      this.imgsWrapper.append(img);
      if (deg > maxDeg || deg < -maxDeg) degToAdd *= -1;
    });

    this.index = 0;

    this.imgsElements = imgsElements.reverse();
    this.nbImgs = this.imgsElements.length;
  }

  initNavBtns(navWrapper) {
    const btns = this.navWrapper.querySelectorAll("button");
    const prevBtn = btns[0];
    const nextBtn = btns[1];
    this.btns = { prevBtn, nextBtn };
    nextBtn.addEventListener("click", () => {
      this.showImg(this.index + 1);
    });
    prevBtn.addEventListener("click", () => {
      this.showImg(this.index - 1);
    });
  }

  initMaxIndicator() {
    this.maxIndicatorWrapper =
      this.galleryNumbersWrapper.querySelector(".max-number");
    this.maxIndicatorWrapper.innerHTML = this.imgsElements.length;
  }
  updateIndicator({ indicatorIndex, digitIndex }) {
    let translate = digitIndex * 100 + "%";
    this.allContainersArray[indicatorIndex].style.setProperty(
      "--translate",
      translate
    );
  }

  updateAllIndicators() {
    let index = this.index + 1;
    let indicatorIndex = 0;
    let digitIndex = index % 10;
    this.updateIndicator({ indicatorIndex, digitIndex });
    index /= 10;
    index = Math.floor(index);

    indicatorIndex++;
    while (indicatorIndex < this.allContainersArray.length) {
      digitIndex = index % 10;

      this.updateIndicator({ indicatorIndex, digitIndex });

      index /= 10;
      index = Math.floor(index);
      indicatorIndex++;
    }
  }
  showImg(i) {
    if (this.checkIndexOutOfBounds(i)) return;
    if (i > this.index) {
      this.imgsElements[this.index].classList.add("hide");
    }

    this.index = i;
    this.imgsElements[i].classList.remove("hide");

    this.updateAllIndicators();
  }

  createAllDigitsWrapper(maxNumber) {
    if (maxNumber < 10) maxNumber = 10;
    while (maxNumber != 0) {
      this.createDigitWrapper({
        parent: this.allContainersUI,
        parentArray: this.allContainersArray,
      });
      maxNumber /= 10;
      maxNumber = Math.floor(maxNumber);
    }
  }
  createDigitWrapper({ parent, parentArray, min }) {
    console.log({ parent, parentArray });
    const allContainer = document.createElement("span");
    allContainer.classList.add("all-container");

    parentArray.push(allContainer);
    parent.append(allContainer);

    for (let i = 0; i <= 9; i++) {
      const digitContainer = document.createElement("span");

      digitContainer.classList.add("digit-container");
      digitContainer.classList.add("flex");
      digitContainer.classList.add("f-center");
      digitContainer.innerHTML = i;
      allContainer.appendChild(digitContainer);
    }
  }

  checkIndexOutOfBounds(i) {
    if (i <= 0) this.navWrapper.classList.add("hide-left");
    else this.navWrapper.classList.remove("hide-left");
    if (i >= this.nbImgs - 1) this.navWrapper.classList.add("hide-right");
    else this.navWrapper.classList.remove("hide-right");

    if (i < 0) return true;
    if (i > this.nbImgs - 1) return true;
  }
}

new Gallery({ imgsWrapper, navWrapper, imgsArray, galleryNumbersWrapper });
