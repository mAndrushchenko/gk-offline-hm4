$(document).ready(function () {
  const defaultWidthOfBox = parseInt($(".content").css("width"));
  const slides = $(".slide");
  const amountOfSlides = slides.length;
  const dots = $(".dot");
  const amountOfDots = dots.length;
  let currentDot,
    index = 1,
    clicked = false,
    startPosition,
    endPosition;

  (() => $(`.dot:first-child`).toggleClass("active"))(); //this function adds class 'active' to first dot

  const defaultPosition = (event) => {
    //when user chose first or last image, this function adds new
    if (event === "next") {
      let start = -defaultWidthOfBox;
      for (let i = 1; i <= amountOfSlides; i++) {
        $(`.slide:nth-child(${i}`).css("left", `${start}px`);
        start += defaultWidthOfBox;
      }
    } else if (event === "prev") {
      let start = +defaultWidthOfBox;
      for (let i = amountOfSlides; i >= 1; i--) {
        $(`.slide:nth-child(${i}`).css("left", `${start}px`);
        start -= defaultWidthOfBox;
      }
    }
  };

  const takeSlideByDot = (dotNumber) => {
    //when the user press on dot, this function selects the appropriate image
    index = dotNumber + 1;
    dotNumber = amountOfDots - dotNumber + 1;
    let start = +defaultWidthOfBox * dotNumber;
    for (let i = amountOfSlides; i >= 1; i--) {
      start -= defaultWidthOfBox;
      $(`.slide:nth-child(${i}`).css("left", `${start}px`);
    }
  };

  const transition = onOff => {
    //this function turn on or turn of animation when we should make new images
    for (let i = 1; i <= amountOfSlides; i++) {
      if (onOff === "on") {
        $(`.slide:nth-child(${i}`).css("transition", "0.5s ease-in-out");
      } else if (onOff === "off") {
        $(`.slide:nth-child(${i}`).css("transition", "none");
      }
    }
  };

  const changeSlide = (typeOfButton) => {
    if (typeof typeOfButton !== 'string'){
      typeOfButton = typeOfButton.target.classList.value
    }
    transition("on");
    const defaultWidthOfSlide = parseInt(slides.css("left"));
    const posFst = parseInt($("#firstImg").css("left"));
    const posLast = parseInt($("#lastImg").css("left"));

      if (typeOfButton === 'next' &&
          defaultWidthOfBox === posFst ||
          typeOfButton === 'prev' &&
          -defaultWidthOfBox === posLast
      ) {
        setTimeout(() => {
          transition("off");
          defaultPosition(typeOfButton);
        }, 500);
      }
    if (defaultWidthOfSlide % defaultWidthOfBox === 0) {
      for (let i = 1; i <= amountOfSlides; i++) {
        const el = $(`.slide:nth-child(${i}`);
        const position = parseInt(el.css("left"));
        const width = parseInt(el.css("width"));
        el.css("left", `${typeOfButton === 'next' ? position - width : position + width}px`);
      }
      typeOfButton === 'next' ? index++ : index--; //changing class of dot on 'active'
      if (index > amountOfDots && typeOfButton === 'next') {
        index = 1;
      } else if (index < 1 && typeOfButton === 'prev') {
        index = amountOfDots;
      }
      dots.removeClass("active");
      $(`.dot:nth-child(${index})`).toggleClass("active");
    }
  }

  $(".prev").on("click", changeSlide);

  $(".next").on("click", changeSlide);

  dots.on("click", function (e) {
      //selecting slide using dot
      transition("on");
    currentDot = e.target;
    dots.removeClass("active");
    $(currentDot).toggleClass("active");
    for (let i = 0; i < amountOfDots; i++) {
      if (dots[i].classList[1] === "active") {
        takeSlideByDot(i);
      }
    }
  });

  slides.on("mousedown", (e) => {
    //this function change slide by dragging image
    e.currentTarget.draggable = false;
    clicked = false;
    startPosition = e.clientX;
    slides.on("mouseup", (e2) => {
      if (!clicked) {
        endPosition = e2.clientX;
        if (startPosition > endPosition) {
          clicked = true;
          changeSlide('next');
        } else if (startPosition < endPosition) {
          clicked = true;
          changeSlide('prev');
        }
      }
    });
  });
});

