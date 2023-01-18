import Settings from "./settings.js";

export default class gameEngine {

    constructor() { 
      this.liveCells = [];
      this.addedCells = [];
      this.speedms = Settings.speed_default;
      this.cellside = Settings.cellside_default;
      this.counter = 0;
    }

    addCelltoEngine(cell) {
      this.addedCells.push(cell)
    }

    removeCellfromEngine(cell) {
      this.addedCells.splice(this.addedCells.indexOf(cell), 1)
    }

    startEngine() {

        ++this.counter

        this.liveCells = [...new Set([...this.liveCells, ...this.addedCells])]
        this.addedCells = []

        let newGen = []
      
        //keep alive >= 2 & < 4 or die if overpopulation >=4
        for (let k = 0; k < this.liveCells.length; k++) {

          let c_arr = this.liveCells[k].split('_')
          let x = Number(c_arr[0])
          let y = Number(c_arr[1])

          let livecell_around = 0

          livecell_around += Number(this.liveCells.includes(x + 1 + '_' + y))
          livecell_around += Number(this.liveCells.includes(x + 1 + '_' + (y - 1)))
          livecell_around += Number(this.liveCells.includes(x + '_' + (y - 1)))
          livecell_around += Number(this.liveCells.includes(x - 1 + '_' + (y - 1)))
          livecell_around += Number(this.liveCells.includes(x - 1 + '_' + y))
          livecell_around += Number(this.liveCells.includes(x - 1 + '_' + (y + 1)))
          livecell_around += Number(this.liveCells.includes(x + '_' + (y + 1)))
          livecell_around += Number(this.liveCells.includes(x + 1 + '_' + (y + 1)))

          if(livecell_around >= 2 && livecell_around < 4){newGen.push(this.liveCells[k])}

        }


        //resurrect
        for (let p = 0; p < this.liveCells.length; p++) {

          let c_arr = this.liveCells[p].split('_')
          let x = Number(c_arr[0])
          let y = Number(c_arr[1])


          let arn = [[x + 1, y],
                     [x + 1, y - 1],
                     [x, y - 1],
                     [x - 1, y - 1],
                     [x - 1, y],
                     [x - 1, y + 1],
                     [x, y + 1],
                     [x + 1, y + 1]]


          for (let z = 0; z < arn.length; z++) {       

            let livecell_around = 0

            livecell_around += Number(this.liveCells.includes(arn[z][0] + 1 + '_' + arn[z][1]))
            livecell_around += Number(this.liveCells.includes(arn[z][0] + 1 + '_' + (arn[z][1] - 1)))
            livecell_around += Number(this.liveCells.includes(arn[z][0] + '_' + (arn[z][1] - 1)))
            livecell_around += Number(this.liveCells.includes(arn[z][0] - 1 + '_' + (arn[z][1] - 1)))
            livecell_around += Number(this.liveCells.includes(arn[z][0] - 1 + '_' + arn[z][1]))
            livecell_around += Number(this.liveCells.includes(arn[z][0] - 1 + '_' + (arn[z][1] + 1)))
            livecell_around += Number(this.liveCells.includes(arn[z][0] + '_' + (arn[z][1] + 1)))
            livecell_around += Number(this.liveCells.includes(arn[z][0] + 1 + '_' + (arn[z][1] + 1)))

            if(livecell_around >= 3 && livecell_around < 4){
              newGen.push(arn[z][0] + '_' + arn[z][1])
            }

          }

        }

        newGen = [ ...new Set(newGen) ]

        this.liveCells = newGen

        let count = this.counter
        let cellside = this.cellside

        $(document).ready(function(){

          $("#cellalive").empty()
          $("#steps").text(count);

          for (let n = 0; n < newGen.length; n++) {

          let c_arr = newGen[n].split('_')
          let x = Number(c_arr[0])
          let y = Number(c_arr[1])

          function makeSVG(tag, attrs) {
            var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
            for (var k in attrs)
                el.setAttribute(k, attrs[k]);
            return el;
          }

          const cell = makeSVG('rect', {x: x * cellside, y: ($("#svgGrid").height() / cellside - y - 1) * cellside, width: cellside, height: cellside, fill: Settings.cellcolor, 'stroke-width': 0.5, stroke: Settings.cellcolor});
          $("#cellalive").append(cell);

          }

        })
    }


    resetEngine() {

      this.liveCells = []
      this.counter = 0

      $(document).ready(function(){

        $("#cellalive").empty()
        $("#steps").text(0);

      })

    }


  }
  
