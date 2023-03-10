const APP_WIDTH = 640;
const APP_HEIGHT = 360;
const APP_BG_COLOR = '#D7ECD9';
const APP_MAX_FPS = 30;

const FALL_ACCELERATION = 1;
const JUMP_SPEED = -20;
const GLIDING_FALL_SPEED = 1;

const SCORES_STAGE_1 = 100;
const SCORES_STAGE_2 = 200;
const SCORES_STAGE_3 = 300;

const HERO_WIDTH = 60;
const HERO_HEIGHT = 120;
const HERO_FLOOR_Y = APP_HEIGHT - HERO_HEIGHT;
const SCREAMER_PROJECTILE_SPEED = 39;
const DAN_COOLDOWN = 300;
const DAN_SKILL_DURATION = 240;

const CRAWLER_SPAWN_COOLDOWN = 75; // 60 = 1 second
const CRAWLER_SPAWN_COOLDOWN_LIMIT = 15;
const CRAWLER_SPAWN_CHANGE_SCORE_STEP = 60;
const CRAWLER_SPAWN_RANDOM_DURATION = 105;
let CRAWLER_LAST_SPAWN_TIME = 0; // to test against elapsed
let CRAWLER_NEW_SPAWN_TIME = 1;

function get_new_crawler_spawn_time(score) {
    const delta = Math.floor(score / CRAWLER_SPAWN_CHANGE_SCORE_STEP);
    const new_cooldown = Math.max(CRAWLER_SPAWN_COOLDOWN - delta, CRAWLER_SPAWN_COOLDOWN_LIMIT);
    CRAWLER_NEW_SPAWN_TIME = CRAWLER_LAST_SPAWN_TIME + new_cooldown + Math.random() * CRAWLER_SPAWN_RANDOM_DURATION;
}

const COIN_SPAWN_COOLDOWN = 39; // 60 = 1 second
const COIN_RANDOM_Y_SHIFT = -200;
let COIN_LAST_SPAWN_TIME = 0; // to test against elapsed
let COIN_NEW_SPAWN_TIME = 1;

function get_new_coin_spawn_time() {
    COIN_NEW_SPAWN_TIME = COIN_LAST_SPAWN_TIME + COIN_SPAWN_COOLDOWN;
}

const HEROES = {
    'roman': 'Just a simplton with no redeeming qualities.',
    'nata': 'I\'m a bird, mtfr, I\'m a bird! Tapping while\nin a mid-air activates gliding.',
    'german': 'Skillfull axe wielder - death from above!\nChops enemies while falling down.',
    'lena': 'Dragon, but without all that wings and scales staff.\nTap avatar to use scores as projectiles.',
    'screamer': 'Fiersome dovakin. Tap while jumping down to\nperform a devastating shout.',
    'dan': 'Blood shaman of a forsaken godly figure.\nAvatar taps activate shadow immunity.\n4s duration + 1s cooldown.',
};

const TEXTURES = {
    'hero': PIXI.Texture.from('images/hero_roman.jpg'),
    'hero_roman': PIXI.Texture.from('images/hero_roman.jpg'),
    'hero_nata': PIXI.Texture.from('images/hero_nata.jpg'),
    'hero_german': PIXI.Texture.from('images/hero_german.jpg'),
    'hero_lena': PIXI.Texture.from('images/hero_lena.jpg'),
    'hero_screamer': PIXI.Texture.from('images/hero_screamer.jpg'),
    'hero_dan': PIXI.Texture.from('images/hero_dan.jpg'),
    'crawler': PIXI.Texture.from('images/mob_crawler.jpg'),
    'coin': PIXI.Texture.from('images/item_blood_coin.jpg'),
    'screamer_shout': PIXI.Texture.from('images/item_screamer_projectile.jpg'),
    'bullet': PIXI.Texture.from('images/item_crawler_projectile.jpg'),
    'new_game': PIXI.Texture.from('images/button_new_game.jpg'),
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
    'screamer_shout': {
        'x': 40,
        'y': APP_HEIGHT - HERO_HEIGHT,
        'speed_x': 0,
        'speed_y': 0,
        'rotation': 0,
        'rotation_speed': 0,
        'rotation_limit': 0,
    },
};
