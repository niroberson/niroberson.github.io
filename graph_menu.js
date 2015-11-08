$(function(){ // on dom ready

// photos from flickr with creative commons license
  
var cy = cytoscape({
  container: document.getElementById('graph-menu'),
  style: [
    {
      selector: 'node',
      style: {
          'height': 50,
          'width': 50,
          'background-fit': 'cover',
          'content': 'data(name)',
          'border-color': '#2185C5',
          'border-width': 3,
          'border-opacity': 0.8,
          'color': '#FFF6E5'
        }
      },

    {
      selector: 'edge',
      style: {
        'width': 2,
        'target-arrow-shape': 'triangle',
        'line-color': '#7ECEFD',
        'target-arrow-color': '#FF7F66'
      }
    },
    {
      selector: '#Projects',
      style: {
        'visibility' : 'hidden',
        'background-image':'/images/pod_cfd.PNG'
      }
    },

    {
      selector: '#About',
      style: {
        'background-image': '/images/nyc_nathan.jpg'
      }
    },

    {
      selector: '#Blog',
      style: {
        'background-image': '/images/wordpress-logo.png',
        'visibility':'hidden',
      }
    },

    {
      selector: '#LinkedIn',
      style: {
        'background-image' : '/images/linkedin-logo.png',
        'visibility' : 'hidden',
      }
    },

    {
      selector :'#Github',
      style: {
        'background-image' : '/images/git.png',
        'visibility' : 'hidden',
      }
    }

  ],
  
  elements: {
    nodes: [
      { data: { id: 'About', name:'Explore'} },
      { data: { id: 'Projects', name:'Projects', lightbox : '#lightbox-projects'}},
      { data: { id: 'Blog', name:'Blog', href: 'https://niroberson.wordpress.com' } },
      { data: { id: 'LinkedIn', name:'LinkedIn', href: 'https://www.linkedin.com/in/nathanrobers'}},
      { data: { id: 'Github', name:'Github', href: 'https://www.github.com/niroberson'}},

    ],
    edges: [
      { data: {source: 'About', target: 'Projects' } },
      { data: {source: 'About', target: 'LinkedIn' } },
      { data: {source: 'About', target: 'Github' } },
    ]
  },
  
  layout: {
    name: 'breadthfirst',
    fit: 'true',
    directed: 'true',
    padding: 50,
    animate:true,
    avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
    minNodeSpacing: 25, // min spacing between outside of nodes (used for radius adjustment)
  },

  headless: false,
  zoomingEnabled: false,
  userZoomingEnabled: false,
  panningEnabled: false,
  userPanningEnabled: false,
  styleEnabled: true,
  boxSelectionEnabled: false,
  selectionType: 'single',
  touchTapThreshold: 8,
  desktopTapThreshold: 4,
  autolock: false,
  autoungrabify: true,
  autounselectify: true
}); // cy init

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
  // Do something with the node
  if(this.data('href') != null) {
    try { // your browser may block popups
      window.open( this.data('href') );
    } catch(e){ // fall back on url change
      window.location.href = this.data('href'); 
    } 
  }

  if(this.data('lightbox') != null) 
  {
    showLightbox(this);
  }
  else
  {
    toggleChildren(this);
  }

}); // on tap

}); // on dom ready


function toggleChildren(node)
{
  var connectedEdges = node.connectedEdges();
  var connectedNodes = connectedEdges.connectedNodes();

  var children = node.children()
  console.log(children);
  // .css('visibility', 'visible');

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