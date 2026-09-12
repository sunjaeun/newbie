/* ==========================================
   SubwayHub 업적 관리
========================================== */


/* ==========================================
   현재 사용자
========================================== */

function getCurrentUser() {

    return localStorage.getItem(
        "subwayhub_user"
    );

}


/* ==========================================
   업적 진행도 불러오기
========================================== */

function loadAchievementProgress() {

    const user =
        getCurrentUser();


    if (!user) {

        return {};

    }


    const saved =
        localStorage.getItem(
            `achievementProgress_${user}`
        );


    if (!saved) {

        return {};

    }


    try {

        return JSON.parse(
            saved
        );

    }

    catch (error) {

        console.error(
            "업적 진행도 불러오기 실패:",
            error
        );

        return {};

    }

}


/* ==========================================
   업적 상세 데이터 기본값
========================================== */

function createDefaultAchievementData() {

    return {

        transferVisitCount: 0,

        lineStations: {

            "1호선": [],
            "2호선": [],
            "3호선": [],
            "4호선": [],
            "5호선": [],
            "6호선": [],
            "7호선": [],
            "8호선": [],
            "9호선": []

        },

        indieStations: [],

        landmarkStations: [],

        campusStations: [],

        seasons: []

    };

}


/* ==========================================
   업적 상세 데이터 불러오기
========================================== */

function loadAchievementData() {

    const user =
        getCurrentUser();


    if (!user) {

        return createDefaultAchievementData();

    }


    const defaultData =
        createDefaultAchievementData();


    const saved =
        localStorage.getItem(
            `achievementData_${user}`
        );


    if (!saved) {

        return defaultData;

    }


    try {

        const parsed =
            JSON.parse(saved);


        return {

            ...defaultData,

            ...parsed,

            lineStations: {

                ...defaultData.lineStations,

                ...(parsed.lineStations || {})

            }

        };

    }

    catch (error) {

        console.error(
            "업적 상세 데이터 불러오기 실패:",
            error
        );


        return defaultData;

    }

}


/* ==========================================
   업적 저장
========================================== */

function saveAchievementData(
    progress,
    data
) {

    const user =
        getCurrentUser();


    if (!user) {

        return;

    }


    localStorage.setItem(

        `achievementProgress_${user}`,

        JSON.stringify(
            progress
        )

    );


    localStorage.setItem(

        `achievementData_${user}`,

        JSON.stringify(
            data
        )

    );

}


/* ==========================================
   중복 없이 배열에 추가
========================================== */

function addUnique(
    array,
    value
) {

    if (
        !array.includes(value)
    ) {

        array.push(
            value
        );

    }

}


/* ==========================================
   현재 계절
========================================== */

function getCurrentSeason() {

    const month =
        new Date().getMonth()
        + 1;


    if (
        month >= 3
        &&
        month <= 5
    ) {

        return "spring";

    }


    if (
        month >= 6
        &&
        month <= 8
    ) {

        return "summer";

    }


    if (
        month >= 9
        &&
        month <= 11
    ) {

        return "autumn";

    }


    return "winter";

}


/* ==========================================
   역 이용 기록
========================================== */

function recordStationVisit(
    stationName,
    stationLines
) {

    const user =
        getCurrentUser();


    if (!user) {

        console.warn(
            "로그인된 사용자가 없습니다."
        );

        return;

    }


    const station =
        stationName
            .trim()
            .replace(/역$/, "");


    const lines =
        Array.isArray(
            stationLines
        )
            ? stationLines
            : [];


    const progress =
        loadAchievementProgress();


    const data =
        loadAchievementData();


    /* ==========================================
       환승 업적
    ========================================== */

    if (
        lines.length >= 2
    ) {

        data.transferVisitCount += 1;

    }


    progress.transfer_beginner =
        data.transferVisitCount;


    progress.transfer_familiar =
        data.transferVisitCount;


    progress.transfer_master =
        data.transferVisitCount;


    /* ==========================================
       1~9호선 마스터
    ========================================== */

    for (
        let number = 1;
        number <= 9;
        number++
    ) {

        const line =
            `${number}호선`;


        if (
            lines.includes(line)
        ) {

            addUnique(
                data.lineStations[line],
                station
            );

        }


        progress[
            `line_${number}_master`
        ] =
            data.lineStations[
                line
            ].length;

    }


    /* ==========================================
       인디 스피릿
    ========================================== */

    const indieTargets = [

        "홍대입구",
        "상수",
        "합정"

    ];


    if (
        indieTargets.includes(
            station
        )
    ) {

        addUnique(
            data.indieStations,
            station
        );

    }


    progress.indie_spirit =
        data.indieStations.length;


    /* ==========================================
       랜드마크
    ========================================== */

    const landmarkTargets = [

        "잠실",
        "광화문",
        "경복궁",
        "서울역",
        "여의도",
        "명동"

    ];


    if (
        landmarkTargets.includes(
            station
        )
    ) {

        addUnique(
            data.landmarkStations,
            station
        );

    }


    progress.landmark =
        data.landmarkStations.length
        > 0
            ? 1
            : 0;


    /* ==========================================
       캠퍼스 투어
    ========================================== */

    const campusTargets = [

        "고려대",
        "건대입구",
        "홍대입구",
        "서울대입구",
        "숭실대입구",
        "한양대",
        "성균관대",
        "이대",
        "숙대입구",
        "성신여대입구",
        "인하대"

    ];


    if (
        campusTargets.includes(
            station
        )
    ) {

        addUnique(
            data.campusStations,
            station
        );

    }


    progress.campus_tour =
        data.campusStations.length;


    /* ==========================================
       봄여름가을겨울
    ========================================== */

    const season =
        getCurrentSeason();


    addUnique(
        data.seasons,
        season
    );


    progress.four_seasons =
        data.seasons.length;


    /* ==========================================
       저장
    ========================================== */

    saveAchievementData(
        progress,
        data
    );


    console.log(
        "업적 저장 완료:",
        user,
        station,
        progress
    );

}


/* ==========================================
   특정 업적 +1
========================================== */

function increaseAchievement(
    achievementId,
    amount = 1
) {

    const user =
        getCurrentUser();


    if (!user) {

        return;

    }


    const progress =
        loadAchievementProgress();


    const data =
        loadAchievementData();


    progress[achievementId] =
        (
            progress[
                achievementId
            ]
            || 0
        )
        +
        amount;


    saveAchievementData(
        progress,
        data
    );

}


/* ==========================================
   특정 업적 값을 직접 설정
========================================== */

function setAchievementProgress(
    achievementId,
    value
) {

    const user =
        getCurrentUser();


    if (!user) {

        return;

    }


    const progress =
        loadAchievementProgress();


    const data =
        loadAchievementData();


    progress[
        achievementId
    ] =
        value;


    saveAchievementData(
        progress,
        data
    );

}