<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
  import { Button, Card, Group, Image, Text, Badge } from "@svelteuidev/core";
  import bg00 from '../assets/bg/4258797.jpg'
    import bg01 from '../assets/bg/bg01.jpg'
    import { goto } from "$app/navigation";
import Create_Project from './components/Create_Project.svelte';
import Settings from "./components/Settings.svelte";
    import { onMount } from "svelte";
    import logo from '../assets/novelty_logo.png'


function navigate(project_name: string){
  goto(`/studio/${project_name}`)
}


$: my_projects = [
  ];
  onMount(async () => {
    try {
      let all_projects: string = await invoke('fetch_projects');
      all_projects.forEach((project: any) => {

        let split_data = project.split("\\");
        let project_id = split_data[3];
      

        my_projects = [...my_projects, {
id: project_id,
title: project_id,
description: "It's a game about a dude doing things.",
date_created: "",
icon: bg00,
path: project
  }]

      });


    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  });
  let name = "";
  let greetMsg = "";
  

$: creating_new_project = true;

$: seeing_settings = false;
let project_name = "";


function startProject(name: any){
  create_project(name);
}


  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    greetMsg = await invoke("greet", { name });
  }

  async function create_project(project_name: any){
    const path = "C:\\Novelty\\Projects";

  try {
    await invoke("create_project", { path, name: project_name });
    console.log("Project created successfully");
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
<div class="main_container">
  {#if creating_new_project}
    <Create_Project onConfirm={startProject} onClose={() => creating_new_project = false}/>
  {/if}
  {#if seeing_settings}
    <Settings onClose={() => seeing_settings = false}/>
  {/if}
<div class="container">
  <h1>Recent Projects</h1>

  <div class="projects_container">
{#each my_projects as project, index}

<p></p>

<a href="/studio/{project.id}" class="card-link">
<Card shadow='sm' padding='lg'>
	<Card.Section padding='lg'>
		<Image
			src={project.icon}
			height={160}
			alt='Project scene'
		/>
	</Card.Section>
  
  <Text weight={500}>{project.title}</Text>
  
	<Group position='apart'>
  
		<Text size="sm">{project.path}</Text>
		<Badge color='pink' variant='light'>
			On Sale
		</Badge>
	</Group>

	<Text size='sm'>
	{project.description}</Text>

	<Button variant='light' color='blue' fullSize>
		Keep Writing
	</Button>
  <Button variant='light' color='yellow' fullSize>
		Create Release
	</Button>
</Card>
</a>
{/each}
</div>

</div>
<div class="container2">
  <button on:click={() => creating_new_project = true} class="menu_btn">CREATE NEW PROJECT FROM SCRATCH</button>
 <p></p> <button on:click={open_project} class="menu_btn">OPEN EXISTING PROJECT</button>
 <p></p><button class="menu_btn" on:click={() => { seeing_settings = true; creating_new_project = false; }}>SETTINGS</button>
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
  bottom: -20px;
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
