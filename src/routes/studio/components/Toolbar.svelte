<script lang="ts">
let expanded: any = -1;
let file_options = ["Open Project", "Create new project", "Close this project", "Save", "Save as new project", "Save and close"]
let add_options = ["Image", "Character","Text", "Node", "new Scene", "New action"];
let project_options = ["Rebuild", "Inspect"];
let run_options = ["Try in fullscreen", "Build", "Build and run", "Compile into executable"];
let help_options = ["Documentation", "Learn deLIGHT"];

let available_options = [file_options, add_options, run_options, project_options , help_options ]
export let onOption: any;
function expand(index: any){
    
    if(expanded == index){
        expanded = - 1;
    }else{
    expanded = index;
    }
}

</script>

<div class="toolbar">
    <strong on:click={() => expand(0)} class="option">File</strong>
    
    <strong on:click={() => expand(1)} class="option">Add</strong>
 
    <strong on:click={() => expand(2)} class="option">Run</strong>
     
    <strong on:click={() => expand(3)} class="option">Project</strong>

    <strong on:click={() => expand(4)} class="option">Help</strong>
    
    </div>
    {#if expanded != -1}
<div style="margin-left: {(expanded * 5)}vw;" class="dropdown theme-dark">
{#each available_options[expanded] as option, index}
<p></p>
<strong class="option" on:click={() =>{ onOption(expanded, index); expanded = -1;}}>{option}</strong>
{/each}
</div>
{/if}
    <style>
.dropdown{
    position: absolute;
        z-index: 3;
        border: 2px solid black;
        top: 6vh;
        width: auto;
        height: auto;
 
}

.theme-light {
color: black;
    background-color: #ffffff; /* Light theme text color */
  }

.theme-dark {
    background-color: #000000;
  }

.toolbar{
        display: flex;
        
        user-select: none;
        width: 100%;
        left: -0vw;
        position: absolute;
        z-index: 2;
        top: 0;
        border-bottom: 1px solid black;
        height: 6vh;
    }
    .option{
        margin-left: 0.9vw;
        text-align: center;
        cursor: pointer;
        align-content: center;
        padding: 10px 10px;
    }
    .option:hover{
    box-shadow: inset 500px 500px rgba(226, 226, 226, 0.247);

    }
   
    </style>