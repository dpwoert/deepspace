//create
Visual.graph3d = function(element, network){

    //render
    DS.THREE.renderManager.call(this);

    //add scene & camera
    helpers.init.call(this, element);
    // helpers.flyControls.call(this);

    //create geometries
    this.geometry = new helpers.geometries();
    this.material = new helpers.material();

    //import lightsBuffer to animate light pulses
    this.lights = new DS.THREE.LightsBuffer(this.scene);

    //hemisphere light - lighter when no light pulses
    var intensity = this.lights.usingPulses() ? 0.7 : 1;
    var hemisphere = new THREE.HemisphereLight(0xffffff, 0x999999, intensity);
    this.scene.add(hemisphere);

    //create force
    this.force = new helpers.ForceGraph(network, this);

    //create timeline
    this.timeline = new DS.classes.Timeline();
    this.timeline.addEvents(network.messages);
    // this.timeline.calculateBounds();
    this.timeline.setBounds( moment().subtract(2, 'days'), moment() );

    //timeline events
    this.timeline.add = helpers.messages.add.bind(this);
    this.timeline.remove = helpers.messages.remove.bind(this);
    this.timeline.update = helpers.messages.update.bind(this);

    //extra layout options
    DS.parts([
        {name: 'timeline', data: this.timeline.part() }
    ]);

    //render
    this.addProcess('aqua3d', function(delta){

        //rotate camera
        this.camera.render();

        //do mouse things
        // this.controls.update(delta);

        //render force
        this.force.render();

        //move timeline forward
        this.timeline.forward();

        //render frame
        this.renderer.render( this.scene, this.camera );

    }.bind(this));

    //play
    this.start();

}
