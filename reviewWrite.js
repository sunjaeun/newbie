/* ==========================================
   URL에서 역 이름 가져오기
========================================== */

const params =
    new URLSearchParams(window.location.search);

const stationParam =
    params.get("station");


/* ==========================================
   HTML 요소
========================================== */

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


/* ==========================================
   역 이름 표시
========================================== */

if (stationParam) {

    stationName.value =
        stationParam;

}


/* ==========================================
   취소 버튼
========================================== */

if (cancelButton) {

    cancelButton.addEventListener(
        "click",
        function() {

            const station =
                stationName.value.trim();

            location.href =
                "review.html?station="
                + encodeURIComponent(station);

        }
    );

}


/* ==========================================
   리뷰 등록
========================================== */

submitReviewButton.addEventListener(
    "click",
    function() {

        const station =
            stationName.value
                .trim()
                .replace(/역$/, "");


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


        /* 로그인 확인 */

        const currentUser =
            localStorage.getItem(
                "subwayhub_user"
            );


        if (!currentUser) {

            alert(
                "로그인 후 리뷰를 등록할 수 있습니다."
            );

            location.href =
                "index.html";

            return;

        }


        /* 역 이름 검사 */

        if (station === "") {

            alert(
                "역 이름을 입력해주세요."
            );

            return;

        }


        /* 화장실 별점 검사 */

        if (
            toiletRating.value === ""
        ) {

            alert(
                "화장실 별점을 선택해주세요."
            );

            return;

        }


        /* 환승 난이도 검사 */

        if (
            transferDifficulty.value === ""
        ) {

            alert(
                "환승 난이도를 선택해주세요."
            );

            return;

        }


        /* ==========================================
           기존 리뷰 불러오기
        ========================================== */

        let reviews =
            JSON.parse(
                localStorage.getItem(
                    "stationReviews"
                )
            );


        if (!Array.isArray(reviews)) {

            reviews = [];

        }


        /* ==========================================
           새 리뷰 생성
        ========================================== */

        const newReview = {

            id: Date.now(),

            user: currentUser,

            station: station,

            toiletRating: toilet,

            toiletComment:
                toiletText,

            transferDifficulty:
                transfer,

            transferComment:
                transferText,

            commercialComment:
                commercialText,

            createdAt:
                Date.now()

        };


        /* ==========================================
           리뷰 저장
        ========================================== */

        reviews.push(
            newReview
        );


        localStorage.setItem(
            "stationReviews",
            JSON.stringify(
                reviews
            )
        );


        /* ==========================================
           업적 진행도 기록
        ========================================== */

        try {

            if (
                typeof recordStationVisit
                ===
                "function"
                &&
                typeof stationDB
                !==
                "undefined"
            ) {

                const lines =
                    stationDB[station]
                    || [];


                recordStationVisit(
                    station,
                    lines
                );

            }

            else {

                console.error(
                    "업적 시스템을 불러오지 못했습니다."
                );

            }

        }

        catch (error) {

            console.error(
                "업적 저장 오류:",
                error
            );

        }


        /* ==========================================
           등록 완료 후 리뷰 페이지 이동
        ========================================== */

        location.href =
            "review.html?station="
            +
            encodeURIComponent(
                station
            );

    }
);