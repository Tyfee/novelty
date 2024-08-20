import transpileToRust from "./rustTranspiler";

const transpileToScript = (project_name, scenes, characters, assets, scene_nodes, main_menu_info, text, audio) => {

var source_code = `window_title "${project_name}";\n\n`;    
var menu_info = [{
    items: [
        "start"
    ],
    color: "white",
    items_align: "left",
    start_at: 0,
    slide_from: 0,
    font_size: 1
}]
menu_info = main_menu_info;

// turn every scene into a variable;
//ex scene.name = "scene 1" becomes "scene scene_1;"
scenes.map((i) => source_code = source_code + "scene " + i.title + ";\n");
source_code = source_code + "\n";
characters.map((i) => source_code = source_code + "char " + i.name + ";\n");
assets.map((i) => source_code = source_code + "img " + i.title + ";\n");
audio.map((i) => source_code = source_code + "audio " + i.title + ";\n");

//ad
for(var i = 0; i < scenes.length; i++){

          //add the main_menu logo data:
          for(var s = 0; s < scenes.length; s++){
          source_code = source_code + "\n" + `${scenes[s].title}.draw_background -> src: '${scenes[s].bg}'; \n`
          }
          for(var h = 0; h < assets.length; h++ ){
            if(assets[h].scene == scenes[i].title){
          source_code = source_code + "\n" + `${scenes[i].title}.draw -> src: ${assets[h].title }, x: ${assets[h].x}, y: ${assets[h].y / 2}, width: ${assets[h].width * 2}, height: ${assets[h].height * 2}; \n`
        
        }
}

for(var t = 0; t < text.length; t++ ){
    if(text[t].scene == scenes[i].title){
  source_code = source_code + "\n" + `${text[t].scene}.write -> '${text[t].value}'` + `, x: ${text[t].x}, y: ${text[t].y}, color: ${text[t].color}, size: ${text[t].font_size}; \n` ;
  
}
}
var all_nodes = []
for(var n = 0; n < scene_nodes.length; n++ ){
      
    all_nodes.push(scene_nodes[n]);
    console.log(all_nodes)

}




          //add the text data

        for(var j = 0; j < main_menu_info.items.length; j++){
        source_code = source_code + "\n" + `${scenes[i].title}.write -> '${main_menu_info.items[j]}'` + `, x: ${main_menu_info.slide_from}, y: ${main_menu_info.start_at + j * 100}, color: ${main_menu_info.color}, size: ${main_menu_info.font_size - 10}; \n` ;
        }
        for (var i = 0; i < all_nodes.length; i++) {
          var node = all_nodes[i];
          for (var j = 0; j < node.length; j++) {
              var obj = node[j];

              if(obj.scene == scenes[i].title && obj.scene != 'main_menu'){
                if(obj.type == "dialogue"){
                source_code = source_code + "\n" + `${obj.scene}.say -> '${obj.text}', who: ${obj.character}; \n` ;
                }
                if(obj.type == "choice"){
                  source_code = source_code + "\n" + `${obj.scene}.ask -> '${obj.text}'; \n` ;
                  }
              }
          }
        }
        
        
   
  
}




console.log(main_menu_info)
console.log(source_code);
console.log(scene_nodes)

transpileToRust(source_code)
return source_code;
}

export default transpileToScript