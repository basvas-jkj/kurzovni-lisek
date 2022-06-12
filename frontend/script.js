function load_json()
{
    let url = 'https://webapi.developers.erstegroup.com/api/csas/public/sandbox/v2/rates/exchangerates?web-api-key=c52a0682-4806-4903-828f-6cc66508329e';
    fetch(url)
    .then(function (odpoved)
    {
        return odpoved.json();
    })
    .then(function (json)
    {
        print(json);
    })
    .catch(function (err)
    {
        return "error";
    });
}

function print_header(head)
{
    let first_row = document.createElement("tr");
    let second_row = document.createElement("tr");
    
    head.appendChild(first_row);
    head.appendChild(second_row);
    
    let cells_1 = ["jméno", "stát", "množství", "valuty",
                   "devizy", "střední kurz", "změna"];
    let cells_2 = ["nákup", "prodej", "nákup","prodej",
                   "podle ČNB", "podle ECB"];
    
    for (let i = 0; i < cells_1.length; i += 1)
    {
        let td = document.createElement("td");
        td.innerText = cells_1[i];
        first_row.appendChild(td);
        
        if (i < 3 || i == 6)
        {
            td.setAttribute("rowspan", 2);
        }
        else
        {
            td.setAttribute("colspan", 2);
        }
    }
    
    for (let i = 0; i < cells_2.length; i += 1)
    {
        let td = document.createElement("td");
        td.innerText = cells_2[i];
        second_row.appendChild(td);
    }
}

function print(json)
{
    let table = document.getElementById('output');
    let head = document.createElement("thead");
    let body = document.createElement("tbody");
    
    table.innerText = "";
    table.appendChild(head);
    table.appendChild(body);
    
    print_header(head);
    
    for (let i = 0; i < json.length; i += 1)
    {
        let item = json[i];
        let td;
        let tr = document.createElement("tr");
        body.appendChild(tr);
        
        td = document.createElement("td");
        td.innerText = item.name;
        tr.appendChild(td);
        
        td = document.createElement("td");
        td.innerText = item.country;
        tr.appendChild(td);
        
        td = document.createElement("td");
        td.innerText = item.amount + " " + item.shortName;
        tr.appendChild(td);
        
        td = document.createElement("td");
        td.innerText = item.valBuy + " CZK";
        tr.appendChild(td);
        
        td = document.createElement("td");
        td.innerText = item.valSell + " CZK";
        tr.appendChild(td);
        
        td = document.createElement("td");
        td.innerText = item.currBuy + " CZK";
        tr.appendChild(td);
        
        td = document.createElement("td");
        td.innerText = item.currSell + " CZK";
        tr.appendChild(td);
        
        td = document.createElement("td");
        td.innerText = item.cnbMid + " CZK";
        tr.appendChild(td);
        
        td = document.createElement("td");
        td.innerText = item.ecbMid + " EUR";
        tr.appendChild(td);
        
        td = document.createElement("td");
        td.innerText = item.move + " %";
        tr.appendChild(td);
    }
}