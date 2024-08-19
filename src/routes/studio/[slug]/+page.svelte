<script lang="ts">
    export const prerender = false;
  import { invoke } from "@tauri-apps/api/tauri";
  import { appWindow } from '@tauri-apps/api/window';
  import Node from '../components/Node.svelte'
  import '../components/modal.css'
  import { page } from '$app/stores';
  import Add_Node from '../components/Add_Node.svelte'
  import EditNode from "../components/Edit_Node.svelte";
  import Add_Scene from '../components/Add_Scene.svelte'
  import AddText from "../components/Add_Text.svelte";
  import bg00 from '../../../assets/bg/4258797.jpg'
  import bg01 from '../../../assets/bg/bg01.jpg'
import neutral00 from '../../../assets/chars/neutral00.png'
import logo from '../../../assets/utils/logo.png'
    import AddScene from "../components/Add_Scene.svelte";
import Toolbar from '../components/Toolbar.svelte'
import {NativeSelect, Checkbox, CheckboxGroup, Title} from "@svelteuidev/core" 
import transpileToScript from '../utils/scriptTranspiler'
import buildAndRun from '../utils/build_and_run'
import build from "../utils/build";
    import Assets from "../components/Assets.svelte";
    import Attributes from "../components/Attributes.svelte";
    import save_and_close from "../utils/save_and_close";
    import closeProject from '../utils/close_project'
    import AddCharacter from "../components/Add_Character.svelte";
    import { onMount } from "svelte";
    import transpileToRust from "../utils/rustTranspiler";


    let current_editing_node: any;
    
    let current_editing_node_index: any;
    const all_scenes = [bg00, bg01]
   let code: string;
  $: scenes = [
    {title: "main_menu", bg: bg00, id: 0},
   {title: "city", bg: bg01, id: 1}
];

  let images = [bg00, bg01, logo];
   let fonts = ["font.ttf", "font2.ttf"]
  $: game_logo_xy = {x: 90, y: 10}
  let game_logo = logo;

$: assets = [
/*    {
    scene: "main_menu",
    title: "logo",
    src: `'${game_logo}'`,
    x: 100,
    y: 100,
    width: 200,
    height: 200
}*/ 
];



    let text: Array<any> = [];

  let audio = [{
    title: "love",
    file: "love.wav"
}]
  let characters = [
    {name: "me", id: "0000"}, 
    {name: "Dude", id: "0001", poses: [neutral00]}, 
    {name: "Guy", id: "0001", poses: [neutral00]}
]
  $: seeing = 0;
  let display = 0;
  let balloon_bg = "pink"
  let balloon_border = "purple"
  let balloon_color = "white"
  let balloon_style = {border: "2px solid purple", bg: "pink", visible: true, color: "white"}
  $: balloon_style.bg = balloon_bg;
  $: balloon_style.border = `2px solid ${balloon_border}`
  $: balloon_style.color = `${balloon_color}`
let project_name: string;

  // Or use $page store if you need reactive access to the whole page object
  $: {
    const { params } = $page;
    console.log(params.slug);
    project_name = params.slug;
  }

  const items = [
		{ label: 'START GAME', value: 'start' },
		{ label: 'LOAD GAME', value: 'load' },
		{ label: 'SETTINGS', value: 'settings' },
		{ label: 'ABOUT', value: 'about' },
		{ label: 'EXIT', value: 'exit' }
	];

    async function setWindowTitle(projectName: string) {
    const newTitle = `Novelty - ${projectName}`;
    await appWindow.setTitle(newTitle);
  }

  onMount(() => {
    const projectName = 'current_project.nvl*'; 
    setWindowTitle(projectName);
  });
setWindowTitle('current_project.nvl*');
    let menu_buttons: any = ['start']
    let menu_padding_top: any = 200;
    let menu_padding_left: any = 0;
    let menu_button_color: any = 'white'
     let menu_button_size: any = 40;
    $: main_menu_info = {
    items: menu_buttons,
    color: menu_button_color,
    items_align: 'left',
    start_at: menu_padding_top,
    slide_from: menu_padding_left,
    font_size: menu_button_size
  };
  let action: any = null;
  //0 scene, 1 dialog, 2 main menu
  let currently_inspecting = 2;

//types include dialogue, transition, choice and action

