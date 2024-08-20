# What is it
Novelty is a user-friendly game engine built with rust and svelte that allows you to quickly create story based games that target multiple platforms without needing any code. It is powered by [Macroquad](https://github.com/not-fl3/macroquad) and [Tauri](https://github.com/tauri-apps/tauri)

# How does it work

Novelty is a Tauri app, it converts all of the user settings from the window into a scripting language called deLIGHT, that code then gets converted again into Rust code, using the Macroquad library to display graphics.  

The only concepts of the engine you should know are the assets, the nodes and the attributes.

# Assets


# Nodes


# Attributes


# Scripting language

Novelty games can also be written with a scripting language deLIGHT. 
With a simple syntax, you can quickly program your scenes, if a visual approach doesn't satisfy your needs.


```

window_title "cool game";

scene main_menu;
scene city;

city.say -> 'Hello.', who: 0000; 

city.say -> 'What would you like to eat?', who: 0000; 

```

# Compiling it yourself



