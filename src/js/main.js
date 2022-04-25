$(document).ready(function() {
    let slideIndex = 0;

    showPhotos();

    function showPhotos() {
        // var i;
        let slides = $(".photo img");
        // console.log(slides);
        for (let i = 0; i < slides.length; i++) {
            // console.log(i);
            $(slides[i]).hide();
        }
        slideIndex++;
        // console.log(slideIndex);
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }
        $(slides[slideIndex - 1]).show();
        // showPhotos();
        setTimeout(showPhotos, 200)

    }
});