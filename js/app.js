let song = document.getElementById("song");

let app = new PIXI.Application({
    width: APP_WIDTH,
    height: APP_HEIGHT,
    background: APP_BG_COLOR,
});
app.ticker.maxFPS = APP_MAX_FPS;

load_interfaces();

document.body.appendChild(app.view);

let elapsed = 0.0;
let tick = 0;

function main_loop(delta) {
    tick += 1;
    elapsed += delta;
    hero.update();
    if (elapsed > 60) {
        update_crawlers();
        update_coins();
        check_if_its_time_for_crawler(elapsed);
        check_if_its_time_for_coin(elapsed);
    }
}
