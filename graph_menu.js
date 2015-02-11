$(function(){ // on dom ready

// photos from flickr with creative commons license
  
var cy = cytoscape({
  container: document.getElementById('graph-menu'),
  
  style: cytoscape.stylesheet()
    .selector('node')
      .css({
        'height': 50,
        'width': 50,
        'background-fit': 'cover',
        'content': 'data(id)',
        'border-color': '#000',
        'border-width': 3,
        'border-opacity': 0.5
      })
    .selector('.eating')
      .css({
        'border-color': 'red'
      })
    .selector('.eater')
      .css({
        'border-width': 9
      })
    .selector('edge')
      .css({
        'width': 6,
        'target-arrow-shape': 'triangle',
        'line-color': '#ffaaaa',
        'target-arrow-color': '#ffaaaa'
      })
    .selector('#projects')
      .css({
        'background-image': 'https://farm8.staticflickr.com/7272/7633179468_3e19e45a0c_b.jpg'
      })
    .selector('#about')
      .css({
        'background-image': '/images/drake.jpg'
      })
    .selector('#blog')
      .css({
        'background-image': 'https://farm4.staticflickr.com/3063/2751740612_af11fb090b_b.jpg'
      })
    .selector('#setation')
      .css({
        'visibility' : 'hidden'
      })
    .selector('#reactto')
      .css({
        'visibility' : 'hidden'
      }),
  
  elements: {
    nodes: [
      { data: { id: 'about'} },
      { data: { id: 'projects'} },
      { data: { id: 'blog' } },
      { data: { id: 'resume'}},
      { data: { id: 'setation', href: 'http://www.vbi.vt.edu'}},
      { data: { id: 'reactto'}},
    ],
    edges: [
      { data: {source: 'about', target: 'projects' } },
      { data: {source: 'about', target: 'blog' } },
      { data: {source: 'projects', target: 'setation' } },
      { data: {source: 'projects', target: 'reactto' } },
      { data: {source: 'about', target: 'resume' } },

    ]
  },
  
  layout: {
    name: 'breadthfirst',
    directed: true,
    padding: 10,
    animate:true,
    animationDuration: 500,
    circle: false
  },

}); // cy init

cy.userZoomingEnabled( false );
cy.userPanningEnabled( false );



cy.on('tap', 'node', function(){

  var secondLevelEdges = cy.elements('edge[source!="about"]');
  var secondLevelNodes = secondLevelEdges.targets();
    if (secondLevelNodes != null){
    secondLevelNodes.css('visibility', 'hidden');
  }

  showChildren(this);

}); // on tap

}); // on dom ready

function showChildren(node)
{
  var connectedEdges = node.connectedEdges();
  var connectedNodes = connectedEdges.connectedNodes();
  if (connectedNodes != null){
    connectedNodes.css('visibility', 'visible');
  }

}
