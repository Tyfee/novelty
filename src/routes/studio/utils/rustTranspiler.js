const transpileToRust = (script) => {

  var game_name = "Test";
script = script.replace(/;/g, '')
var total_scenes = [];
var total_images =[];
var total_audio = [];
var functions = [];
var nodes = [];
let scene_data = {}; 
//this is the default header for the code;
var header = `
use macroquad::prelude::*;
\nuse macroquad::audio;
\n 
fn window_conf() -> Conf {
    Conf {
        window_title: ${game_name}.to_owned(),
        window_width: 800,
        window_height: 300,
        fullscreen: false,
        ..Default::default()
    }
}

#[macroquad::main(window_conf)]
async fn main() {



        clear_background(LIGHTGRAY);
`
// this will hold the texture loading methods;
var user_define = ""


var default_code = `loop {

        clear_background(LIGHTGRAY);
       let (mouse_x, mouse_y) = mouse_position();
      `
      // this is where the rendering process and the user events will happen
var user_loop = ""

//this will come at the end of every file
var closing = `\n\n next_frame().await
}
}`
//read the passed code parameter line by line and turn each sentence into a full rust code
var parsed = script.split('\n')


for (var i = 0; i < parsed.length; i++){
const thisLine = parsed[i].split(' ');


if(parsed[i].includes("window_title")){
  game_name = thisLine[1];

  header = `
  use macroquad::prelude::*;
  \nuse macroquad::audio;
fn window_conf() -> Conf {
    Conf {
        window_title: ${game_name}.to_owned(),
        window_width: 800,
        window_height: 500,
        fullscreen: false,
        ..Default::default()
    }
}

  #[macroquad::main(window_conf)]
  async fn main() {
  
  
        clear_background(LIGHTGRAY);
  `

}

var all_nodes = [];
//turn each scene into a texture variable
if(parsed[i].includes("scene")){
  total_scenes.push(thisLine[1]);

user_define = user_define + `
\nlet ${thisLine[1]}: Texture2D = load_texture(\"assets/scenes/${thisLine[1]}.png\").await.unwrap();

\nlet mut ${thisLine[1]}_index = 0;`
}
console.log("all theh scenes: "+ total_scenes)

 if (parsed[i].includes(".say ->")) {
    let preparse = parsed[i];  
    let semiparse = preparse.replace('.say ->', '').trim(); 
    let full_parse = semiparse.split("'"); 
    
    if (full_parse.length >= 2) {
      let scene_name = full_parse[0].trim();  
      let text = full_parse[1].trim();  
      
      scene_name = scene_name.replace(/[^\w\s]/g, '');  
      
      
      if (!scene_data[scene_name]) {
        scene_data[scene_name] = []; 
      }
      
      scene_data[scene_name].push(text);
    } else {
      console.warn('Invalid line format:', parsed[i]);
    }
  }



  if(parsed[i].includes("img") || parsed[i].includes("image")){
    total_images.push(thisLine[1]);
  
    
  user_define = user_define + `\nlet ${thisLine[1]}: Texture2D = load_texture(\"assets/images/${thisLine[1]}.png\").await.unwrap();\n`
  
  }
  
  if(parsed[i].includes("audio") || parsed[i].includes("music")){
    total_audio.push(thisLine[1]);
  
    
  user_define = user_define + `\nlet ${thisLine[1]} = audio::load_sound(\"assets/audio/${thisLine[1]}.wav\").await.unwrap();\n`
  
  }
  
  
  
  //find functions by lokoing for '->' in each line if found, break down the whole line into its params
  if(parsed[i].includes('->')){
  
    var reparsed = parsed[i].split('->')
    var scene_function = reparsed[0].split('.')
  
    //push every function into the array with its corresponding scene where it should be called
    var function_struct = {
      scene: scene_function[0],
      method: scene_function[1],
      params: reparsed[1]
    }
  
   functions.push(function_struct);
  
  } 
  }
  
  user_define = user_define + `\nlet scenes = [${total_scenes}]; \n`
  if(total_images.length > 0){
  user_define = user_define + `\nlet images = [${total_images}]; \n`
  }
  user_define = user_define + `\nlet mut current_scene = 0; \n`
  
  
  
  console.log(functions)
  //every action will be turned into rust code here. including the whole rendering pipeline.
  
  var hasDialog = false;
  
  for(var i = 0; i < total_scenes.length; i++){
  user_loop = user_loop + `\nif current_scene == ${i} {`
  
  user_loop = user_loop + `\nif is_key_down(KeyCode::Right) {\n  
        
        current_scene = 1;

        \n}`

        if(i != 0){
          user_loop = user_loop + `\nif is_key_pressed(KeyCode::Space) &&  ${total_scenes[i]}_index < ${total_scenes[i]}_nodes.len() {
          \n
        ${total_scenes[i]}_index += 1;
  
          \n}`
        }
  
        //check for functions corresponding to the current scene
  for(var j = 0; j < functions.length; j++){
    console.log(functions[j])
    //if found use if/else to define what to do at what function 'draw', 'draw_background', 'write', 'etc'
    if(functions[j].scene == total_scenes[i]){
  console.log(functions[j].scene + " and " + total_scenes[i])
      if (functions[j].method.trim() == "draw_background") {
        
        console.log("drawing_bg...")
        user_loop = user_loop + `\n \n draw_texture_ex(&scenes[${i}], 0., 0., WHITE,   DrawTextureParams {
            dest_size: Some(vec2(screen_width(), screen_height())),
            ..Default::default()
          },); \n`
        }else if (functions[j].method.trim().includes("write")){
          var parsed_text_params = functions[j].params.trim().replace(/'/g, '"').split(',');
          console.log(parsed_text_params)
          user_loop = user_loop + `\n \n draw_text(${parsed_text_params[0]}, ${parsed_text_params[1].replace(/[^0-9]/g, '')}.0 * (screen_width() / 1000.0),   ${parsed_text_params[2].replace(/[^0-9]/g, '')}.0 * (screen_height() / 500.0),   ${parsed_text_params[4].replace(/[^0-9]/g, '')}.0 * (screen_width().min(screen_height()) / 100.0), ${parsed_text_params[3].replace('color:', '').toUpperCase()}); \n`
        }else if (functions[j].method.trim() == "draw"){
          
          var parsed_text_params = functions[j].params.trim().replace(/'/g, ' ').split(',');
          console.log(parsed_text_params[0])
          const parsed_x = parsed_text_params[1].split(":")
          const parsed_y = parsed_text_params[2].split(":")
          const parsed_w = parsed_text_params[3].split(":")
          const parsed_h = parsed_text_params[4].split(":")
          const obj = {};
  
          user_loop = user_loop + `\n \n draw_texture_ex(&images[${i}], ${parsed_x[1]}.0, ${parsed_y[1]}.0, WHITE,   DrawTextureParams {
            dest_size: Some(vec2(${parsed_w[1]}.0, ${parsed_h[1]}.0)),
            ..Default::default()
          },); \n` }
        
      else if (functions[j].method.trim() == "say" && !hasDialog){
        
        var parsed_text_params = functions[j].params.trim().replace(/'/g, ' ').split(',');
           
        user_loop = user_loop + `\n draw_rectangle(20.0, screen_height() / 1.6, screen_width() / 1.05, screen_height() / 3.0, PINK);\n`;
        user_loop = user_loop +  `\n draw_text(&${total_scenes[i]}_nodes[${total_scenes[i]}_index], 50.0, screen_height() / 1.4, (screen_width() * screen_height()) / 14000.0, BLACK);`
  
     hasDialog = true;
          }
          
    }
  }
  user_loop = user_loop + "\n }"

}

for (let i = 0; i < total_scenes.length; i++) {
  let scene_name = total_scenes[i];  
  let texts = scene_data[scene_name] || [];  
  
let formatted_texts = texts.map(text => `"${text.replace(/"/g, '\\"')}".to_string()`).join(", ");


  let array_declaration = `let ${scene_name}_nodes: Vec<String> = vec![${formatted_texts}];\n`;

  user_define += array_declaration;



}
var full_code = header + user_define + default_code + user_loop + closing; 

console.log(full_code);
return full_code;


}

export default transpileToRust