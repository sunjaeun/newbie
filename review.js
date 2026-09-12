const stationSearchInput =
    document.getElementById("stationSearchInput");


const stationSuggestions =
    document.getElementById("stationSuggestions");


const searchButton =
    document.getElementById("searchButton");


const writeReviewButton =
    document.getElementById("writeReviewButton");


const stationTitle =
    document.getElementById("stationTitle");


const toiletAverage =
    document.getElementById("toiletAverage");


const toiletReviewText =
    document.getElementById("toiletReviewText");


const transferAverage =
    document.getElementById("transferAverage");


const transferReviewText =
    document.getElementById("transferReviewText");


const commercialReviewText =
    document.getElementById("commercialReviewText");


const reviewCount =
    document.getElementById("reviewCount");



const params =
    new URLSearchParams(window.location.search);


const stationParam =
    params.get("station");



if (stationParam) {

    stationSearchInput.value =
        stationParam;

    searchStation(
        stationParam
    );

}



stationSearchInput.addEventListener(
    "input",
    function() {

        const keyword =
            normalizeSearchText(
                stationSearchInput.value
            );


        stationSuggestions.innerHTML =
            "";


        if (keyword === "") {

            stationSuggestions.style.display =
                "none";

            return;

        }


        const stationNames =
            Object.keys(stationDB);


        const results =
            stationNames
                .filter(
                    function(station) {

                        return normalizeSearchText(
                            station
                        ).includes(
                            keyword
                        );

                    }
                )
                .slice(0, 10);


        if (results.length === 0) {

            stationSuggestions.style.display =
                "none";

            return;

        }


        results.forEach(
            function(station) {

                const item =
                    document.createElement("div");


                item.className =
                    "station-suggestion";


                const name =
                    document.createElement("span");


                name.className =
                    "station-name";


                name.innerText =
                    station + "역";


                const lines =
                    document.createElement("span");


                lines.className =
                    "station-lines";


                lines.innerText =
                    stationDB[station].join(", ");


                item.appendChild(
                    name
                );


                item.appendChild(
                    lines
                );


                item.addEventListener(
                    "click",
                    function() {

                        location.href =
                            "review.html?station="
                            +
                            encodeURIComponent(
                                station
                            );

                    }
                );


                stationSuggestions.appendChild(
                    item
                );

            }
        );


        stationSuggestions.style.display =
            "block";

    }
);



searchButton.addEventListener(
    "click",
    function() {

        const station =
            getRealStationName(
                stationSearchInput.value
            );


        if (station === null) {

            alert(
                "등록된 역을 선택해주세요."
            );

            return;

        }


        location.href =
            "review.html?station="
            +
            encodeURIComponent(
                station
            );

    }
);



stationSearchInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            event.preventDefault();

            searchButton.click();

        }

    }
);



writeReviewButton.addEventListener(
    "click",
    function() {

        const station =
            getRealStationName(
                stationSearchInput.value
            );


        if (station === null) {

            alert(
                "리뷰를 작성할 역을 먼저 선택해주세요."
            );

            return;

        }


        location.href =
            "reviewWrite.html?station="
            +
            encodeURIComponent(
                station
            );

    }
);



document.addEventListener(
    "click",
    function(event) {

        if (
            !stationSearchInput.contains(
                event.target
            )
            &&
            !stationSuggestions.contains(
                event.target
            )
        ) {

            stationSuggestions.style.display =
                "none";

        }

    }
);



function normalizeSearchText(text) {

    return text
        .trim()
        .replace(/역$/, "");

}



function getRealStationName(input) {

    const keyword =
        normalizeSearchText(input);


    const stationNames =
        Object.keys(stationDB);


    const found =
        stationNames.find(
            function(station) {

                return station === keyword;

            }
        );


    if (found) {

        return found;

    }


    return null;

}



