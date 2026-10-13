$(document).ready(function() {
    // Loop over all <a> elements with class btn-collapse
    $('a.btn-collapse').each(function() {
        var $btn = $(this);
        var id = $(this).attr("id");
        console.log(id);

        // Optional: set initial icon state here if needed
        // $btn.find('i').removeClass().addClass('fa fa-plus');

        // Attach click event
        $btn.on('click', function(e) {
            e.preventDefault(); // Prevent default link behavior if necessary
            // Find the <i> inside the button
            var $icon = $(this).find('i');
            var $label = $(this).find('span');

            // Toggle icon class (example: fa-plus <-> fa-minus)
            if ($icon.hasClass('bi-caret-down-fill')) {
                $icon.removeClass('bi-caret-down-fill').addClass('bi-caret-right-fill');
                $label.html("More");
                $(`div.collapse#${id}`).collapse('hide');
            } else {
                $icon.removeClass('bi-caret-right-fill').addClass('bi-caret-down-fill');
                $label.html("Less");
                $(`div.collapse#${id}`).collapse('show');
            }
        });
    });
});