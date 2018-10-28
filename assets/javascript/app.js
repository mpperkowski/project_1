$(document).ready(function () {
    var searchTerm;
//
    $(document).on("click", '#add-website', function (event) {
        event.preventDefault();
        addWebsite();
    });

    function addWebsite() {
        var userInput = $("#website-input").val();
        if (userInput.length === 0) {
            return
        }

        $("#websitePreview").empty()
        searchTerm = userInput

        var queryURL = "https://www.googleapis.com/customsearch/v1?q=" + searchTerm + "&cx=004310597913395645264:paiega8jyuo&key=AIzaSyDmxfk0xMoLe6Sup48zTQPXmG0wpcgENyY"

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(response)
                sites = response.items
                for (var i = 0; i < sites.length; i++) {
                    var site = sites[i].link
                    var auth = '2376-rutgersproject1';
                    var imgUrl = 'http://image.thum.io/get/' + auth + '/' + site;

                    var preview = $("<div>").html('<img class="site" style="-webkit-user-select: none;" src="' + imgUrl + '">').addClass("websites")
                    preview.attr("data-url", site)
                    preview.attr("data-toggle", "modal")
                    preview.attr("data-target", "#myModal")
                    preview.append('<img class="window" src="assets/images/window.png">')

                    var outerHolder = $("<div>").addClass("outerHolder")
                    outerHolder.append(preview)

                    $("#websitePreview").prepend(outerHolder)
                }

            });
    }

    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName("close")[0];
    var modalBox = $("<div>")

    // When the user clicks on <span> (x), close the modal
    $(document).on("click", '.close', function () {
        modal.style.display = "none";
    });

    //When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    $(document).on("click", '.websites', function () {
        modal.style.display = "block";
        var url = $(this).attr('data-url');
        modalBox.html('<iframe width="100%" height="700px" frameborder="0" scrolling="yes" allowtransparency="true" src="' + url + '"></iframe>');
        $(".modal-content").append(modalBox)
    });

    $("#website-input").val(localStorage.getItem("searchTerm"));
    addWebsite();
    $("#website-input").val("");

})