function searchStation(station) {

    let reviews =
        JSON.parse(
            localStorage.getItem(
                "stationReviews"
            )
        );


    if (reviews === null) {

        reviews = [];

    }


    const stationReviews =
        reviews.filter(
            function(review) {

                return normalizeSearchText(
                    review.station
                )
                ===
                normalizeSearchText(
                    station
                );

            }
        );


    const lines =
        stationDB[
            normalizeSearchText(station)
        ];


    if (lines) {

        stationTitle.innerText =
            "🚉 "
            + normalizeSearchText(station)
            + "역 · "
            + lines.join(", ");

    }

    else {

        stationTitle.innerText =
            "🚉 "
            + normalizeSearchText(station)
            + "역 리뷰";

    }


    reviewCount.innerText =
        "리뷰 "
        + stationReviews.length
        + "개";


    showToiletReviews(
        stationReviews
    );


    showTransferReviews(
        stationReviews
    );


    showCommercialReviews(
        stationReviews
    );

}



function showToiletReviews(reviews) {

    if (reviews.length === 0) {

        toiletAverage.innerText =
            "리뷰 없음";


        toiletReviewText.innerText =
            "등록된 정보가 없습니다.";


        return;

    }


    let total = 0;


    reviews.forEach(
        function(review) {

            total +=
                Number(
                    review.toiletRating
                );

        }
    );


    const average =
        total / reviews.length;


    toiletAverage.innerText =
        "⭐ "
        + average.toFixed(1)
        + " / 5.0";


    const comments =
        reviews
            .filter(
                function(review) {

                    return (
                        review.toiletComment
                        &&
                        review.toiletComment.trim()
                        !== ""
                    );

                }
            )
            .slice()
            .reverse();


    if (comments.length === 0) {

        toiletReviewText.innerText =
            "등록된 상세 정보가 없습니다.";

        return;

    }


    toiletReviewText.innerText =
        comments[0].toiletComment;

}



function showTransferReviews(reviews) {

    const transferReviews =
        reviews.filter(
            function(review) {

                return Number(
                    review.transferDifficulty
                ) > 0;

            }
        );


    if (transferReviews.length === 0) {

        transferAverage.innerText =
            "환승 정보 없음";


        transferAverage.className =
            "badge";


        transferReviewText.innerText =
            "환승역이 아니거나 등록된 리뷰가 없습니다.";


        return;

    }


    let total = 0;


    transferReviews.forEach(
        function(review) {

            total +=
                Number(
                    review.transferDifficulty
                );

        }
    );


    const average =
        total / transferReviews.length;


    let level = "";

    let description = "";


    if (average >= 2.5) {

        level =
            "상";

        description =
            "매우 복잡";

        transferAverage.className =
            "badge hard";

    }

    else if (average >= 1.5) {

        level =
            "중";

        description =
            "보통";

        transferAverage.className =
            "badge medium";

    }

    else {

        level =
            "하";

        description =
            "쉬움";

        transferAverage.className =
            "badge easy";

    }


    transferAverage.innerText =
        level
        + " ("
        + description
        + ") · 평균 "
        + average.toFixed(1)
        + " / 3.0";


    const comments =
        transferReviews
            .filter(
                function(review) {

                    return (
                        review.transferComment
                        &&
                        review.transferComment.trim()
                        !== ""
                    );

                }
            )
            .slice()
            .reverse();


    if (comments.length === 0) {

        transferReviewText.innerText =
            "등록된 상세 정보가 없습니다.";

        return;

    }


    transferReviewText.innerText =
        comments[0].transferComment;

}



function showCommercialReviews(reviews) {

    commercialReviewText.innerHTML =
        "";


    const commercialReviews =
        reviews
            .filter(
                function(review) {

                    return (
                        review.commercialComment
                        &&
                        review.commercialComment.trim()
                        !== ""
                    );

                }
            )
            .slice()
            .reverse();


    if (commercialReviews.length === 0) {

        const empty =
            document.createElement("p");


        empty.innerText =
            "등록된 정보가 없습니다.";


        commercialReviewText.appendChild(
            empty
        );


        return;

    }


    commercialReviews
        .slice(0, 5)
        .forEach(
            function(review) {

                const p =
                    document.createElement("p");


                p.innerText =
                    "• "
                    + review.commercialComment;


                commercialReviewText.appendChild(
                    p
                );

            }
        );

}