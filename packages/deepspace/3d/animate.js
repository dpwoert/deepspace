DS.THREE.animationHelper = function(){

    //check
    if(!this.addProcess){
        console.warn('No renderManager added');
    }

    //create helper class
    var Animation = { data: {} };

    //init animation
    Animation.init = function(r, UID, property, find){
        this.render = r;
        this.property = property;
        this.find = find;
        this.data = { 'UID': UID };
        return this;
    }

    //set from to
    Animation.to = function(from, to){

        if(!to){

            this.data.from = this.property[this.find];
            this.data.to = from;
            this.data.delta = this.data.to - this.data.from;

        } else {

            this.data.from = from;
            this.data.to = to;
            this.data.delta = to - from;

        }

        return this;
    }

    //set duration
    Animation.time = function(duration){
        this.data.duration = duration
        return this;
    }

    //set easing
    Animation.ease = function(easing){

        if(_.isFunction(easing)){
            this.data.ease = easing;
        } else {
            this.data.ease = Math['easing'];
        }

        return this;

    }

    Animation.callback = function(fn){
        this.data.callback = fn;
        return this;
    }

    //stop animating
    Animation.stop = function(){
        this.render.removeProcess(this.data.UID);
        //this.data.callback();
        return this;
    };

    //start animation
    Animation.start = function(){

        var self = this;
        var now = 0;

        //check if easing
        if(!this.data.ease){
            this.data.ease = Math.easeInOutQuad;
        }

        //animate
        this.render.addProcess(this.data.UID, function(delta){

            //end?
            if(now * 1000 > self.data.duration){
                console.log('end of animation', self);
                self.stop();
            }

            //animate
            var r = self.data.ease( now * 1000, self.data.from, self.data.delta, self.data.duration );
            self.property[self.find] = r;

            console.log(r);

            //tick
            now += delta;

        });

        return this;
    };

    this.animate = function(property, find){

        var UID = DS.tools.UID();
        var anim = Object.create(Animation);
        anim.init(this, UID, property, find);

        return anim;

    };

}
