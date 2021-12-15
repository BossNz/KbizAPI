var kbizapi = require("./kbiz.class");

(async()=>{
    var config = {
      username: "",
      password: "",
      accountnumber: "",
      ibId: "",
      token:"",
    };
    var kbiz = new kbizapi(config);
    console.log(await kbiz.Login()); // login เพื่อได้ token กับ ibId ไว้ดึงข้อมูล ( array )

    console.log(await kbiz.CheckSession()); // ตรวจสอบว่า token ตาย ( boolean )

    console.log(await kbiz.GetInfoUser()); // ดูข้อมูลผู้ใช้งานตรวจสอบยอดคงเหลือ ( array )
    
    console.log(await kbiz.getTransactionList()); // ดูประวัติการโอนและรับเงิน ( array )

})();