let hero;

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
    hero = new Hero();
}

function hero_click() {
    hero.must_jump = true;
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

