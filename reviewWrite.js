const params =
    new URLSearchParams(window.location.search);


const stationParam =
    params.get("station");


const stationName =
    document.getElementById("stationName");


const toiletRating =
    document.getElementById("toiletRating");


const toiletComment =
    document.getElementById("toiletComment");


const transferDifficulty =
    document.getElementById("transferDifficulty");


const transferComment =
    document.getElementById("transferComment");


const commercialComment =
    document.getElementById("commercialComment");


const submitReviewButton =
    document.getElementById("submitReviewButton");


const cancelButton =
    document.getElementById("cancelButton");



if (stationParam) {

    stationName.value =
        stationParam;

}



submitReviewButton.addEventListener(
    "click",
    function() {

        const station =
            stationName.value.trim();


        const toilet =
            Number(toiletRating.value);


        const transfer =
            Number(transferDifficulty.value);


        const toiletText =
            toiletComment.value.trim();


        const transferText =
            transferComment.value.trim();


        const commercialText =
            commercialComment.value.trim();


        if (station === "") {

            alert("역 이름을 입력해주세요.");

            return;

        }


        if (toiletRating.value === "") {

            alert("화장실 별점을 선택해주세요.");

            return;

        }


        if (transferDifficulty.value === "") {

            alert("환승 난이도를 선택해주세요.");

            return;

        }


        let reviews =
            JSON.parse(
                localStorage.getItem("stationReviews")
            );


        if (reviews === null) {

            reviews = [];

        }


        const newReview = {

            id: Date.now(),

            station: station,

            toiletRating: toilet,

            toiletComment: toiletText,

            transferDifficulty: transfer,

            transferComment: transferText,

            commercialComment: commercialText,

            createdAt: Date.now()

        };


        reviews.push(newReview);


        localStorage.setItem(
            "stationReviews",
            JSON.stringify(reviews)
        );


        location.href =
            "review.html?station="
            + encodeURIComponent(station);

    }
);



cancelButton.addEventListener(
    "click",
    function() {

        location.href =
            "review.html";

    }
);