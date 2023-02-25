const APP_WIDTH = 640;
const APP_HEIGHT = 360;
const APP_BG_COLOR = '#1099bb';
const APP_MAX_FPS = 30;

const FALL_ACCELERATION = 1;
const JUMP_SPEED = -20;

const HERO_WIDTH = 60;
const HERO_HEIGHT = 120;
const HERO_FLOOR_Y = APP_HEIGHT - HERO_HEIGHT;

const CRAWLER_SPAWN_COOLDOWN = 75; // 60 = 1 second
const CRAWLER_SPAWN_RANDOM_DURATION = 105;
let CRAWLER_LAST_SPAWN_TIME = 0; // to test against elapsed
let CRAWLER_NEW_SPAWN_TIME = 1;

function get_new_crawler_spawn_time() {
    CRAWLER_NEW_SPAWN_TIME = CRAWLER_LAST_SPAWN_TIME + CRAWLER_SPAWN_COOLDOWN + Math.random() * CRAWLER_SPAWN_RANDOM_DURATION;
}

const COIN_SPAWN_COOLDOWN = 39; // 60 = 1 second
const COIN_RANDOM_Y_SHIFT = -200;
let COIN_LAST_SPAWN_TIME = 0; // to test against elapsed
let COIN_NEW_SPAWN_TIME = 1;

function get_new_coin_spawn_time() {
    COIN_NEW_SPAWN_TIME = COIN_LAST_SPAWN_TIME + COIN_SPAWN_COOLDOWN;
}

const TEXTURES = {
    'hero': PIXI.Texture.from('images/hero_roman.jpg'),
    'crawler': PIXI.Texture.from('images/mob_crawler.jpg'),
    'coin': PIXI.Texture.from('images/item_blood_coin.jpg'),
    'bullet': PIXI.Texture.from('images/item_crawler_projectile.jpg'),
    'new_game': PIXI.Texture.from('images/button_new_game.jpg'),
    'start': PIXI.Texture.from('images/button_start.jpg'),
};

const INI_PARAMETERS = {
    'hero': {
        'x': 40,
        'y': APP_HEIGHT - HERO_HEIGHT,
        'speed_x': 0,
        'speed_y': -10,
        'rotation': 0, // 0 to 1 as part of 2Pi, full circle
        'rotation_speed': 0,
        'rotation_limit': 0, // times to rotate, -1 for infinite
    },
    'crawler': {
        'x': APP_WIDTH,
        'y': APP_HEIGHT - HERO_HEIGHT,
        'speed_x': -10,
        'speed_y': 0,
        'rotation': 0,
        'rotation_speed': 0,
        'rotation_limit': -1,
    },
    'coin': {
        'x': APP_WIDTH,
        'y': APP_HEIGHT - HERO_HEIGHT/3,
        'speed_x': -10,
        'speed_y': 0,
        'rotation': 0,
        'rotation_speed': Math.PI/15,
        'rotation_limit': -1,
    },
};
