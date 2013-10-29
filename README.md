Facebook Visualisation
======================

Visualising Facebookfeeds with D3.js and Three.js
http://deepspace.dpwoert.com

Description
----------------------
Dive deep into the Matrix with your Facebook network. This visualisation lets you see the connections, likes and activity in your network. The data is gathered by the Facebook Graph API and you need to give it permission to access your data. None of this data will be stored by me or a third party so you can maintain the illusion of having privacy.

**Short explanation of the elements:**
- Big nodes: friends, color determined by making communities. Hold your mouse on a node to see his/her name.
- Small nodes: messages such as status updates, video’s and images (all have a different color).
- Lines: friendship, shorter lines mean people have shared interests.

**Controls:**
- Mouse: look around
- Left-click: Move forward
- Right-click: Move backward
- Double-click: Highlight connections of node WASD: Move around

Dependencies
----------------------
- Meteor
- D3.JS
- ThreeJS
- jQuery
- Facebook Graph Api
- jLouvain
