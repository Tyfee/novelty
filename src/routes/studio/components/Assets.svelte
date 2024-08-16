<script lang="ts">

import { Accordion } from '@svelteuidev/core';
export let characters
export let audio
export let scenes
export let images
export let fonts
let open_tabs = [0, 1]

function toggleDisplay(index: any){
    if(open_tabs.includes(index)){
       open_tabs = open_tabs.filter((i) => i != index)
    }else{
         open_tabs = [...open_tabs, index]
    }

}

</script>

<div class="assets">
    🗎 Assets Management


    <Accordion>
        <Accordion.Item value="typescript">
          <div slot="control">Scenes</div>
          
    {#each scenes as scene, index}
          <p class="asset">⛶ {scene.title}</p>
          {/each}
        </Accordion.Item>
        <Accordion.Item value="packed">
          <div slot="control">Characters</div>
          {#each characters as character, index}
          <p class="asset">☺ {character.name}</p>
          {/each}
        </Accordion.Item>
        <Accordion.Item value="accessible">
          <div slot="control">Audio</div>
          {#each audio as audi, index}
       
    <p class="asset">♫ {audi.title}</p>
          {/each}  </Accordion.Item>



          <Accordion.Item value="images">
            <div slot="control">Images</div>
            {#each images as image, index}
            <p class="asset">☺ {image.title}</p>
            {/each}
          </Accordion.Item>


          
          <Accordion.Item value="fonts">
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
    .assets_item:hover{
box-shadow: inset 500px 500px rgba(255, 255, 255, 0.342);
    }
    .asset{
        border: 1px solid black;
        height: 12%;
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