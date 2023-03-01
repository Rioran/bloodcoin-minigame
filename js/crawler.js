
let crawlers = [];

class Crawler extends Entity {
    constructor() {
        super('crawler');
    }
}

function update_crawlers() {
    let new_crawlers = [];
    for (const [i, crawler] of crawlers.entries()) {
        crawler.update();
        if(!crawler.marked_for_deletion) {
            new_crawlers.push(crawler);
            hero.check_collision(crawler);
        } else {
            increment_score();
            app.stage.removeChild(crawler.sprite);
            crawler.sprite.destroy();
            delete crawlers[i];
        }
    }
    crawlers = new_crawlers;
}

function add_crawler() {
    let crawler = new Crawler();
    app.stage.addChild(crawler.sprite);
    crawlers.push(crawler);
}

function check_if_its_time_for_crawler(time_mark) {
    if (CRAWLER_NEW_SPAWN_TIME < time_mark) {
        add_crawler();
        CRAWLER_LAST_SPAWN_TIME = time_mark;
        get_new_crawler_spawn_time();
    }
}
