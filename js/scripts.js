const app_width = 640;
const app_height = 360;
const hero_width = 60;
const hero_height = 120;
const hero_floor_y = app_height - hero_height;
const hero_ini_x_offset = 40;
const hero_ini_y_offset = 20;

let hero_y_speed = 0;
let fall_acceleration = 0.6;

let app = new PIXI.Application({
  width: app_width,
  height: app_height,
});
document.body.appendChild(app.view);

let sprite = PIXI.Sprite.from('images/hero_roman.jpg');
app.stage.addChild(sprite);

sprite.x = hero_ini_x_offset;
sprite.y = hero_ini_y_offset;

// Create window frame
let frame = new PIXI.Graphics();
frame.beginFill(0x666666);
frame.lineStyle({ color: 0xffffff, width: 4, alignment: 0 });
frame.drawRect(0, 0, 208, 208);
frame.position.set(320 - 104, 180 - 104);
app.stage.addChild(frame);

// Create a graphics object to define our mask
let mask = new PIXI.Graphics();
// Add the rectangular area to show
mask.beginFill(0xffffff);
mask.drawRect(0,0,200,200);
mask.endFill();

// Add container that will hold our masked content
let maskContainer = new PIXI.Container();
// Set the mask to use our graphics object from above
maskContainer.mask = mask;
// Add the mask as a child, so that the mask is positioned relative to its parent
maskContainer.addChild(mask);
// Offset by the window's frame width
maskContainer.position.set(4,4);
// And add the container to the window!
frame.addChild(maskContainer);

// Create contents for the masked container
let text = new PIXI.Text(
  'This text will scroll up and be masked, so you can see how masking works.  Lorem ipsum and all that.\n\n' +
  'You can put anything in the container and it will be masked!',
  {
    fontSize: 24,
    fill: 0x1010ff,
    wordWrap: true,
    wordWrapWidth: 180
  }
);
text.x = 10;
maskContainer.addChild(text);

let elapsed = 0.0;

// Add a ticker callback to scroll the text up and down
app.ticker.add((delta) => {
  elapsed += delta;
  // Update the text's y coordinate to scroll it
  text.y = 10 + -100.0 + Math.cos(elapsed/50.0) * 100.0;
  if (sprite.y < hero_floor_y) {
      hero_y_speed += fall_acceleration;
      sprite.y += hero_y_speed;
  } else {
      hero_y_speed = 0;
  }
});
