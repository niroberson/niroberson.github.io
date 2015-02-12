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
        'border-opacity': 0.8,
        'color': '#24BF0F'
      })
    .selector('edge')
      .css({
        'width': 2,
        'target-arrow-shape': 'triangle',
        'line-color': '#ffaaaa',
        'target-arrow-color': '#ffaaaa'
      })
    .selector('#projects')
      .css({
        'background-image': 'https://farm8.staticflickr.com/7272/7633179468_3e19e45a0c_b.jpg',
      })
    .selector('#about')
      .css({
        'background-image': '/images/nyc_nathan.jpg'
      })
    .selector('#blog')
      .css({
        'background-image': 'https://farm4.staticflickr.com/3063/2751740612_af11fb090b_b.jpg'
      })
    .selector('#setation')
      .css({
        // 'visibility' : 'hidden'
      })
    .selector('#reactto')
      .css({
        // 'visibility' : 'hidden'
      })
    .selector('#LinkedIn')
      .css({
        'background-image' : '/images/linkedin-logo.png'
      })
    .selector('#WhereisDrake')
      .css({
        // 'visibility' : 'hidden'
        'background-image' : '/images/drake.jpg'
      }),
  
  elements: {
    nodes: [
      { data: { id: 'about'} },
      { data: { id: 'projects'} },
      { data: { id: 'blog' } },
      { data: { id: 'resume'}},
      { data: { id: 'setation', lightbox : '#lightbox-setation'}},
      { data: { id: 'reactto'}},
      { data: { id: 'WhereisDrake', href: 'http://www.whereisdrake.com'}},
      { data: { id: 'LinkedIn', href: 'https://www.linkedin.com/in/nathanrobers'}},
    ],
    edges: [
      { data: {source: 'about', target: 'projects' } },
      { data: {source: 'about', target: 'LinkedIn' } },
      { data: {source: 'about', target: 'blog' } },
      { data: {source: 'projects', target: 'setation' } },
      { data: {source: 'projects', target: 'reactto' } },
      { data: {source: 'projects', target: 'WhereisDrake' } },
      { data: {source: 'about', target: 'resume' } },

    ]
  },
  
  layout: {
    name: 'concentric',
    directed: true,
    padding: 50,
    animate:true,
    animationDuration: 500,
    avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
    minNodeSpacing: 70, // min spacing between outside of nodes (used for radius adjustment)
    concentric: function(){ // returns numeric value for each node, placing higher nodes in levels towards the centre
    return this.degree();
    },
  },

}); // cy init

cy.userZoomingEnabled( false );
cy.userPanningEnabled( false );

// Light up on mouse over
cy.on('mouseover', 'node', function(){
    this.css('border-color', '#98FFFB');
})

// Return to original color on mouse out
cy.on('mouseout', 'node', function(){
  this.css('border-color', '#000');
})

// ON node clicked
cy.on('tap', 'node', function(){

if(this.data('href') != null) {
  try { // your browser may block popups
    window.open( this.data('href') );
  } catch(e){ // fall back on url change
    window.location.href = this.data('href'); 
  } 
}

if(this.data('lightbox') != null) {
  showLightbox(this);
}

  // var secondLevelEdges = cy.elements('edge[source!="about"]');
  // var secondLevelNodes = secondLevelEdges.targets();
  //   if (secondLevelNodes != null){
  //   secondLevelNodes.css('visibility', 'hidden');
  // }

  // showChildren(this);

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

function showLightbox(node)
{
  var lightBox = $('#lightbox'),
      lightBoxContent = $(node.data('lightbox'));

  lightBox.fadeIn(function() {
      lightBoxContent.show();                               
  });

  var viewWidth = $(window).width(),
      lbContentMargin = viewWidth * 0.05;

  lightBoxContent
    .css({
        'left' : lbContentMargin,
        'top' : $(window).scrollTop() + 50 + 'px'
    });

    $('#lb-close').click(function(){
      lightBox.hide(); 
      lightBoxContent.hide();
    });
}