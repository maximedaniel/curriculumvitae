$(document).ready(function() {
    $('button#printable').on('click', function(e) {
        var $btn = $(this);
        console.log($btn);
        $btn.css("display", "none");
         $('a.btn-collapse').each(function() {
            var $btn = $(this);
            $btn.click();
         });
         $('a.btn').each(function() {
            var $btn = $(this);
            //$btn.css("opacity", 0);
            $btn.css("display", "none");
         });

         $btn.css("display", "none");

    });

    addEventListener("beforeprint", (event) => { })
});

