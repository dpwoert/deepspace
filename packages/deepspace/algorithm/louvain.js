DS.algorithm.louvain = function(group, relations){

    var convertGroup = group.map(function(d){
        return d.id;
    });

    var convertRelations = relations.map(function(d){
        return {
            source: d.source.id,
            target: d.target.id,
            weight: d.connection
        }
    });

    var community = jLouvain()
        .nodes(convertGroup)
        .edges(convertRelations)
        .partition_init();

    var calculated = community();

    //save again
    return group.map(function(d,index){

        d.community = calculated[d.id];
        return d;

    });

}
