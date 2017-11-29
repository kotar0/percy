

{

    //データの保存場所
    let datastore = (() => {
        this.csv = [];

        this.addData = (data) => {
            this.csv.push(data)
        }

        return {
            csv : this.csv,
            addData : this.addData
        }

    })()

    // Make Instance of UUID tool.
    const hashids = new Hashids();


    function handleFileSelect(evt) {
        let files = evt.target.files; // FileList object
        
        _.forEach(files, (item , idx) => {
            console.log(files[idx])
        
           let foo = readFile(item);

           console.log(foo);
        });
        
    }

    function parseCsv(e){
        console.log(datastore.csv)

        let tmpl = getTextAreaValue('#templtextarea')

        // rendering hogan
        _.forEach(datastore.csv[0], (item, idx)=>{
            console.log(item)
            let renderResult = renderTemplate(tmpl, item)
            let resultHolder = document.getElementById('result')
            let div = document.createElement('div');
            div.innerText = renderResult.toString()
            resultHolder.appendChild(div)
        })
    }



    function readFile(textfile){
        let output;
        let reader = new FileReader()
        reader.readAsText(textfile) 
        
        reader.addEventListener('load', function(e){
            let result = e.target.result
            let csv = Papa.parse(result, { header : true })

            datastore.addData(csv.data) //Add to Data Store

            _.forEach(Object.keys(csv.data[0]), (item, idx) => {
                let content = makeHashFromString(item) + '  ' + item
                insertList(content)
            })
        }, false)
    }

    function insertList(innerContent){
        let innerItem = document.createElement('li');
        innerItem.innerText = innerContent;
        document.querySelector('.keylist').appendChild(innerItem);
    }

    function makeHashFromString(string){
        let stringNumber = obtainUnicode(string);
        return hashids.encode(stringNumber)
    }

    function renderTemplate(template, src){
        let tpl  = Hogan.compile(template)
        let result = tpl.render(src)
        return result;
    }
    
    function getTextAreaValue(selector){
        let el = document.querySelector(selector);
        return el.value;
    }

    // Main function
    
    // Readfile function

    
    document.querySelector('.btn__parse').addEventListener('click', parseCsv, false);
    
      document.getElementById('files').addEventListener('change', handleFileSelect, false);

}