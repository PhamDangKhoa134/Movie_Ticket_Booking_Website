using HMS.Hol.ApplicationService.Common;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly Utils _utils;

        public PaymentController(IConfiguration configuration, Utils utils)
        {
            _configuration = configuration;
            _utils = utils;
        }

        private string GenerateVnpayUrl(VnPayRequest request, string vnp_Url, string vnp_HashSecret, string vnp_TmnCode, string vnp_Returnurl, string ipAddress)
        {
            VnPayLibrary vnpay = new VnPayLibrary();
            vnpay.AddRequestData("vnp_Version", VnPayLibrary.VERSION);
            vnpay.AddRequestData("vnp_Command", "pay");
            vnpay.AddRequestData("vnp_TmnCode", vnp_TmnCode);
            vnpay.AddRequestData("vnp_Amount", ((int)(request.Amount * 100)).ToString());
            vnpay.AddRequestData("vnp_OrderInfo", request.OrderDesc);
            vnpay.AddRequestData("vnp_OrderType", request.OrderType);
            //vnpay.AddRequestData("email", request.Email);
            //vnpay.AddRequestData("seat", request.Seat);
            vnpay.AddRequestData("vnp_ReturnUrl", vnp_Returnurl);
            vnpay.AddRequestData("vnp_TxnRef", request.OrderId.ToString());
            vnpay.AddRequestData("vnp_ExpireDate", DateTime.Now.AddMinutes(15).ToString("yyyyMMddHHmmss"));
            vnpay.AddRequestData("vnp_CreateDate", DateTime.Now.ToString("yyyyMMddHHmmss"));
            vnpay.AddRequestData("vnp_CurrCode", "VND");
            vnpay.AddRequestData("vnp_IpAddr", ipAddress);
            vnpay.AddRequestData("vnp_Locale", "vn");

            return vnpay.CreateRequestUrl(vnp_Url, vnp_HashSecret);
        }

    //    private async Task<Dictionary<string, object>> GenerateZaloPayPaymentAsync(VnPayRequest request, string zalo_app_id, string zalo_key1, string zalo_paymentUrl, string zalo_app_user)
    //    {
    //        var embed_data = new { };
    //        var items = new[] { new { } };
    //        var param = new Dictionary<string, string>
    //{
    //    { "app_id", zalo_app_id },
    //    { "app_user", zalo_app_user },
    //    { "app_time", ZaloUtils.GetTimeStamp().ToString() },
    //    { "amount", request.Amount.ToString() },
    //    { "app_trans_id", DateTime.Now.ToString("yyMMdd") + "_" + request.OrderId },
    //    { "embed_data", JsonConvert.SerializeObject(embed_data) },
    //    { "item", JsonConvert.SerializeObject(items) },
    //    { "description", request.OrderDesc },
    //    { "bank_code", request.OrderType ?? "zalopayapp" }
    //};

    //        var data = $"{zalo_app_id}|{param["app_trans_id"]}|{param["app_user"]}|{param["amount"]}|{param["app_time"]}|{param["embed_data"]}|{param["item"]}";
    //        param.Add("mac", HmacHelper.Compute(ZaloPayHMAC.HMACSHA256, zalo_key1, data));

    //        return await HttpHelper.PostFormAsync(zalo_paymentUrl, param);
    //    }

        [HttpPost("create-payment-url")]
        public async Task<IActionResult> CreatePaymentUrl([FromBody] VnPayRequest request)
        {
            try
            {
                // Lấy cấu hình
                string vnp_Url = _configuration["Vnpay:PaymentUrl"];
                string vnp_HashSecret = _configuration["Vnpay:HashSecret"];
                string vnp_TmnCode = _configuration["Vnpay:TmnCode"];
                string vnp_Returnurl = _configuration["Vnpay:ReturnUrl"];
                var ipAddress = _utils.GetIpAddress();

                //string zalo_app_id = _configuration["Zalopay:Appid"];
                //string zalo_key1 = _configuration["Zalopay:Key1"];
                //string zalo_paymentUrl = _configuration["Zalopay:PaymentUrl"];
                //string zalo_app_user = _configuration["Zalopay:AppUser"];

                if (request.OrderType == "vnpay")
                {
                    var paymentUrl = GenerateVnpayUrl(request, vnp_Url, vnp_HashSecret, vnp_TmnCode, vnp_Returnurl, ipAddress);
                    return Ok(new { PaymentUrl = paymentUrl });
                }
                //else if (request.OrderType == "zalopayapp")
                //{
                //    var result = await GenerateZaloPayPaymentAsync(request, zalo_app_id, zalo_key1, zalo_paymentUrl, zalo_app_user);
                //    return Ok(result);
                //}
                else
                {
                    return BadRequest("Invalid payment type.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpGet("return-vnpay-url")]
        public IActionResult ReturnVnpayUrl([FromQuery] VnPayResponse response)
        {
            try
            {
                // Lấy thông tin cấu hình từ appsettings.json
                string vnp_TmnCode = _configuration["Vnpay:TmnCode"];
                string vnp_HashSecret = _configuration["Vnpay:HashSecret"];
                var result = new VnPayResponse
                {
                    vnp_Amount = response.vnp_Amount,
                    vnp_BankCode = response.vnp_BankCode,
                    vnp_ResponseCode = response.vnp_ResponseCode ?? "",
                    vnp_BankTranNo = response.vnp_BankTranNo,
                    vnp_CardType = response.vnp_CardType,
                    vnp_OrderInfo = response.vnp_OrderInfo,
                    vnp_PayDate = response.vnp_PayDate,
                    vnp_SecureHash = response.vnp_SecureHash,
                    vnp_TmnCode = response.vnp_TmnCode,
                    vnp_TransactionNo = response.vnp_TransactionNo,
                    vnp_TransactionStatus = response.vnp_TransactionStatus,
                    vnp_TxnRef = response.vnp_TxnRef,
                };
                if (response.vnp_ResponseCode == "00")
                {
                    return Ok(new { message = "Thanh toán thành công", data = result });
                }
                else
                {
                    return Ok(new { message = "Thanh toán thất bại", data = result });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");

            }
        }



    }
}
