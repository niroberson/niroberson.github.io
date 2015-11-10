document.addEventListener('DOMContentLoaded', function(){ // on dom ready

// photos from flickr with creative commons license
  
var cy = cytoscape({
  container: document.getElementById('graph-menu'),
  style: [
    {
      selector: 'node',
      style: {
          'height': 100,
          'width': 100,
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
      selector: '#projects',
      style: {
        'background-image':'/images/pod_cfd.PNG',
        'visibility':'hidden'
      }
    },

    {
      selector: '#about',
      style: {
        'background-image': '/images/nyc_nathan.jpg'
      }
    },

    {
      selector: '#blog',
      style: {
        'background-image': '/images/wordpress-logo.png',
        'visibility':'hidden'
      }
    },

    {
      selector: '#linkedIn',
      style: {
        'background-image' : '/images/linkedin-logo.png',
        'visibility':'hidden'
      }
    },

    {
      selector :'#github',
      style: {
        'background-image' : '/images/git.png',
        'visibility':'hidden'
      }
    }

  ],
  
  elements: {
    nodes: [
      { data: { id: 'about', name:'Explore'} },
      { data: { id: 'projects', name:'Projects', lightbox : '#lightbox-projects'}},
      { data: { id: 'blog', name:'Blog', href: 'https://niroberson.wordpress.com' } },
      { data: { id: 'linkedIn', name:'LinkedIn', href: 'https://www.linkedin.com/in/nathanrobers'}},
      { data: { id: 'github', name:'Github', href: 'https://www.github.com/niroberson'}},

    ],
    edges: [
      { data: {source: 'about', target: 'projects' } },
      { data: {source: 'about', target: 'linkedIn' } },
      { data: {source: 'about', target: 'github' } },
    ]
  },
  
  layout: {
    name: 'circle',
    fit: 'true',
    directed: 'true',
    padding: 50,
    avoidOverlap: true,
    minNodeSpacing: 25, // min spacing between outside of nodes (used for radius adjustment)
  },

  userZoomingEnabled: false,
  userPanningEnabled: false,
  boxSelectionEnabled: false,
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
  if (connectedNodes!= null){
      for (iNode=1; iNode<connectedNodes.length; iNode++){
        if (connectedNodes[iNode].visible()) {
         connectedNodes[iNode].css('visibility', 'hidden')
        }
        else {
          connectedNodes[iNode].css('visibility', 'visible')
        }
      }
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