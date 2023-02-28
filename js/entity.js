class Entity {
    constructor(entity_key) {
        this.name = entity_key;
        this.sprite = PIXI.Sprite.from(TEXTURES[entity_key]);
        this.apply_ini_parameters(entity_key);
        this.must_jump = false;
        this.marked_for_deletion = false;
    }
    apply_ini_parameters(entity_key) {
        const params = INI_PARAMETERS[entity_key];
        this.sprite.x = params['x'];
        this.sprite.y = params['y'];
        this.sprite.rotation = params['rotation'];
        this.speed_x = params['speed_x'];
        this.speed_y = params['speed_y'];
        this.rotation_speed = params['rotation_speed'];
        this.rotation_limit = params['rotation_limit'];
    }
    move_by_y() {
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
    move_by_x() {
        this.sprite.x += this.speed_x;
    }
    rotate() {
        if (this.rotation_limit == 0) {return;}
        if (this.rotation_limit > 0) {this.rotation_limit -= 1;}
        this.sprite.rotation += this.rotation_speed;
    }
    mark_for_destruction() {
        this.marked_for_deletion = true;
    }
    check_stage_relevance() {
        if (this.sprite.x + this.sprite.width < 0) {this.mark_for_destruction(); return;}
        if (this.sprite.x > APP_WIDTH) {this.mark_for_destruction(); return;}
        if (this.sprite.y + this.sprite.height < 0) {this.mark_for_destruction(); return;}
        if (this.sprite.y > APP_HEIGHT) {this.mark_for_destruction(); return;}
    }
    update() {
        this.move_by_y();
        this.move_by_x();
        this.rotate();
        this.check_stage_relevance();
    }
}
