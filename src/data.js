const data={
    entries:{
        "entry-1":{
            id: "entry-1",
            author: "Leroy Smith",
            title: "My resume 1"
        },
        "entry-2":{
            id: "entry-2",
            author: "Frank spicer",
            title: "My resume 2"
        },
        "entry-3":{
            id: "entry-3",
            author: "Feng Wei",
            title: "My resume 3"
        },
    },
    columns:{
        "column-1":{
            id:"column-1",
            title: "Titles",
            entryIds: ["entry-1", "entry-2", "entry-3"]
        }
    },
    order:[
        "column-1"
    ]
}
export default data