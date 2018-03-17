$(document).ready(function () {

    var gifName = "";

    var fantasyGifs = ["dragons", "unicorns", "fairies", "ogres", "trolls", "mermaids", "misty forests", "magic"];

    $("li").click(function () {
        $("#gifsNum").text($(this).val());
        $("#gifsNum").attr("data-Num", $(this).val());
    })

    // function addButton(a) {
        // var gifButton = $("<button>")
        // gifButton.attr("id", "gifButton")
        // gifButton.attr("data-title", gifName)
        // gifButton.text(gifName)
        // $(".gif-port").append(gifButton)
    // }

    $(fantasyGifs).each(function (a) {
        gifName = fantasyGifs[a];
        var gifButton = $("<button>");
        gifButton.attr("id", "gifButton");
        gifButton.attr("data-title", gifName);
        gifButton.text(gifName);
        $(".buttonPort").append(gifButton);
        console.log($(gifButton).attr("data-title"));
    });

    $("#submit").click(function () {
        event.preventDefault();
        gifName = $("#userSearch").val().trim();
        var gifButton = $("<button>");
        gifButton.attr("id", "gifButton");
        gifButton.attr("data-title", gifName);
        gifButton.text(gifName);
        $(".buttonPort").append(gifButton);
        console.log($(gifButton).attr("data-title"));
    });

    $(document).on("click","#gifButton", function () {
        $(".gifPort").text("")
        var gifsNum = $("#gifsNum").attr("data-Num");
        var gifSearch = $(this).attr("data-title");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=";
        var apiKey = "&api_key=kZHKfMfjZtDToXo9HyGmenp8yENgycDO";
        var gifsUrl = "&limit=" + gifsNum;

        queryURL = queryURL + gifSearch + apiKey + gifsUrl;

        console.log(queryURL)
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {

                var results = response.data;

                for (var i = 0; i < results.length; i++) {

                    var gifDiv = $("<div>");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_small.url);

                    gifDiv.prepend(p);
                    gifDiv.prepend(gifImage);

                    $(".gifPort").prepend(gifDiv);
                }
            })
    })
})