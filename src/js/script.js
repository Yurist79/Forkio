// выпадающее меню

$(".burger__icon").on("click", function() {
  if ($(window).width() < "481")
  {$(".burger").children().toggle();
  $(".navbar").eq(0).slideDown(400);
  }
});
function closeMenu() {
  if ($(window).width() < "481") {
    $(".burger").children().toggle();
    $(".navbar").eq(0).slideUp(400,(function(){$('.navbar').eq(0).removeAttr("style")}));
   }
}
$(".fas, .navbar-list-item").on("click", closeMenu);



// карусель

let page = $(".slider-page");
let pageLentdth = page.length;
let counter = 0;
let leftScrol = $(".button_left").on ("click",StartRight);
let RightScrol = $(".button_right").on ("click", StartLeft);

function StartLeft() {
   sliderWidth = $(".slider-box").width();
    let next;
    $(".button_right").off("click", StartLeft);
  if (counter < pageLentdth - 1) {
    next = page.eq(counter + 1);
  } else {
    next = page.eq(0);
  }
  next.css({left: sliderWidth * 2, display: "flex" });
  page
    .eq(counter)
    .animate({ left: "-" + (sliderWidth) }, 400)
    .hide(400);
  page.eq(counter).animate({ left: sliderWidth * 2 });
  next.animate({ left: 0 }, 400, (function(){$(".button_right").on("click", StartLeft);}));
  counter++;
  if (counter == pageLentdth) counter = 0;
  };
function StartRight() {
  sliderWidth = $(".slider-box").width();
  if (counter > 0) {
    next = page.eq(counter - 1);
  } else {
    next = page.eq(pageLentdth - 1);
  }
  $(".button_left").off("click", StartRight);
  page
    .eq(counter)
    .animate({left: sliderWidth}, 400)
    .hide(400);
  next
    .css({ left: -(sliderWidth * 2) })
    .css({ display: "flex" })
    .animate({ left: 0 }, 400, (function(){$(".button_left").on("click", StartRight);}));
  counter--;
  if (counter == -1) counter = pageLentdth - 1;
};

