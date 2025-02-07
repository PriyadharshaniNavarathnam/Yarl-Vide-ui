using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Authorization;

namespace Yarl_Vibe_api.Controllers.CashierController
{
    public class CashierController : Controller
    {
        private IConfiguration _configuration;
        public CashierController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        //Get Table details
        [HttpGet]
        [Route("GetMenuData")]
        public JsonResult GetData()
        {
            string query = "select * from tbl_MenuItem";
            DataTable table = new DataTable();
            string sqlDatasource = _configuration.GetConnectionString("yarlVibeDBCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDatasource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }
        //////
        [HttpPost]
        [Route("AddOrder")]
        public IActionResult AddOrder([FromBody] OrderData orderData)
        {
            string orderQuery = "INSERT INTO Orders (DateAndTime, TableCode, CashPaid, Balance, TotalPrice, FoodStatus) " +
                                "VALUES (@dateAndTime, @tableCode, @cashPaid, @balance, @totalPrice, @foodStatus); SELECT SCOPE_IDENTITY();";

            string orderDetailsQuery = "INSERT INTO OrderedFoods (OrderID, FoodID, Quantity, FoodPrice, FoodName, FoodCustomizingText) " +
                                       "VALUES (@orderId, @foodId, @quantity, @foodPrice, @foodName, @foodCustomizingText);";

            using (SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("yarlVibeDBCon")))
            {
                SqlTransaction transaction = null;

                try
                {
                    connection.Open();
                    transaction = connection.BeginTransaction();

                    // Insert order information
                    int orderId;
                    using (SqlCommand orderCommand = new SqlCommand(orderQuery, connection, transaction))
                    {
                        orderCommand.Parameters.AddWithValue("@dateAndTime", orderData.DateAndTime);
                        orderCommand.Parameters.AddWithValue("@tableCode", orderData.TableCode);
                        orderCommand.Parameters.AddWithValue("@cashPaid", orderData.CashPaid);
                        orderCommand.Parameters.AddWithValue("@balance", orderData.Balance);
                        orderCommand.Parameters.AddWithValue("@totalPrice", orderData.TotalPrice);
                        orderCommand.Parameters.AddWithValue("@foodStatus", orderData.FoodStatus);

                        orderId = Convert.ToInt32(orderCommand.ExecuteScalar());
                    }

                    // Insert order details
                    foreach (var orderDetail in orderData.OrderDetails)
                    {
                        using (SqlCommand detailCommand = new SqlCommand(orderDetailsQuery, connection, transaction))
                        {
                            detailCommand.Parameters.AddWithValue("@orderId", orderId);
                            detailCommand.Parameters.AddWithValue("@foodId", orderDetail.menuItemID);
                            detailCommand.Parameters.AddWithValue("@quantity", orderDetail.quantity);
                            detailCommand.Parameters.AddWithValue("@foodPrice", orderDetail.price);
                            detailCommand.Parameters.AddWithValue("@foodName", orderDetail.name);
                            detailCommand.Parameters.AddWithValue("@foodCustomizingText", orderDetail.custermizeText);

                            detailCommand.ExecuteNonQuery();
                        }
                    }

                    transaction.Commit();

                    return Ok("Order added successfully!");
                }
                catch (Exception ex)
                {
                    transaction?.Rollback();
                    return StatusCode(500, $"An error occurred: {ex.Message}");
                }
            }
        }

        public class OrderDetail
        {
            public int menuItemID { get; set; }
            public int quantity { get; set; }
            public decimal price { get; set; }
            public decimal singlePrice { get; set; }
            public string name { get; set; }
            public string custermizeText { get; set; }
        }

        public class OrderData
        {
            public DateTime DateAndTime { get; set; }
            public string TableCode { get; set; }
            public decimal CashPaid { get; set; }
            public decimal Balance { get; set; }
            public decimal TotalPrice { get; set; }
            public string FoodStatus { get; set; }
            public List<OrderDetail> OrderDetails { get; set; }
        }






    }
}