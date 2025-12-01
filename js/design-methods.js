


// first we need Konva core things: stage and layer

const containerDiv = document.getElementById('moscow-container');
const width = containerDiv.offsetWidth;
const height = 400;

const stage = new Konva.Stage({
  container: 'moscow-container',
  width: width,
  height: height,
});

const layer = new Konva.Layer();
stage.add(layer);

// create rectangles for MoSCoW categories
const categories = [
  { title:"M", name: 'Must have', color: '#FF5733' },
  { title:"S", name: 'Should have', color: '#33C1FF' },
  { title:"C", name: 'Could have', color: '#75FF33' },
  { title:"W", name: "Won't have", color: '#FF33A8' },
];
const rectWidth = width / categories.length;
const rectHeight = height;




