const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const skinNumber = urlParams.get("skin");

var _skin = [
    {
        cactus: ["imgs/cactus_3.png", "imgs/cactus_2.png", "imgs/cactus.png"],
        cloud: ["imgs/cloud_03.png", "imgs/cloud_02.png", "imgs/cloud_01.png"],
        /*dead*/ dinoElem: ["imgs/dino-lose.png", "imgs/dino-lose.png","imgs/dino-lose.png", "imgs/dino-lose.png"],
        dinoRunElem: ["imgs/dino-run-0.png", "imgs/dino-run-1.png"],
        dinoFlyElem: ["imgs/dino_fly_0.png", "imgs/dino_fly_1.png"],
        dinoJumpElem: ["imgs/jump_02_2.png", "imgs/dino-stationary.png", "imgs/jump_01.png"],
        bgImg: "imgs/bg_02.png",
        standingImg: "imgs/dino-stationary.png",


        GRAVITY: 0.0015,
    },
    {
        cactus: ["imgs/wiz/ball_1.png", "imgs/wiz/ball_2.png", "imgs/wiz/ball_3.png", "imgs/wiz/ball_4.png", "imgs/wiz/ball_5.png"],
        cloud: ["imgs/wiz/wiz_cloud_1.png", "imgs/wiz/wiz_cloud_2.png", "imgs/wiz/wiz_cloud_3.png"],
        /*dead*/ dinoElem: ["imgs/wiz/wiz_dead_1.png", "imgs/wiz/wiz_dead_2.png", "imgs/wiz/wiz_dead_3.png", "imgs/wiz/wiz_dead_4.png",],
        dinoRunElem: ["imgs/wiz/wiz_run_1.png", "imgs/wiz/wiz_run_2.png"],
        dinoFlyElem: ["imgs/wiz/wiz_fly_1.png", "imgs/wiz/wiz_fly_2.png"],
        dinoJumpElem: ["imgs/wiz/wiz_jump_3.png", "imgs/wiz/wiz_jump_4.png", "imgs/wiz/wiz_jump_5.png"],
        bgImg: "imgs/wiz/wiz_bg.png",
        standingImg: "imgs/wiz/wiz_standing.png",

        GRAVITY: 0.0015,
    },
    { // same as the first
        cactus: ["imgs/horsy/horsy_obsticle_01.png", "imgs/horsy/horsy_obsticle_02.png", "imgs/horsy/horsy_obsticle_03.png"],
        cloud: ["imgs/horsy/cloud_01.png", "imgs/horsy/cloud_02.png", "imgs/horsy/cloud_03.png"],
        dinoElem: ["imgs/horsy/horsy_lose.png", "imgs/horsy/horsy_lose.png","imgs/horsy/horsy_lose.png"],
        dinoRunElem: ["imgs/horsy/horsy_run_01.png", "imgs/horsy/horsy_run_02.png"],
        dinoFlyElem: ["imgs/horsy/horsy_fly_01.png", "imgs/horsy/horsy_fly_02.png"],
        dinoJumpElem: ["imgs/horsy/horsy_jump_01.png", "imgs/horsy/horsy_jump_02.png", "imgs/horsy/horsy_jump_01.png"],
        bgImg: "imgs/horsy/horsy_bg.png",
        standingImg: "imgs/horsy/horsy_standing.png",

        GRAVITY: 0.0015,
    }
]

export function getSkinElem(type) {
    console.log("skinNumber = ", skinNumber);
    console.log("getSkinElem meghívva. type = ", type);
    console.log("_skin = ", _skin);
    let ret = _skin[skinNumber][type]
    console.log("ret = ", ret);
    return ret;
}


export function setBackground(){

    var imgElement = document.querySelectorAll('img');
    imgElement[0].src = getSkinElem("bgImg");
    imgElement[1].src = getSkinElem("bgImg");
    imgElement[2].src = getSkinElem("standingImg");
}
