# Kbiz API
Unofficial Kbiz's API.

## Examples
ก่อนใช้งาน จำเป็นต้องลง axios ก่อน
```js
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
```

## WARNING
This project may be used only for **Educational Purposes**. Developers assume **no liability and are not responsible for any misuse or damage** caused by this program.

ไม่แนะนำให้นำไปใช้โดย**เด็ดขาด** ใช้เพื่อการศึกษา**เท่านั้น**
