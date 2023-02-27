let coins = [];

class Coin extends Entity {
    constructor() {
        super('coin');
        this.sprite.y += Math.random() * COIN_RANDOM_Y_SHIFT;
        this.sprite.pivot.set(this.sprite.width / 2, this.sprite.height / 2);
    }
    move_by_y() {
        return;
    }
}

function update_coins() {
    let new_coins = [];
    for (const [i, coin] of coins.entries()) {
        coin.update();
        if(!coin.marked_for_deletion) {
            new_coins.push(coin);
            if (hero.check_coin_collision(coin)) {
                increment_score();
                coin.mark_for_destruction();
            }
        } else {
            coin.sprite.destroy();
            delete coins[i];
        }
    }
    coins = new_coins;
}

function add_coin() {
    let coin = new Coin();
    app.stage.addChild(coin.sprite);
    coins.push(coin);
}

function check_if_its_time_for_coin(time_mark) {
    if (COIN_NEW_SPAWN_TIME < time_mark) {
        add_coin();
        COIN_LAST_SPAWN_TIME = time_mark;
        get_new_coin_spawn_time();
    }
}
