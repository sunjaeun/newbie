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
   업적 정보
========================================== */

const achievementInfo = {

    transfer_beginner: {
        title: "환승 초보",
        description: "첫 환승역을 기록했어요.",
        icon: "↔",
        goal: 1
    },

    transfer_familiar: {
        title: "이젠 익숙해",
        description: "환승역을 20번 이용했어요.",
        icon: "↔",
        goal: 20
    },

    transfer_master: {
        title: "환승 마스터",
        description: "환승역을 100번 이용했어요.",
        icon: "↔",
        goal: 100
    },

    line_1_master: {
        title: "1호선 마스터",
        description: "1호선 20개 역을 기록했어요.",
        icon: "1",
        goal: 20
    },

    line_2_master: {
        title: "2호선 마스터",
        description: "2호선 20개 역을 기록했어요.",
        icon: "2",
        goal: 20
    },

    line_3_master: {
        title: "3호선 마스터",
        description: "3호선 20개 역을 기록했어요.",
        icon: "3",
        goal: 20
    },

    line_4_master: {
        title: "4호선 마스터",
        description: "4호선 20개 역을 기록했어요.",
        icon: "4",
        goal: 20
    },

    line_5_master: {
        title: "5호선 마스터",
        description: "5호선 20개 역을 기록했어요.",
        icon: "5",
        goal: 20
    },

    line_6_master: {
        title: "6호선 마스터",
        description: "6호선 20개 역을 기록했어요.",
        icon: "6",
        goal: 20
    },

    line_7_master: {
        title: "7호선 마스터",
        description: "7호선 20개 역을 기록했어요.",
        icon: "7",
        goal: 20
    },

    line_8_master: {
        title: "8호선 마스터",
        description: "8호선 20개 역을 기록했어요.",
        icon: "8",
        goal: 20
    },

    line_9_master: {
        title: "9호선 마스터",
        description: "9호선 20개 역을 기록했어요.",
        icon: "9",
        goal: 20
    },

    indie_spirit: {
        title: "인디 스피릿",
        description: "홍대·상수·합정을 모두 기록했어요.",
        icon: "♪",
        goal: 3
    },

    landmark: {
        title: "랜드마크",
        description: "랜드마크가 있는 역을 방문했어요.",
        icon: "◆",
        goal: 1
    },

    campus_tour: {
        title: "캠퍼스 투어",
        description: "대학교 이름이 붙은 역 3곳을 기록했어요.",
        icon: "A",
        goal: 3
    },

    four_seasons: {
        title: "봄여름가을겨울",
        description: "네 계절의 기록을 모두 채웠어요.",
        icon: "✦",
        goal: 4
    }

};


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
   새로 달성한 업적 찾기
========================================== */

function findNewAchievements(
    beforeProgress,
    afterProgress
) {

    const unlocked = [];


    Object.keys(
        achievementInfo
    ).forEach(
        function(id) {

            const info =
                achievementInfo[id];


            const before =
                Number(
                    beforeProgress[id] || 0
                );


            const after =
                Number(
                    afterProgress[id] || 0
                );


            if (
                before < info.goal
                &&
                after >= info.goal
            ) {

                unlocked.push(
                    {
                        id: id,
                        title: info.title,
                        description:
                            info.description,
                        icon: info.icon
                    }
                );

            }

        }
    );


    return unlocked;

}


/* ==========================================
   업적 토스트 CSS
========================================== */

function createAchievementToastStyle() {

    if (
        document.getElementById(
            "achievement-toast-style"
        )
    ) {

        return;

    }


    const style =
        document.createElement("style");


    style.id =
        "achievement-toast-style";


    style.textContent = `

        .achievement-toast {
            position: fixed;

            left: 50%;
            bottom: 26px;

            transform:
                translateX(-50%);

            width: calc(100% - 36px);
            max-width: 390px;

            display: flex;
            align-items: center;

            gap: 14px;

            padding: 15px 17px;

            background: rgba(255, 255, 255, 0.98);

            border: 1px solid #e4e8ee;
            border-left: 4px solid #007bff;

            border-radius: 16px;

            box-shadow:
                0 12px 35px
                rgba(0, 0, 0, 0.14);

            z-index: 99999;

            opacity: 0;

            animation:
                achievementToastIn
                0.35s
                cubic-bezier(
                    0.2,
                    0.8,
                    0.2,
                    1
                )
                forwards;
        }


        .achievement-toast-icon {
            width: 46px;
            height: 46px;

            border-radius: 14px;

            background: #eef5ff;

            display: flex;
            align-items: center;
            justify-content: center;

            flex-shrink: 0;

            color: #007bff;

            font-size: 19px;
            font-weight: 900;

            animation:
                achievementIconPop
                0.45s
                ease;
        }


        .achievement-toast-content {
            flex: 1;
            min-width: 0;
        }


        .achievement-toast-label {
            margin-bottom: 3px;

            color: #007bff;

            font-size: 11px;
            font-weight: 800;

            letter-spacing: 0.05em;
        }


        .achievement-toast-title {
            color: #202124;

            font-size: 16px;
            font-weight: 800;

            line-height: 1.35;
        }


        .achievement-toast-description {
            margin-top: 3px;

            color: #7a7f87;

            font-size: 12px;

            line-height: 1.45;
        }


        .achievement-toast-count {
            margin-left: 6px;

            padding: 4px 7px;

            background: #f1f3f5;

            border-radius: 7px;

            color: #666;

            font-size: 11px;
            font-weight: 700;

            white-space: nowrap;
        }


        .achievement-toast.hide {
            animation:
                achievementToastOut
                0.25s
                ease
                forwards;
        }


        @keyframes achievementToastIn {

            from {
                opacity: 0;

                transform:
                    translateX(-50%)
                    translateY(24px)
                    scale(0.98);
            }

            to {
                opacity: 1;

                transform:
                    translateX(-50%)
                    translateY(0)
                    scale(1);
            }

        }


        @keyframes achievementToastOut {

            from {
                opacity: 1;

                transform:
                    translateX(-50%)
                    translateY(0);
            }

            to {
                opacity: 0;

                transform:
                    translateX(-50%)
                    translateY(12px);
            }

        }


        @keyframes achievementIconPop {

            0% {
                transform: scale(0.7);
            }

            60% {
                transform: scale(1.1);
            }

            100% {
                transform: scale(1);
            }

        }

    `;


    document.head.appendChild(
        style
    );

}


