import transpileToRust from "./rustTranspiler";

const transpileToScript = (project_name, scenes, characters, assets, scene_nodes, main_menu_info, text, audio) => {
console.log("text:: this is all the text i have affu: ")
console.log(text)
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
scenes.map((i) => source_code = source_code + "bg " + `'${i.bg.split("/").pop()}'` + ";\n");
source_code = source_code + "\n";
characters.map((i) =>{i.id !== "null" ? source_code = source_code + "char " + i.name + " " + i.id + ";\n": "\n"} );
characters.forEach(c => {
  
{c.id !== "null" ?  c.poses.forEach(p => {
    const file_name = p.file.split("/").pop();

    source_code += `${c.id}.add_pose -> ${p.name} ${file_name};\n`;
  }) : console.log("Null")}
}
);


source_code = source_code + "\n";
assets.map((i) => source_code = source_code + "img " + i.title + ";\n");


audio.map((i) => {
  if(i.title != "no_music"){
  source_code = source_code + "audio " + i.title + ";\n"
}
  else{

  }}
);

//ad
for(var i = 0; i < scenes.length; i++){


//music stuff
for(var m = 0; m < scenes.length; m++){
  if(scenes[m].bgm != 'no_music'){
  source_code = source_code + "\n" + `${scenes[m].title}.play_bgm -> '${scenes[m].bgm}'; \n`
  }}



          //add the main_menu logo data:
          for(var s = 0; s < scenes.length; s++){
          source_code = source_code + "\n" + `${scenes[s].title}.draw_background -> src: '${scenes[s].bg.split("/").pop()}'; \n`
          }
          for(var h = 0; h < assets.length; h++ ){
            if(assets[h].scene == scenes[i].title){
          source_code = source_code + "\n" + `${scenes[i].title}.draw -> src: ${assets[h].title }, x: ${assets[h].x}, y: ${assets[h].y / 2}, width: ${assets[h].width * 2}, height: ${assets[h].height * 2}; \n`
        
        }
}

for(var t = 0; t < text.length; t++ ){

  source_code = source_code + "\n" + `${text[t].scene}.write -> '${text[t].value}'` + `, x: ${text[t].x}, y: ${text[t].y}, color: ${text[t].color}, size: ${text[t].font_size}; \n` ;
console.log("ookiku good luck and goodbye")
  console.log(text[t])

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
        
          console.log('debug_stuff')
          console.log(all_nodes[i].data.length)
          for (var j = 0; j < all_nodes[i].data.length; j++) {

              var obj = all_nodes[i].data[j];
             console.log('real debug')
              console.log(obj)

                if(obj.type == "dialogue"){
                source_code = source_code + "\n" + `${obj.scene}.say -> '${obj.text}', who: ${obj.character}, pose: ${obj.mood}; \n` ;
                }
                if(obj.type == "choice"){
                  source_code = source_code + "\n" + `${obj.scene}.ask -> '${obj.text}'; \n` ;
                  }
              
          }
        }
        
        
   
  
}




console.log(main_menu_info)
console.log(source_code);
console.log("here are the nodes")
console.log( scene_nodes)

transpileToRust(source_code)
return source_code;
}

export default transpileToScript