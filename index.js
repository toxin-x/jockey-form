let tracki = 2;

function newtrack() {
    let template = `                <div class="trackembed">
        <div class="trackwrap">
            <fieldset class="track">
                <legend>track ${tracki}:</legend>

                <label for="track[${tracki}][artist]">Artist:</label><br>
                <input type="text" class="artist" name="track[${tracki}][artist]" id="track[${tracki}][artist]"  oninput="titledashartist(this) required"><br>
                <label for="track[${tracki}][title]">Title:</label><br>
                <input type="text" name="track[${tracki}][title]" id="track[${tracki}][title]" class="title" oninput="titledashartist(this)" required><br>
                <label for="track[${tracki}][timestamp]">Timestamp (mm:ss):</label><br>
                <input type="text" name="track[${tracki}][timestamp]" id="track[${tracki}][artist]" pattern="([0-5][0-9]:[0-5][0-9])" placeholder="00:00" title="Must be in mm:ss format" required><br>
            </fieldset>


        </div>
        
        <div class="embed" name="embeded">
            <p class="embedtitle">
                <span class="np">Now playing:</span>
                <span class="titleobj" name="embed[${tracki}][titleobj]">artist - title</span>
            </p>
            <p class="embeddesc">
                <span class="dj set">Dischead Jockeys </span>
                <span class="djnum" name="djnumname">1.1</span>
                <span class="by"> performed by </span>
                <span class="descobj" name="performername">performer</span>
            </p>
        <br>
        </div>`;

    let container = document.getElementById('container');
    let div = document.createElement('div');
    div.innerHTML = template;
    container.appendChild(div);
    embedcolor();
    embedname();
    embednumber();

    tracki++;
};

function titledashartist(obj) {
    var n = obj.name.match(/[0-9]+/g);
    var titleartist = (document.getElementsByName(`track[${n}][artist]`)[0].value + ` - ` + document.getElementsByName(`track[${n}][title]`)[0].value);
    document.getElementsByName(`embed[${n}][titleobj]`)[0].textContent = titleartist;

};

function embednumber() {
    var djna = document.getElementsByName("djnumname");

    for (var i = 0; i < djna.length; i++) {
        djna[i].textContent = document.getElementsByName(`set`)[0].value;

    };
};

function embedname() {
    var pname = document.getElementsByName("performername");
    for (var i = 0; i < pname.length; i++) {
        pname[i].textContent = document.getElementsByName(`performer`)[0].value
    };
};

function embedcolor() {
    var col = document.getElementsByName("embeded");
    for (var i = 0; i < col.length; i++) {
        col[i].style.borderColor = document.getElementsByName(`color`)[0].value
    };
};




function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.target);
    var dataStr = ""
    var dlAnchorElem = []
    var dataent = (Object.fromEntries(data.entries()));
    var dataex = {};
    var dataobj = Object.keys(dataent);
    var builtdict ={}


    {

        for (var j = 0; j < dataobj.length; j++) 
        
        {
            if (dataobj[j].startsWith("track")) 
            {
                var key = Object.keys(dataent)[j];
                var valu = dataent[dataobj[j]];
                var newKey = key.split('[')[1].split(']')[0];
                var newSubKey = key.split('[')[2].split(']')[0];
                if (builtdict[newKey] == undefined) {
                    builtdict[newKey] = {};
                };
                builtdict[newKey][newSubKey] = valu;
                

            } else 
            {
                dataex[dataobj[j]] = dataent[dataobj[j]];
             }

        };
    };

dataex["tracks"] = builtdict;

    const value2 = JSON.stringify(dataex, null, 2);
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(value2);
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href",     dataStr     );
    dlAnchorElem.setAttribute("download", document.getElementsByName(`performer`)[0].value + "-" + document.getElementsByName(`set`)[0].value + ".json");
    dlAnchorElem.click();

};


const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);

