<script lang="ts">
import {invoke} from "@tauri-apps/api/tauri"
import '../themes.css'
  import { Button, Card, Group, Image, Text, Badge } from "@svelteuidev/core";
  import bg00 from '../assets/bg/4258797.jpg'
    import bg01 from '../assets/bg/bg01.jpg'
    import { goto } from "$app/navigation";
import Create_Project from './components/Create_Project.svelte';
import EditProject from "./components/Edit_Project.svelte";
import Settings from "./components/Settings.svelte";
    import { onMount } from "svelte";
    import logo from '../assets/novelty_logo.png'
import en from '../lang/en-US.json'
import pt from '../lang/pt-BR.json'
import ja from '../lang/ja-JA.json'
import fr from '../lang/fr-FR.json'
import es from '../lang/es.json'
    import Popup from "./components/Popup.svelte";
    import toast, { Toaster } from "svelte-french-toast";
function navigate(project_name: string){
  goto(`/studio/${project_name}`)
  console.log(project_name)
}

let my_projects: any[] = []
$: theme = "theme-dark"
onMount(async () => {
  my_projects = await fetchProjects()

  console.log('huh')
})

async function fetchProjects(): Promise<any[]> {
  const projects: any[] = [];

  try {
    const all_projects: string[] = await invoke('fetch_projects');
console.log(all_projects)
    all_projects.forEach((projectPath: string) => {
      const split_data = projectPath.split("\\");
      const project_id = split_data[3];

      projects.push({
        id: project_id,
        title: project_id,
        description: "It's a game about a dude doing things",
        date_created: "",
        icon: bg00,
        path: projectPath
      });
    });
  } catch (error) {
    console.error('Failed to fetch projects:', error);
  }

  return projects;
}
async function deleteProject(project_name: string){
  console.log(project_name)
  const path = "C:\\Novelty\\Projects";
  try{
  await invoke('delete_project', { path, 
    name: project_name
  
  })
  my_projects = await fetchProjects();
  toast.success("Project deleted succesfully!");

  }catch (error){
    console.log("There has been an error deleting your project " + project_name + ": " + error)
  }
}
$: current_language = en
$: l = current_language[0]
$: currently_editing = ""
const language_map = [{
  "English": en,
  "Português": pt,
  "Français": fr,
   "日本語": ja,
   "Español": es
}]

  let name = "";
  let greetMsg = "";

$: creating_new_project = false;
$: editing_project = false;
$: seeing_settings = false;
let project_name = "";


function startProject(name: string, description: string){
  create_project(name, description);
}

function changeLanguage(language: string){
console.log(language_map[0][language])
current_language = language_map[0][language]
}
  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    greetMsg = await invoke("greet", { name });
  }

  async function create_project(project_name: string, description: string){
    const path = "C:\\Novelty\\Projects";

  try {
    await invoke("create_project", { path, name: project_name, description: description });
    console.log("Project created successfully");
    toast.success("Project created succesfully!");

    navigate(project_name)
    creating_new_project = false;
  } catch (error) {
    console.error("Error creating project:", error);
  }



  }

  async function open_project(){
  try {
    let file_path = await invoke("open_project", {});
    console.log(file_path)
    if(file_path){
      navigate("idk")
    }
  }
  catch(error){
    console.error(error)

  }
}
</script>
<div class={`main_container ${theme}`}>
  
