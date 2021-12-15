# Kbiz API
Unofficial Kbiz's API.

## Examples

```js
var kbankapi = require("./kbank.class");

(async()=>{
    var config = {
      username: "",
      password: "",
      accountnumber: "",
      ibId: "",
      token:"",
    };
    var kbank = new kbankapi(config);
    // console.log(await kbank.Login()); // login เพื่อได้ token กับ ibId ไว้ดึงข้อมูล ( array )

    // console.log(await kbank.GetInfoUser()); // ดูข้อมูลผู้ใช้งานตรวจสอบยอดคงเหลือ ( array )
    // console.log(await kbank.CheckSession()); // ตรวจสอบว่า token ตาย ( boolean )
    // console.log(await kbank.getTransactionList()); // ดูประวัติการโอนและรับเงิน ( array )

})();

```

## WARNING
This project may be used only for **Educational Purposes**. Developers assume **no liability and are not responsible for any misuse or damage** caused by this program.

ไม่แนะนำให้นำไปใช้โดย**เด็ดขาด** ใช้เพื่อการศึกษา**เท่านั้น**
