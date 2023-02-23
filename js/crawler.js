
class Crawler extends Creature {
    constructor(sprite) {
        super(sprite);
        this.sprite.x = APP_WIDTH;
        this.sprite.y = HERO_FLOOR_Y;
        this.speed_y = 0;
        this.speed_x = -10;
        this.status = 'crawler';
    }
    self_destruction() {
        super.self_destruction();
    }
}
