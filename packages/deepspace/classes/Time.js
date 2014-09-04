DS.Classes.Time = function(){

    var _TTL = 60; //standard time to live: 1 hour
    var from = new moment();
    var to = new moment();

    this.set = function(from, to){
        this.setFrom(from);
        this.setTo(to);
    }

    this.setTTL = function(from, TTL){

        //add TTL
        var _to = from.clone();
        _to.add('minutes', TTL || _TTL);

        //save
        this.setFrom(from);
        this.setTo(_to);
    }

    this.setFrom = function(d){
        from = d;
    }

    this.setTo = function(d){
        to = d;
    }

    this.get = function(){
        return {
            'from': from,
            'to': to
        }
    }

    this.getDuration = function(){
        return parseInt(to) - parseInt(from);
    }

    this.between = function(pointer){

    }

}
