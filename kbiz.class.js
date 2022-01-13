const axios = require("axios");
axios.defaults.baseURL = "https://ib.gateway.kasikornbank.com";
const formUrlEncoded = (x) =>
  Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, "");

class kbiz {
  constructor(config = null) {
    this.username = config.username;
    this.password = config.password;
    this.accountnumber = config.accountnumber;
    this.ibId = config.ibId;
    this.token = config.token;
    config.token
      ? (axios.defaults.headers.common["Authorization"] = config.token)
      : null;
    config.ibId
      ? (axios.defaults.headers.common["X-IB-ID"] = config.ibId)
      : null;
  }
  async Login() {
    try {
      const url_login = "https://online.kasikornbankgroup.com/kbiz/login.do";
      var { data } = await axios.get(url_login);
      var Rsso = await axios.post(
        url_login,
        formUrlEncoded({
          userName: this.username,
          password: this.password,
          tokenId: this.substringBetween(data, `id="tokenId" value="`, `"/>`),
          cmd: "authenticate",
          locale: "th",
          custType: 0,
          captcha: "",
          app: "",
        })
      );
      var result = await axios.post("/api/authentication/validateSession", {
        dataRsso: this.substringBetween(Rsso.data, `Rsso=`, `"`),
      });
      var ibId = result.data.data.userProfiles[0].ibId;
      var token = result.headers["x-session-token"];
      return { success: true, ibId, token };
    } catch (e) {
      return { success: false };
    }
  }
  async CheckSession() {
    try {
      await axios.post("/gateway/refreshSession", {});
      return true;
    } catch (e) {
      return false;
    }
  }
  async getTransactionList(limitrow = 7, startDate = null, endDate = null) {
    var today = new Date();
    var month = (today.getMonth() + 1).toString().padStart(2, "0");
    const Datenow = `${today.getDate()}/${month}/${today.getFullYear()}`;
    try {
      var gettranstion = await axios.post(
        "/api/accountsummary/getRecentTransactionList",
        {
          acctNo: this.accountnumber,
          acctType: "SA",
          custType: "I",
          endDate: endDate ? endDate : Datenow,
          ownerId: this.ibId,
          ownerType: "Retail",
          pageNo: "1",
          refKey: "",
          rowPerPage: limitrow,
          startDate: startDate ? startDate : Datenow,
        }
      );
      const transactioncallback = await Promise.all(
        gettranstion.data.data.recentTransactionList.map(async (data) => {
          var result = await this.getRecentTransactionDetail(
            data.transDate,
            data.origRqUid,
            data.originalSourceId,
            data.debitCreditIndicator,
            data.transCode,
            data.transType
          );
          return result.data
        })
      );

      return transactioncallback.filter((array)=>{return array.bankNameTh});
    } catch (e) {
      return false;
    }
  }

  async getRecentTransactionDetail(
    transDate,
    origRqUid,
    originalSourceId,
    debitCreditIndicator,
    transCode,
    transType
  ) {
    try {
      var { data } = await axios.post(
        "/api/accountsummary/getRecentTransactionDetail",
        {
          transDate: transDate.split(" ")[0],
          acctNo: this.accountnumber,
          origRqUid: origRqUid,
          custType: "I",
          originalSourceId: originalSourceId,
          transCode: transCode,
          debitCreditIndicator: debitCreditIndicator,
          transType: transType,
          ownerType: "Retail",
          ownerId: this.ibId,
        }
      );
      return data;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async GetInfoUser() {
    try {
      var result = await axios.post(
        "/api/accountsummary/getAccountSummaryList",
        {
          custType: "I",
          isReload: "N",
          lang: "th",
          nicknameType: "OWNAC",
          ownerId: this.ibId,
          ownerType: "Retail",
          pageAmount: 6,
        }
      );
      return result.data.data;
    } catch (e) {
      return false;
    }
  }

  substringBetween(s, a, b) {
    var p = s.indexOf(a) + a.length;
    return s.substring(p, s.indexOf(b, p));
  }
}
module.exports = kbiz;
