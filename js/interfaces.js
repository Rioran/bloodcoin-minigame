let score_text;
let score_value = 0;
let help_text;
let start_game_sprite;
let game_over_text;
let new_game_sprite;

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

    start_game_sprite = PIXI.Sprite.from(TEXTURES['start']);
    start_game_sprite.eventMode = 'dynamic';
    start_game_sprite.cursor = 'pointer';
    start_game_sprite.on('pointerdown', () => {
        app.ticker.add(main_loop);
        song.play();
        start_game_sprite.destroy();
    });
    start_game_sprite.x = (APP_WIDTH - 400) / 2;
    start_game_sprite.y = 150;
}
