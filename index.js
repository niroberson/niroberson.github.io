    function toggleVisibility(newSection) {
        $(".section").not("#" + newSection).hide();
        $("#" + newSection).show();
    }