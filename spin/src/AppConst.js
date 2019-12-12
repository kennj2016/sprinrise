export class AppConst {
    static END_POINT = 'https://spinrisepro.azurewebsites.net/';
    static END_POINT_API = AppConst.END_POINT + "api/";
    static token = AppConst.END_POINT + "connect/token";
    static list_children = AppConst.END_POINT_API + "Mobile/Children";

    /**
     * EX: https://spinrisepro.azurewebsites.net/api/Mobile/Timeline/childrenId/8568fc76-0632-4dda-a300-c5251dd037c6/fromDate/2019-01-01/toDate/2019-05-01
     */
    static  time_line = (childId: number, fromDate: String, toDate: String) => AppConst.END_POINT_API +
        "Mobile/Timeline/childrenId/" + childId + "/fromDate/" + fromDate + "/toDate/" + toDate;
}