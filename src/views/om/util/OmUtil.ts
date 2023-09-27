
export function getRunStatusColor(status:string){
    switch(status){
        case "1":
            return "orange"; //"#f1c40f";
        case "2":
            return "purple";
        case "3":
            return "blue";
        case "4":
            return "gold";
        case "5":
            return "green";
        case "6":
            return "red";
        default:
            return "gray";
    }
}