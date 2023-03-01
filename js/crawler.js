
let crawlers = [];

class Crawler extends Entity {
    constructor(scores) {
        super('crawler');
        if (scores >= SCORES_STAGE_1) {
            if (Math.random() >= 0.5) {
                this.sprite.y = 60;
            }
        }
        if (scores >= SCORES_STAGE_2) {
            if (Math.random() >= 0.5) {
                this.speed_x -= Math.floor(Math.random() * 11);
            }
        }
        if (scores >= SCORES_STAGE_3) {
            if (Math.random() >= 0.5) {
                this.sprite.x -= Math.floor(Math.random() * 241);
            }
        }
    }
    update() {
        this.move_by_x();
        this.check_stage_relevance();
    }
}

function update_crawlers() {
    let new_crawlers = [];
    for (const [i, crawler] of crawlers.entries()) {
        crawler.update();
        if(!crawler.marked_for_deletion) {
            new_crawlers.push(crawler);
            if (!hero.is_immune) {
                hero.check_collision(crawler);
            }
        } else {
            increment_score();
            app.stage.removeChild(crawler.sprite);
            crawler.sprite.destroy();
            delete crawlers[i];
        }
    }
    crawlers = new_crawlers;
}

function add_crawler(scores) {
    let crawler = new Crawler(scores);
    app.stage.addChild(crawler.sprite);
    crawlers.push(crawler);
}

function check_if_its_time_for_crawler(time_mark, scores) {
    if (CRAWLER_NEW_SPAWN_TIME < time_mark) {
        add_crawler(scores);
        CRAWLER_LAST_SPAWN_TIME = time_mark;
        get_new_crawler_spawn_time(scores);
    }
}
