

function showPanel(menuIndex,colorCode) {
    const flight_buttons=document.querySelectorAll(".flight-background .flight-button v-btn");
const flflight_menus=document.querySelectorAll(".flight-background  .flflight_menu");
flight_buttons.forEach(function(node){
node.style.backgroundColor="";
node.style.color="";
});
flight_buttons[menuIndex].style.backgroundColor=colorCode;
flight_buttons[menuIndex].style.color="white";
flflight_menus.forEach(function(node){
node.style.display="none";
});
flflight_menus[menuIndex].style.display="block";

}
showPanel(0,'#217de0');