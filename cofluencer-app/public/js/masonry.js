/* eslint-disable */
function resizeGridItem(item) {
  var grid = document.getElementsByClassName("grid")[0];
  var rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
  var rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
  var rowSpan = Math.ceil((item.querySelector('.content').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
  item.style.gridRowEnd = "span " + rowSpan;
}

function resizeAllGridItems() {
  var allItems = document.getElementsByClassName("item");
  for (x = 0; x < allItems.length; x++) {
    imagesLoaded (allItems[x], resizeInstance);
    resizeGridItem(allItems[x]);
  }
}

function resizeInstance(instance){
  var item = instance.elements[0];
  resizeGridItem(item);
}

window.onload = resizeAllGridItems();
window.addEventListener("resize", resizeAllGridItems);