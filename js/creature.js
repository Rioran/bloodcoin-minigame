class Creature {
    constructor(sprite) {
        this.sprite = sprite;
        this.sprite.x = 0;
        this.sprite.y = 0;
        this.speed_y = 0;
        this.speed_x = 0;
        this.acceleration_x = 0;
        this.must_jump = false;
        this.marked_for_deletion = false;
        this.status = 'Proto entity';
    }
    accelerate_y() {
        if (this.must_jump) {
            this.must_jump = false;
            if (this.sprite.y < HERO_FLOOR_Y) {return;}
            this.speed_y = JUMP_SPEED;
            this.sprite.y += this.speed_y;
            return;
        }
        if (this.sprite.y > HERO_FLOOR_Y) {
            this.sprite.y = HERO_FLOOR_Y;
            this.speed_y = 0;
            return;
        }
        this.speed_y += FALL_ACCELERATION;
        this.sprite.y += this.speed_y;
        this.sprite.y = Math.min(this.sprite.y, HERO_FLOOR_Y);
    }
    accelerate_x() {
        this.speed_x += this.acceleration_x;
        this.sprite.x += this.speed_x;
    }
    self_destruction() {
        this.marked_for_deletion = true;
    }
    check_stage_relevance() {
        if (this.sprite.x + HERO_WIDTH < 0) {this.self_destruction(); return;}
        if (this.sprite.x > APP_WIDTH) {this.self_destruction(); return;}
        if (this.sprite.y + HERO_HEIGHT < 0) {this.self_destruction(); return;}
        if (this.sprite.y > APP_HEIGHT) {this.self_destruction(); return;}
    }
    update() {
        this.accelerate_y();
        this.accelerate_x();
        this.check_stage_relevance();
    }
}