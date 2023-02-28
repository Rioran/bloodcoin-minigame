let score_text;
let score_value = 0;
let help_text;
let game_over_text;
let new_game_sprite;
let start_game_screen;
let start_game_header;
let start_game_footer;

function increment_score() {
    score_value += 1;
    score_text.text = 'Score: ' + score_value;
}

function render_game_over() {
    app.stage.addChild(game_over_text);
    app.stage.addChild(new_game_sprite);
}

function load_interfaces() {
    score_text = new PIXI.Text('Score: 0');
    score_text.x = 20;
    score_text.y = 20;

    help_text = new PIXI.Text('Tap to jump');
    help_text.x = 486;
    help_text.y = 20;

    const game_over_style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 48,
        fontWeight: 'bold',
        fill: ['#ffffff', '#ff0000'], // gradient
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
    });

    game_over_text = new PIXI.Text('GAME OVER', game_over_style);
    const game_over_metrics = PIXI.TextMetrics.measureText('GAME OVER', game_over_style);
    game_over_text.x = (APP_WIDTH - game_over_metrics['width']) / 2;
    game_over_text.y = 60;

    new_game_sprite = PIXI.Sprite.from(TEXTURES['new_game']);
    new_game_sprite.eventMode = 'dynamic';
    new_game_sprite.cursor = 'pointer';
    new_game_sprite.on('pointerdown', () => {
        location.reload();
    });
    new_game_sprite.x = (APP_WIDTH - 400) / 2;
    new_game_sprite.y = 150;

    start_game_screen = new PIXI.Container();

    function hero_highlight(name, text) {
        start_game_header.text = name;
        start_game_footer.text = text;
        TEXTURES.hero = TEXTURES['hero_' + name];
    }
   
    app.stage.addChild(start_game_screen);
    

    let start_game_background = new PIXI.Sprite(PIXI.Texture.WHITE);
    start_game_background.width = APP_WIDTH;
    start_game_background.height = APP_HEIGHT;
    start_game_background.tint = APP_BG_COLOR;
    start_game_background.eventMode = 'dynamic';
    start_game_background.cursor = 'pointer';
    start_game_background.addEventListener('pointerdown', (e) => {
        start_game_screen.parent.removeChild(start_game_screen);
        start_game_screen.destroy({children:true, texture:false, baseTexture:false});
        create_hero();
        app.stage.addChild(score_text);
        app.stage.addChild(help_text);
        app.stage.addChild(hero.sprite);
        app.renderer.view.addEventListener('pointerdown', hero_click);
        app.ticker.add(main_loop);
        song.play();
    });
    start_game_screen.addChild(start_game_background);

    let i = 0;

    for (const [hero_name, hero_description] of Object.entries(HEROES)) {
        const hero_sprite = PIXI.Sprite.from(TEXTURES['hero_' + hero_name]);
        hero_sprite.x = i++ * (HERO_WIDTH + 15) + 15;
        hero_sprite.y = APP_HEIGHT / 3;
        hero_sprite.eventMode = 'dynamic';
        hero_sprite.cursor = 'pointer';
        hero_sprite.addEventListener('pointerdown', (e) => {
            hero_highlight(hero_name, hero_description);
        });
        start_game_screen.addChild(hero_sprite);
    }

    const start_game_header_style = new PIXI.TextStyle({
        fontSize: 80,
        fontWeight: 'bold',
    });
    
    start_game_header = new PIXI.Text('tap hero icon', start_game_header_style);
    start_game_header.x = 15;
    start_game_header.y = 15;
    start_game_screen.addChild(start_game_header);

    start_game_footer = new PIXI.Text('to see some hero traits; after that tap any other\nplace on screen to start the game');
    start_game_footer.x = 15;
    start_game_footer.y = 2 * APP_HEIGHT / 3 + 15;
    start_game_screen.addChild(start_game_footer);
}
