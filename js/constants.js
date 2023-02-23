const APP_WIDTH = 640;
const APP_HEIGHT = 360;
const APP_MAX_FPS = 30;

const FALL_ACCELERATION = 1;
const JUMP_SPEED = -20;

const HERO_WIDTH = 60;
const HERO_HEIGHT = 120;
const HERO_FLOOR_Y = APP_HEIGHT - HERO_HEIGHT;
const HERO_INI_X_OFFSET = 40;
const HERO_INI_Y_OFFSET = HERO_FLOOR_Y;
const HERO_INI_Y_SPEED = -10;

const CRAWLER_INI_X_SPEED = -4;
const CRAWLER_SPAWN_COOLDOWN = 60; // 60 = 1 second
const CRAWLER_SPAWN_RANDOM_DURATION = 120;
let CRAWLER_LAST_SPAWN_TIME = 0; // to test against elapsed
let CRAWLER_NEW_SPAWN_TIME = 1;

function get_new_crawler_spawn_time() {
    CRAWLER_NEW_SPAWN_TIME = CRAWLER_LAST_SPAWN_TIME + CRAWLER_SPAWN_COOLDOWN + Math.random() * CRAWLER_SPAWN_RANDOM_DURATION;
}