let mms = [{
    scene: "main_menu",
   type: "",
   character: "",
   text: "Execute. ",
   options: [''],
   x: 20,
   y: 20,
  }
]

  let script_code = [{
    scene: "city",
   type: "dialogue",
   character: "0000",
   text: "Hello.",
   options: [''],
   x: 0,
   y: 20,
  },
{
    scene: "city",
type: "dialogue",
 character: "0000",
 text: "What would you like to eat?",
 options: [''],
 x: 3,
 y: 20,
},
]




let scene_nodes = [mms, script_code]
//open add node modal
function addNode(){
action = "adding_node";
}

//add new scene to array
function confirmScene(text: string, background: any){

    const new_scene = {
        title: text,
        bg: background,
        id: Math.floor(Math.random() * 539)
    }
    scenes = [...scenes, new_scene]
action = null;
}

function confirmText(value: string, color_str: string, fs: number){
    const newTextObject = {
    scene: scenes[seeing].title,
    value: value,
    x: 100,
    y: 100,
    font_size: fs ,
    color: color_str
};
text = [...text, newTextObject]
console.log(newTextObject)
console.log(text)
action = null;
}

async function openImage(){
  try {
    let file_path = await invoke("open_project", {});
    console.log(file_path)
    if(file_path){
     //if image has been opened, copy it to the project workspace, hasnet been implemented on rust yet tho
     try {
    await invoke('load_file', {
      from: file_path,
      name: project_name,
      file_type: "images",
      file_name: "file.png"
    });
    console.log('File copied successfully');
  } catch (error) {
    console.error('Error copying file:', error);
  }
}
  }
  catch(error){
    console.error(error)

  
}
}

function confirmEditNode(character, type, text) {
    let current_node_id = current_editing_node_index;
    
}

// add new modal to array

function confirmNode(character, type, text) {

    let thisType = '';
let actionArray: any = []
        switch (type) {
            case "Dialogue":
                thisType = "dialogue";
                break;
            case "Multiple Choice":
                thisType = "choice";
                break;
            case "Action":
                thisType = "action";
                break;
        }

        const node = {
            scene: scenes[seeing].title,
            type: thisType,
            character: character,
            text: text,
            options: actionArray,
            x: (2 * (characters.length + 1)), 
            y: 20
        };

        console.log('Adding node:', node);
        console.log('Current scene index:', seeing);
        console.log('Before update:', scene_nodes);

        // Ensure scene_nodes[seeing] is an array before pushing
        if (!Array.isArray(scene_nodes[seeing])) {
            scene_nodes[seeing] = [];
        }

        // Add the node to the current scene
        scene_nodes[seeing] = [...scene_nodes[seeing], node];

        console.log('After update:', scene_nodes);

        // Reset action (if needed)
        action = null;
    }

    // Reactive statement to update UI when `scene_nodes` or `seeing` changes
    $: current_scene_nodes = scene_nodes[seeing];



function selectToolbarOption(bundle: any, index: any){
    if(bundle == 0 && index == 5){
        save_and_close();
    }
    if(bundle == 0 && index == 2){
        closeProject();
    }
    if(bundle == 1 && index == 0){
        openImage();
    }
    if(bundle == 1 && index == 1){
        action = "adding_character";
    }
    if(bundle == 1 && index == 2){
        action = "adding_text";
    }
    if(bundle == 2 && index == 1){
     let delight_code =  transpileToScript(project_name, scenes, characters, assets, scene_nodes, main_menu_info, text, audio);
  
     let rust_code = transpileToRust(delight_code);
       buildAndRun(project_name, rust_code)
    }
    if(bundle == 2 && index == 2){
      let delight_code = transpileToScript(project_name, scenes, characters, assets, scene_nodes, main_menu_info, text, audio);

      let rust_code = transpileToRust(delight_code);
      if(project_name){
      buildAndRun(project_name, rust_code)
    }
}
}
  function setSeeing(value: any){
    seeing = value;
    console.log(seeing)
  }
  function setDisplay(value: any){
    display = value;

  }
  function findCharacter(codeCharacter: any) {
    const character = characters.find(character => character.id === codeCharacter);
    return character ? character.name : "Unknown";
    }


    function handleNodeClick(index: number) {
        window.scrollTo({
            left: index, // Scroll horizontally by index * 200 pixels
            behavior: 'smooth' // Smooth scrolling
        });
    }

  

</script>
<div style="width: auto !important; height: 96vh !important; overflow: hidden;">
<Toolbar onOption={selectToolbarOption}/>


