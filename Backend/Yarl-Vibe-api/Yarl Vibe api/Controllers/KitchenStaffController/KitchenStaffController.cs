using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Authorization;

namespace Yarl_Vibe_api.Controllers.KitchenStaffController
{

    public class KitchenStaffController : Controller
    {
        private IConfiguration _configuration;
        public KitchenStaffController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        //Get Table details
        [HttpGet]
        [Route("GetOrdersData")]
        public JsonResult GetData()
        {
            string query = "select * from Orders";
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

        [HttpGet]
        [Route("GetOrderStatus/{orderId}")]
        public JsonResult GetOrderStatus(int orderId)
        {
            // Define the query to retrieve OrderID and FoodStatus for the specific order
            string query = "SELECT OrderID, FoodStatus FROM Orders WHERE OrderID = @orderID";

            // Create a DataTable to hold the results
            DataTable table = new DataTable();

            // Get the connection string from the configuration
            string sqlDatasource = _configuration.GetConnectionString("yarlVibeDBCon");

            using (SqlConnection myCon = new SqlConnection(sqlDatasource))
            {
                // Open the connection
                myCon.Open();

                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    // Add the OrderID parameter to the query
                    myCommand.Parameters.AddWithValue("@OrderID", orderId);

                    // Execute the query and load the results into the DataTable
                    using (SqlDataReader myReader = myCommand.ExecuteReader())
                    {
                        table.Load(myReader);
                    }
                }
            }

            // Return the result as a JSON object
            return new JsonResult(table);
        }

        //Update order status

        [HttpPost]
        [Route("UpdateOrderStatus")]
        public JsonResult UpdateOrderStatus([FromBody] JObject requestData)
        {
            int orderID = (int)requestData["orderID"];
            string foodStatus = requestData["foodStatus"].ToString();
            string query = "UPDATE Orders SET FoodStatus = @foodStatus WHERE OrderID = @orderID;";
            string connectionString = _configuration.GetConnectionString("yarlVibeDBCon");

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    // Add parameters
                    command.Parameters.AddWithValue("@foodStatus", foodStatus);
                    command.Parameters.AddWithValue("@orderID", orderID);

                    try
                    {
                        connection.Open();
                        int rowsAffected = command.ExecuteNonQuery();
                        if (rowsAffected > 0)
                        {
                            return new JsonResult("TableStatus updated successfully!");
                        }
                        else
                        {
                            return new JsonResult("No rows were updated.");
                        }
                    }
                    catch (Exception ex)
                    {
                        return new JsonResult($"Error updating TableStatus: {ex.Message}");
                    }
                }
            }
        }
        // get order details
        [HttpGet]
        [Route("GetOrderDetails/{orderID}")]
        public JsonResult GetOrderDetails(int orderID)
        {
            string query = "SELECT * FROM OrderedFoods WHERE OrderID = @orderID";
            DataTable table = new DataTable();
            string connectionString = _configuration.GetConnectionString("yarlVibeDBCon");

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@orderID", orderID);

                    try
                    {
                        connection.Open();
                        SqlDataReader reader = command.ExecuteReader();
                        table.Load(reader);
                        reader.Close();
                    }
                    catch (Exception ex)
                    {
                        // Handle error
                        return new JsonResult($"An error occurred: {ex.Message}");
                    }
                }
            }

            return new JsonResult(table);
        }
    }
}