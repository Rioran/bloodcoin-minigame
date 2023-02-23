
class Hero extends Creature {
    constructor(sprite) {
        super(sprite);
        this.sprite.x = HERO_INI_X_OFFSET;
        this.sprite.y = HERO_INI_Y_OFFSET;
        this.speed_y = HERO_INI_Y_SPEED;
        this.speed_x = 0;
        this.status = 'hero';
        this.sprite.eventMode = 'dynamic';
        this.sprite.cursor = 'pointer';
        //this.sprite.on('pointerdown', hero_click);
    }
    check_collision(entity) {
        if (entity == null) {return;}
        if (entity.status == 'hero') {return;}
        const check = this.sprite.x < entity.sprite.x + HERO_WIDTH
            && this.sprite.x > entity.sprite.x - HERO_WIDTH
            && this.sprite.y < entity.sprite.y + HERO_HEIGHT
            && this.sprite.y > entity.sprite.y - HERO_HEIGHT
        if (check) {
            console.log('oops, collision!');
            app.ticker.stop();
            //this.self_destruction();
        }
    }
}
