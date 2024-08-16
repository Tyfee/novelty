<script lang="ts">
    export let prop1: string;
    export let prop2: string;
    export let prop3: string;
    export let prop4: Array<any>;
 export let y: any;
 export let x: any;
 export let onRemove: any;
 export let onEdit: any;
 export let onNodeClick: any; 


</script>

<style>
   .node-container {
    position: relative;
    display: inline-block;
    flex-shrink: 0;
    z-index: 0;
}

.my-component {
    font-weight: bolder;
    color: white;
    width: 140px !important;
    cursor: pointer;
    height: auto;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    transition: all 0.2s ease-in-out;
    flex-shrink: 0;
    z-index: 5 !important;
    box-shadow: 1px 1px 2px 2px black;
}

.my-component:hover {
    box-shadow: inset 600px 600px rgba(255, 255, 255, 0.226);
    transform: scale(1.1);
}

.actions {
    position: relative;
}

.connector {
    position: absolute;
    top: 50%;
    left: 100%;
    width: 150px; /* Adjust length as needed */
    height: 2px;
    background-color: black; /* Color of the connecting line */
    border: 1px solid white;
    transform: translateY(-50%);
}
.route{
    background-color: yellow;
    color: black;
    width: 50px;
    border-radius: 50%;
    height: 50px;
    border: 2px solid black;
    position: absolute;
    left: 130%;
    transform: translateY(-140%) !important;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-align: center;
    align-content: center;
}
.route:hover{
    width: 60px;
    height: 60px;
    box-shadow: inset 500px 500px rgba(255, 255, 255, 0.856);
}

  
</style>
<div on:click={onNodeClick} class="node-container">
   
    <div class="connector"></div>

    {#if  prop3 == 'choice'}
    {#each prop4 as route, index}
    <div 
      style={`top: ${index * 100}%; 
              margin-left: -13.5%; 
              transform: rotate(${-50 + (index * 820)}deg);`} 
      class="connector">
    </div>

    <div 
    style={`top: ${index * 170}%; 
            margin-left: 0; 
            transform: rotate(${-50 + (index * 820)}deg);`} 
    class="route">
    
    <strong style="font-size: 1.6em;color: black;">  {route}</strong>
  </div>
  {/each}
{/if}
    <div 
        tabindex="0" 
        role="button" 
        style="margin-left: {x}vw; top: {y}vh; background-color: {prop3 == 'dialogue' ? 'purple' : prop3 == 'choice' ? 'green' : prop3 == 'action' ? 'red' : prop3 == 'route'? 'cyan' : 'gray'}" 
        class="my-component"
    >
        <div class="actions">
            <button on:click={onEdit}>✏️</button>
            <button on:click={onRemove}>🗑️</button>
            <button on:click={onRemove}>⬅️</button>
            <button on:click={onRemove}>➡️</button>
        </div>
        <p>{prop2}: {prop1}</p>
        
    </div>
    
</div>


