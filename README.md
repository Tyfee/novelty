# IN CONSTRUCTION

Novelty is a hobby project of mine, it's something i've been meaning to create for a long time and also an excuse to try Rust. 
I also just want to see how to manage a bigger game related project.

Up until this point all the program can do is:

- Run on Windows
- Create/Open Projects
- Convert scenes and nodes information into visual information with macroquad
- Handle basic input events
- Compile the games into executables

Be warned that this repository contains ugly, non-functional and or inefficient code!

# What is it
Novelty is a user-friendly game engine built with rust and svelte that allows you to quickly create story based games that target multiple platforms without needing any code. It is powered by [Macroquad](https://github.com/not-fl3/macroquad) and [Tauri](https://github.com/tauri-apps/tauri)

# How does it work
![Windows Screenshot](https://github.com/Tyfee/novelty/blob/main/screenshots/novelty_win.png?raw=true)
Novelty is a Tauri app, it converts all of the user settings from the window into a scripting language called deLIGHT, that code then gets converted again into Rust code, using the Macroquad library to display graphics.  

The only concepts of the engine you should know are the assets, the nodes and the characters.

# Assets


# Nodes
![Windows Screenshot](https://github.com/Tyfee/novelty/blob/main/screenshots/novelty_nodes.png?raw=true)

# Characters


# Scripting language

Novelty games can also be written with a scripting language deLIGHT. 
With a simple syntax, you can quickly program your scenes, if a visual approach doesn't satisfy your needs.

![Windows Nodes](https://github.com/Tyfee/novelty/blob/main/screenshots/novelty_script.png?raw=true)

It is meant to be organized like a movie script, or a subtitles file, which prioritize what you want to display rather than displaying logic, which is handled by the rust code.


The following code initializes two scenes, one being the main menu, then adds a couple dialogs to the second scene.
```

window_title "cool game";

scene main_menu;
scene city;

city.say -> 'Hello.', who: 0000; 

city.say -> 'What would you like to eat?', who: 0000; 

```

# Executable

![Windows Executable](https://github.com/Tyfee/novelty/blob/main/screenshots/novelty_render.png?raw=true)



# Compiling it yourself



