import Settings from "./settings.js";


export default function svgGridSizer (gameEngine) {

    $(document).ready(function(){


        const widthview = $("#gridCont").width() - Settings.gridContPadd
        const heightview = $("#gridCont").height() - Settings.gridContPadd
        const h_cells_nr =  Math.floor(widthview / gameEngine.cellside)
        const v_cells_nr = Math.floor(heightview / gameEngine.cellside)

        $("#svgGrid").attr("width", gameEngine.cellside * h_cells_nr)
                     .attr("height", gameEngine.cellside * v_cells_nr)
                     .attr("style", `border:1px solid ${Settings.gridcolor}`);

        $("#gridPattern").attr("width", gameEngine.cellside)
                         .attr("height", gameEngine.cellside);    
                         
        $("#gridPath").attr("d", `M 0 ${-1 * gameEngine.cellside} V ${gameEngine.cellside} M 0 0 H ${gameEngine.cellside}`)
                      .attr("stroke", Settings.gridcolor);

        $("speedrange").attr("value", Settings.speed_default);
        $("cellsiderange").attr("value", Settings.cellside_default);
       

        $(window).resize(function(){

            const widthview_new = $("#gridCont").width() - Settings.gridContPadd
            const heightview_new = $("#gridCont").height() - Settings.gridContPadd  
            const h_cells_nr_new =  Math.floor(widthview_new / gameEngine.cellside)
            const v_cells_nr_new = Math.floor(heightview_new / gameEngine.cellside)

            $("#svgGrid").attr("width", gameEngine.cellside * h_cells_nr_new)
                         .attr("height", gameEngine.cellside * v_cells_nr_new);
    
            $("#gridPattern").attr("width", gameEngine.cellside)
                             .attr("height", gameEngine.cellside);    
                             
            $("#gridPath").attr("d", `M 0 ${-1 * cellside} V ${gameEngine.cellside} M 0 0 H ${gameEngine.cellside}`)



            const modifyCell = function() {
                let new_x = this.getAttribute('x') / this.getAttribute('width') * gameEngine.cellside
                let new_y = this.getAttribute('y') / this.getAttribute('width') * gameEngine.cellside
                this.setAttribute('x', new_x);
                this.setAttribute('y', new_y);
                this.setAttribute('id', new_x + '_' + new_y);
                this.setAttribute('width', gameEngine.cellside);
                this.setAttribute('height', gameEngine.cellside); }

            $("#cellalive").children().each(modifyCell);


        });


        let startRef

        $("#startbutton").click(function () {
            
            clearInterval(startRef)
            startRef = setInterval(function () {gameEngine.startEngine()}, 1000)

        })


        $("#pausebutton").click(function () {

            clearInterval(startRef)

        })


        $("#speedrange").on("input", function() {

            clearInterval(startRef)
            let newval = $(this).attr('max') - $(this).val() + 100
            startRef = setInterval(function () {gameEngine.startEngine()}, newval)

        })


        $("#nextbutton").click(function () {

            gameEngine.startEngine()

        })


        $("#resetbutton").click(function () {

            gameEngine.resetEngine()

        })


        $("#cellsiderange").on("input", function() {

            const widthview_new = $("#gridCont").width() - Settings.gridContPadd
            const heightview_new = $("#gridCont").height() - Settings.gridContPadd  
            const newCellside = $(this).val()
            const h_cells_nr_new =  Math.floor(widthview_new / newCellside)
            const v_cells_nr_new = Math.floor(heightview_new / newCellside)

            gameEngine.cellside = newCellside

            $("#svgGrid").attr("width", newCellside * h_cells_nr_new)
                         .attr("height", newCellside * v_cells_nr_new);
    
            $("#gridPattern").attr("width", newCellside)
                             .attr("height", newCellside);    
                             
            $("#gridPath").attr("d", `M 0 ${-1 * newCellside} V ${newCellside} M 0 0 H ${newCellside}`)

            const modifyCell = function() {
                                           let new_x = this.getAttribute('x') / this.getAttribute('width') * newCellside
                                           let new_y = this.getAttribute('y') / this.getAttribute('width') * newCellside
                                           this.setAttribute('x', new_x);
                                           this.setAttribute('y', new_y);
                                           this.setAttribute('id', new_x + '_' + new_y);
                                           this.setAttribute('width', newCellside);
                                           this.setAttribute('height', newCellside); }

             $("#cellalive").children().each(modifyCell);

            
        });

        


    });

}


const addNewCells = (gameEngine) => {


    $(document).ready(function(){

        const box = $("#svgGrid");

        box.click(function (event) {

            const cellside = gameEngine.cellside

            const xCellpos = Math.floor((event.pageX - $('#svgGrid').offset().left) / cellside)
            const yCellpos = Math.floor(($("#svgGrid").height() - (event.pageY - $('#svgGrid').offset().top)) / cellside)


        function makeSVG(tag, attrs) {
            var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
            for (var k in attrs)
                el.setAttribute(k, attrs[k]);
            return el;
        }

        
        const addedCells = gameEngine.addedCells

        if(!addedCells.includes(xCellpos + '_' + yCellpos)){

            gameEngine.addCelltoEngine(xCellpos + '_' + yCellpos)

            const yCellpos_fromtop = Math.floor(((event.pageY - $('#svgGrid').offset().top)) / cellside)
            const cell = makeSVG('rect', {id: xCellpos + '_' + yCellpos, x: xCellpos * cellside, y: yCellpos_fromtop * cellside, width: cellside, height: cellside, fill: Settings.cellcolor, 'stroke-width': 0.5, stroke: Settings.gridcolor});
            $("#cellalive").append(cell);



        } else {

            gameEngine.removeCellfromEngine(xCellpos + '_' + yCellpos)

            $(`#${xCellpos}_${yCellpos}`).remove();

        }

        

        });



    })

}



  
export { addNewCells };