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
        'border-color': '#2185C5',
        'border-width': 3,
        'border-opacity': 0.8,
        'color': '#FFF6E5'
      })
    .selector('edge')
      .css({
        'width': 2,
        'target-arrow-shape': 'triangle',
        'line-color': '#7ECEFD',
        'target-arrow-color': '#FF7F66'
      })
    .selector('#Projects')
      .css({
        //'visibility' : 'hidden',
      })
    .selector('#About')
      .css({
        'background-image': '/images/nyc_nathan.jpg'
      })
    .selector('#Blog')
      .css({
        'background-image': '/images/wordpress-logo.png',
        'visibility':'hidden'
      })
    .selector('#setation')
      .css({
        'visibility' : 'hidden'
      })
    .selector('#SKN')
      .css({
        'visibiity' : 'hidden',
      })
    .selector('#LinkedIn')
      .css({
        'background-image' : '/images/linkedin-logo.png'
      })
    .selector('#Github')
      .css({
        'background-image' : '/images/git.png'
      }),
  
  elements: {
    nodes: [
      { data: { id: 'About', lightbox : '#lightbox-about'} },
      { data: { id: 'Projects', lightbox : '#lightbox-projects'}},
      { data: { id: 'Blog', href: 'https://niroberson.wordpress.com' } },
      { data: { id: 'LinkedIn', href: 'https://www.linkedin.com/in/nathanrobers'}},
      { data: { id: 'Github', href: 'https://www.github.com/niroberson'}},

    ],
    edges: [
      { data: {source: 'about', target: 'projects' } },
      { data: {source: 'about', target: 'LinkedIn' } },
      { data: {source: 'about', target: 'blog' } },
      { data: {source: 'about', target: 'Github' } },
      { data: {source: 'projects', target: 'WhereisDrake' } },

    ]
  },
  
  layout: {
    name: 'breadthfirst',
    directed: true,
    padding: 50,
    animate:true,
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
  this.css('border-color', '#FCFFF5');
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
  var lightBox = $('.lightbox'),
      lightBoxContent = $(node.data('lightbox'));

  lightBox.fadeIn(function() {
      lightBoxContent.show();                               
  });

  lightBoxContent
    .css({
        'left' : $(window).width() * 0.05,
        'top' : $(window).scrollTop() + 50 + 'px'
    });

    $('.lb-close').click(function(){
      lightBox.hide(); 
      lightBoxContent.hide();
    });
}