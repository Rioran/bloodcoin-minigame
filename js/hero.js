let hero;
let hero_projectiles = [];

class Hero extends Entity {
    constructor(hero_key = 'hero') {
        super(hero_key);
        this.status = 'alive';
    }
    is_collision(entity) {
        return this.sprite.x < entity.sprite.x + entity.sprite.width
            && this.sprite.x > entity.sprite.x - this.sprite.width
            && this.sprite.y < entity.sprite.y + entity.sprite.height
            && this.sprite.y > entity.sprite.y - this.sprite.height
    }
    check_collision(entity) {
        if (entity == null) {return;}
        if (this.is_collision(entity)) {
            this.status = 'dead';
            render_game_over();
            app.ticker.stop();
        }
    }
    check_coin_collision(entity) {
        if (entity == null) {return false;}
        if (this.is_collision(entity)) {return true;}
        return false;
    }
}

function create_hero(hero_name) {
    if (hero_name == 'german') {
        hero = new German();
        return;
    }
    if (hero_name == 'nata') {
        hero = new Nata();
        return;
    }
    if (hero_name == 'screamer') {
        hero = new Screamer();
        return;
    }
    hero = new Hero();
}

function hero_click() {
    hero.must_jump = true;
}

function update_hero_projectiles() {
    let new_hero_projectiles = [];
    for (const [i, projectile] of hero_projectiles.entries()) {
        projectile.update();
        if(!projectile.marked_for_deletion) {
            new_hero_projectiles.push(projectile);
            projectile.iterate_victims(crawlers);
        } else {
            app.stage.removeChild(projectile.sprite);
            projectile.sprite.destroy();
            delete hero_projectiles[i];
        }
    }
    hero_projectiles = new_hero_projectiles;
}

class Screamer_Shout extends Entity {
    constructor(ini_y = HERO_HEIGHT) {
        super('screamer_shout');
        this.sprite.scale.x /= this.sprite.width / HERO_WIDTH;
        this.sprite.y = ini_y;
    }
    fly() {
        const new_width = this.sprite.width + SCREAMER_PROJECTILE_SPEED;
        const delta = new_width / this.sprite.width;
        this.sprite.scale.x *= delta;
    }
    check_for_deletion() {
        if (this.sprite.width > APP_WIDTH * 1.2) {
            this.mark_for_destruction();
        }
    }
    update() {
        this.fly();
        this.check_for_deletion();
    }
    is_collision(entity) {
        return this.sprite.x < entity.sprite.x + entity.sprite.width
            && this.sprite.x > entity.sprite.x - this.sprite.width
            && this.sprite.y < entity.sprite.y + entity.sprite.height
            && this.sprite.y > entity.sprite.y - this.sprite.height
    }
    iterate_victims(victims) {
        for (const [i, victim] of victims.entries()) {
            if (!this.is_collision(victim)) {return;}
            victim.mark_for_destruction();
            increment_score();
        }
    }
}

class Screamer extends Hero {
    constructor() {
        super('hero_screamer');
        this.breath = 0;
        this.shouts_this_jump = 0;
    }
    shout() {
        this.breath -= 1;
        this.shouts_this_jump += 1;
        let shout = new Screamer_Shout(this.sprite.y);
        app.stage.addChild(shout.sprite);
        hero_projectiles.push(shout);
    }
    move_by_y() {
        if (this.must_jump) {
            this.must_jump = false;
            if (
                this.sprite.y < HERO_FLOOR_Y
                && this.speed_y > 0
                && this.breath > 0
                && this.shouts_this_jump == 0
            ) {
                this.shout();
            }
            if (this.sprite.y < HERO_FLOOR_Y) {return;}
            this.speed_y = JUMP_SPEED;
            this.sprite.y += this.speed_y;
            this.shouts_this_jump = 0;
            return;
        }
        if (this.sprite.y + this.sprite.height >= APP_HEIGHT) {
            this.sprite.y = APP_HEIGHT - this.sprite.height;
            this.speed_y = 0;
            this.shouts_this_jump = 0;
            return;
        }
        const speed_y_old = this.speed_y;
        this.speed_y += FALL_ACCELERATION;
        if (speed_y_old <= 0) {
            if (this.speed_y > 0) {
                this.breath = 1;
            }
        }
        this.sprite.y += this.speed_y;
        this.sprite.y = Math.min(this.sprite.y, HERO_FLOOR_Y);
    }
}

class German extends Hero {
    constructor() {
        super('hero_german');
    }
    check_collision(entity) {
        if (entity == null) {return;}
        if (!this.is_collision(entity)) {return;}
        // German stopms enemies from above.
        if (this.speed_y > 0) {
            entity.mark_for_destruction();
            return;
        }
        this.status = 'dead';
        render_game_over();
        app.ticker.stop();
    }
}

class Nata extends Hero {
    constructor() {
        super('hero_nata');
        this.is_gliding = false;
    }
    move_by_y() {
        if (this.is_gliding) {
            if (this.must_jump) {
                this.is_gliding = false;
                this.must_jump = false;
                this.speed_y += FALL_ACCELERATION;
                this.sprite.y += this.speed_y;
                this.sprite.y = Math.min(this.sprite.y, HERO_FLOOR_Y);
                return;
            }
            this.speed_y = GLIDING_FALL_SPEED;
            this.sprite.y += this.speed_y;
            this.sprite.y = Math.min(this.sprite.y, HERO_FLOOR_Y);
            return;
        }
        if (this.sprite.y + this.sprite.height < APP_HEIGHT) {
            if (this.must_jump) {
                this.is_gliding = true;
                this.must_jump = false;
                this.speed_y = GLIDING_FALL_SPEED;
                return;
            }
        }

        if (this.must_jump) {
            this.must_jump = false;
            if (this.sprite.y < HERO_FLOOR_Y) {return;}
            this.speed_y = JUMP_SPEED;
            this.sprite.y += this.speed_y;
            return;
        }
        if (this.sprite.y + this.sprite.height >= APP_HEIGHT) {
            this.sprite.y = APP_HEIGHT - this.sprite.height;
            this.speed_y = 0;
            return;
        }
        this.speed_y += FALL_ACCELERATION;
        this.sprite.y += this.speed_y;
        this.sprite.y = Math.min(this.sprite.y, HERO_FLOOR_Y);
    }
}
