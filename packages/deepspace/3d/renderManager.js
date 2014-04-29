DS.THREE.renderManager = function(){

    var list = [];
    var end = false;

    this.addProcess = function(id, fn){
        list.push({ 'id': id, 'fn': fn});
    };

    this.removeProcess = function(id){

        for( var i = 0 ; i < list.length ; i++ ){

            if( list[i].id === id){
                list.splice(i, 1);
            }

        }

    };

    var render = function(){

        //stop when needed
        if(end) {
            end = false;
            return false;
        }

        //shedule next frame
        requestAnimationFrame( render );

        for( var i = 0 ; i < list.length ; i++ ){

            list[i].fn(delta);

        }

    };

    this.start = function(){
        render();
    }

    this.end = function(){
        end = true;
    }

}
