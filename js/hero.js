class Hero extends Entity {
    constructor() {
        super('hero');
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

let hero = new Hero();

function hero_click() {
    hero.must_jump = true;
}
