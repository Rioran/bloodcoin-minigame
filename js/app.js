let app = new PIXI.Application({
    width: APP_WIDTH,
    height: APP_HEIGHT,
    background: '#1099bb',
});
app.ticker.maxFPS = APP_MAX_FPS;
document.body.appendChild(app.view);

let entities = [];

let hero_sprite = PIXI.Sprite.from('images/hero_roman.jpg');
let hero = new Hero(hero_sprite);
app.stage.addChild(hero.sprite);
entities.push(hero)

function hero_click() {
    hero.must_jump = true;
}

app.renderer.view.addEventListener('pointerdown', hero_click);

function update_entities() {
    let new_entities = [];
    for (const [i, entity] of entities.entries()) {
        entity.update();
        if(!entity.marked_for_deletion) {
            new_entities.push(entity);
            hero.check_collision(entity);
        } else {
            if (entity.status == 'hero') {return;}
            increment_score();
        }
        //entities[i].sprite.destroy(true);
        delete entities[i];
    }
    entities = new_entities;
}

function add_crawler() {
    let crawler_sprite = PIXI.Sprite.from('images/mob_crawler.jpg');
    let crawler = new Crawler(crawler_sprite);
    app.stage.addChild(crawler.sprite);
    entities.push(crawler);
}

function check_if_its_time_for_crawler(time_mark) {
    if (CRAWLER_NEW_SPAWN_TIME < time_mark) {
        add_crawler();
        CRAWLER_LAST_SPAWN_TIME = time_mark;
        get_new_crawler_spawn_time();
    }
}

let score_text = new PIXI.Text('Score: 0');
score_text.x = 20;
score_text.y = 20;
let score_value = 0;
app.stage.addChild(score_text);

let help_text = new PIXI.Text('Tap to jump');
help_text.x = 490;
help_text.y = 20;
app.stage.addChild(help_text);

function increment_score() {
    score_value += 1;
    score_text.text = 'Score: ' + score_value;
}

let elapsed = 0.0;
let tick = 0;

app.ticker.add((delta) => {
    tick += 1;
    elapsed += delta;
    if (elapsed > 60) {
        update_entities();
        check_if_its_time_for_crawler(elapsed);
    }
});
