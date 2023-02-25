class Hero extends Entity {
    constructor() {
        super('hero');
        this.status = 'alive';
    }
    is_collision(entity) {
        return this.sprite.x < entity.sprite.x + HERO_WIDTH
            && this.sprite.x > entity.sprite.x - HERO_WIDTH
            && this.sprite.y < entity.sprite.y + HERO_HEIGHT
            && this.sprite.y > entity.sprite.y - HERO_HEIGHT
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

let hero = new Hero();

function hero_click() {
    hero.must_jump = true;
}
