//route
Router.map(function(){

    this.route('home', {
        path: '/',
        template: 'intro'
    })

    this.route('visualisation', {
        path: '/network/:network',
        data: function(){

            //check if exist
            var provider = Provider[this.params.network];
            if(!provider){
                console.warn('not found!');
                return false;
            }

            //create network
            var network = provider.network();
            var visualisations = provider.visualisations;

            return {
                'network': network,
                'visualisations': visualisations
            }
        }
    })

});