<Toaster />
  {#if creating_new_project}
    <Create_Project onConfirm={startProject} onClose={() => creating_new_project = false}/>
  {/if}
  {#if editing_project}
    <EditProject desc={currently_editing.description} text={currently_editing.title} onConfirm={startProject} onClose={() => editing_project = false}/>
  {/if}
  {#if seeing_settings}
    <Settings current_language={current_language} onChooseLanguage={changeLanguage} onClose={() => 
    {seeing_settings = false;
    
    }}/>
  {/if}
<div class={`container ${theme}`}>
  <h1>{l.rp}</h1>

  <div class={`projects_container ${theme}`}>

    {#if my_projects.length < 1}

<p>{l.nny} <a on:click={() => {creating_new_project = true}} href="#create">Start writing now.</a></p>
    {/if}
{#each my_projects as project, index}

<p></p>

<Card class={`card ${theme}`} withBorder  shadow='sm' padding='lg'>
	<Card.Section padding='lg'>
		<Image
			src={project.icon}
			height={160}
			alt='Project scene'
		/>
	</Card.Section>
  
  <Text class={`text ${theme}`} weight={500}>{project.title}</Text>
  
	<Group position='apart'>
  
		<Text class={`text ${theme}`} size="sm">{project.path}</Text>
		<Badge color='pink' variant='light'>
			01/01/1970
		</Badge>
	</Group>

	<Text class={`text ${theme}`} size='sm'>
	{project.description}</Text>

	<Button on:click={() => navigate(project.title)} variant='light' color='green' fullSize>
		Keep Writing
	</Button>
  <Button  on:click={() => {editing_project = true; currently_editing = project}} variant='light' color='yellow' fullSize>
		Edit Project
	</Button>

  <Button variant='light' color='blue' fullSize>
		Duplicate Project
	</Button>
  <Button on:click={() =>{
     deleteProject(project.title);
  }} variant='light' color='red' fullSize>
		Delete Project 
	</Button>
  
</Card>

{/each}
</div>

</div>
<div class="container2">
  <button on:click={() => creating_new_project = true} class="menu_btn">CREATE NEW PROJECT FROM SCRATCH</button>
 <p></p> <button on:click={open_project} class="menu_btn">OPEN EXISTING PROJECT</button>
 <p></p><button class="menu_btn" on:click={() => { seeing_settings = true; creating_new_project = false; }}>{(l.s).toUpperCase()}</button>
 <p></p> <button class="menu_btn">GET FULL VERSION LICENSE</button>
</div>

<div class="logo_container">
<img alt="logo" class="logo" src={logo}/>
<div>
<strong>V.0.01</strong>
<p>
<a style="font-weight: bold;" href="https://novelty.tyfee.top/v001/changelog.html">Read Changelog</a></p>
</div>
</div>

</div>
<style>
  .card-link{
    margin-top: 100px;
  }
  .projects_container{
    
    height: 60vh;
     overflow-y: scroll;
     scrollbar-width: none;      
  -ms-overflow-style: none;   
}

.projects_container::-webkit-scrollbar {
  display: none; 
}
  .logo.vite:hover {
    filter: drop-shadow(0 0 2em #747bff);
  }

  .logo.svelte-kit:hover {
    filter: drop-shadow(0 0 2em #ff3e00);
  }

  :root {
    user-select: none;
    font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;

    color: #0f0f0f;
    background-color: #d6d6d6;
overflow: hidden;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

  
.main_container{
  width: 100vw;
  height: 100vw;
  display: flex;
  
}
  .container {
    margin: 0;
    padding-top: 10vh;
    padding-left: 2vw;
     width: 50vw;
    flex-direction: column;
  }
.project_icon{
  width: 100%;
  object-fit: cover;
}
.logo_container{
  position: absolute;
  z-index: 3;
  left: 0;
  bottom: -5px;
  display: flex;
  align-items: end;
}
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: 0.75s;
  }
  .container2{
    width: 40vw;
    height: 100vh !important;
    padding-left: 5vw;
    padding-top: 5vh;
  }
.menu_btn{
  
  transition: all 0.2s ease-in-out;
  width: 100%;
  height: 18vh;
}
.menu_btn:hover{
transform: scale(1.1);
}
.project:hover{
  
transform: scale(1.05);
}
  .logo.tauri:hover {
    filter: drop-shadow(0 0 2em #24c8db);
  }
.project{
  border: 2px solid gray;
  border-radius: 5px;
  width: 100%;
  padding-left: 1vw;
  padding-top: 2vh;
  margin-top: 5vh;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
  .row {
    display: flex;
    justify-content: center;
  }

  a {
    font-weight: 500;
    color: #646cff;
    text-decoration: inherit;
  }

  a:hover {
    color: #535bf2;
  }

  h1 {
    text-align: center;
  }

  input,
  button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    color: #0f0f0f;
    background-color: #ffffff;
    transition: border-color 0.25s;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  }

  button {
    cursor: pointer;
  }

  button:hover {
    border-color: #396cd8;
  }
  button:active {
    border-color: #396cd8;
    background-color: #e8e8e8;
  }

  input,
  button {
    outline: none;
  }

  #greet-input {
    margin-right: 5px;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      color: #f6f6f6;
      background-color: #2f2f2f;
    }

    a:hover {
      color: #24c8db;
    }

    input,
    button {
      color: #ffffff;
      background-color: #0f0f0f98;
    }
    button:active {
      background-color: #0f0f0f69;
    }
  }
</style>
