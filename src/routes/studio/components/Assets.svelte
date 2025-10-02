<script lang="ts">

import { Accordion } from '@svelteuidev/core';
export let characters
export let audio
export let scenes
export let images
export let fonts
export let theme: string;
export let onAddCharacter;
let open_tabs = [0, 1]

function toggleDisplay(index: any){
    if(open_tabs.includes(index)){
       open_tabs = open_tabs.filter((i) => i != index)
    }else{
         open_tabs = [...open_tabs, index]
    }

}

</script>

<div class="assets {theme}">
    🗎 Assets Management


    <Accordion>
        <Accordion.Item class="accordion_item {theme}" value="typescript">
          <div slot="control">Scenes</div>
          
    {#each scenes as scene, index}
          <p class="asset {theme}">⛶ {scene.title}</p>
          {/each}
        </Accordion.Item>
        <Accordion.Item   class="accordion_item {theme}" value="packed">
          <div slot="control">Characters</div>
          {#each characters as character, index}
          <p on:click={character.id == "null" ?  onAddCharacter : console.log("teste")} class="asset"> {character.id == "null" ? "+ Add Character" : "☺ " + character?.name}</p>
          {/each}
        </Accordion.Item>
        <Accordion.Item  class="accordion_item {theme}" value="accessible">
          <div slot="control">Audio</div>
          {#each audio as audi, index}
       
    <p class="asset">♫ {audi.title}</p>
          {/each}  </Accordion.Item >



          <Accordion.Item   class="accordion_item {theme}" value="images">
            <div slot="control">Images</div>
            {#each images as image, index}
            <p class="asset">☺ {image.title}</p>
            {/each}
          </Accordion.Item >


          
          <Accordion.Item  class="accordion_item {theme}" value="fonts">
            <div slot="control">Fonts</div>
            {#each fonts as font, index}
            <p class="asset">⯑ {font}</p>
            {/each}
          </Accordion.Item>
       
      </Accordion>


  
<!-- display all of the characters-->
  



   
    </div>

    <style>

.assets{
    overflow-y: scroll;
    border: 2px solid black;
    width: 30vw;
    margin-left: 2vw;
height: 42vh;
}
.assets_item{
    
    width: 100%;
    height: 4vh;
  
    text-align: center;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    }
    .asset{
        border: 1px solid black;
        height: 12%;
        background-color: teal;
        font-weight: bold;
        cursor: pointer;
      
    }
    .asset:hover{
        background-color: royalblue;
        color: white;
    }
    ::-webkit-scrollbar {
    width: 12px; /* Set the width of the scrollbar */
}

::-webkit-scrollbar-track {
    background: transparent; /* Hide the track */
}

::-webkit-scrollbar-thumb {
    background-color: black; /* Black knob */
    border: 2px solid gray;
    border-radius: 10px; /* Optional: rounded corners for the knob */
}
    </style>