/* ==========================================
   업적 달성 토스트
========================================== */

function showAchievementToast(
    achievements,
    callback
) {

    createAchievementToastStyle();


    const first =
        achievements[0];


    const toast =
        document.createElement("div");


    toast.className =
        "achievement-toast";


    let countHTML = "";


    if (
        achievements.length > 1
    ) {

        countHTML = `
            <div class="achievement-toast-count">
                +${achievements.length - 1}
            </div>
        `;

    }


    toast.innerHTML = `

        <div class="achievement-toast-icon">
            ${first.icon}
        </div>

        <div class="achievement-toast-content">

            <div class="achievement-toast-label">
                새 업적 달성
            </div>

            <div class="achievement-toast-title">
                ${first.title}
            </div>

            <div class="achievement-toast-description">
                ${first.description}
            </div>

        </div>

        ${countHTML}

    `;


    document.body.appendChild(
        toast
    );


    /*
       잠깐 보여준 뒤 자연스럽게 사라짐
    */

    setTimeout(
        function() {

            toast.classList.add(
                "hide"
            );

        },
        1600
    );


    setTimeout(
        function() {

            toast.remove();

            callback();

        },
        1900
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
            Number(
                toiletRating.value
            );


        const transfer =
            Number(
                transferDifficulty.value
            );


        const toiletText =
            toiletComment.value.trim();


        const transferText =
            transferComment.value.trim();


        const commercialText =
            commercialComment.value.trim();


        /* ==========================================
           로그인 확인
        ========================================== */

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


        /* ==========================================
           입력값 확인
        ========================================== */

        if (station === "") {

            alert(
                "역 이름을 입력해주세요."
            );

            return;

        }


        if (
            toiletRating.value === ""
        ) {

            alert(
                "화장실 별점을 선택해주세요."
            );

            return;

        }


        if (
            transferDifficulty.value === ""
        ) {

            alert(
                "환승 난이도를 선택해주세요."
            );

            return;

        }


        /* ==========================================
           기존 리뷰
        ========================================== */

        let reviews =
            JSON.parse(
                localStorage.getItem(
                    "stationReviews"
                )
            );


        if (
            !Array.isArray(reviews)
        ) {

            reviews = [];

        }


        /* ==========================================
           새 리뷰
        ========================================== */

        const newReview = {

            id:
                Date.now(),

            user:
                currentUser,

            station:
                station,

            toiletRating:
                toilet,

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


        reviews.push(
            newReview
        );


        /* ==========================================
           리뷰 저장
        ========================================== */

        localStorage.setItem(
            "stationReviews",
            JSON.stringify(
                reviews
            )
        );


        /* ==========================================
           업적 적용 전 진행도
        ========================================== */

        const progressKey =
            `achievementProgress_${currentUser}`;


        let beforeProgress = {};


        try {

            beforeProgress =
                JSON.parse(
                    localStorage.getItem(
                        progressKey
                    )
                )
                || {};

        }

        catch (error) {

            beforeProgress = {};

        }


        /* ==========================================
           업적 진행도 반영
        ========================================== */

        try {

            if (
                typeof recordStationVisit
                    === "function"
                &&
                typeof stationDB
                    !== "undefined"
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
           업적 적용 후 진행도
        ========================================== */

        let afterProgress = {};


        try {

            afterProgress =
                JSON.parse(
                    localStorage.getItem(
                        progressKey
                    )
                )
                || {};

        }

        catch (error) {

            afterProgress = {};

        }


        /* ==========================================
           이번에 새로 달성한 업적
        ========================================== */

        const unlocked =
            findNewAchievements(
                beforeProgress,
                afterProgress
            );


        /* ==========================================
           리뷰 페이지 이동
        ========================================== */

        function moveToReviewPage() {

            location.href =
                "review.html?station="
                +
                encodeURIComponent(
                    station
                );

        }


        /* ==========================================
           달성했으면 토스트 출력
        ========================================== */

        if (
            unlocked.length > 0
        ) {

            showAchievementToast(
                unlocked,
                moveToReviewPage
            );

        }

        else {

            moveToReviewPage();

        }

    }
);