let hero;
let hero_projectiles = [];

class Hero extends Entity {
    constructor(hero_key = 'hero') {
        super(hero_key);
        this.status = 'alive';
        this.is_immune = false;
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
    update(global_time) {
        this.move_by_y();
        this.move_by_x();
        this.check_stage_relevance();
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
    if (hero_name == 'lena') {
        hero = new Lena();
        return;
    }
    if (hero_name == 'dan') {
        hero = new Dan();
        return;
    }
    hero = new Hero();
}

function hero_click() {
    hero.must_jump = true;
}

function lena_click() {
    hero.fire();
}

function dan_click() {
    hero.walk_the_shadows();
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

class Dan extends Hero {
    constructor() {
        super('hero_dan');
        this.immunity_cooldown = 0;
        this.immunity_time_left = 0;
        this.last_shadow_update_time = 0;
        this.sprite.eventMode = 'dynamic';
        this.sprite.cursor = 'pointer';
        this.sprite.addEventListener('pointerdown', dan_click);
    }
    walk_the_shadows() {
        if (this.immunity_cooldown) {return;}
        this.immunity_cooldown = DAN_COOLDOWN;
        this.immunity_time_left = DAN_SKILL_DURATION;
        this.is_immune = true;
        this.sprite.alpha = 0.5;
    }
    update_shadows(time) {
        const delta = time - this.last_shadow_update_time;
        this.last_shadow_update_time = time;
        if (this.immunity_cooldown) {
            this.immunity_cooldown -= delta;
            if (this.immunity_cooldown < 0) {this.immunity_cooldown = 0;}
        }
        if (this.immunity_time_left) {
            this.immunity_time_left -= delta;
            if (this.immunity_time_left <= 0) {
                this.immunity_time_left = 0;
                this.is_immune = false;
                this.sprite.alpha = 1;
            }
        }
    }
    update(global_time) {
        this.move_by_y();
        this.update_shadows(global_time);
        this.check_stage_relevance();
    }
}

class Lena_Fireball extends Entity {
    constructor(ini_y = HERO_FLOOR_Y) {
        super('coin');
        this.rotation_speed *= 1.7;
        this.sprite.y += Math.random() * COIN_RANDOM_Y_SHIFT;
        this.sprite.pivot.set(this.sprite.width / 2, this.sprite.height / 2);
        this.sprite.y = ini_y + HERO_HEIGHT / 2 - this.sprite.height / 2;
        this.sprite.x = 40;
        this.speed_x *= -1;
    }
    move_by_y() {
        return;
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
            this.mark_for_destruction();
            increment_score();
        }
    }
}

class Lena extends Hero {
    constructor() {
        super('hero_lena');
        this.sprite.eventMode = 'dynamic';
        this.sprite.cursor = 'pointer';
        this.sprite.addEventListener('pointerdown', lena_click);
    }
    fire() {
        increment_score(-1);
        this.must_jump = true;
        let fireball = new Lena_Fireball(this.sprite.y);
        app.stage.addChild(fireball.sprite);
        hero_projectiles.push(fireball);
    }
}

class Screamer_Shout extends Entity {
    constructor(ini_y = HERO_FLOOR_Y) {
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
    update(global_time) {
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