{#if action == "adding_node"}
<Add_Node onConfirm={confirmNode} onClose={() => action = null} available_characters={characters}/>
{/if}
{#if action == "editing_node"}
<EditNode onSaveNode={confirmEditNode} onClose={() => action = null} available_characters={characters} current_node={current_editing_node}/>
{/if}

{#if action == "adding_scene"}
<AddScene onConfirm={confirmScene} onClose={() => action = null} available_bg={all_scenes}/>
{/if}
{#if action == "adding_character"}
<AddCharacter onConfirm={confirmScene} onClose={() => action = null} poses={all_scenes}/>
{/if}
{#if action == "adding_text"}
<AddText onConfirm={confirmText} onClose={() => action = null}/>
{/if}
<div class="main_container">
   <div class="left_container"> 
 <Assets fonts={fonts} images={assets} scenes={scenes} audio={audio} characters={characters}/>
<Attributes bind:logo_x={game_logo_xy.x} bind:logo_y={game_logo_xy.y} bind:seeing={seeing} bind:scenes={scenes} bind:current_bg={scenes[seeing].bg} bind:current_logo={game_logo} images={images} bind:menu_buttons={menu_buttons} bind:menu_button_color={menu_button_color} bind:menu_button_size={menu_button_size} currently_inspecting={currently_inspecting} items={items} bind:balloon_bg={balloon_bg} bind:balloon_border={balloon_border} bind:balloon_color={balloon_color} bind:menu_padding_left={menu_padding_left} bind:menu_padding_top={menu_padding_top}/>
</div>
    <div class="right_container">
        <div class="switch">
            <button class={display == 0? `switch_not_active` : `switch_active`} on:click={() => setDisplay(0)}>⛫ Scene</button>
            <button class={display == 1? `switch_not_active` : `switch_active`} on:click={() => setDisplay(1)}>☍ Event Nodes</button>
            
            <button class={display == 2? `switch_not_active` : `switch_active`} on:click={() => {setDisplay(2); code = transpileToScript(project_name, scenes, characters, assets, scene_nodes, main_menu_info, text, audio)}}>⌨ Scripting</button>
        </div>
<div class="scene_preview">



    {#if display == 0}


   

    {#each text as txt, index}
    {#if txt.scene === scenes[seeing].title}
        <strong  style="margin-left: {txt.x}px; top: {txt.y + 3.0}px; font-size: {txt.font_size * 3.3}px; position: absolute; color: {txt.color}">{txt.value}</strong>
    {/if}
{/each}

{#each assets as asset, index}
{#if asset.scene === scenes[seeing].title}
<img style="position: absolute; top: 15.6%; left: 70vw; width: 25vw; height: 50vh; z-index: 1;" src={asset.src.replace(/'/g, ' ')}/>
{/if}
{/each}

    <img  style={`border: ${currently_inspecting == 4 ? '3px solid white' : 'none'}`}   on:click={() => currently_inspecting = 4} class="scene_bg" src={scenes[seeing].bg} alt="scene"/>
    
{#if seeing != 0}

<img style="position: absolute; top: 15.6%; left: 70vw; width: 25vw; height: 50vh; z-index: 1;" src={characters[1].poses[0]}/>

<div on:click={() => currently_inspecting = 1} style="background-color: {balloon_style.bg}; border: {balloon_style.border}" class="balloon">
<div style="background-color: rgba(0,0,0,0.7);">Character Name</div>
    <strong style="color: {balloon_style.color} !important; margin-left: 1%; padding-top: 10px;">This is how your dialogue will show.</strong>

    
</div>



{:else if seeing == 0}

<img  on:click={() => currently_inspecting = 3} style={`left: ${game_logo_xy.x}vw;top: ${game_logo_xy.y}vh; border: ${currently_inspecting == 3 ? '3px solid white' : 'none'}`} alt="logo from your game." src={game_logo} class="logo_preview"/>

<div on:click={() => currently_inspecting = 2} class="main_menu_preview"   style={`top: ${-590 + menu_padding_top}px; left: ${menu_padding_left}px; font-size: ${menu_button_size + 30.0}vw; border: ${currently_inspecting == 2 ? '2px solid white' : 'none'}`}
    >

    {#each main_menu_info.items as item, index}

    <h1 style=" font-size: {main_menu_info.font_size * 2}px;color: {main_menu_info.color}">{item}</h1>
{/each}





</div>



{/if}
{:else if display == 1}
 <div style="background-color: rgba(0,0,0,0.9);"><strong style="color: white">Scene {seeing} Event Nodes</strong></div>
<div class="scripting">
   
    {#if current_scene_nodes}
    {#each current_scene_nodes as code, index}
        <Node onEdit={() => {action = "editing_node"; current_editing_node= code; current_editing_node= index;}} onNodeClick={ handleNodeClick(index * 20)} x={code.x} y={code.y} prop1={code.text} prop2={findCharacter(code.character)} prop3={code.type} prop4={code.options}/>
    {/each}
{/if}
<div style="position: absolute;bottom: 30vh; width: 61%; height: 10%;"><strong style="color: white">
    <button on:click={addNode}  style="width: 10%; height: 100%;margin-left: 2vw;">+</button>
    <button  style="width: 10%; height: 100%;margin-left: 2vw;">?</button>
</div>

</div>
{:else if display == 2}
<textarea bind:value={code} spellcheck="false" class="code_area"></textarea>

{/if}
</div>
<div class="scenes">
{#each scenes as scene, index}
    <div  tabindex="0"  class="scene" role="button"  on:keydown="{(e) => e.key === 'Enter' && setSeeing(index)}"  on:click={() => setSeeing(index)}>
     
        <div style="width: 12vw;position: sticky; background-color: black; color: white;">{scene.title}

            <button style="position: absolute; left: 98%">-</button>
            <button style="position: absolute; left: 112%">x</button>
        </div>
    <img class="scene_bg"src={scene.bg} alt="scene"/>
    </div>
{/each}
<div on:click={() => action = "adding_scene"} class="scene add">+</div>
</div>
</div>
</div>

</div>
<style>


.logo_preview{
    width: 20vw;
    position: absolute;
    height: 20vh;
}
    .code_area{
        width: 100%;
        height: 100%;

        background-color: rgb(0, 37, 37);   
    color: white;
    }


    
    .switch{
        padding-left: 4vw;
        height: 4vh;
        width: 100%;
        display: flex;
    }
    .switch_active{
      
        border: none;
    }
    .switch_not_active{
        border: 3px solid rgb(0, 68, 48);
        border-bottom: none;
        background-color: rgb(0, 68, 48);
        color: white;
    }
    .scripting{
        align-content: center;
        align-items: center;
        background: linear-gradient(rgb(0, 37, 37), black);
    width: 60vw;
    overflow-x: scroll;
    display: flex;
    gap: 2vw;
    height: 100%;
    }
    .option{
        margin-left: 0.9vw;
        text-align: center;
        cursor: pointer;
        align-content: center;
        padding: 10px 10px;
    }
    .option:hover{
    box-shadow: inset 500px 500px rgba(0, 0, 0, 0.247);

    }
    .scene{
        border: 2px solid black;
        width: 15vw;
        margin-left: 2vw;
        height: 90%;
        flex-shrink: 0;
        cursor: pointer;
        overflow: hidden !important;
    }
    .scene:hover {
        transform: scale(1.1);
    }
    .scene_bg{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .balloon{
       
        bottom: 23vh !important;
        position: relative;
        z-index: 1;
        width: 97%;
        margin-left: 0.6vw;
        height: 20vh;
    }

    @font-face{
        font-family: PressStart2P;
        src: url('../../../assets/fonts/PressStart2P-Regular.ttf')
    }

    .main_menu_preview{
      font-family: PressStart2P;
       position: relative;
       width: 20vw;
       margin-left: 0.6vw;
       height: auto;
   }
    .add{
        font-size: 5vw;
        text-align: center;
        align-items: center;
        align-content: center;
    }
    .scenes{
        display: flex;
        height: 22vh;
        width: 60vw;
        overflow-x: scroll;
        overflow-y: hidden;
   margin-top: 4vh;
    margin-left: 2vw;
    }
    
   
    .right_container{
         height: auto;
    }
    .left_container{
         height: auto;
    gap: 2vh;
    margin-top: 2vh;
        }
       
.assets{
    
    border: 2px solid black;
    width: 30vw;
    margin-left: 2vw;
height: 42vh;
}
.assets_item{
    
width: 100%;
height: 4vh;
background-color: gray;
}
.asset{

}


    .main_container{
        user-select: none;
        overflow: hidden !important;
        width: 100vw;
        height: 100vh;
        padding-top: 5vh;
        display: flex;
       
    }
.scene_preview{
    border: 2px solid black;
    width: 60vw;
    height: 60vh;
    margin-left: 4vw;
}
</style>