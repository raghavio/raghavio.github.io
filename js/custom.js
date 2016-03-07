setAge();
/**
 * Gets difference between my date of bith and current date.
 */
function setAge() {
    var dateOfBith = new Date('1994/09/12 00:13:06');
    var diff = Math.abs(new Date() - dateOfBith);
    $("#age").html(Math.floor(diff/1000/60/60/24/365));
}
$(window).scroll(function() {
    // スクロールの位置取得
    // Get scroll position
    var s = $(window).scrollTop(),
    // スクロールの値と透明度
    // scroll value and opacity
    opacityVal = (s / 150);
    // blurの画像の透明度を0%から100％
    // opacity value 0% to 100%
    $('.non-blur-img').css('opacity', opacityVal);
});
